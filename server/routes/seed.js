const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Seed admin user endpoint (for deployment only)
// This endpoint should be removed or protected after initial setup
router.get('/seed-admin', async (req, res) => {
    try {
        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'rajaaysha78@gmail.com' });

        if (existingAdmin) {
            return res.status(400).json({
                message: 'Admin user already exists',
                email: 'rajaaysha78@gmail.com'
            });
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin', 10);

        const adminUser = new User({
            name: 'Admin',
            email: 'rajaaysha78@gmail.com',
            password: hashedPassword,
            role: 'admin'
        });

        await adminUser.save();

        res.status(201).json({
            message: 'Admin user created successfully',
            email: 'rajaaysha78@gmail.com',
            note: 'Please change the password after first login'
        });
    } catch (error) {
        console.error('Error seeding admin:', error);
        res.status(500).json({
            message: 'Error creating admin user',
            error: error.message
        });
    }
});

module.exports = router;
