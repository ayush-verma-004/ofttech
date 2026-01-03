const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
    email: { type: String, default: 'info@oft-tech.consulting' },
    phone: { type: String, default: '+1 (800) OFT-TECH' },
    address: { type: String, default: 'Level 24, Global Trade Center, Financial District' },
    socials: {
        linkedin: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        github: { type: String, default: '#' },
        facebook: { type: String, default: '#' },
        instagram: { type: String, default: '#' }
    },
    hero: {
        tagline: { type: String, default: 'Adaptive Gradient Core' },
        title: { type: String, default: 'Navigating \nComplex \nHorizons' },
        subtitle: { type: String, default: 'OFT TECH leverages deep architectural insight to guide enterprises through the gradient of digital transformation.' },
        ctaPrimary: { type: String, default: 'Start The Shift' },
        ctaSecondary: { type: String, default: 'Explore Vision' }
    }
}, { timestamps: true });

// Prevent strict model to allow future fields flexibly
module.exports = mongoose.model('GeneralInfo', generalInfoSchema);
