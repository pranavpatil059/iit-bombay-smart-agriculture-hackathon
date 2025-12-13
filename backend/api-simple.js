const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyAWcZTr-oWxedU6smo_52p11gak27kJp8w");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Basic health check
app.get('/', (req, res) => {
    res.json({ 
        message: 'IIT Bombay Smart Agriculture Backend is running!', 
        status: 'success',
        timestamp: new Date().toISOString()
    });
});

// AI Chatbot endpoint
app.post('/api/ai/chatboat', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Add agriculture context to prompt
        const agriculturePrompt = `You are an expert agricultural assistant for Indian farmers. 
        Answer in simple Hindi/English mix that farmers can understand. 
        Focus on practical, actionable advice for Indian farming conditions.
        
        Question: ${prompt}`;

        const result = await model.generateContent(agriculturePrompt);
        const response = await result.response;
        const text = response.text();

        res.json({ success: true, data: text });
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate AI response",
            details: error.message
        });
    }
});

// Health check for AI
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        gemini: process.env.GEMINI_API_KEY ? 'configured' : 'missing',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 8080;

// For Railway deployment
if (process.env.RAILWAY_ENVIRONMENT) {
    module.exports = app;
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}