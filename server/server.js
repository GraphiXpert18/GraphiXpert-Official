const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Configure CORS to allow requests from the client
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Configure helmet with relaxed cross-origin policy for images
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('GraphiXpert API is running');
});

// Import Routes
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const portfolioRoutes = require('./routes/portfolio');
const enquiryRoutes = require('./routes/enquiries');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/enquiries', enquiryRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
