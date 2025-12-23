const express = require('express');
const router = express.Router();
const { sendFeedbackEmail } = require('../services/emailService');

// In-memory storage for demo (use database in production)
let feedbackData = [];

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const {
      rating,
      category,
      message,
      name,
      location,
      cropType,
      phoneModel,
      deviceInfo
    } = req.body;

    // Validate required fields
    if (!rating || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'Rating, category, and message are required'
      });
    }

    // Create feedback entry
    const feedback = {
      id: Date.now().toString(),
      rating: parseInt(rating),
      category,
      message,
      name: name || 'Anonymous',
      location: location || 'Not specified',
      cropType: cropType || 'Not specified',
      phoneModel: phoneModel || 'Not specified',
      deviceInfo: deviceInfo || {},
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    // Store feedback
    feedbackData.push(feedback);

    // Send email notification
    try {
      await sendFeedbackEmail(feedback);
      console.log('📧 Email notification sent to pranavpatil25122005@gmail.com');
    } catch (emailError) {
      console.error('📧 Email sending failed:', emailError);
      // Continue even if email fails
    }

    // Log for demo purposes
    console.log('📝 New Farmer Feedback Received:');
    console.log(`⭐ Rating: ${feedback.rating}/5`);
    console.log(`📂 Category: ${feedback.category}`);
    console.log(`👤 Farmer: ${feedback.name} from ${feedback.location}`);
    console.log(`🌾 Crop: ${feedback.cropType}`);
    console.log(`📱 Device: ${feedback.phoneModel}`);
    console.log(`💬 Message: ${feedback.message}`);
    console.log(`📊 Screen: ${deviceInfo.screenWidth}px`);
    console.log('---');

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      feedbackId: feedback.id
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all feedback (for admin dashboard)
router.get('/feedback', async (req, res) => {
  try {
    const { category, rating, limit = 50 } = req.query;
    
    let filteredFeedback = [...feedbackData];
    
    // Filter by category
    if (category) {
      filteredFeedback = filteredFeedback.filter(f => f.category === category);
    }
    
    // Filter by rating
    if (rating) {
      filteredFeedback = filteredFeedback.filter(f => f.rating >= parseInt(rating));
    }
    
    // Sort by timestamp (newest first)
    filteredFeedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Limit results
    filteredFeedback = filteredFeedback.slice(0, parseInt(limit));

    res.json({
      success: true,
      feedback: filteredFeedback,
      total: feedbackData.length,
      filtered: filteredFeedback.length
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get feedback statistics
router.get('/feedback/stats', async (req, res) => {
  try {
    const stats = {
      total: feedbackData.length,
      averageRating: feedbackData.length > 0 
        ? (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)
        : 0,
      categoryBreakdown: {},
      ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      deviceBreakdown: {},
      recentFeedback: feedbackData
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
    };

    // Calculate category breakdown
    feedbackData.forEach(f => {
      stats.categoryBreakdown[f.category] = (stats.categoryBreakdown[f.category] || 0) + 1;
      stats.ratingBreakdown[f.rating]++;
      
      const deviceType = f.deviceInfo?.screenWidth < 360 ? 'Basic Phone' : 
                        f.deviceInfo?.screenWidth < 640 ? 'Mid-Range Phone' : 'High-End Phone';
      stats.deviceBreakdown[deviceType] = (stats.deviceBreakdown[deviceType] || 0) + 1;
    });

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update feedback status (for admin)
router.patch('/feedback/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const feedbackIndex = feedbackData.findIndex(f => f.id === id);
    
    if (feedbackIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    feedbackData[feedbackIndex].status = status;
    feedbackData[feedbackIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Feedback status updated',
      feedback: feedbackData[feedbackIndex]
    });

  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;