const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user || !req.user.isActive) {
                return res.status(401).json({ success: false, message: 'User not found or inactive' });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

exports.checkPermission = (permission) => {
    return (req, res, next) => {
        if (req.user.role === 'SUPER_ADMIN') {
            return next();
        }
        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({
                success: false,
                message: `Missing permission: ${permission}`
            });
        }
        next();
    };
};
