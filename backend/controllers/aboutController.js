const About = require('../models/About');

// @desc    Get About Info
// @route   GET /api/v1/about
// @access  Public
exports.getAbout = async (req, res) => {
    try {
        // Assuming single document for About Us
        let about = await About.findOne();

        if (!about) {
            return res.status(200).json({ success: true, data: {} });
        }

        res.status(200).json({ success: true, data: about });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update About Info
// @route   PUT /api/v1/about
// @access  Private (ABOUT_UPDATE)
exports.updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        if (!about) {
            about = await About.create(req.body);
        } else {
            about = await About.findOneAndUpdate({}, req.body, {
                new: true,
                runValidators: true
            });
        }

        res.status(200).json({ success: true, data: about });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
