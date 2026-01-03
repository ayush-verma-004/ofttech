const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private (Super Admin)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Get single user
// @route   GET /api/v1/users/:id
// @access  Private (Super Admin)
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const logAction = require('../utils/logger');

// @desc    Create user (Co-founder/Admin)
// @route   POST /api/v1/users
// @access  Private (Super Admin)
exports.createUser = async (req, res) => {
    try {
        const { username, password, role, permissions } = req.body;
        const requestorIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        // Privilege Escalation Check
        if (role === 'SUPER_ADMIN') {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'PRIVILEGE_ESCALATION_ATTEMPT',
                resource: 'User',
                details: { targetRole: role },
                ip: requestorIp,
                status: 'FAILURE',
                errorMessage: 'Attempted to create SUPER_ADMIN'
            });
            return res.status(403).json({ success: false, message: 'Cannot create SUPER_ADMIN role' });
        }

        const userExists = await User.findOne({ username });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({
            username,
            password,
            role,
            permissions
        });

        if (user) {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'USER_CREATE',
                resource: 'User',
                details: { createdUser: user.username, role: user.role, permissions: user.permissions },
                ip: requestorIp
            });

            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                    permissions: user.permissions
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private (Super Admin)
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prevent updating Super Admin by others (although route is protected, double check logic if needed)
        // Here we assume only Super Admin can access this controller.

        const { username, password, role, permissions, isActive } = req.body;

        if (username) user.username = username;
        if (password) user.password = password; // Will be hashed by pre-save hook
        if (role) user.role = role;
        if (permissions) user.permissions = permissions;
        if (typeof isActive !== 'undefined') user.isActive = isActive;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            data: {
                _id: updatedUser._id,
                username: updatedUser.username,
                role: updatedUser.role,
                permissions: updatedUser.permissions,
                isActive: updatedUser.isActive
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private (Super Admin)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const requestorIp = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Prevent deleting yourself or Super Admin if logic requires
        if (user.role === 'SUPER_ADMIN') {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'USER_DELETE_ATTEMPT',
                resource: 'User',
                details: { target: user.username },
                ip: requestorIp,
                status: 'FAILURE',
                errorMessage: 'Attempted to delete SUPER_ADMIN'
            });
            return res.status(400).json({ success: false, message: 'Cannot delete Super Admin' });
        }

        const targetUsername = user.username;
        await user.deleteOne();

        await logAction({
            userId: req.user._id,
            username: req.user.username,
            action: 'USER_DELETE',
            resource: 'User',
            details: { deletedUser: targetUsername },
            ip: requestorIp
        });

        res.status(200).json({ success: true, message: 'User removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
