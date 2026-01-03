const GeneralInfo = require('../models/GeneralInfo');
const logAction = require('../utils/logger');

// @desc    Get Global Settings (Singleton)
// @route   GET /api/v1/general
// @access  Public
exports.getGeneralInfo = async (req, res) => {
    try {
        // Find the first and only document
        let info = await GeneralInfo.findOne();

        // If not exists (first run), create default
        if (!info) {
            info = await GeneralInfo.create({});
        }

        res.status(200).json({ success: true, data: info });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update Global Settings
// @route   PUT /api/v1/general
// @access  Private (SETTINGS_UPDATE)
exports.updateGeneralInfo = async (req, res) => {
    try {
        let info = await GeneralInfo.findOne();

        // If for some reason it doesn't exist
        if (!info) {
            info = await GeneralInfo.create(req.body);
        } else {
            info = await GeneralInfo.findByIdAndUpdate(info._id, req.body, {
                new: true,
                runValidators: true
            });
        }

        await logAction({
            userId: req.user._id,
            username: req.user.username,
            action: 'SETTINGS_UPDATE',
            resource: 'GeneralInfo',
            ip: req.ip
        });

        res.status(200).json({ success: true, data: info });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
