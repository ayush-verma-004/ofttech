const mongoose = require('mongoose');

const valueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: 'Shield' } // Store icon name (e.g., 'Shield', 'Zap')
});

const statSchema = new mongoose.Schema({
    value: { type: String, required: true }, // e.g., "150+"
    label: { type: String, required: true }  // e.g., "Architects"
});

const aboutSchema = new mongoose.Schema({
    heading: { type: String, default: "Reliability at Every Layer of Scale" },
    overview: { type: String, required: true }, // Main text description
    stats: [statSchema],
    values: [valueSchema]
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
