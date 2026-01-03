const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/v1/projects
// @access  Public
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ isActive: true });
        res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create project
// @route   POST /api/v1/projects
// @access  Private (PROJECT_CREATE)
exports.createProject = async (req, res) => {
    try {
        let projectData = req.body;

        if (req.files && req.files.length > 0) {
            projectData.imageUrls = req.files.map(file => file.path);
        }

        const project = await Project.create(projectData);

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update project
// @route   PUT /api/v1/projects/:id
// @access  Private (PROJECT_UPDATE)
exports.updateProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        let updateData = req.body;

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => file.path);
            // Logic to append or replace? Usually replace or explicit append. 
            // For simplicity, we'll append if desired, or replace. 
            // Let's assume we replace the list if new files are uploaded, 
            // or the frontend sends a mix.
            // Simplified: Replace all images with new ones if uploaded.
            updateData.imageUrls = newImages;
        }

        project = await Project.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete project
// @route   DELETE /api/v1/projects/:id
// @access  Private (PROJECT_DELETE)
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        await project.deleteOne();

        res.status(200).json({ success: true, message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
