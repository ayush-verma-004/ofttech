const express = require('express');
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAbout);
router.put('/', protect, checkPermission('ABOUT_UPDATE'), updateAbout);

module.exports = router;
