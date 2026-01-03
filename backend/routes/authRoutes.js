const express = require('express');
const { login, logout, refreshToken, changePassword, changeUsername } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.put('/password', protect, changePassword);
router.put('/username', protect, authorize('SUPER_ADMIN'), changeUsername);

module.exports = router;
