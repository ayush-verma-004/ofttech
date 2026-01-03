const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logAction = require('../utils/logger');

// Generate Access Token
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Generate Refresh Token
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRE
    });
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
        await logAction({
            username,
            action: 'LOGIN_ATTEMPT',
            resource: 'Auth',
            ip,
            status: 'FAILURE',
            errorMessage: 'Invalid credentials'
        });
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (!user.isActive) {
        await logAction({
            userId: user._id,
            username,
            action: 'LOGIN_ATTEMPT',
            resource: 'Auth',
            ip,
            status: 'FAILURE',
            errorMessage: 'Account deactivated'
        });
        return res.status(401).json({ success: false, message: 'User account is deactivated' });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    await logAction({
        userId: user._id,
        username,
        action: 'LOGIN_SUCCESS',
        resource: 'Auth',
        ip
    });

    const options = {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res.status(200).cookie('refreshToken', refreshToken, options).json({
        success: true,
        accessToken,
        user: {
            id: user._id,
            username: user.username,
            role: user.role,
            permissions: user.permissions
        }
    });
};

// @desc    Refresh Token
// @route   POST /api/v1/auth/refresh
// @access  Public
exports.refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'No refresh token provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token' });
        }

        const accessToken = generateAccessToken(user._id);

        res.status(200).json({
            success: true,
            accessToken
        });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }
};

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res) => {
    // Clear refresh token in DB if user is authenticated (optional but good practice)
    // We can rely on cookie clearing, but clearing DB record is safer.
    // However, logout might not have auth header if token expired. 
    // We can try to decode from cookie if available.

    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.id);
            if (user) {
                user.refreshToken = '';
                await user.save();
            }
        } catch (err) {
            // Ignore error
        }
    }

    res.cookie('refreshToken', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ success: true, message: 'User logged out' });
};

// @desc    Change password
// @route   PUT /api/v1/auth/password
// @access  Private
exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    if (!(await user.matchPassword(currentPassword))) {
        return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
};

// @desc    Change username (Founder only)
// @route   PUT /api/v1/auth/username
// @access  Private (Super Admin)
exports.changeUsername = async (req, res) => {
    const { newUsername } = req.body;

    const user = await User.findById(req.user.id);

    if (req.user.role !== 'SUPER_ADMIN') {
        return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ success: true, message: 'Username updated successfully', username: newUsername });
};
