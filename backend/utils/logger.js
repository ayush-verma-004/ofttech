const AuditLog = require('../models/AuditLog');

/**
 * Logs an action to the database.
 * @param {Object} params - The log parameters.
 * @param {string} params.userId - The ID of the user performing the action (optional).
 * @param {string} params.username - The username (optional).
 * @param {string} params.action - The action name.
 * @param {string} params.resource - The target resource.
 * @param {Object} params.details - Additional details.
 * @param {string} params.ip - The IP address.
 * @param {string} params.status - 'SUCCESS' or 'FAILURE'.
 * @param {string} params.errorMessage - Error details if status is FAILURE.
 */
const logAction = async ({ userId, username, action, resource, details, ip, status = 'SUCCESS', errorMessage }) => {
    try {
        await AuditLog.create({
            userId,
            username,
            action,
            resource,
            details,
            ip,
            status,
            errorMessage
        });
    } catch (error) {
        console.error('Audit Logging Failed:', error);
        // We do nat want to crash the main flow if logging fails, but we should log to console
    }
};

module.exports = logAction;
