const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Portfolio = require('./models/Portfolio');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const portfolioData = {
    title: 'Graphic Design',
    description: 'Proud to share my latest freelance project for a beauty parlour! I designed a Banner, Business card, and poster, logo to give their brand a fresh and professional look.',
    category: 'Graphic Design',
    images: [
        '/uploads/portfolio/haniya-beauty-1.jpg',
        '/uploads/portfolio/haniya-beauty-2.jpg',
        '/uploads/portfolio/haniya-beauty-3.jpg',
        '/uploads/portfolio/haniya-beauty-4.jpg',
        '/uploads/portfolio/haniya-beauty-5.jpg'
    ],
    featured: true
};

async function seedPortfolio() {
    try {
        // Check if project already exists
        const existing = await Portfolio.findOne({ title: 'Graphic Design' });

        if (existing) {
            console.log('Portfolio project already exists. Updating...');
            await Portfolio.findByIdAndUpdate(existing._id, portfolioData);
            console.log('Portfolio project updated successfully!');
        } else {
            const portfolio = new Portfolio(portfolioData);
            await portfolio.save();
            console.log('Portfolio project added successfully!');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error adding portfolio:', error);
        process.exit(1);
    }
}

seedPortfolio();
