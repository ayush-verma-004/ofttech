const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    industry: { type: String, required: true },
    problem: { type: String, required: true }, // Renamed from problemStatement
    solution: { type: String, required: true },
    outcome: { type: String, required: true }, // Renamed from businessOutcome
    color: { type: String, default: 'border-blue-500/20' }, // For UI styling
    imageUrls: [{ type: String }],
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
