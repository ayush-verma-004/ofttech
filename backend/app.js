const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
// Note: In server.js we usually load dotenv before requiring app, but for safety we can load here too or ensure server.js does it.
// We will rely on server.js or the script to load dotenv, but adding it here is safer if app is imported elsewhere.
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Connect to Database
// connectDB is called in server.js usually to avoid connecting during tests, but here we can call it if we want. 
// However, the best practice is to separate connection logic or call it in server.js.
// Given the previous setup code, I'll export a function or just leave it. 
// Let's call it here for simplicity as per common patterns, or better, invoke it in server.js.
// I'll actually NOT call connectDB here to keep app.js testable without DB, but for this project 
// calling it here is fine or I can export it. 
// The previous code snippet had it called. I will move the call to server.js for better design.

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to OFTTECH Backend API', status: 'Running' });
});

// Routes
const path = require('path');

// ... existing routes ...
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/members', require('./routes/memberRoutes'));
app.use('/api/v1/about', require('./routes/aboutRoutes'));
app.use('/api/v1/careers', require('./routes/careerRoutes'));
app.use('/api/v1/projects', require('./routes/projectRoutes'));
app.use('/api/v1/services', require('./routes/serviceRoutes'));
app.use('/api/v1/general', require('./routes/generalInfoRoutes'));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../portfolio/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../portfolio/dist', 'index.html'));
    });
}

module.exports = app;
