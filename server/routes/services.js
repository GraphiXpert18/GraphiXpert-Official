const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
    try {
        const services = await Service.find({});
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.json(service);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
    const { title, description, features, deliverables, timeline, priceRange } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    try {
        const service = new Service({
            title,
            description,
            features: features ? features.split(',') : [],
            deliverables: deliverables ? deliverables.split(',') : [],
            timeline,
            priceRange,
            image,
        });

        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
    const { title, description, features, deliverables, timeline, priceRange } = req.body;

    try {
        const service = await Service.findById(req.params.id);

        if (service) {
            service.title = title || service.title;
            service.description = description || service.description;
            service.features = features ? features.split(',') : service.features;
            service.deliverables = deliverables ? deliverables.split(',') : service.deliverables;
            service.timeline = timeline || service.timeline;
            service.priceRange = priceRange || service.priceRange;
            if (req.file) {
                service.image = `/uploads/${req.file.filename}`;
            }

            const updatedService = await service.save();
            res.json(updatedService);
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (service) {
            await service.deleteOne();
            res.json({ message: 'Service removed' });
        } else {
            res.status(404).json({ message: 'Service not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
