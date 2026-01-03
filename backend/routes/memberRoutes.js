const express = require('express');
const { getMembers, createMember, updateMember, deleteMember } = require('../controllers/memberController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

const upload = require('../utils/fileUpload');

const router = express.Router();

router.route('/')
    .get(getMembers)
    .post(protect, checkPermission('TEAM_UPDATE'), (req, res, next) => {
        console.log('POST /members - Headers:', req.headers['content-type']);
        next();
    }, upload.single('image'), createMember);

router.route('/:id')
    .put(protect, checkPermission('TEAM_UPDATE'), upload.single('image'), updateMember)
    .delete(protect, checkPermission('TEAM_UPDATE'), deleteMember);

module.exports = router;
