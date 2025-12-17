const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "your-gemini-api-key");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// POST endpoint for AI text generation (Gemini)
router.post("/chatboat", async (req, res) => {
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
    // Fallback response if Gemini API fails
    res.json({
      success: false,
      error: "Failed to generate AI response. Please check your Gemini API key.",
      details: error.message
    });
  }
});

// POST endpoint for estimate
router.post("/estimate", async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }

    const prompt = `
      Estimate yield and suggestions based on the following details for Indian farming conditions.
      Return only valid JSON format without markdown or explanations.
      Keep each answer concise (max 30 words).
      {
        "Estimated_yield": "{your_data}",
        "Water_required": "{your_data}",
        "Diseases": "{your_data}",
        "Fertilizer": "{your_data}",
        "Remark": "{your_data}",
        "Estimated_Sales":"Rupees {your_data_number}",
        "Estimated_cost":"Rupees {your_data_number}"
      }

      Crop Details:
      - Crop Type: ${data.cropType}
      - Land Area: ${data.landArea}
      - Water Availability: ${data.waterAvailability}
      - Soil Type: ${data.soilType}
      - Fertilizer Type: ${data.fertilizerType}
      - Expected Yield: ${data.expectedYield}
      - Additional Info: ${data.additionalInfo}
    `;

    const response = await model.generateContent(prompt);
    const aiResponse = await response.response;
    let result = aiResponse.text();

    result = result.replace(/```json|```/g, "").trim();

    try {
      result = JSON.parse(result);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({
        success: false,
        error:
          "Failed to parse AI response into JSON. AI may have returned unexpected formatting.",
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error generating AI response:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate AI response",
    });
  }
});

// POST endpoint for crop data
router.post("/crop_data", async (req, res) => {
  try {
    const { crop } = req.body;

    if (!crop) {
      return res.status(400).json({ error: "Crop name is required" });
    }

    const prompt = `
      Provide agricultural data for the crop: ${crop}.
      Return only valid JSON format without markdown or explanations.
      Follow this structure:
      {
        "duration": "{growth duration in days}",
        "waterSchedule": [
          { "day": {day_number}, "amount": "{water amount}" }
        ],
        "fertilizerSchedule": [
          { "day": {day_number}, "type": "{fertilizer type}", "amount": "{amount}" }
        ],
        "stages": [
          { "name": "{stage name}", "day": {day_number} }
        ]
      }
    `;

    const response = await model.generateContent(prompt);
    const aiResponse = await response.response;
    let result = aiResponse.text();

    result = result.replace(/```json|```/g, "").trim();

    try {
      result = JSON.parse(result);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({
        success: false,
        error:
          "Failed to parse AI response into JSON. AI may have returned unexpected formatting.",
      });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error generating crop data:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate crop data",
    });
  }
});

module.exports = router;
