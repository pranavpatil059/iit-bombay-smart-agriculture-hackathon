require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Load routes with error handling
let airoute, techRoutes, hackathonRoutes, wildlifeRoutes, internationalFeaturesRoutes, farmLoansRoutes;

try {
    airoute = require("./routes/airoutes");
    techRoutes = require("./routes/techRoutes");
    wildlifeRoutes = require("./routes/enhancedWildlifeRoutes");
    hackathonRoutes = require("./routes/hackathonRoutes");
    internationalFeaturesRoutes = require("./routes/internationalFeaturesRoutes");
    iotRoutes = require("./routes/iotRoutes");
} catch (error) {
    console.error('Error loading routes:', error.message);
}

// AWS Database Configuration
const mongoURI = process.env.MONGO_URI || process.env.AWS_DOCUMENTDB_URI || 'mongodb://localhost:27017/agriculture';

// AWS DynamoDB Configuration (Alternative)
const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Basic health check route
app.get('/', (req, res) => {
    res.json({ 
        message: 'IIT Bombay Smart Agriculture Backend is running!', 
        status: 'success',
        timestamp: new Date().toISOString(),
        hackathon: 'IIT Bombay AWS X Impact Challenge 2025',
        features: [
            'Smart Agriculture Platform',
            'FarmShield Pro - Wildlife Protection AI',
            '3D Weather Analytics',
            'Crop Health Detection',
            'Market Intelligence'
        ],
        apis: [
            '/api/wildlife/risk-assessment/:district - Real-time risk for all 36 Maharashtra districts',
            '/api/wildlife/live-alerts - Live animal sighting alerts',
            '/api/wildlife/maharashtra-districts - All districts with real-time data',
            '/api/wildlife/all-animals - Complete animal database (14 species)',
            '/api/wildlife/live-tracking - Real-time animal movement tracking',
            '/api/international/computer-vision/analyze - AI Computer Vision Analysis',
            '/api/international/voice/process-command - Voice Recognition System',
            '/api/international/blockchain/verify-sighting - Blockchain Verification',
            '/api/international/iot/devices - IoT Device Management',
            '/api/international/ar/identify-wildlife - AR Wildlife Identification',
            '/api/international/global/statistics - Global Statistics',
            '/api/international/research/analytics - Research Analytics',
            '/api/ai - Smart Agriculture AI',
            '/api/tech - Technology Stack',
            '/api/hackathon - Hackathon Information',
            '/api/farm-loans/banks - Agricultural Bank Directory',
            '/api/farm-loans/calculate-emi - Loan EMI Calculator',
            '/api/farm-loans/schemes - Government Loan Schemes'
        ]
    });
});

// MongoDB Connection (✅ Fixed)
if (mongoURI && mongoURI !== 'mongodb://localhost:27017/agriculture') {
    mongoose.connect(
        mongoURI,
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err));
} else {
    console.log('⚠️ MongoDB URI not provided, running without database');
}

// Routes with error handling
try {
    if (airoute) app.use("/api/ai", airoute);
    if (techRoutes) app.use('/api/tech', techRoutes);
    if (hackathonRoutes) app.use('/api/hackathon', hackathonRoutes);
    if (wildlifeRoutes) app.use('/api/wildlife', wildlifeRoutes);
    if (internationalFeaturesRoutes) app.use('/api/international', internationalFeaturesRoutes);
    if (iotRoutes) {
        app.use('/api/iot', iotRoutes);
        console.log('✅ IoT routes loaded successfully');
    } else {
        console.log('⚠️ IoT routes not loaded');
    }
} catch (error) {
    console.error('Route loading error:', error);
}

// Catch all route for undefined endpoints
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found', 
        path: req.originalUrl,
        message: 'IIT Bombay Agriculture API - Route not found'
    });
});


const PORT = process.env.PORT || 3000;

// Start server (works for both local and production)
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Access the API at: http://localhost:${PORT}`);
    console.log(`✅ Ready to accept requests!`);
});

// Export for Vercel
module.exports = app;
