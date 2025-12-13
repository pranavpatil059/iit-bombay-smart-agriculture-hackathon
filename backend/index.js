require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Load routes with error handling
let farmerRoutes, sellerRoutes, landRoutes, airoute, paymentRoutes, emailroute, tokenRoutes, work;

try {
    farmerRoutes = require('./routes/farmerRoutes');
    sellerRoutes = require('./routes/sellerRoute');
    landRoutes = require('./routes/landRoutes');
    airoute = require("./routes/airoutes");
    paymentRoutes = require('./routes/payment');
    emailroute = require("./routes/emailRoutes");
    tokenRoutes = require("./routes/tokenRoutes");
    work = require("./routes/workroutes");
} catch (error) {
    console.error('Error loading routes:', error.message);
}

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/agriculture';

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Basic health check route
app.get('/', (req, res) => {
    res.json({ 
        message: 'IIT Bombay Smart Agriculture Backend is running!', 
        status: 'success',
        timestamp: new Date().toISOString()
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
    app.use('/api/farmers', farmerRoutes);
    app.use('/api/sellers', sellerRoutes);
    app.use('/api/land', landRoutes);
    app.use("/api/email", emailroute);
    app.use("/api/ai", airoute);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/tokens', tokenRoutes);
    app.use('/api/work', work);
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


const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
