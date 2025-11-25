const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @desc    Fetch all portfolio items
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
    try {
        const portfolio = await Portfolio.find({});
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Fetch single portfolio item by ID
// @route   GET /api/portfolio/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ message: 'Portfolio item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
router.post('/', protect, admin, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]), async (req, res) => {
    const { title, category, description, videoUrl, caseStudy, featured } = req.body;

    const thumbnail = req.files?.thumbnail ? `/uploads/${req.files.thumbnail[0].filename}` : null;
    const images = req.files?.images ? req.files.images.map(file => `/uploads/${file.filename}`) : [];
    const videos = req.files?.videos ? req.files.videos.map(file => `/uploads/${file.filename}`) : [];

    try {
        const portfolio = new Portfolio({
            title,
            category,
            description,
            thumbnail: thumbnail || (images.length > 0 ? images[0] : null), // Auto-select first image if no thumbnail
            images,
            videos,
            videoUrl,
            caseStudy,
            featured: featured === 'true',
        });

        const createdPortfolio = await portfolio.save();
        res.status(201).json(createdPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
router.put('/:id', protect, admin, upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 }
]), async (req, res) => {
    const { title, category, description, videoUrl, caseStudy, featured } = req.body;

    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (portfolio) {
            portfolio.title = title || portfolio.title;
            portfolio.category = category || portfolio.category;
            portfolio.description = description || portfolio.description;
            portfolio.videoUrl = videoUrl || portfolio.videoUrl;
            portfolio.caseStudy = caseStudy || portfolio.caseStudy;
            portfolio.featured = featured !== undefined ? featured === 'true' : portfolio.featured;

            // Update thumbnail if provided
            if (req.files?.thumbnail) {
                portfolio.thumbnail = `/uploads/${req.files.thumbnail[0].filename}`;
            }

            // Add new images if provided
            if (req.files?.images) {
                const newImages = req.files.images.map(file => `/uploads/${file.filename}`);
                portfolio.images = [...portfolio.images, ...newImages];
            }

            // Add new videos if provided
            if (req.files?.videos) {
                const newVideos = req.files.videos.map(file => `/uploads/${file.filename}`);
                portfolio.videos = [...(portfolio.videos || []), ...newVideos];
            }

            // Auto-select first image as thumbnail if no thumbnail exists
            if (!portfolio.thumbnail && portfolio.images.length > 0) {
                portfolio.thumbnail = portfolio.images[0];
            }

            const updatedPortfolio = await portfolio.save();
            res.json(updatedPortfolio);
        } else {
            res.status(404).json({ message: 'Portfolio item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (portfolio) {
            await portfolio.deleteOne();
            res.json({ message: 'Portfolio item removed' });
        } else {
            res.status(404).json({ message: 'Portfolio item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
