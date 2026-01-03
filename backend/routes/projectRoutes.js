const express = require('express');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, checkPermission } = require('../middleware/authMiddleware');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.get('/', getProjects);
router.post('/', protect, checkPermission('PROJECT_CREATE'), upload.array('images', 10), createProject);
router.put('/:id', protect, checkPermission('PROJECT_UPDATE'), upload.array('images', 10), updateProject);
router.delete('/:id', protect, checkPermission('PROJECT_DELETE'), deleteProject);

module.exports = router;
