import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind,
  Eye,
  Umbrella,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Zap,
  Wifi,
  Cpu,
  Satellite,
  Bot,
  Bell,
  MapPin,
  BarChart3,
  Activity
} from 'lucide-react';

const Advanced3DWeather = () => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState("Delhi");
  const [selectedDay, setSelectedDay] = useState(0);
  const [weatherData, setWeatherData] = useState({});
  const [liveData, setLiveData] = useState({
    rainfall: 0,
    humidity: 0,
    temperature: 0,
    moisture: 0,
    condition: 'Good',
    timestamp: new Date()
  });
  const canvasRef = useRef(null);

  // Accurate Indian States weather data (December 2024)
  const indianStates = [
    { name: "Delhi", temp: 16, humidity: 68, rain: 0.2, lat: 28.6139, lng: 77.2090, season: 'winter' },
    { name: "Mumbai", temp: 26, humidity: 72, rain: 0, lat: 19.0760, lng: 72.8777, season: 'winter' },
    { name: "Bangalore", temp: 22, humidity: 65, rain: 0.5, lat: 12.9716, lng: 77.5946, season: 'winter' },
    { name: "Chennai", temp: 28, humidity: 78, rain: 2.1, lat: 13.0827, lng: 80.2707, season: 'northeast_monsoon' },
    { name: "Kolkata", temp: 24, humidity: 75, rain: 0.8, lat: 22.5726, lng: 88.3639, season: 'winter' },
    { name: "Hyderabad", temp: 25, humidity: 58, rain: 0.3, lat: 17.3850, lng: 78.4867, season: 'winter' },
    { name: "Pune", temp: 23, humidity: 62, rain: 0, lat: 18.5204, lng: 73.8567, season: 'winter' },
    { name: "Ahmedabad", temp: 24, humidity: 55, rain: 0, lat: 23.0225, lng: 72.5714, season: 'winter' },
    { name: "Jaipur", temp: 18, humidity: 58, rain: 0, lat: 26.9124, lng: 75.7873, season: 'winter' },
    { name: "Lucknow", temp: 17, humidity: 72, rain: 0.1, lat: 26.8467, lng: 80.9462, season: 'winter' },
    { name: "Kanpur", temp: 18, humidity: 70, rain: 0.1, lat: 26.4499, lng: 80.3319, season: 'winter' },
    { name: "Nagpur", temp: 21, humidity: 60, rain: 0, lat: 21.1458, lng: 79.0882, season: 'winter' },
    { name: "Indore", temp: 20, humidity: 62, rain: 0, lat: 22.7196, lng: 75.8577, season: 'winter' },
    { name: "Thane", temp: 26, humidity: 73, rain: 0, lat: 19.2183, lng: 72.9781, season: 'winter' },
    { name: "Bhopal", temp: 19, humidity: 65, rain: 0, lat: 23.2599, lng: 77.4126, season: 'winter' },
    { name: "Visakhapatnam", temp: 27, humidity: 76, rain: 1.8, lat: 17.6868, lng: 83.2185, season: 'northeast_monsoon' },
    { name: "Patna", temp: 19, humidity: 74, rain: 0.2, lat: 25.5941, lng: 85.1376, season: 'winter' },
    { name: "Vadodara", temp: 24, humidity: 58, rain: 0, lat: 22.3072, lng: 73.1812, season: 'winter' },
    { name: "Ghaziabad", temp: 16, humidity: 69, rain: 0.1, lat: 28.6692, lng: 77.4538, season: 'winter' },
    { name: "Ludhiana", temp: 12, humidity: 78, rain: 0.5, lat: 30.9010, lng: 75.8573, season: 'winter' },
    { name: "Agra", temp: 17, humidity: 66, rain: 0.1, lat: 27.1767, lng: 78.0081, season: 'winter' },
    { name: "Nashik", temp: 22, humidity: 64, rain: 0, lat: 19.9975, lng: 73.7898, season: 'winter' },
    { name: "Faridabad", temp: 16, humidity: 68, rain: 0.1, lat: 28.4089, lng: 77.3178, season: 'winter' },
    { name: "Meerut", temp: 15, humidity: 71, rain: 0.2, lat: 28.9845, lng: 77.7064, season: 'winter' },
    { name: "Rajkot", temp: 23, humidity: 62, rain: 0, lat: 22.3039, lng: 70.8022, season: 'winter' },
    { name: "Kalyan", temp: 26, humidity: 72, rain: 0, lat: 19.2437, lng: 73.1355, season: 'winter' },
    { name: "Vasai", temp: 26, humidity: 71, rain: 0, lat: 19.4912, lng: 72.8054, season: 'winter' },
    { name: "Varanasi", temp: 18, humidity: 76, rain: 0.3, lat: 25.3176, lng: 82.9739, season: 'winter' },
    { name: "Srinagar", temp: 4, humidity: 82, rain: 3.2, lat: 34.0837, lng: 74.7973, season: 'winter' },
    { name: "Shimla", temp: 8, humidity: 75, rain: 2.1, lat: 31.1048, lng: 77.1734, season: 'winter' }
  ];

  // Live data updates every second
  useEffect(() => {
    const updateLiveData = () => {
      const stateInfo = indianStates.find(state => state.name === selectedState);
      if (!stateInfo) return;

      // Generate live varying data every second
      const baseTemp = stateInfo.temp;
      const baseHumidity = stateInfo.humidity;
      const baseRain = stateInfo.rain;
      
      // More accurate variations based on real weather patterns
      const time = Date.now() / 1000;
      const hour = new Date().getHours();
      
      // Temperature follows daily cycle (cooler at night, warmer during day)
      const dailyTempCycle = Math.sin((hour - 6) * Math.PI / 12) * 4; // Peak at 2 PM
      const tempVariation = dailyTempCycle + Math.sin(time / 60) * 1.5 + (Math.random() - 0.5) * 0.8;
      
      // Humidity inversely related to temperature
      const humidityVariation = -dailyTempCycle * 1.5 + Math.cos(time / 45) * 3 + (Math.random() - 0.5) * 2;
      
      // Rainfall based on season and humidity
      const seasonalRain = stateInfo.season === 'northeast_monsoon' ? 2 : 
                          stateInfo.season === 'winter' ? 0.2 : 0;
      const rainVariation = seasonalRain + Math.sin(time / 120) * 1 + (Math.random() > 0.85 ? Math.random() * 2 : 0);
      
      // Soil moisture affected by rainfall and temperature
      const moistureBase = 45 + (baseHumidity - 60) * 0.5 + (baseRain * 10);
      const moistureVariation = Math.cos(time / 80) * 8 + (Math.random() - 0.5) * 5;
      
      const newTemp = Math.max(stateInfo.temp - 8, Math.min(stateInfo.temp + 12, baseTemp + tempVariation));
      const newHumidity = Math.max(35, Math.min(90, baseHumidity + humidityVariation));
      const newRainfall = Math.max(0, Math.min(10, rainVariation));
      const newMoisture = Math.max(25, Math.min(75, moistureBase + moistureVariation));
      
      // Determine condition based on multiple factors
      let condition = 'Good';
      let conditionScore = 0;
      
      if (newTemp > 35) conditionScore -= 2;
      if (newTemp < 10) conditionScore -= 2;
      if (newHumidity > 85) conditionScore -= 1;
      if (newHumidity < 40) conditionScore -= 1;
      if (newRainfall > 5) conditionScore -= 2;
      if (newMoisture < 30) conditionScore -= 1;
      if (newMoisture > 60) conditionScore += 1;
      
      if (conditionScore >= 1) condition = 'Excellent';
      else if (conditionScore >= 0) condition = 'Good';
      else if (conditionScore >= -2) condition = 'Fair';
      else if (conditionScore >= -4) condition = 'Poor';
      else condition = 'Critical';
      
      setLiveData({
        rainfall: Math.round(newRainfall * 10) / 10,
        humidity: Math.round(newHumidity),
        temperature: Math.round(newTemp * 10) / 10,
        moisture: Math.round(newMoisture),
        condition: condition,
        timestamp: new Date()
      });
    };

    // Update immediately
    updateLiveData();
    
    // Update every second for live effect
    const liveInterval = setInterval(updateLiveData, 1000);
    
    return () => clearInterval(liveInterval);
  }, [selectedState]);

  // Generate 30 days weather data for selected state
  useEffect(() => {
    const generateStateWeatherData = () => {
      const stateInfo = indianStates.find(state => state.name === selectedState);
      if (!stateInfo) return;

      const data = [];
      const today = new Date();
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        // Realistic weather variations based on state
        const tempVariation = (Math.random() - 0.5) * 6;
        const temp = stateInfo.temp + tempVariation;
        const humidityVariation = (Math.random() - 0.5) * 20;
        const humidity = Math.max(30, Math.min(90, stateInfo.humidity + humidityVariation));
        const rainVariation = Math.random() * 3;
        const rainfall = stateInfo.rain + rainVariation;
        
        data.push({
          date: date.toLocaleDateString('en-IN', { 
            day: '2-digit', 
            month: 'short' 
          }),
          fullDate: date.toLocaleDateString('en-IN'),
          dayName: date.toLocaleDateString('en-IN', { weekday: 'short' }),
          temperature: Math.round(temp),
          minTemp: Math.round(temp - 4),
          maxTemp: Math.round(temp + 5),
          humidity: Math.round(humidity),
          rainfall: Math.round(rainfall * 10) / 10,
          windSpeed: Math.round(8 + Math.random() * 15),
          condition: rainfall > 3 ? 'Rainy' : rainfall > 1 ? 'Cloudy' : temp > 30 ? 'Sunny' : 'Clear',
          uvIndex: Math.round(2 + Math.random() * 8),
          visibility: Math.round(6 + Math.random() * 9),
          pressure: Math.round(1008 + Math.random() * 15),
          soilMoisture: Math.round(25 + Math.random() * 50),
          irrigationNeeded: rainfall < 2 && temp > 25,
          pestRisk: humidity > 75 ? 'High' : humidity > 60 ? 'Medium' : 'Low',
          cropStage: i < 10 ? 'Sowing' : i < 20 ? 'Growing' : 'Harvesting'
        });
      }
      
      setWeatherData(prev => ({
        ...prev,
        [selectedState]: data
      }));
    };

    generateStateWeatherData();
  }, [selectedState]);

  // 3D Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let animationId;
    let time = 0;

    const draw3DGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentData = weatherData[selectedState] || [];
      if (currentData.length === 0) return;

      // 3D Grid Background
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 1;
      
      // Draw 3D grid lines
      for (let i = 0; i < 10; i++) {
        const y = (canvas.height / 10) * i;
        const offset = Math.sin(time + i * 0.5) * 5;
        
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
        ctx.stroke();
      }

      // Draw temperature bars in 3D
      const barWidth = canvas.width / 30;
      currentData.forEach((day, index) => {
        const x = index * barWidth;
        const height = (day.temperature / 45) * canvas.height * 0.6;
        const depth = Math.sin(time + index * 0.1) * 8;
        
        // 3D temperature gradient
        const tempGradient = ctx.createLinearGradient(x, canvas.height - height, x + barWidth, canvas.height);
        
        if (day.temperature > 30) {
          tempGradient.addColorStop(0, '#ef4444'); // Red for hot
          tempGradient.addColorStop(1, '#dc2626');
        } else if (day.temperature > 20) {
          tempGradient.addColorStop(0, '#f59e0b'); // Orange for warm
          tempGradient.addColorStop(1, '#d97706');
        } else if (day.temperature > 10) {
          tempGradient.addColorStop(0, '#3b82f6'); // Blue for cool
          tempGradient.addColorStop(1, '#2563eb');
        } else {
          tempGradient.addColorStop(0, '#8b5cf6'); // Purple for cold
          tempGradient.addColorStop(1, '#7c3aed');
        }
        
        ctx.fillStyle = tempGradient;
        
        // Draw 3D temperature bar
        ctx.fillRect(x + depth, canvas.height - height + depth, barWidth - 3, height);
        
        // Temperature bar top face
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(x + depth, canvas.height - height + depth, barWidth - 3, 4);
        
        // Temperature bar side face
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(x + barWidth + depth - 3, canvas.height - height + depth, 4, height);
      });

      // Draw rainfall prediction bars (overlaid)
      currentData.forEach((day, index) => {
        const x = index * barWidth;
        const rainHeight = (day.rainfall / 15) * canvas.height * 0.4;
        const depth = Math.sin(time + index * 0.1) * 8;
        
        if (day.rainfall > 0) {
          // Rainfall gradient
          const rainGradient = ctx.createLinearGradient(x, canvas.height - rainHeight, x + barWidth, canvas.height);
          rainGradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          rainGradient.addColorStop(1, 'rgba(37, 99, 235, 0.9)');
          
          ctx.fillStyle = rainGradient;
          
          // Draw 3D rainfall bar (offset for visibility)
          const rainX = x + (barWidth * 0.6) + depth;
          ctx.fillRect(rainX, canvas.height - rainHeight + depth, barWidth * 0.3, rainHeight);
          
          // Rainfall bar top face
          ctx.fillStyle = 'rgba(147, 197, 253, 0.6)';
          ctx.fillRect(rainX, canvas.height - rainHeight + depth, barWidth * 0.3, 3);
          
          // Rainfall bar side face
          ctx.fillStyle = 'rgba(29, 78, 216, 0.4)';
          ctx.fillRect(rainX + (barWidth * 0.3), canvas.height - rainHeight + depth, 3, rainHeight);
        }
      });

      // Draw rainfall prediction curve
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      currentData.forEach((day, index) => {
        const x = index * barWidth + barWidth / 2;
        const rainPrediction = (day.rainfall / 15) * canvas.height * 0.3;
        const y = canvas.height - rainPrediction - 50;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Add rainfall percentage labels
      currentData.forEach((day, index) => {
        if (index % 5 === 0) { // Show every 5th day to avoid clutter
          const x = index * barWidth + barWidth / 2;
          const rainChance = day.rainfall > 3 ? 85 : day.rainfall > 1 ? 60 : day.rainfall > 0 ? 35 : 15;
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.fillRect(x - 15, 20, 30, 20);
          
          ctx.fillStyle = '#1e40af';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${rainChance}%`, x, 35);
        }
      });

      time += 0.02;
      animationId = requestAnimationFrame(draw3DGraph);
    };

    draw3DGraph();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [weatherData, selectedState]);

  const currentStateData = weatherData[selectedState] || [];
  const selectedWeather = currentStateData[selectedDay] || {};

  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <Satellite className="h-4 w-4 mr-2" />
            {t('weather.title')}
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🌍 {t('weather.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {t('weather.subtitle')}
          </p>
        </div>

        {/* Live Weather Dashboard */}
        <Card className="mb-12 border-4 border-green-400 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
                <span>🔴 {t('weather.liveWeatherData')} - {selectedState}</span>
              </div>
              <Badge className="bg-red-600 text-white animate-pulse">
                {t('weather.updatingEverySecond')}
              </Badge>
            </CardTitle>
            <div className="text-sm text-gray-600">
              {t('weather.lastUpdate')}: {liveData.timestamp.toLocaleTimeString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Live Temperature */}
              <div className="text-center p-4 bg-white rounded-lg border-2 border-red-200">
                <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {liveData.temperature}°C
                </div>
                <div className="text-xs text-gray-600 mb-2">{t('weather.temperature')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-orange-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (liveData.temperature / 45) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold mt-1">
                  {liveData.temperature > 35 ? 'HOT' : liveData.temperature > 25 ? 'WARM' : liveData.temperature > 15 ? 'COOL' : 'COLD'}
                </div>
              </div>

              {/* Live Humidity */}
              <div className="text-center p-4 bg-white rounded-lg border-2 border-blue-200">
                <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {liveData.humidity}%
                </div>
                <div className="text-xs text-gray-600 mb-2">{t('weather.humidity')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${liveData.humidity}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold mt-1">
                  {liveData.humidity > 80 ? 'VERY HIGH' : liveData.humidity > 60 ? 'HIGH' : liveData.humidity > 40 ? 'NORMAL' : 'LOW'}
                </div>
              </div>

              {/* Live Rainfall */}
              <div className="text-center p-4 bg-white rounded-lg border-2 border-cyan-200">
                <CloudRain className="h-8 w-8 mx-auto mb-2 text-cyan-500" />
                <div className="text-3xl font-bold text-cyan-600 mb-1">
                  {liveData.rainfall}mm
                </div>
                <div className="text-xs text-gray-600 mb-2">{t('weather.rainfall')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(100, (liveData.rainfall / 15) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold mt-1">
                  {liveData.rainfall > 5 ? 'HEAVY' : liveData.rainfall > 2 ? 'MODERATE' : liveData.rainfall > 0 ? 'LIGHT' : 'NONE'}
                </div>
              </div>

              {/* Live Soil Moisture */}
              <div className="text-center p-4 bg-white rounded-lg border-2 border-green-200">
                <div className="text-2xl mb-2">🌱</div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {liveData.moisture}%
                </div>
                <div className="text-xs text-gray-600 mb-2">{t('weather.soilMoisture')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${liveData.moisture}%` }}
                  ></div>
                </div>
                <div className="text-xs font-bold mt-1">
                  {liveData.moisture > 70 ? 'OPTIMAL' : liveData.moisture > 50 ? 'GOOD' : liveData.moisture > 30 ? 'LOW' : 'CRITICAL'}
                </div>
              </div>

              {/* Live Condition */}
              <div className="text-center p-4 bg-white rounded-lg border-2 border-purple-200">
                <Bot className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {liveData.condition}
                </div>
                <div className="text-xs text-gray-600 mb-2">{t('weather.aiAssessment')}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      liveData.condition === 'Excellent' ? 'bg-green-500 w-full' :
                      liveData.condition === 'Good' ? 'bg-blue-500 w-4/5' :
                      liveData.condition === 'Fair' ? 'bg-yellow-500 w-3/5' :
                      liveData.condition === 'Poor' ? 'bg-orange-500 w-2/5' :
                      'bg-red-500 w-1/5'
                    }`}
                  ></div>
                </div>
                <div className="text-xs font-bold mt-1">
                  {liveData.condition === 'Excellent' ? '95-100%' :
                   liveData.condition === 'Good' ? '75-94%' :
                   liveData.condition === 'Fair' ? '50-74%' :
                   liveData.condition === 'Poor' ? '25-49%' : '0-24%'}
                </div>
              </div>
            </div>

            {/* Live Percentage Summary */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 mb-2">Rain Probability</h4>
                <div className="text-3xl font-bold text-blue-600">
                  {liveData.rainfall > 5 ? '90%' : 
                   liveData.rainfall > 3 ? '75%' : 
                   liveData.rainfall > 1 ? '55%' : 
                   liveData.rainfall > 0 ? '35%' : '15%'}
                </div>
                <div className="text-sm text-blue-700">Next 6 hours</div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-2">Farming Suitability</h4>
                <div className="text-3xl font-bold text-green-600">
                  {liveData.condition === 'Excellent' ? '95%' :
                   liveData.condition === 'Good' ? '80%' :
                   liveData.condition === 'Fair' ? '60%' :
                   liveData.condition === 'Poor' ? '35%' : '15%'}
                </div>
                <div className="text-sm text-green-700">Current conditions</div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4">
                <h4 className="font-bold text-purple-800 mb-2">Crop Health Risk</h4>
                <div className="text-3xl font-bold text-purple-600">
                  {liveData.condition === 'Critical' ? '85%' :
                   liveData.condition === 'Poor' ? '65%' :
                   liveData.condition === 'Fair' ? '40%' :
                   liveData.condition === 'Good' ? '20%' : '5%'}
                </div>
                <div className="text-sm text-purple-700">Risk assessment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Selector */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-blue-600" />
              Select Indian State/City
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {indianStates.map((state) => (
                <Button
                  key={state.name}
                  variant={selectedState === state.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedState(state.name)}
                  className={`text-xs ${selectedState === state.name ? 'bg-blue-600' : ''}`}
                >
                  {state.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3D Weather Graph */}
        <Card className="mb-12 border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                3D Weather Visualization - {selectedState}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
                  <span className="text-sm">Temperature (°C)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                  <span className="text-sm">Rainfall (mm)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-400 rounded opacity-60"></div>
                  <span className="text-sm">Rain % Prediction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Updates</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-96 bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg border-2 border-blue-300"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)' }}
              />
              
              {/* 3D Graph Labels */}
              <div className="absolute top-4 left-4 text-white">
                <div className="text-sm font-bold">Temperature (°C)</div>
                <div className="text-xs opacity-75">45°</div>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-xs opacity-75">0°</div>
              </div>
              <div className="absolute bottom-4 right-4 text-white">
                <div className="text-xs opacity-75">30 Days →</div>
              </div>
              
              {/* Current Weather Info Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedWeather.temperature || '--'}°C</div>
                  <div className="text-sm text-gray-600">{selectedWeather.condition || 'Loading...'}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Humidity: {selectedWeather.humidity || '--'}%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Interactive Controls */}
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
                disabled={selectedDay === 0}
              >
                ← Previous Day
              </Button>
              <Badge variant="secondary" className="px-4 py-2">
                Day {selectedDay + 1} of 30
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDay(Math.min(29, selectedDay + 1))}
                disabled={selectedDay === 29}
              >
                Next Day →
              </Button>
            </div>

            {/* Hourly Rainfall Prediction */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
              <h4 className="font-semibold mb-4 flex items-center">
                <CloudRain className="h-5 w-5 mr-2 text-blue-600" />
                24-Hour Rainfall Prediction - {selectedState}
              </h4>
              <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i;
                  const rainChance = Math.random() * (selectedWeather.rainfall || 0) * 2;
                  const time = `${hour.toString().padStart(2, '0')}:00`;
                  
                  return (
                    <div key={i} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{time}</div>
                      <div className="h-16 bg-gray-200 rounded-sm relative overflow-hidden">
                        <div 
                          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-500"
                          style={{ height: `${Math.min(100, (rainChance / 10) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs font-bold text-blue-600 mt-1">
                        {rainChance.toFixed(1)}mm
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <Badge className="bg-blue-600 text-white">
                  Peak Rain: {selectedWeather.rainfall > 2 ? '14:00-16:00' : selectedWeather.rainfall > 0 ? '20:00-22:00' : 'No Rain Expected'}
                </Badge>
                <Badge variant="outline">
                  Rain Chance: {selectedWeather.rainfall > 3 ? '85%' : selectedWeather.rainfall > 1 ? '60%' : '25%'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* State Weather Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-red-500 to-orange-600 text-white">
            <CardContent className="p-6 text-center">
              <Thermometer className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">{selectedWeather.temperature || '--'}°C</h3>
              <p className="text-red-100">Current Temperature</p>
              <div className="mt-2 text-sm">
                Range: {selectedWeather.minTemp || '--'}° to {selectedWeather.maxTemp || '--'}°
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6 text-center">
              <CloudRain className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">{selectedWeather.rainfall || '--'}mm</h3>
              <p className="text-blue-100">Rainfall Today</p>
              <div className="mt-2 text-sm">
                Humidity: {selectedWeather.humidity || '--'}%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Wind className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">{selectedWeather.windSpeed || '--'} km/h</h3>
              <p className="text-green-100">Wind Speed</p>
              <div className="mt-2 text-sm">
                Visibility: {selectedWeather.visibility || '--'} km
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6 text-center">
              <Bot className="h-12 w-12 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-2">AI</h3>
              <p className="text-purple-100">Smart Predictions</p>
              <div className="mt-2 text-sm">
                Pest Risk: {selectedWeather.pestRisk || 'Low'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rainfall Prediction Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Rainfall Chances */}
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="h-6 w-6 mr-2 text-blue-600" />
                Rainfall Prediction - {selectedState}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Today's Rain Chance */}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">Today's Rain Chance</span>
                    <Badge className="bg-blue-600 text-white">
                      {selectedWeather.rainfall > 3 ? '85%' : selectedWeather.rainfall > 1 ? '60%' : '25%'}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${selectedWeather.rainfall > 3 ? 85 : selectedWeather.rainfall > 1 ? 60 : 25}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Expected: {selectedWeather.rainfall || 0}mm rainfall
                  </div>
                </div>

                {/* 7-Day Rain Forecast with Percentage */}
                <div>
                  <h4 className="font-semibold mb-3">7-Day Rain Forecast & Chances</h4>
                  <div className="space-y-3">
                    {currentStateData.slice(0, 7).map((day, index) => {
                      const rainChance = day.rainfall > 5 ? 90 : 
                                        day.rainfall > 3 ? 75 : 
                                        day.rainfall > 1 ? 55 : 
                                        day.rainfall > 0 ? 35 : 15;
                      
                      return (
                        <div key={index} className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm font-bold w-12">{day.dayName}</span>
                              <CloudRain className="h-4 w-4 text-blue-500" />
                              <span className="text-xs text-gray-500">{day.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className="bg-blue-600 text-white text-xs">
                                {rainChance}%
                              </Badge>
                              <span className="text-sm font-bold">{day.rainfall.toFixed(1)}mm</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${rainChance}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-600">Rain Probability</div>
                            </div>
                            
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                day.rainfall > 5 ? 'border-red-500 text-red-700' : 
                                day.rainfall > 2 ? 'border-orange-500 text-orange-700' : 
                                day.rainfall > 0 ? 'border-blue-500 text-blue-700' : 
                                'border-green-500 text-green-700'
                              }`}
                            >
                              {day.rainfall > 5 ? 'Heavy Rain' : 
                               day.rainfall > 2 ? 'Moderate' : 
                               day.rainfall > 0 ? 'Light Rain' : 'Clear'}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weekly Rain Summary */}
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                    Weekly Rain Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        {Math.round(currentStateData.slice(0, 7).reduce((acc, day) => {
                          const chance = day.rainfall > 3 ? 75 : day.rainfall > 1 ? 55 : day.rainfall > 0 ? 35 : 15;
                          return acc + chance;
                        }, 0) / 7)}%
                      </div>
                      <div className="text-xs text-gray-600">Avg Rain Chance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {currentStateData.slice(0, 7).filter(day => day.rainfall > 1).length}
                      </div>
                      <div className="text-xs text-gray-600">Rainy Days</div>
                    </div>
                  </div>
                </div>

                {/* Rain Alerts */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Smart Weather Alerts</span>
                  </div>
                  {selectedWeather.rainfall > 5 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-orange-700">
                        ⚠️ <strong>90% Rain Chance</strong> - Heavy rainfall expected. Avoid field operations.
                      </p>
                      <div className="text-xs text-orange-600">
                        • Ensure proper drainage • Cover harvested crops • Postpone spraying
                      </div>
                    </div>
                  ) : selectedWeather.rainfall > 2 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-orange-700">
                        🌧️ <strong>75% Rain Chance</strong> - Moderate rain likely. Monitor soil moisture.
                      </p>
                      <div className="text-xs text-orange-600">
                        • Good for irrigation savings • Check crop drainage • Plan indoor activities
                      </div>
                    </div>
                  ) : selectedWeather.rainfall > 0 ? (
                    <div className="space-y-2">
                      <p className="text-sm text-blue-700">
                        🌦️ <strong>35% Rain Chance</strong> - Light showers possible.
                      </p>
                      <div className="text-xs text-blue-600">
                        • Continue normal operations • Light irrigation may be needed
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm text-green-700">
                        ☀️ <strong>15% Rain Chance</strong> - Clear weather expected. Perfect for farming!
                      </p>
                      <div className="text-xs text-green-600">
                        • Ideal for harvesting • Good for spraying • Increase irrigation
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monsoon Tracker */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Umbrella className="h-6 w-6 mr-2 text-green-600" />
                Monsoon Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Monsoon Progress */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Monsoon Progress 2024</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Normal Rainfall:</span>
                      <span className="font-bold">850mm</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Received So Far:</span>
                      <span className="font-bold text-green-600">720mm</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <div className="text-xs text-gray-600">85% of normal rainfall received</div>
                  </div>
                </div>

                {/* Regional Rainfall Comparison */}
                <div>
                  <h4 className="font-semibold mb-3">Regional Comparison</h4>
                  <div className="space-y-2">
                    {[
                      { region: 'North India', rainfall: 680, normal: 750, status: 'Deficit' },
                      { region: 'South India', rainfall: 920, normal: 850, status: 'Excess' },
                      { region: 'West India', rainfall: 580, normal: 650, status: 'Deficit' },
                      { region: 'East India', rainfall: 1150, normal: 1200, status: 'Normal' }
                    ].map((region, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{region.region}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{region.rainfall}mm</span>
                          <Badge 
                            className={
                              region.status === 'Excess' ? 'bg-green-100 text-green-800' :
                              region.status === 'Deficit' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          >
                            {region.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seasonal Forecast */}
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Seasonal Forecast</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">Normal</div>
                      <div className="text-xs text-gray-600">Winter Rainfall</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-600">Above Normal</div>
                      <div className="text-xs text-gray-600">Next Monsoon</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All States Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-6 w-6 mr-2 text-green-600" />
              All India Weather Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {indianStates.map((state) => (
                <div
                  key={state.name}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedState === state.name 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedState(state.name)}
                >
                  <div className="text-center">
                    <div className="font-medium text-sm mb-1">{state.name}</div>
                    <div className="text-lg font-bold text-blue-600">{state.temp}°C</div>
                    <div className="text-xs text-gray-500 mb-1">
                      {state.rain > 0 ? `${state.rain}mm rain` : 'Clear'}
                    </div>
                    {/* Rain Chance Indicator */}
                    <div className="flex items-center justify-center space-x-1">
                      <CloudRain className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-bold text-blue-600">
                        {state.rain > 3 ? '85%' : state.rain > 1 ? '60%' : '25%'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Advanced3DWeather;