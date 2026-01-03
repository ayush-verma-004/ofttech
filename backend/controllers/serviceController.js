const Service = require('../models/Service');

// @desc    Get all services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ order: 1 });
        res.status(200).json({ success: true, count: services.length, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Create service
// @route   POST /api/v1/services
// @access  Private (SERVICE_UPDATE) - Using a generic update permission or specific create
// We'll use SERVICE_UPDATE for simplicity or assume a SERVICE_MANAGE permission
exports.createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update service
// @route   PUT /api/v1/services/:id
// @access  Private (SERVICE_UPDATE)
exports.updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete service
// @route   DELETE /api/v1/services/:id
// @access  Private (SERVICE_UPDATE)
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.status(200).json({ success: true, message: 'Service removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
