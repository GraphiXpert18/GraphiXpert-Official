const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: String,
    serviceType: String,
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'completed', 'archived'],
        default: 'new',
    },
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
