const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send feedback email
const sendFeedbackEmail = async (feedbackData) => {
  try {
    const transporter = createTransporter();
    
    const emailContent = `
    🌾 NEW FARMER FEEDBACK RECEIVED - IIT Bombay Smart Agriculture Platform
    
    ⭐ RATING: ${feedbackData.rating}/5 stars
    📂 CATEGORY: ${feedbackData.category}
    
    👤 FARMER DETAILS:
    • Name: ${feedbackData.name}
    • Location: ${feedbackData.location}
    • Crop Type: ${feedbackData.cropType}
    • Phone Model: ${feedbackData.phoneModel}
    
    📱 DEVICE INFO:
    • Screen Width: ${feedbackData.deviceInfo?.screenWidth}px
    • User Agent: ${feedbackData.deviceInfo?.userAgent}
    • Connection: ${feedbackData.deviceInfo?.connectionType || 'Unknown'}
    • Language: ${feedbackData.deviceInfo?.language}
    
    💬 FEEDBACK MESSAGE:
    ${feedbackData.message}
    
    🕒 TIMESTAMP: ${feedbackData.timestamp}
    📍 FEEDBACK ID: ${feedbackData.id}
    
    ---
    🌾 IIT Bombay Smart Agriculture Platform
    🔗 https://iit-bombay-agriculture-frontend-cdvv9bw9r.vercel.app
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@agriculture.com',
      to: 'pranavpatil25122005@gmail.com',
      subject: `🌾 New Farmer Feedback - ${feedbackData.rating}⭐ Rating - ${feedbackData.category}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background: linear-gradient(135deg, #4ade80, #3b82f6); padding: 20px; border-radius: 10px; color: white; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🌾 New Farmer Feedback</h1>
            <p style="margin: 5px 0 0 0;">IIT Bombay Smart Agriculture Platform</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <span style="font-size: 24px; margin-right: 10px;">⭐</span>
              <h2 style="margin: 0; color: #1f2937;">Rating: ${feedbackData.rating}/5 Stars</h2>
            </div>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
              <h3 style="margin: 0 0 10px 0; color: #374151;">📂 Category: ${feedbackData.category}</h3>
              <p style="margin: 0; font-size: 16px; line-height: 1.5; color: #4b5563;">${feedbackData.message}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
              <div>
                <h4 style="margin: 0 0 5px 0; color: #374151;">👤 Farmer Details</h4>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  <strong>Name:</strong> ${feedbackData.name}<br>
                  <strong>Location:</strong> ${feedbackData.location}<br>
                  <strong>Crop:</strong> ${feedbackData.cropType}
                </p>
              </div>
              <div>
                <h4 style="margin: 0 0 5px 0; color: #374151;">📱 Device Info</h4>
                <p style="margin: 0; font-size: 14px; color: #6b7280;">
                  <strong>Phone:</strong> ${feedbackData.phoneModel}<br>
                  <strong>Screen:</strong> ${feedbackData.deviceInfo?.screenWidth}px<br>
                  <strong>Language:</strong> ${feedbackData.deviceInfo?.language}
                </p>
              </div>
            </div>
            
            <div style="background: #e5f3ff; padding: 10px; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; font-size: 12px; color: #1e40af;">
                <strong>Feedback ID:</strong> ${feedbackData.id} | 
                <strong>Time:</strong> ${new Date(feedbackData.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 15px; background: white; border-radius: 10px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              🔗 <a href="https://iit-bombay-agriculture-frontend-cdvv9bw9r.vercel.app" style="color: #3b82f6; text-decoration: none;">Visit Platform</a> | 
              📊 <a href="https://iit-bombay-agriculture-backend-1a7w71yny.vercel.app/api/feedback/stats" style="color: #3b82f6; text-decoration: none;">View Stats</a>
            </p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Feedback email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error sending feedback email:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email to new farmers
const sendWelcomeEmail = async (farmerData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@agriculture.com',
      to: 'pranavpatil25122005@gmail.com',
      subject: `🌾 New Farmer Registration - ${farmerData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #22c55e;">🌾 New Farmer Registered!</h2>
          <p><strong>Name:</strong> ${farmerData.name}</p>
          <p><strong>Location:</strong> ${farmerData.location}</p>
          <p><strong>Crop Type:</strong> ${farmerData.cropType}</p>
          <p><strong>Phone:</strong> ${farmerData.phone}</p>
          <p><strong>Registration Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendFeedbackEmail,
  sendWelcomeEmail
};