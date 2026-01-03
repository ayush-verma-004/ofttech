const Member = require('../models/Member');
const logAction = require('../utils/logger');

// @desc    Get all members
// @route   GET /api/v1/members
// @access  Public
exports.getMembers = async (req, res) => {
    try {
        const members = await Member.find({ isActive: true }).sort({ order: 1 });
        res.status(200).json({ success: true, count: members.length, data: members });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create member
// @route   POST /api/v1/members
// @access  Private (TEAM_UPDATE)
exports.createMember = async (req, res) => {
    try {
        let memberData = req.body;

        if (req.file) {
            memberData.imageUrl = req.file.path;
        }

        // Basic JSON parsing for nested objects if sent as string (common with FormData)
        if (typeof memberData.socials === 'string') {
            try { memberData.socials = JSON.parse(memberData.socials); } catch (e) { }
        }

        const member = await Member.create(memberData);

        await logAction({
            userId: req.user._id,
            username: req.user.username,
            action: 'MEMBER_CREATE',
            resource: 'Team',
            details: { name: member.name },
            ip: req.ip
        });

        res.status(201).json({ success: true, data: member });
    } catch (error) {
        console.error("Member Creation Error:", error);
        console.error("Request Body:", req.body);
        console.error("Request File:", req.file);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Update member
// @route   PUT /api/v1/members/:id
// @access  Private (TEAM_UPDATE)
exports.updateMember = async (req, res) => {
    try {
        let member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        let updateData = req.body;

        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        if (typeof updateData.socials === 'string') {
            try { updateData.socials = JSON.parse(updateData.socials); } catch (e) { }
        }

        member = await Member.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        await logAction({
            userId: req.user._id,
            username: req.user.username,
            action: 'MEMBER_UPDATE',
            resource: 'Team',
            details: { name: member.name },
            ip: req.ip
        });

        res.status(200).json({ success: true, data: member });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete member
// @route   DELETE /api/v1/members/:id
// @access  Private (TEAM_UPDATE)
exports.deleteMember = async (req, res) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        await member.deleteOne();

        await logAction({
            userId: req.user._id,
            username: req.user.username,
            action: 'MEMBER_DELETE',
            resource: 'Team',
            details: { name: member.name },
            ip: req.ip
        });

        res.status(200).json({ success: true, message: 'Member removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
