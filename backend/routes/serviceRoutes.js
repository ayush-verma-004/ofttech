const express = require('express');
const { getServices, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, checkPermission } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getServices);
router.post('/', protect, checkPermission('SERVICE_UPDATE'), createService);
router.put('/:id', protect, checkPermission('SERVICE_UPDATE'), updateService);
router.delete('/:id', protect, checkPermission('SERVICE_UPDATE'), deleteService);

module.exports = router;
