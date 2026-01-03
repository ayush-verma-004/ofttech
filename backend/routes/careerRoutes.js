const express = require('express');
const { getCareers, createCareer, updateCareer, deleteCareer } = require('../controllers/careerController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.get('/', getCareers);
router.post('/', protect, checkPermission('CAREER_CREATE'), upload.single('banner'), createCareer);
router.put('/:id', protect, checkPermission('CAREER_UPDATE'), upload.single('banner'), updateCareer);
router.delete('/:id', protect, checkPermission('CAREER_DELETE'), deleteCareer);

module.exports = router;
