const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('Auth Middleware: Token received:', token.substring(0, 10) + '...');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Auth Middleware: Decoded ID:', decoded.id);
            req.user = await User.findById(decoded.id).select('-password');
            console.log('Auth Middleware: User found:', req.user ? req.user.email : 'No user');
            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('Auth Middleware: No token provided in headers');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };
