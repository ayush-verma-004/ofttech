const TeamMember = require('../models/TeamMember');
const logAction = require('../utils/logger');

// @desc    Get all team members
// @route   GET /api/v1/team
// @access  Public
exports.getTeam = async (req, res) => {
    try {
        const team = await TeamMember.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
        res.status(200).json({ success: true, count: team.length, data: team });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Add team member
// @route   POST /api/v1/team
// @access  Private (Manage Team)
exports.addTeamMember = async (req, res) => {
    try {
        let memberData = req.body;

        // Handle Image Upload
        if (req.file) {
            console.log('File Uploaded Successfully:', req.file);
            memberData.image = req.file.path;
        } else {
            console.error('File Upload Failed: req.file is undefined');
            return res.status(400).json({ success: false, message: 'Image is required' });
        }

        // Handle Social Links (JSON parsing if string)
        if (typeof memberData.socialLinks === 'string') {
            try {
                memberData.socialLinks = JSON.parse(memberData.socialLinks);
            } catch (e) {
                // If it fails, it might be that it's not a JSON string or fields are sent individually.
                // But for now we assume consistent JSON string or object.
                // If fields are sent individually like socialLinks[linkedin], express body parser usually handles it if configured extended: true.
            }
        }

        const member = await TeamMember.create(memberData);

        // Log Action
        if (req.user) {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'TEAM_MEMBER_CREATE',
                resource: 'Team',
                details: { name: member.name },
                ip: req.ip
            });
        }

        res.status(201).json({ success: true, data: member });
    } catch (error) {
        console.error("Team Member Creation Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update team member
// @route   PUT /api/v1/team/:id
// @access  Private (Manage Team)
exports.updateTeamMember = async (req, res) => {
    try {
        let member = await TeamMember.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        let updateData = req.body;

        if (req.file) {
            updateData.image = req.file.path;
        }

        if (typeof updateData.socialLinks === 'string') {
            try { updateData.socialLinks = JSON.parse(updateData.socialLinks); } catch (e) { }
        }

        member = await TeamMember.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        if (req.user) {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'TEAM_MEMBER_UPDATE',
                resource: 'Team',
                details: { name: member.name },
                ip: req.ip
            });
        }

        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete team member
// @route   DELETE /api/v1/team/:id
// @access  Private (Manage Team)
exports.deleteTeamMember = async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }

        await member.deleteOne();

        if (req.user) {
            await logAction({
                userId: req.user._id,
                username: req.user.username,
                action: 'TEAM_MEMBER_DELETE',
                resource: 'Team',
                details: { name: member.name },
                ip: req.ip
            });
        }

        res.status(200).json({ success: true, message: 'Member removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
