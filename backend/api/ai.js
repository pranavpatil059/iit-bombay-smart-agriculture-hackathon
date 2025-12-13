export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Simple fallback response for now
        const responses = [
            "मैं आपकी खेती में मदद करने के लिए यहाँ हूँ। कृपया अपना सवाल पूछें।",
            "भारतीय कृषि के लिए मैं आपका सहायक हूँ। आप क्या जानना चाहते हैं?",
            "खेती-बाड़ी के बारे में पूछें, मैं आपकी मदद करूंगा।"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        return res.status(200).json({ 
            success: true, 
            data: `${randomResponse} आपका सवाल था: "${prompt}"` 
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to generate AI response"
        });
    }
}