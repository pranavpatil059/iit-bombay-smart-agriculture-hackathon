const express = require('express');
const router = express.Router();

// In-memory storage for latest sensor data (you can use MongoDB for persistence)
let latestSensorData = {
  soilMoisture: 0,
  temperature: 0,
  humidity: 0,
  timestamp: new Date().toISOString(),
  deviceId: null
};

// Store historical data (last 100 readings)
let sensorHistory = [];
const MAX_HISTORY = 100;

// POST endpoint - Raspberry Pi sends data here
router.post('/sensor-data', (req, res) => {
  try {
    const { soilMoisture, temperature, humidity, deviceId } = req.body;

    // Validate data
    if (soilMoisture === undefined) {
      return res.status(400).json({ 
        success: false, 
        error: 'soilMoisture is required' 
      });
    }

    // Update latest data
    latestSensorData = {
      soilMoisture: parseFloat(soilMoisture) || 0,
      temperature: parseFloat(temperature) || 0,
      humidity: parseFloat(humidity) || 0,
      timestamp: new Date().toISOString(),
      deviceId: deviceId || 'unknown'
    };

    // Add to history
    sensorHistory.push({ ...latestSensorData });
    
    // Keep only last 100 readings
    if (sensorHistory.length > MAX_HISTORY) {
      sensorHistory.shift();
    }

    console.log('📡 Received sensor data:', latestSensorData);

    res.json({ 
      success: true, 
      message: 'Data received successfully',
      data: latestSensorData
    });

  } catch (error) {
    console.error('Error receiving sensor data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process sensor data' 
    });
  }
});

// GET endpoint - Website fetches latest data
router.get('/sensor-data/latest', (req, res) => {
  res.json({
    success: true,
    data: latestSensorData
  });
});

// GET endpoint - Website fetches historical data
router.get('/sensor-data/history', (req, res) => {
  const limit = parseInt(req.query.limit) || 60;
  const history = sensorHistory.slice(-limit);
  
  res.json({
    success: true,
    count: history.length,
    data: history
  });
});

// GET endpoint - Health check
router.get('/health', (req, res) => {
  const lastUpdateAge = Date.now() - new Date(latestSensorData.timestamp).getTime();
  const isHealthy = lastUpdateAge < 60000; // Less than 1 minute old

  res.json({
    success: true,
    status: isHealthy ? 'healthy' : 'stale',
    lastUpdate: latestSensorData.timestamp,
    lastUpdateAge: `${Math.floor(lastUpdateAge / 1000)} seconds ago`,
    dataPoints: sensorHistory.length
  });
});

// DELETE endpoint - Clear history (for testing)
router.delete('/sensor-data/history', (req, res) => {
  sensorHistory = [];
  res.json({
    success: true,
    message: 'History cleared'
  });
});

module.exports = router;
