const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    location: { type: String, required: true },
    type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], default: 'Full-time' },
    bannerUrl: { type: String }, // Cloudinary URL
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
