const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Create an enquiry
// @route   POST /api/enquiries
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, phone, serviceType, message } = req.body;

    try {
        const enquiry = new Enquiry({
            name,
            email,
            phone,
            serviceType,
            message,
        });

        const createdEnquiry = await enquiry.save();
        res.status(201).json(createdEnquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const enquiries = await Enquiry.find({});
        res.json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    const { status } = req.body;

    try {
        const enquiry = await Enquiry.findById(req.params.id);

        if (enquiry) {
            enquiry.status = status || enquiry.status;
            const updatedEnquiry = await enquiry.save();
            res.json(updatedEnquiry);
        } else {
            res.status(404).json({ message: 'Enquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
