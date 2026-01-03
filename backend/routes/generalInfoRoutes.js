const express = require('express');
const { getGeneralInfo, updateGeneralInfo } = require('../controllers/generalInfoController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getGeneralInfo)
    .put(protect, checkPermission('SETTINGS_UPDATE'), updateGeneralInfo);

module.exports = router;
