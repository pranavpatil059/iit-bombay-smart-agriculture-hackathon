const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI("AIzaSyAWcZTr-oWxedU6smo_52p11gak27kJp8w");
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const agriculturePrompt = `You are an expert agricultural assistant for Indian farmers. 
        Answer in simple Hindi/English mix that farmers can understand. 
        Focus on practical, actionable advice for Indian farming conditions.
        
        Question: ${prompt}`;

        const result = await model.generateContent(agriculturePrompt);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ success: true, data: text });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate AI response",
            details: error.message
        });
    }
};