const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Can be null for failed login attempts (unknown user)
    username: { type: String, required: false }, // Snapshot of username
    action: { type: String, required: true }, // e.g., 'LOGIN_SUCCESS', 'USER_CREATE', 'PROJECT_UPDATE'
    resource: { type: String, required: true }, // e.g., 'Auth', 'User', 'Project'
    details: { type: Object }, // JSON object with specific diffs or IDs
    ip: { type: String },
    status: { type: String, enum: ['SUCCESS', 'FAILURE'], default: 'SUCCESS' },
    errorMessage: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
