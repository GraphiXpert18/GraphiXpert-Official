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
    email: 'graphixpert18@gmail.com',
    password: 'graphi@18xpert',
    role: 'admin'
};

async function seedAdmin() {
    try {
        // Check if admin already exists by username or email
        const existing = await User.findOne({
            $or: [{ email: adminUser.email }, { username: adminUser.username }]
        });

        if (existing) {
            console.log('Admin user already exists. Updating credentials...');
            existing.email = adminUser.email;
            existing.password = adminUser.password;
            await existing.save();
            console.log('Admin credentials updated successfully!');
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
