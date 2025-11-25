const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

const adminUser = {
    username: 'Admin',
    email: 'rajaaysha78@gmail.com',
    password: 'admin',
    role: 'admin'
};

async function seedAdmin() {
    try {
        // Check if admin already exists
        const existing = await User.findOne({ email: adminUser.email });

        if (existing) {
            console.log('Admin user already exists.');
        } else {
            const user = new User(adminUser);
            await user.save();
            console.log('Admin user created successfully!');
            console.log('Email:', adminUser.email);
            console.log('Password:', adminUser.password);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}

seedAdmin();
