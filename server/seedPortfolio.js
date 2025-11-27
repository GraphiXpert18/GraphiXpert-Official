const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const ProjectData = {
    title: 'Graphic Design',
    description: 'Proud to share my latest freelance project for a beauty parlour! I designed a Banner, Business card, and poster, logo to give their brand a fresh and professional look.',
    category: 'Graphic Design',
    images: [
        '/uploads/Project/haniya-beauty-1.jpg',
        '/uploads/Project/haniya-beauty-2.jpg',
        '/uploads/Project/haniya-beauty-3.jpg',
        '/uploads/Project/haniya-beauty-4.jpg',
        '/uploads/Project/haniya-beauty-5.jpg'
    ],
    featured: true
};

async function seedProject() {
    try {
        // Check if project already exists
        const existing = await Project.findOne({ title: 'Graphic Design' });

        if (existing) {
            console.log('Project project already exists. Updating...');
            await Project.findByIdAndUpdate(existing._id, ProjectData);
            console.log('Project project updated successfully!');
        } else {
            const Project = new Project(ProjectData);
            await Project.save();
            console.log('Project project added successfully!');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error adding Project:', error);
        process.exit(1);
    }
}

seedProject();
