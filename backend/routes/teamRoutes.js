const express = require('express');
const { getTeam, addTeamMember, updateTeamMember, deleteTeamMember } = require('../controllers/teamController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.route('/')
    .get(getTeam)
    .post(protect, checkPermission('TEAM_UPDATE'), upload.single('image'), addTeamMember);

router.route('/:id')
    .put(protect, checkPermission('TEAM_UPDATE'), upload.single('image'), updateTeamMember)
    .delete(protect, checkPermission('TEAM_UPDATE'), deleteTeamMember);

module.exports = router;
