const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    imageUrl: { type: String }, // Cloudinary URL
    socials: {
        linkedin: { type: String },
        twitter: { type: String },
        email: { type: String }
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
