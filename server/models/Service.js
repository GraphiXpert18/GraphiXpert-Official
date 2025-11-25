const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    features: [String],
    deliverables: [String],
    timeline: String,
    priceRange: String,
    image: String, // URL/Path to image
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
