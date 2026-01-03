const Career = require('../models/Career');
const cloudinary = require('../config/cloudinary');

// @desc    Get all careers
// @route   GET /api/v1/careers
// @access  Public
exports.getCareers = async (req, res) => {
    try {
        const careers = await Career.find({ isActive: true });
        res.status(200).json({ success: true, count: careers.length, data: careers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create career
// @route   POST /api/v1/careers
// @access  Private (CAREER_CREATE)
exports.createCareer = async (req, res) => {
    try {
        let careerData = req.body;

        if (req.file) {
            careerData.bannerUrl = req.file.path;
        }

        const career = await Career.create(careerData);

        res.status(201).json({ success: true, data: career });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update career
// @route   PUT /api/v1/careers/:id
// @access  Private (CAREER_UPDATE)
exports.updateCareer = async (req, res) => {
    try {
        let career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        let updateData = req.body;

        if (req.file) {
            // Optional: Delete old image from Cloudinary (requires public_id logic, skipping for simplicity)
            updateData.bannerUrl = req.file.path;
        }

        career = await Career.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: career });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete career
// @route   DELETE /api/v1/careers/:id
// @access  Private (CAREER_DELETE)
exports.deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (!career) {
            return res.status(404).json({ success: false, message: 'Career not found' });
        }

        await career.deleteOne();

        res.status(200).json({ success: true, message: 'Career removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
