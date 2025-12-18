import React, { useState, useEffect } from 'react';

// Add custom CSS animations
const styles = `
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.6);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }

  .animate-slide-in {
    animation: slide-in 0.8s ease-out forwards;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
`;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Droplets, 
  Activity,
  RefreshCw,
  AlertCircle,
  Radio,
  Wifi,
  WifiOff,
  TrendingUp,
  TrendingDown,
  Minus,
  Sprout,
  Thermometer,
  CloudRain,
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area, 
  AreaChart,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';

const IoTMonitoring = () => {
  const [sensorData, setSensorData] = useState({
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    lastUpdate: new Date().toISOString(),
    deviceId: 'waiting...'
  });
  const [historyData, setHistoryData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [sortingStep, setSortingStep] = useState(0);
  const [sortedCrops, setSortedCrops] = useState([]);
  const [demoMode, setDemoMode] = useState(true); // Start in demo mode
  const [showComparison, setShowComparison] = useState(false);

  // Sample data for demo mode (7 readings)
  const demoData = [
    { time: '10:00', moisture: 58, timestamp: new Date().toISOString() },
    { time: '10:05', moisture: 62, timestamp: new Date().toISOString() },
    { time: '10:10', moisture: 65, timestamp: new Date().toISOString() },
    { time: '10:15', moisture: 61, timestamp: new Date().toISOString() },
    { time: '10:20', moisture: 59, timestamp: new Date().toISOString() },
    { time: '10:25', moisture: 63, timestamp: new Date().toISOString() },
    { time: '10:30', moisture: 60, timestamp: new Date().toISOString() }
  ];

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  // Fetch latest sensor data
  const fetchLatestData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/iot/sensor-data/latest`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setSensorData(result.data);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
      setIsConnected(false);
    }
  };

  // Fetch historical data for chart
  const fetchHistoryData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/iot/sensor-data/history?limit=60`);
      const result = await response.json();
      
      if (result.success && result.data) {
        // Format data for chart
        const formattedData = result.data.map((item, index) => ({
          time: new Date(item.timestamp).toLocaleTimeString(),
          moisture: parseFloat(item.soilMoisture) || 0,
          timestamp: item.timestamp
        }));
        setHistoryData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load demo data or fetch from API
  useEffect(() => {
    if (demoMode) {
      // Use demo data
      setHistoryData(demoData);
      setSensorData({
        soilMoisture: 61, // Average of demo data
        temperature: 25,
        humidity: 65,
        lastUpdate: new Date().toISOString(),
        deviceId: 'DEMO-MODE'
      });
      setIsConnected(true);
    } else {
      // Fetch real data
      fetchLatestData();
      fetchHistoryData();
      
      const latestInterval = setInterval(fetchLatestData, 5000);
      const historyInterval = setInterval(fetchHistoryData, 15000);
      
      return () => {
        clearInterval(latestInterval);
        clearInterval(historyInterval);
      };
    }
  }, [demoMode]);

  const getSoilMoistureStatus = (value: number) => {
    if (value < 30) return { status: 'Dry - Irrigation Needed', color: 'red', icon: <TrendingDown className="h-5 w-5" /> };
    if (value < 60) return { status: 'Optimal', color: 'green', icon: <Minus className="h-5 w-5" /> };
    return { status: 'Wet - Good', color: 'blue', icon: <TrendingUp className="h-5 w-5" /> };
  };

  // Crop recommendations based on moisture level
  const getCropRecommendations = (moisture: number) => {
    if (moisture < 20) {
      return {
        category: 'Very Dry Soil',
        crops: ['Cactus', 'Millets', 'Sorghum', 'Pearl Millet'],
        description: 'Suitable for drought-resistant crops',
        action: '🚨 Immediate irrigation required'
      };
    } else if (moisture < 40) {
      return {
        category: 'Dry to Moderate Soil',
        crops: ['Wheat', 'Barley', 'Chickpea', 'Mustard', 'Sunflower'],
        description: 'Good for winter crops and pulses',
        action: '💧 Consider irrigation soon'
      };
    } else if (moisture < 70) {
      return {
        category: 'Optimal Moisture',
        crops: ['Rice', 'Sugarcane', 'Cotton', 'Maize', 'Vegetables', 'Tomato', 'Potato'],
        description: 'Ideal for most crops',
        action: '✅ Perfect moisture level'
      };
    } else {
      return {
        category: 'High Moisture',
        crops: ['Rice (Paddy)', 'Jute', 'Water Chestnut', 'Lotus'],
        description: 'Suitable for water-loving crops',
        action: '⚠️ Monitor for waterlogging'
      };
    }
  };

  const moistureStatus = getSoilMoistureStatus(sensorData.soilMoisture);
  const cropRecommendations = getCropRecommendations(sensorData.soilMoisture);

  // Crop moisture requirement patterns (from germination to harvest)
  // Days 0-30 representing growth stages
  const cropMoisturePatterns = {
    rice: {
      name: 'Rice',
      color: '#10b981',
      icon: '🌾',
      pattern: [
        { day: 0, moisture: 80 }, { day: 5, moisture: 85 }, { day: 10, moisture: 90 },
        { day: 15, moisture: 85 }, { day: 20, moisture: 80 }, { day: 25, moisture: 75 },
        { day: 30, moisture: 70 }
      ],
      avgMoisture: 81,
      description: 'High water requirement throughout growth'
    },
    wheat: {
      name: 'Wheat',
      color: '#f59e0b',
      icon: '🌾',
      pattern: [
        { day: 0, moisture: 50 }, { day: 5, moisture: 55 }, { day: 10, moisture: 60 },
        { day: 15, moisture: 55 }, { day: 20, moisture: 50 }, { day: 25, moisture: 45 },
        { day: 30, moisture: 40 }
      ],
      avgMoisture: 51,
      description: 'Moderate water needs, drought-tolerant'
    },
    cotton: {
      name: 'Cotton',
      color: '#ec4899',
      icon: '🌸',
      pattern: [
        { day: 0, moisture: 55 }, { day: 5, moisture: 60 }, { day: 10, moisture: 65 },
        { day: 15, moisture: 70 }, { day: 20, moisture: 65 }, { day: 25, moisture: 60 },
        { day: 30, moisture: 55 }
      ],
      avgMoisture: 61,
      description: 'Moderate to high water requirement'
    },
    maize: {
      name: 'Maize',
      color: '#eab308',
      icon: '🌽',
      pattern: [
        { day: 0, moisture: 60 }, { day: 5, moisture: 65 }, { day: 10, moisture: 70 },
        { day: 15, moisture: 65 }, { day: 20, moisture: 60 }, { day: 25, moisture: 55 },
        { day: 30, moisture: 50 }
      ],
      avgMoisture: 61,
      description: 'Consistent moisture needed for growth'
    },
    sugarcane: {
      name: 'Sugarcane',
      color: '#8b5cf6',
      icon: '🎋',
      pattern: [
        { day: 0, moisture: 70 }, { day: 5, moisture: 75 }, { day: 10, moisture: 80 },
        { day: 15, moisture: 85 }, { day: 20, moisture: 80 }, { day: 25, moisture: 75 },
        { day: 30, moisture: 70 }
      ],
      avgMoisture: 76,
      description: 'Very high water requirement'
    },
    tomato: {
      name: 'Tomato',
      color: '#ef4444',
      icon: '🍅',
      pattern: [
        { day: 0, moisture: 55 }, { day: 5, moisture: 60 }, { day: 10, moisture: 65 },
        { day: 15, moisture: 60 }, { day: 20, moisture: 55 }, { day: 25, moisture: 50 },
        { day: 30, moisture: 50 }
      ],
      avgMoisture: 56,
      description: 'Consistent moderate moisture'
    },
    potato: {
      name: 'Potato',
      color: '#a855f7',
      icon: '🥔',
      pattern: [
        { day: 0, moisture: 60 }, { day: 5, moisture: 65 }, { day: 10, moisture: 70 },
        { day: 15, moisture: 65 }, { day: 20, moisture: 60 }, { day: 25, moisture: 55 },
        { day: 30, moisture: 50 }
      ],
      avgMoisture: 61,
      description: 'Moderate water needs'
    },
    chickpea: {
      name: 'Chickpea',
      color: '#14b8a6',
      icon: '🫘',
      pattern: [
        { day: 0, moisture: 40 }, { day: 5, moisture: 45 }, { day: 10, moisture: 50 },
        { day: 15, moisture: 45 }, { day: 20, moisture: 40 }, { day: 25, moisture: 35 },
        { day: 30, moisture: 35 }
      ],
      avgMoisture: 41,
      description: 'Low water requirement, drought-resistant'
    }
  };

  // Calculate similarity between actual moisture and crop patterns
  const calculateCropMatch = () => {
    if (historyData.length < 7) return [];

    const recentMoisture = historyData.slice(-7).map(d => d.moisture);
    const avgRecentMoisture = recentMoisture.reduce((a, b) => a + b, 0) / recentMoisture.length;

    const matches = Object.entries(cropMoisturePatterns).map(([key, crop]) => {
      // Calculate similarity score based on average moisture
      const moistureDiff = Math.abs(avgRecentMoisture - crop.avgMoisture);
      const matchScore = Math.max(0, 100 - moistureDiff * 2);

      return {
        cropKey: key,
        ...crop,
        matchScore: matchScore.toFixed(1),
        moistureDiff: moistureDiff.toFixed(1)
      };
    });

    // Sort by match score
    return matches.sort((a, b) => parseFloat(b.matchScore) - parseFloat(a.matchScore));
  };

  const cropMatches = calculateCropMatch();

  // Cinematic sorting animation - like in movies!
  useEffect(() => {
    if (cropMatches.length > 0 && sortedCrops.length === 0) {
      // Start sorting animation
      setIsSorting(true);
      setSortingStep(0);
      
      // Animate sorting process step by step
      const sortSteps = [];
      const unsorted = [...cropMatches];
      
      // Bubble sort with animation steps (for visual effect)
      for (let i = 0; i < unsorted.length; i++) {
        for (let j = 0; j < unsorted.length - i - 1; j++) {
          if (parseFloat(unsorted[j].matchScore) < parseFloat(unsorted[j + 1].matchScore)) {
            // Swap
            [unsorted[j], unsorted[j + 1]] = [unsorted[j + 1], unsorted[j]];
            sortSteps.push([...unsorted]);
          }
        }
      }
      
      // Animate through sort steps
      let step = 0;
      const interval = setInterval(() => {
        if (step < sortSteps.length) {
          setSortedCrops(sortSteps[step]);
          setSortingStep(step);
          step++;
        } else {
          setSortedCrops(cropMatches);
          setIsSorting(false);
          clearInterval(interval);
        }
      }, 150); // 150ms per step for smooth animation
      
      return () => clearInterval(interval);
    } else if (cropMatches.length > 0) {
      setSortedCrops(cropMatches);
    }
  }, [cropMatches.length]);

  // Prepare data for multi-line crop comparison chart
  const getCropComparisonData = () => {
    if (historyData.length === 0) return [];

    // Take last 7 readings and map to days 0-6
    const recentData = historyData.slice(-7);
    
    return recentData.map((item, index) => {
      const dataPoint: any = {
        day: index,
        time: item.time,
        actualMoisture: item.moisture
      };

      // Add crop pattern data for the same day
      Object.entries(cropMoisturePatterns).forEach(([key, crop]) => {
        if (crop.pattern[index]) {
          dataPoint[key] = crop.pattern[index].moisture;
        }
      });

      return dataPoint;
    });
  };

  const comparisonData = getCropComparisonData();

  // Calculate analytics
  const getAnalytics = () => {
    if (historyData.length === 0) return { avg: 0, min: 0, max: 0, trend: 'stable' };
    
    const values = historyData.map(d => d.moisture);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    // Calculate trend
    const recent = values.slice(-10);
    const older = values.slice(-20, -10);
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
    
    let trend = 'stable';
    if (recentAvg > olderAvg + 5) trend = 'increasing';
    else if (recentAvg < olderAvg - 5) trend = 'decreasing';
    
    return { avg, min, max, trend };
  };

  const analytics = getAnalytics();

  // Moisture distribution data for pie chart
  const getMoistureDistribution = () => {
    if (historyData.length === 0) return [];
    
    const dry = historyData.filter(d => d.moisture < 30).length;
    const optimal = historyData.filter(d => d.moisture >= 30 && d.moisture < 70).length;
    const wet = historyData.filter(d => d.moisture >= 70).length;
    
    return [
      { name: 'Dry (<30%)', value: dry, color: '#ef4444' },
      { name: 'Optimal (30-70%)', value: optimal, color: '#22c55e' },
      { name: 'Wet (>70%)', value: wet, color: '#3b82f6' }
    ];
  };

  const distributionData = getMoistureDistribution();

  // Radial gauge data
  const gaugeData = [
    {
      name: 'Moisture',
      value: sensorData.soilMoisture,
      fill: sensorData.soilMoisture < 30 ? '#ef4444' : 
            sensorData.soilMoisture < 60 ? '#22c55e' : '#3b82f6'
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mr-4">
              <Sprout className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Soil Monitoring System
              </h1>
              <p className="text-gray-600 text-lg mt-2">Real-time moisture analysis & crop recommendations</p>
            </div>
          </div>

          {/* Mode Toggle Switch */}
          <div className="flex justify-center items-center gap-4 mt-6 mb-4">
            <Card className="p-4 bg-white shadow-lg">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">Data Source:</span>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => setDemoMode(true)}
                    className={`${
                      demoMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } transition-all duration-300`}
                    size="sm"
                  >
                    🎬 Demo Mode
                  </Button>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      checked={!demoMode}
                      onChange={() => setDemoMode(!demoMode)}
                      className="sr-only peer"
                    />
                    <div 
                      onClick={() => setDemoMode(!demoMode)}
                      className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600 cursor-pointer"
                    />
                  </div>
                  <Button
                    onClick={() => setDemoMode(false)}
                    className={`${
                      !demoMode 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    } transition-all duration-300`}
                    size="sm"
                  >
                    📡 Raspberry Pi
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Connection Status */}
          <div className="flex justify-center items-center gap-4 mt-4">
            <Badge className={`px-4 py-2 ${demoMode ? 'bg-purple-100 text-purple-800' : isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {demoMode ? (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Demo Mode Active
                </>
              ) : isConnected ? (
                <>
                  <Wifi className="mr-2 h-4 w-4" />
                  Sensor Connected
                </>
              ) : (
                <>
                  <WifiOff className="mr-2 h-4 w-4" />
                  Waiting for Data
                </>
              )}
            </Badge>
            {!demoMode && (
              <Button 
                onClick={() => {
                  fetchLatestData();
                  fetchHistoryData();
                }} 
                disabled={isLoading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            )}
            {demoMode && (
              <Button 
                onClick={() => setShowComparison(!showComparison)}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Activity className="mr-2 h-4 w-4" />
                {showComparison ? 'Hide' : 'Show'} Comparison
              </Button>
            )}
          </div>
        </div>

        {/* Current Moisture Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Moisture Card */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="mr-2 h-6 w-6" />
                  Current Soil Moisture
                </div>
                <Activity className="h-5 w-5 animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-6xl font-bold text-green-600 mb-3">
                  {sensorData.soilMoisture.toFixed(1)}
                  <span className="text-3xl ml-2">%</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Badge className={`bg-${moistureStatus.color}-100 text-${moistureStatus.color}-800 px-4 py-2 flex items-center gap-2 text-base`}>
                    {moistureStatus.icon}
                    {moistureStatus.status}
                  </Badge>
                </div>
                
                {/* Moisture Level Bar */}
                <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      sensorData.soilMoisture < 30 ? 'bg-red-500' :
                      sensorData.soilMoisture < 60 ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(sensorData.soilMoisture, 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-gray-600 mb-4">
                  <div className="text-left">
                    <div className="font-semibold">0%</div>
                    <div>Dry</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">50%</div>
                    <div>Optimal</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">100%</div>
                    <div>Saturated</div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    {cropRecommendations.action}
                  </p>
                  <p className="text-xs text-gray-600">
                    Last updated: {new Date(sensorData.lastUpdate).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <CardTitle className="flex items-center text-base">
                <Activity className="mr-2 h-5 w-5" />
                Soil Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Droplets className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium">Moisture</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">
                      {sensorData.soilMoisture.toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    {cropRecommendations.category}
                  </div>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium">Soil Type</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    {sensorData.soilMoisture < 40 ? 'Sandy/Loamy' : 
                     sensorData.soilMoisture < 70 ? 'Loamy' : 'Clay/Heavy'}
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Radio className="h-4 w-4 text-purple-600 mr-2" />
                      <span className="text-sm font-medium">Device</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 break-all">
                    {sensorData.deviceId}
                  </div>
                </div>

                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 text-orange-600 mr-2" />
                      <span className="text-sm font-medium">Status</span>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">
                    {isConnected ? '● Live' : '○ Offline'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Moisture Chart */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="mr-2 h-6 w-6" />
                Real-Time Moisture Trend
              </div>
              <Badge className="bg-white/20 text-white">
                {historyData.length} readings
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
              {historyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={historyData}>
                    <defs>
                      <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time', position: 'insideBottom', offset: -5 }}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis 
                      label={{ value: 'Moisture (%)', angle: -90, position: 'insideLeft' }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      stroke="#666"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #3b82f6', 
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                      labelStyle={{ fontWeight: 'bold', color: '#1e40af' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="moisture" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      fill="url(#colorMoisture)"
                      name="Soil Moisture (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Droplets className="h-16 w-16 mx-auto mb-4 animate-bounce text-blue-400" />
                    <p className="text-xl font-semibold text-gray-700">Waiting for sensor data...</p>
                    <p className="text-sm mt-2 text-gray-600">Connect your Raspberry Pi to start monitoring</p>
                    <div className="mt-4 p-3 bg-blue-100 rounded-lg inline-block">
                      <p className="text-xs text-blue-800">
                        Run: <code className="font-mono bg-white px-2 py-1 rounded">python3 raspberry-pi-sender.py</code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-xs text-gray-600 mb-1">Auto-Update</p>
                <p className="text-sm font-semibold text-green-700">Every 5 seconds</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-xs text-gray-600 mb-1">Data Points</p>
                <p className="text-sm font-semibold text-blue-700">Last 60 readings</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-xs text-gray-600 mb-1">Range</p>
                <p className="text-sm font-semibold text-purple-700">0-100% moisture</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <CardTitle className="flex items-center">
              <Sprout className="mr-2 h-6 w-6" />
              Recommended Crops for Current Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{cropRecommendations.category}</h3>
                  <p className="text-gray-600 mt-1">{cropRecommendations.description}</p>
                </div>
                <div className="text-4xl">
                  {sensorData.soilMoisture < 40 ? '🌾' : sensorData.soilMoisture < 70 ? '🌱' : '🌾'}
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg mb-4">
                <p className="text-lg font-semibold text-green-800 flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  {cropRecommendations.action}
                </p>
              </div>

              {/* Data-Driven Crop Cards with Growth Stages */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {cropMatches.slice(0, 8).map((crop, index) => {
                  const matchPercentage = parseFloat(crop.matchScore);
                  const isTopMatch = index < 3;
                  
                  return (
                    <div 
                      key={crop.cropKey}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-xl ${
                        isTopMatch 
                          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400' 
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-3xl">{crop.icon}</span>
                        {isTopMatch && (
                          <Badge className="bg-green-600 text-white text-xs">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </Badge>
                        )}
                      </div>
                      <h5 className="font-bold text-gray-800 mb-2">{crop.name}</h5>
                      
                      {/* Match Score Progress Bar */}
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Match</span>
                          <span className="font-bold text-green-600">{crop.matchScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              matchPercentage > 80 ? 'bg-green-500' :
                              matchPercentage > 60 ? 'bg-yellow-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${matchPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Growth Stage Info */}
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Moisture:</span>
                          <span className="font-semibold">{crop.avgMoisture}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Difference:</span>
                          <span className="font-semibold text-blue-600">±{crop.moistureDiff}%</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-2 line-clamp-2">{crop.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Moisture Level</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Current: <span className="font-bold text-blue-600">{sensorData.soilMoisture.toFixed(1)}%</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {sensorData.soilMoisture < 40 ? 'Low moisture - drought-resistant crops' :
                   sensorData.soilMoisture < 70 ? 'Optimal - most crops thrive' :
                   'High moisture - water-loving crops'}
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Thermometer className="h-5 w-5 text-orange-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Climate Suitability</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Season: <span className="font-bold text-orange-600">All Seasons</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Adjust irrigation based on seasonal rainfall
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Leaf className="h-5 w-5 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Soil Health</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-bold text-green-600">
                    {sensorData.soilMoisture > 30 && sensorData.soilMoisture < 80 ? 'Healthy' : 'Needs Attention'}
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Monitor regularly for best results
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">💡 Farming Tips:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Monitor moisture levels daily for optimal crop growth</li>
                    <li>• Adjust irrigation schedule based on real-time data</li>
                    <li>• Consider crop rotation for better soil health</li>
                    <li>• Use mulching to maintain consistent moisture levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>



        {/* Individual Crop Comparison Graphs - Demo Mode */}
        {demoMode && showComparison && comparisonData.length > 0 && (
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 text-white">
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-6 w-6" />
                🎬 Individual Crop Pattern Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(cropMoisturePatterns).slice(0, 4).map(([key, crop], index) => (
                  <div 
                    key={key}
                    className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{crop.icon}</span>
                        <h4 className="font-bold text-lg text-gray-800">{crop.name}</h4>
                      </div>
                      <Badge style={{ backgroundColor: crop.color }} className="text-white">
                        {crop.avgMoisture}% avg
                      </Badge>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={comparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="time" 
                          tick={{ fontSize: 10 }}
                          stroke="#6b7280"
                        />
                        <YAxis 
                          domain={[0, 100]}
                          tick={{ fontSize: 10 }}
                          stroke="#6b7280"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fff', 
                            border: `2px solid ${crop.color}`, 
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="actualMoisture" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', r: 4 }}
                          name="Your Soil"
                        />
                        <Line 
                          type="monotone" 
                          dataKey={key} 
                          stroke={crop.color} 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: crop.color, r: 3 }}
                          name={crop.name}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    
                    <p className="text-xs text-gray-600 mt-2 italic">{crop.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border-l-4 border-pink-500">
                <p className="text-sm text-gray-700">
                  <strong>📊 Individual Comparison:</strong> Each graph shows your soil moisture pattern (solid blue line) 
                  compared with the ideal pattern for that specific crop (dashed colored line). Similar patterns indicate better crop suitability.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crop Moisture Comparison - Multi-Line Graph */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="mr-2 h-6 w-6" />
                Crop Moisture Requirements vs Your Soil
              </div>
              <Badge className="bg-white/20 text-white">
                Pattern Matching
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {comparisonData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time / Growth Stage', position: 'insideBottom', offset: -5 }}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis 
                      label={{ value: 'Moisture Requirement (%)', angle: -90, position: 'insideLeft' }}
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '2px solid #6366f1', 
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                      iconType="line"
                    />
                    
                    {/* Your actual soil moisture - thick line */}
                    <Line 
                      type="monotone" 
                      dataKey="actualMoisture" 
                      stroke="#3b82f6" 
                      strokeWidth={4}
                      dot={{ fill: '#3b82f6', r: 5 }}
                      name="Your Soil Moisture"
                    />
                    
                    {/* Crop patterns - thinner lines */}
                    {Object.entries(cropMoisturePatterns).map(([key, crop]) => (
                      <Line 
                        key={key}
                        type="monotone" 
                        dataKey={key} 
                        stroke={crop.color} 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: crop.color, r: 3 }}
                        name={`${crop.icon} ${crop.name}`}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>

                {/* Cinematic Crop Sorting Visualization */}
                <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl relative overflow-hidden">
                  {/* Visual Sorting Process - Show Comparison */}
                  {isSorting && sortedCrops.length > 0 && (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 to-purple-900/95 backdrop-blur-md z-10 p-6 overflow-auto">
                      <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center animate-pulse">
                          Comparing Crop Patterns...
                        </h3>
                        
                        {/* Show current crops being compared */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {sortedCrops.slice(0, 2).map((crop, idx) => (
                            <div 
                              key={crop.cropKey}
                              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30 animate-pulse"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <span className="text-4xl">{crop.icon}</span>
                                <div>
                                  <h4 className="text-white font-bold text-lg">{crop.name}</h4>
                                  <p className="text-white/70 text-sm">Match: {crop.matchScore}%</p>
                                </div>
                              </div>
                              
                              {/* Mini comparison graph */}
                              <div className="h-24 bg-white/5 rounded-lg flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                  <LineChart data={comparisonData.slice(0, 7)}>
                                    <Line 
                                      type="monotone" 
                                      dataKey="actualMoisture" 
                                      stroke="#60a5fa" 
                                      strokeWidth={2}
                                      dot={false}
                                    />
                                    <Line 
                                      type="monotone" 
                                      dataKey={crop.cropKey} 
                                      stroke={crop.color} 
                                      strokeWidth={2}
                                      strokeDasharray="3 3"
                                      dot={false}
                                    />
                                  </LineChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-center">
                          <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
                            <Activity className="h-6 w-6 text-white animate-spin" />
                            <span className="text-white font-semibold">
                              Evaluating Step {sortingStep + 1} of {Object.keys(cropMoisturePatterns).length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg text-gray-800 flex items-center">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-indigo-600" />
                      🎯 Best Crop Matches
                    </h4>
                    {!isSorting && sortedCrops.length > 0 && (
                      <Badge className="bg-green-600 text-white animate-pulse">
                        ✓ Sorted
                      </Badge>
                    )}
                  </div>
                  
                  {/* Animated Crop Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {(sortedCrops.length > 0 ? sortedCrops : cropMatches).slice(0, 4).map((crop, index) => {
                      const rank = index + 1;
                      const isTopThree = index < 3;
                      
                      return (
                        <div 
                          key={`${crop.cropKey}-${index}`}
                          className={`p-4 rounded-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl transform ${
                            isSorting ? 'animate-pulse' : 'animate-fade-in'
                          } ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-100 via-green-100 to-emerald-100 border-green-500 shadow-lg' :
                            index === 1 ? 'bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-400 shadow-md' :
                            index === 2 ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-400 shadow-md' :
                            'bg-white border-gray-300'
                          }`}
                          style={{
                            animationDelay: `${index * 100}ms`,
                            transform: isSorting ? `translateY(${Math.sin(sortingStep + index) * 10}px)` : 'translateY(0)'
                          }}
                        >
                          {/* Rank Badge */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-3xl animate-bounce" style={{ animationDelay: `${index * 150}ms` }}>
                                {crop.icon}
                              </span>
                              {isTopThree && (
                                <span className="text-2xl">
                                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                </span>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge className={`${
                                index === 0 ? 'bg-green-600' :
                                index === 1 ? 'bg-blue-600' :
                                index === 2 ? 'bg-purple-600' :
                                'bg-gray-600'
                              } text-white text-xs`}>
                                #{rank}
                              </Badge>
                            </div>
                          </div>

                          <h5 className="font-bold text-gray-800 mb-2 text-lg">{crop.name}</h5>
                          
                          {/* Animated Match Score Bar */}
                          <div className="mb-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-600 font-semibold">Match Score</span>
                              <span className={`font-bold ${
                                parseFloat(crop.matchScore) > 80 ? 'text-green-600' :
                                parseFloat(crop.matchScore) > 60 ? 'text-blue-600' :
                                'text-orange-600'
                              }`}>
                                {crop.matchScore}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div 
                                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                  parseFloat(crop.matchScore) > 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                  parseFloat(crop.matchScore) > 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                  'bg-gradient-to-r from-orange-400 to-orange-600'
                                }`}
                                style={{ 
                                  width: isSorting ? '0%' : `${crop.matchScore}%`,
                                  boxShadow: '0 0 10px rgba(0,0,0,0.2)'
                                }}
                              />
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between p-2 bg-white/50 rounded">
                              <span className="text-gray-600">Avg Moisture:</span>
                              <span className="font-bold text-indigo-600">{crop.avgMoisture}%</span>
                            </div>
                            <div className="flex justify-between p-2 bg-white/50 rounded">
                              <span className="text-gray-600">Difference:</span>
                              <span className="font-bold text-blue-600">±{crop.moistureDiff}%</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-600 mt-2 italic">{crop.description}</p>

                          {/* Best Match Indicator */}
                          {index === 0 && !isSorting && (
                            <div className="mt-3 p-2 bg-green-600 text-white rounded-lg text-center text-xs font-bold animate-pulse">
                              ⭐ BEST MATCH ⭐
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Analysis Explanation */}
                  <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-indigo-500">
                    <p className="text-sm text-gray-700">
                      <strong>📊 Pattern Analysis:</strong> The system compares your soil's moisture pattern with ideal requirements 
                      for 8 different crops. Each crop is evaluated and ranked based on how closely its moisture needs match your soil conditions. 
                      Higher match scores indicate better suitability for cultivation.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Activity className="h-12 w-12 mx-auto mb-3 animate-pulse text-indigo-400" />
                  <p className="text-lg font-semibold">Collecting data for crop comparison...</p>
                  <p className="text-sm mt-2">Need at least 7 readings to generate pattern analysis</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Wifi className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white">Live</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{historyData.length}</div>
              <div className="text-sm opacity-90">Data Points Collected</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white">5s</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">Real-Time</div>
              <div className="text-sm opacity-90">Update Frequency</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Sprout className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white">AI</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{cropRecommendations.crops.length}</div>
              <div className="text-sm opacity-90">Crop Suggestions</div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-8 w-8 opacity-80" />
                <Badge className="bg-white/20 text-white">Smart</Badge>
              </div>
              <div className="text-3xl font-bold mb-1">95%</div>
              <div className="text-sm opacity-90">Accuracy Rate</div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
    </>
  );
};

export default IoTMonitoring;
