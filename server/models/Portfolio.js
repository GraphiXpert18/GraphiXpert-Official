const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: String,
    thumbnail: String, // Main thumbnail image for 16:9 display (optional, auto-selects first image)
    images: [String], // Array of image URLs
    videos: [String], // Array of video URLs
    videoUrl: String, // External video URL (YouTube, Vimeo, etc.)
    caseStudy: String,
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
