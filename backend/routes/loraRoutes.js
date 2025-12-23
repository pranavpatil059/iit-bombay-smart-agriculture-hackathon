const express = require('express');
const router = express.Router();

// In-memory storage for demo (use database in production)
let loraDevices = [];
let loraData = [];

// Simulate LoRa device data
const generateLoraDevices = () => {
  return [
    {
      id: 'LORA001',
      name: 'Leopard Collar Alpha',
      deviceType: 'wildlife_collar',
      frequency: '868MHz',
      location: { lat: 18.5204, lng: 73.8567 },
      distance: 2.3,
      signal: -65,
      battery: 85,
      lastSeen: new Date().toISOString(),
      status: 'active',
      animalType: 'leopard',
      collarId: 'LC-001'
    },
    {
      id: 'LORA002',
      name: 'Tiger Collar Beta',
      deviceType: 'wildlife_collar',
      frequency: '868MHz',
      location: { lat: 18.5304, lng: 73.8667 },
      distance: 4.7,
      signal: -78,
      battery: 72,
      lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      status: 'active',
      animalType: 'tiger',
      collarId: 'TC-002'
    },
    {
      id: 'LORA003',
      name: 'Bear Collar Gamma',
      deviceType: 'wildlife_collar',
      frequency: '868MHz',
      location: { lat: 18.5104, lng: 73.8467 },
      distance: 1.8,
      signal: -58,
      battery: 91,
      lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      status: 'active',
      animalType: 'bear',
      collarId: 'BC-003'
    },
    {
      id: 'LORA004',
      name: 'Camera Trap Station 1',
      deviceType: 'camera_trap',
      frequency: '868MHz',
      location: { lat: 18.5404, lng: 73.8767 },
      distance: 3.2,
      signal: -70,
      battery: 65,
      lastSeen: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      status: 'active',
      animalType: 'sensor',
      collarId: 'CT-004'
    },
    {
      id: 'LORA005',
      name: 'Motion Sensor Hub',
      deviceType: 'motion_sensor',
      frequency: '868MHz',
      location: { lat: 18.5004, lng: 73.8367 },
      distance: 5.1,
      signal: -82,
      battery: 88,
      lastSeen: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
      status: 'active',
      animalType: 'sensor',
      collarId: 'MS-005'
    }
  ];
};

// GET /api/lora/devices - Get all LoRa devices
router.get('/devices', async (req, res) => {
  try {
    const { range, deviceType, status } = req.query;
    
    let devices = generateLoraDevices();
    
    // Filter by range
    if (range) {
      const maxRange = parseFloat(range);
      devices = devices.filter(device => device.distance <= maxRange);
    }
    
    // Filter by device type
    if (deviceType) {
      devices = devices.filter(device => device.deviceType === deviceType);
    }
    
    // Filter by status
    if (status) {
      devices = devices.filter(device => device.status === status);
    }
    
    // Sort by distance (closest first)
    devices.sort((a, b) => a.distance - b.distance);
    
    res.json({
      success: true,
      devices,
      total: devices.length,
      timestamp: new Date().toISOString(),
      network: {
        frequency: '868MHz',
        protocol: 'LoRaWAN',
        maxRange: '15km',
        activeGateways: 3
      }
    });
    
  } catch (error) {
    console.error('Error fetching LoRa devices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LoRa devices'
    });
  }
});

// GET /api/lora/scan - Scan for nearby LoRa devices
router.get('/scan', async (req, res) => {
  try {
    const { lat, lng, range = 15 } = req.query;
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let devices = generateLoraDevices();
    
    // If coordinates provided, calculate distances
    if (lat && lng) {
      const userLat = parseFloat(lat);
      const userLng = parseFloat(lng);
      
      devices = devices.map(device => {
        // Simple distance calculation (for demo)
        const distance = Math.sqrt(
          Math.pow(device.location.lat - userLat, 2) + 
          Math.pow(device.location.lng - userLng, 2)
        ) * 111; // Convert to km
        
        return {
          ...device,
          distance: Math.round(distance * 10) / 10,
          signal: -50 - Math.round(distance * 5) // Simulate signal degradation
        };
      });
    }
    
    // Filter by range
    devices = devices.filter(device => device.distance <= parseFloat(range));
    
    res.json({
      success: true,
      devices,
      scanResult: {
        devicesFound: devices.length,
        scanRange: `${range}km`,
        scanTime: '2.3s',
        frequency: '868MHz',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Error scanning LoRa devices:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to scan LoRa devices'
    });
  }
});

// GET /api/lora/device/:id - Get specific device data
router.get('/device/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const devices = generateLoraDevices();
    const device = devices.find(d => d.id === id);
    
    if (!device) {
      return res.status(404).json({
        success: false,
        message: 'LoRa device not found'
      });
    }
    
    // Generate historical data for the device
    const historicalData = [];
    for (let i = 0; i < 24; i++) {
      historicalData.push({
        timestamp: new Date(Date.now() - i * 60 * 60 * 1000).toISOString(),
        signal: device.signal + Math.random() * 10 - 5,
        battery: Math.max(0, device.battery - i * 0.5),
        location: {
          lat: device.location.lat + (Math.random() - 0.5) * 0.01,
          lng: device.location.lng + (Math.random() - 0.5) * 0.01
        }
      });
    }
    
    res.json({
      success: true,
      device: {
        ...device,
        historicalData: historicalData.reverse()
      }
    });
    
  } catch (error) {
    console.error('Error fetching device data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch device data'
    });
  }
});

// POST /api/lora/send-command - Send command to LoRa device
router.post('/send-command', async (req, res) => {
  try {
    const { deviceId, command, parameters } = req.body;
    
    if (!deviceId || !command) {
      return res.status(400).json({
        success: false,
        message: 'Device ID and command are required'
      });
    }
    
    // Simulate command sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const commandResult = {
      deviceId,
      command,
      parameters: parameters || {},
      status: 'sent',
      timestamp: new Date().toISOString(),
      acknowledgment: 'received',
      responseTime: '1.2s'
    };
    
    console.log('📡 LoRa Command Sent:', commandResult);
    
    res.json({
      success: true,
      message: 'Command sent successfully',
      result: commandResult
    });
    
  } catch (error) {
    console.error('Error sending LoRa command:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send command'
    });
  }
});

// GET /api/lora/network-status - Get LoRa network status
router.get('/network-status', async (req, res) => {
  try {
    const networkStatus = {
      status: 'online',
      frequency: '868MHz',
      protocol: 'LoRaWAN 1.0.3',
      gateways: [
        {
          id: 'GW001',
          name: 'Main Gateway',
          location: { lat: 18.5204, lng: 73.8567 },
          status: 'online',
          connectedDevices: 12,
          signalStrength: -45
        },
        {
          id: 'GW002',
          name: 'Forest Gateway',
          location: { lat: 18.5404, lng: 73.8767 },
          status: 'online',
          connectedDevices: 8,
          signalStrength: -52
        },
        {
          id: 'GW003',
          name: 'Mountain Gateway',
          location: { lat: 18.5004, lng: 73.8367 },
          status: 'online',
          connectedDevices: 5,
          signalStrength: -58
        }
      ],
      totalDevices: 25,
      activeDevices: 23,
      networkCoverage: '95%',
      dataRate: 'SF7BW125',
      lastUpdate: new Date().toISOString()
    };
    
    res.json({
      success: true,
      network: networkStatus
    });
    
  } catch (error) {
    console.error('Error fetching network status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch network status'
    });
  }
});

// POST /api/lora/register-device - Register new LoRa device
router.post('/register-device', async (req, res) => {
  try {
    const { deviceId, name, deviceType, frequency, location } = req.body;
    
    if (!deviceId || !name || !deviceType) {
      return res.status(400).json({
        success: false,
        message: 'Device ID, name, and type are required'
      });
    }
    
    const newDevice = {
      id: deviceId,
      name,
      deviceType,
      frequency: frequency || '868MHz',
      location: location || { lat: 0, lng: 0 },
      distance: 0,
      signal: -60,
      battery: 100,
      lastSeen: new Date().toISOString(),
      status: 'registered',
      registeredAt: new Date().toISOString()
    };
    
    // In production, save to database
    loraDevices.push(newDevice);
    
    console.log('📡 New LoRa Device Registered:', newDevice);
    
    res.json({
      success: true,
      message: 'Device registered successfully',
      device: newDevice
    });
    
  } catch (error) {
    console.error('Error registering device:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register device'
    });
  }
});

// GET /api/lora/analytics - Get LoRa network analytics
router.get('/analytics', async (req, res) => {
  try {
    const analytics = {
      deviceStats: {
        total: 25,
        active: 23,
        inactive: 2,
        lowBattery: 3
      },
      deviceTypes: {
        wildlife_collar: 15,
        camera_trap: 6,
        motion_sensor: 4
      },
      signalQuality: {
        excellent: 12,
        good: 8,
        fair: 3,
        poor: 2
      },
      batteryLevels: {
        high: 18,
        medium: 5,
        low: 2
      },
      networkPerformance: {
        uptime: '99.8%',
        packetLoss: '0.2%',
        averageLatency: '1.2s',
        dataTransmitted: '2.4GB'
      },
      recentActivity: [
        {
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          event: 'Device LORA001 location update',
          deviceId: 'LORA001',
          type: 'location'
        },
        {
          timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          event: 'Low battery alert from LORA004',
          deviceId: 'LORA004',
          type: 'alert'
        },
        {
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          event: 'New device LORA005 registered',
          deviceId: 'LORA005',
          type: 'registration'
        }
      ]
    };
    
    res.json({
      success: true,
      analytics,
      generatedAt: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

module.exports = router;