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
    const { title, category, description, videoUrl, link, caseStudy, featured } = req.body;

    // Helper function to get file path (Cloudinary returns full URL in file.path, local storage needs /uploads/ prefix)
    const getFilePath = (file) => {
        // If file.path exists and starts with http, it's a Cloudinary URL
        if (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://'))) {
            return file.path;
        }
        // Otherwise, it's local storage - use /uploads/ prefix
        return `/uploads/${file.filename}`;
    };

    const thumbnail = req.files?.thumbnail ? getFilePath(req.files.thumbnail[0]) : null;
    const images = req.files?.images ? req.files.images.map(file => getFilePath(file)) : [];
    const videos = req.files?.videos ? req.files.videos.map(file => getFilePath(file)) : [];

    try {
        const portfolio = new Portfolio({
            title,
            category,
            description,
            thumbnail: thumbnail || (images.length > 0 ? images[0] : null), // Auto-select first image if no thumbnail
            images,
            videos,
            videoUrl,
            link,
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
    const { title, category, description, videoUrl, link, caseStudy, featured } = req.body;

    // Helper function to get file path (Cloudinary returns full URL in file.path, local storage needs /uploads/ prefix)
    const getFilePath = (file) => {
        // If file.path exists and starts with http, it's a Cloudinary URL
        if (file.path && (file.path.startsWith('http://') || file.path.startsWith('https://'))) {
            return file.path;
        }
        // Otherwise, it's local storage - use /uploads/ prefix
        return `/uploads/${file.filename}`;
    };

    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (portfolio) {
            portfolio.title = title || portfolio.title;
            portfolio.category = category || portfolio.category;
            portfolio.description = description || portfolio.description;
            portfolio.videoUrl = videoUrl || portfolio.videoUrl;
            portfolio.link = link || portfolio.link;
            portfolio.caseStudy = caseStudy || portfolio.caseStudy;
            portfolio.featured = featured !== undefined ? featured === 'true' : portfolio.featured;

            // Update thumbnail if provided
            if (req.files?.thumbnail) {
                portfolio.thumbnail = getFilePath(req.files.thumbnail[0]);
            }

            // Add new images if provided
            if (req.files?.images) {
                const newImages = req.files.images.map(file => getFilePath(file));
                portfolio.images = [...portfolio.images, ...newImages];
            }

            // Add new videos if provided
            if (req.files?.videos) {
                const newVideos = req.files.videos.map(file => getFilePath(file));
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
