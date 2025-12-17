const express = require('express');
const router = express.Router();

// Sample data for transporters
const transporters = [
  {
    id: '1',
    name: 'राजेश ट्रांसपोर्ट',
    vehicleType: 'Truck (Tata 407)',
    capacity: '3 Tons',
    rating: 4.8,
    completedTrips: 245,
    pricePerKm: 12,
    phone: '+91-9876543210',
    location: 'Pune, Maharashtra',
    availability: 'Available',
    specializations: ['Vegetables', 'Fruits', 'Grains'],
    vehicleNumber: 'MH-12-AB-1234',
    experience: '8 years',
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: '2',
    name: 'किसान मित्र ट्रांसपोर्ट',
    vehicleType: 'Mini Truck (Mahindra Bolero)',
    capacity: '1.5 Tons',
    rating: 4.6,
    completedTrips: 189,
    pricePerKm: 10,
    phone: '+91-9876543211',
    location: 'Nashik, Maharashtra',
    availability: 'Available',
    specializations: ['Onions', 'Tomatoes', 'Potatoes'],
    vehicleNumber: 'MH-15-CD-5678',
    experience: '5 years',
    coordinates: { lat: 19.9975, lng: 73.7898 }
  },
  {
    id: '3',
    name: 'महाराष्ट्र कार्गो',
    vehicleType: 'Large Truck (Ashok Leyland)',
    capacity: '10 Tons',
    rating: 4.9,
    completedTrips: 567,
    pricePerKm: 18,
    phone: '+91-9876543212',
    location: 'Mumbai, Maharashtra',
    availability: 'Busy',
    specializations: ['Bulk Grains', 'Sugar', 'Cotton'],
    vehicleNumber: 'MH-01-EF-9012',
    experience: '12 years',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: '4',
    name: 'गुजरात एक्सप्रेस',
    vehicleType: 'Container Truck',
    capacity: '15 Tons',
    rating: 4.7,
    completedTrips: 423,
    pricePerKm: 22,
    phone: '+91-9876543213',
    location: 'Ahmedabad, Gujarat',
    availability: 'Available',
    specializations: ['Export Quality', 'Long Distance', 'Cold Storage'],
    vehicleNumber: 'GJ-01-AB-3456',
    experience: '10 years',
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: '5',
    name: 'दिल्ली फार्म ट्रांसपोर्ट',
    vehicleType: 'Refrigerated Truck',
    capacity: '5 Tons',
    rating: 4.8,
    completedTrips: 334,
    pricePerKm: 25,
    phone: '+91-9876543214',
    location: 'New Delhi',
    availability: 'Available',
    specializations: ['Perishables', 'Fruits', 'Dairy'],
    vehicleNumber: 'DL-01-CD-7890',
    experience: '7 years',
    coordinates: { lat: 28.7041, lng: 77.1025 }
  }
];

// Sample transport requests
const transportRequests = [
  {
    id: '1',
    cropType: 'Tomatoes',
    quantity: '2 Tons',
    pickupLocation: 'Baramati, Pune',
    dropLocation: 'Vashi Market, Navi Mumbai',
    preferredDate: '2024-12-15',
    distance: 145,
    estimatedCost: 1740,
    status: 'Open',
    farmerId: 'farmer123',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    cropType: 'Onions',
    quantity: '5 Tons',
    pickupLocation: 'Nashik',
    dropLocation: 'Delhi Mandi',
    preferredDate: '2024-12-16',
    distance: 1200,
    estimatedCost: 21600,
    status: 'Assigned',
    farmerId: 'farmer456',
    transporterId: '2',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    cropType: 'Wheat',
    quantity: '8 Tons',
    pickupLocation: 'Solapur, Maharashtra',
    dropLocation: 'Bangalore Market',
    preferredDate: '2024-12-17',
    distance: 450,
    estimatedCost: 8100,
    status: 'In Transit',
    farmerId: 'farmer789',
    transporterId: '3',
    createdAt: new Date().toISOString()
  }
];

// Live tracking data
let liveTrackingData = {
  'TRP001': {
    tripId: 'TRP001',
    driverName: 'राजेश कुमार',
    driverPhone: '+91-9876543210',
    driverRating: 4.8,
    vehicleNumber: 'MH-12-AB-1234',
    vehicleType: 'Tata 407 (3 Ton)',
    pickupLocation: 'Baramati Farm, Pune',
    dropLocation: 'Vashi Market, Navi Mumbai',
    estimatedTime: '2h 15m',
    distance: '145 km',
    fare: 2500,
    status: 'in-transit',
    currentLocation: {
      lat: 18.5204,
      lng: 73.8567,
      heading: 45,
      speed: 35,
      timestamp: new Date().toISOString()
    },
    route: [
      { lat: 18.1124, lng: 74.6505, name: 'Baramati (Start)' },
      { lat: 18.5204, lng: 73.8567, name: 'Current Location' },
      { lat: 19.0330, lng: 73.0297, name: 'Vashi (Destination)' }
    ]
  }
};

// Get all transporters
router.get('/transporters', (req, res) => {
  try {
    const { location, vehicleType, availability } = req.query;
    
    let filteredTransporters = [...transporters];
    
    if (location) {
      filteredTransporters = filteredTransporters.filter(t => 
        t.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (vehicleType) {
      filteredTransporters = filteredTransporters.filter(t => 
        t.vehicleType.toLowerCase().includes(vehicleType.toLowerCase())
      );
    }
    
    if (availability) {
      filteredTransporters = filteredTransporters.filter(t => 
        t.availability === availability
      );
    }
    
    res.json({
      success: true,
      data: filteredTransporters,
      total: filteredTransporters.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transporters',
      error: error.message
    });
  }
});

// Get transporter by ID
router.get('/transporters/:id', (req, res) => {
  try {
    const transporter = transporters.find(t => t.id === req.params.id);
    
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }
    
    res.json({
      success: true,
      data: transporter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transporter',
      error: error.message
    });
  }
});

// Get all transport requests
router.get('/requests', (req, res) => {
  try {
    const { status, farmerId } = req.query;
    
    let filteredRequests = [...transportRequests];
    
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    if (farmerId) {
      filteredRequests = filteredRequests.filter(r => r.farmerId === farmerId);
    }
    
    res.json({
      success: true,
      data: filteredRequests,
      total: filteredRequests.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching transport requests',
      error: error.message
    });
  }
});

// Create new transport request
router.post('/requests', (req, res) => {
  try {
    const {
      cropType,
      quantity,
      pickupLocation,
      dropLocation,
      preferredDate,
      vehicleType,
      farmerId
    } = req.body;
    
    // Calculate estimated distance and cost (simplified)
    const estimatedDistance = Math.floor(Math.random() * 500) + 50; // 50-550 km
    const pricePerKm = vehicleType?.includes('Large') ? 18 : 
                      vehicleType?.includes('Mini') ? 10 : 12;
    const estimatedCost = estimatedDistance * pricePerKm;
    
    const newRequest = {
      id: (transportRequests.length + 1).toString(),
      cropType,
      quantity,
      pickupLocation,
      dropLocation,
      preferredDate,
      distance: estimatedDistance,
      estimatedCost,
      status: 'Open',
      farmerId: farmerId || 'farmer' + Date.now(),
      createdAt: new Date().toISOString()
    };
    
    transportRequests.push(newRequest);
    
    res.status(201).json({
      success: true,
      message: 'Transport request created successfully',
      data: newRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating transport request',
      error: error.message
    });
  }
});

// Book a transporter
router.post('/book/:transporterId', (req, res) => {
  try {
    const { transporterId } = req.params;
    const { requestId, farmerId } = req.body;
    
    const transporter = transporters.find(t => t.id === transporterId);
    const request = transportRequests.find(r => r.id === requestId);
    
    if (!transporter) {
      return res.status(404).json({
        success: false,
        message: 'Transporter not found'
      });
    }
    
    if (transporter.availability !== 'Available') {
      return res.status(400).json({
        success: false,
        message: 'Transporter is not available'
      });
    }
    
    // Update request status
    if (request) {
      request.status = 'Assigned';
      request.transporterId = transporterId;
    }
    
    // Update transporter availability
    transporter.availability = 'Busy';
    
    res.json({
      success: true,
      message: 'Transporter booked successfully',
      data: {
        transporter,
        request,
        bookingId: 'BK' + Date.now()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error booking transporter',
      error: error.message
    });
  }
});

// Get live tracking data
router.get('/live-tracking/:tripId', (req, res) => {
  try {
    const { tripId } = req.params;
    const trackingData = liveTrackingData[tripId];
    
    if (!trackingData) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    
    // Simulate live location updates
    const now = new Date();
    trackingData.currentLocation.lat += (Math.random() - 0.5) * 0.001;
    trackingData.currentLocation.lng += (Math.random() - 0.5) * 0.001;
    trackingData.currentLocation.speed = 30 + Math.random() * 20;
    trackingData.currentLocation.timestamp = now.toISOString();
    
    res.json({
      success: true,
      data: trackingData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tracking data',
      error: error.message
    });
  }
});

// Update live location (for driver app)
router.post('/live-tracking/:tripId/location', (req, res) => {
  try {
    const { tripId } = req.params;
    const { lat, lng, speed, heading } = req.body;
    
    if (!liveTrackingData[tripId]) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }
    
    liveTrackingData[tripId].currentLocation = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      speed: parseFloat(speed) || 0,
      heading: parseFloat(heading) || 0,
      timestamp: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Location updated successfully',
      data: liveTrackingData[tripId].currentLocation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating location',
      error: error.message
    });
  }
});

// Get price estimation
router.post('/estimate-price', (req, res) => {
  try {
    const { pickupLocation, dropLocation, vehicleType, quantity } = req.body;
    
    // Simplified price calculation
    const baseDistance = Math.floor(Math.random() * 500) + 50; // 50-550 km
    const pricePerKm = vehicleType?.includes('Large') ? 18 : 
                      vehicleType?.includes('Mini') ? 10 : 12;
    
    const quantityMultiplier = parseFloat(quantity) || 1;
    const baseCost = baseDistance * pricePerKm;
    const totalCost = baseCost * (quantityMultiplier > 5 ? 1.2 : 1);
    
    const estimation = {
      distance: baseDistance,
      pricePerKm,
      baseCost,
      totalCost: Math.round(totalCost),
      estimatedTime: Math.round(baseDistance / 50) + ' hours',
      fuelCost: Math.round(baseDistance * 8),
      driverCharges: Math.round(baseCost * 0.3),
      taxes: Math.round(totalCost * 0.18)
    };
    
    res.json({
      success: true,
      data: estimation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error calculating price estimation',
      error: error.message
    });
  }
});

// Get transportation statistics
router.get('/statistics', (req, res) => {
  try {
    const stats = {
      totalTransporters: transporters.length,
      availableTransporters: transporters.filter(t => t.availability === 'Available').length,
      totalRequests: transportRequests.length,
      completedTrips: transporters.reduce((sum, t) => sum + t.completedTrips, 0),
      averageRating: (transporters.reduce((sum, t) => sum + t.rating, 0) / transporters.length).toFixed(1),
      totalDistance: '50,000+ km',
      activeCities: ['Mumbai', 'Pune', 'Nashik', 'Delhi', 'Ahmedabad', 'Bangalore'],
      vehicleTypes: [
        { type: 'Mini Truck', count: 2, capacity: '1-2 Tons' },
        { type: 'Medium Truck', count: 2, capacity: '3-5 Tons' },
        { type: 'Large Truck', count: 1, capacity: '10+ Tons' }
      ]
    };
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

module.exports = router;