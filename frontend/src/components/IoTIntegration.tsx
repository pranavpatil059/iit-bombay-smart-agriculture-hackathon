import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cpu, 
  Wifi, 
  Thermometer, 
  Droplets,
  Wind,
  Camera,
  Zap,
  Radio,
  Wifi,
  Gauge,
  Activity,
  AlertTriangle
} from 'lucide-react';

const IoTIntegration = () => {
  const [iotDevices, setIoTDevices] = useState([]);
  const [sensorData, setSensorData] = useState({});
  const [deviceStatus, setDeviceStatus] = useState({});
  const [alerts, setAlerts] = useState([]);

  // Generate IoT device data
  useEffect(() => {
    const generateIoTData = () => {
      const devices = [
        {
          id: 'RPI001',
          name: 'Farm Perimeter Sensor #1',
          type: 'Raspberry Pi 4B',
          location: 'North Boundary, Junnar',
          status: 'ONLINE',
          lastSeen: new Date().toISOString(),
          batteryLevel: 87,
          signalStrength: -45,
          sensors: ['PIR Motion', 'Camera', 'Temperature', 'Humidity'],
          coordinates: { lat: 19.2084, lng: 73.8745 }
        },
        {
          id: 'RPI002',
          name: 'Wildlife Corridor Monitor',
          type: 'Raspberry Pi Zero W',
          location: 'Forest Path, Mulshi',
          status: 'ONLINE',
          lastSeen: new Date(Date.now() - 120000).toISOString(),
          batteryLevel: 92,
          signalStrength: -52,
          sensors: ['Ultrasonic', 'Camera', 'Sound Detection'],
          coordinates: { lat: 18.5093, lng: 73.5093 }
        },
        {
          id: 'ESP001',
          name: 'Water Source Monitor',
          type: 'ESP32-CAM',
          location: 'Village Pond, Nashik',
          status: 'ONLINE',
          lastSeen: new Date(Date.now() - 300000).toISOString(),
          batteryLevel: 76,
          signalStrength: -38,
          sensors: ['Water Level', 'Camera', 'Temperature'],
          coordinates: { lat: 19.9975, lng: 73.7898 }
        },
        {
          id: 'ARD001',
          name: 'Crop Field Sensor',
          type: 'Arduino + LoRa',
          location: 'Sugarcane Field, Sangli',
          status: 'WARNING',
          lastSeen: new Date(Date.now() - 900000).toISOString(),
          batteryLevel: 23,
          signalStrength: -67,
          sensors: ['Soil Moisture', 'Vibration', 'Light'],
          coordinates: { lat: 16.8524, lng: 74.5815 }
        }
      ];

      const sensorReadings = {
        'RPI001': {
          temperature: 28.5 + (Math.random() - 0.5) * 4,
          humidity: 65 + (Math.random() - 0.5) * 20,
          motion: Math.random() > 0.8,
          soundLevel: 35 + Math.random() * 30,
          lightLevel: 450 + Math.random() * 200
        },
        'RPI002': {
          temperature: 26.2 + (Math.random() - 0.5) * 3,
          humidity: 72 + (Math.random() - 0.5) * 15,
          motion: Math.random() > 0.7,
          distance: 50 + Math.random() * 200,
          soundLevel: 42 + Math.random() * 25
        },
        'ESP001': {
          temperature: 24.8 + (Math.random() - 0.5) * 2,
          waterLevel: 85 + (Math.random() - 0.5) * 30,
          turbidity: 15 + Math.random() * 10
        },
        'ARD001': {
          soilMoisture: 45 + (Math.random() - 0.5) * 20,
          vibration: Math.random() > 0.9,
          lightLevel: 380 + Math.random() * 150
        }
      };

      setIoTDevices(devices);
      setSensorData(sensorReadings);

      // Generate alerts based on sensor data
      const newAlerts = [];
      if (sensorReadings['RPI001'].motion) {
        newAlerts.push({
          id: Date.now() + 1,
          device: 'RPI001',
          type: 'MOTION_DETECTED',
          message: 'Motion detected at North Boundary - Possible wildlife activity',
          severity: 'HIGH',
          timestamp: new Date().toISOString()
        });
      }
      
      if (sensorReadings['ARD001'].vibration) {
        newAlerts.push({
          id: Date.now() + 2,
          device: 'ARD001',
          type: 'VIBRATION_ALERT',
          message: 'Ground vibration detected in sugarcane field',
          severity: 'MEDIUM',
          timestamp: new Date().toISOString()
        });
      }

      if (devices.find(d => d.id === 'ARD001').batteryLevel < 25) {
        newAlerts.push({
          id: Date.now() + 3,
          device: 'ARD001',
          type: 'LOW_BATTERY',
          message: 'Low battery warning - Replace/recharge needed',
          severity: 'WARNING',
          timestamp: new Date().toISOString()
        });
      }

      setAlerts(prev => [...newAlerts, ...prev.slice(0, 7)]);
    };

    generateIoTData();
    const interval = setInterval(generateIoTData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-600';
      case 'WARNING': return 'bg-yellow-600';
      case 'OFFLINE': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-600';
      case 'MEDIUM': return 'bg-orange-600';
      case 'WARNING': return 'bg-yellow-600';
      case 'LOW': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 60) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSignalStrength = (rssi) => {
    if (rssi > -50) return { bars: 4, color: 'text-green-600' };
    if (rssi > -60) return { bars: 3, color: 'text-yellow-600' };
    if (rssi > -70) return { bars: 2, color: 'text-orange-600' };
    return { bars: 1, color: 'text-red-600' };
  };

  return (
    <div className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <Cpu className="h-4 w-4 mr-2" />
            IoT Raspberry Pi Integration
          </Badge>
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            🔌 Smart IoT Wildlife Monitoring Network
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Distributed Raspberry Pi sensors for real-time wildlife detection and environmental monitoring
          </p>
        </div>

        {/* Network Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <Cpu className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{iotDevices.length}</div>
              <div className="text-green-100 text-sm">Active Devices</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <Wifi className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{iotDevices.filter(d => d.status === 'ONLINE').length}</div>
              <div className="text-blue-100 text-sm">Online Now</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-6">
              <Activity className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">{alerts.length}</div>
              <div className="text-purple-100 text-sm">Active Alerts</div>
            </CardContent>
          </Card>
          
          <Card className="text-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6">
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold mb-1">
                {Math.round(iotDevices.reduce((sum, d) => sum + d.batteryLevel, 0) / iotDevices.length)}%
              </div>
              <div className="text-orange-100 text-sm">Avg Battery</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* IoT Devices */}
          <Card className="border-4 border-cyan-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="h-6 w-6 mr-2 text-cyan-600" />
                IoT Device Network
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {iotDevices.map((device) => {
                  const signal = getSignalStrength(device.signalStrength);
                  return (
                    <div key={device.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Cpu className="h-6 w-6 text-cyan-600" />
                          <div>
                            <div className="font-bold">{device.name}</div>
                            <div className="text-sm text-gray-600">{device.type}</div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(device.status)} text-white`}>
                          {device.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">📍 Location:</span>
                          <span className="ml-2">{device.location}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">🔋 Battery:</span>
                            <span className={`ml-2 font-bold ${getBatteryColor(device.batteryLevel)}`}>
                              {device.batteryLevel}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">📶 Signal:</span>
                            <span className={`ml-2 ${signal.color}`}>
                              {'█'.repeat(signal.bars)}{'░'.repeat(4-signal.bars)} {device.signalStrength}dBm
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">🔧 Sensors:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {device.sensors.map((sensor, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {sensor}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="text-gray-500 text-xs">
                            Last seen: {new Date(device.lastSeen).toLocaleTimeString()}
                          </span>
                          <span className="font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                            {device.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Sensor Data */}
          <Card className="border-4 border-blue-400">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gauge className="h-6 w-6 mr-2 text-blue-600" />
                Live Sensor Readings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(sensorData).map(([deviceId, data]) => {
                  const device = iotDevices.find(d => d.id === deviceId);
                  return (
                    <div key={deviceId} className="p-4 bg-blue-50 rounded-lg border">
                      <h4 className="font-bold text-blue-800 mb-3">{device?.name || deviceId}</h4>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {data.temperature && (
                          <div className="flex items-center space-x-2">
                            <Thermometer className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Temp: {data.temperature.toFixed(1)}°C</span>
                          </div>
                        )}
                        
                        {data.humidity && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">Humidity: {data.humidity.toFixed(1)}%</span>
                          </div>
                        )}
                        
                        {data.motion !== undefined && (
                          <div className="flex items-center space-x-2">
                            <Activity className={`h-4 w-4 ${data.motion ? 'text-red-500' : 'text-green-500'}`} />
                            <span className="text-sm">Motion: {data.motion ? 'DETECTED' : 'Clear'}</span>
                          </div>
                        )}
                        
                        {data.soundLevel && (
                          <div className="flex items-center space-x-2">
                            <Radio className="h-4 w-4 text-purple-500" />
                            <span className="text-sm">Sound: {data.soundLevel.toFixed(1)}dB</span>
                          </div>
                        )}
                        
                        {data.waterLevel && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-cyan-500" />
                            <span className="text-sm">Water: {data.waterLevel.toFixed(1)}%</span>
                          </div>
                        )}
                        
                        {data.soilMoisture && (
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-brown-500" />
                            <span className="text-sm">Soil: {data.soilMoisture.toFixed(1)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="mb-12 border-4 border-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-6 w-6 mr-2 text-orange-600" />
              Real-Time IoT Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-medium text-sm">{alert.message}</div>
                      <div className="text-xs text-gray-500">
                        Device: {alert.device} • {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getSeverityColor(alert.severity)} text-white text-xs`}>
                    {alert.severity}
                  </Badge>
                </div>
              ))}
              
              {alerts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No active alerts - All systems normal</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* IoT Architecture */}
        <Card className="mb-12 bg-gradient-to-r from-cyan-900 to-blue-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Cpu className="h-8 w-8 mr-3" />
              🏗️ IoT Network Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 bg-white/10 rounded-lg">
                <Camera className="h-12 w-12 mx-auto mb-3 text-cyan-300" />
                <h4 className="font-bold mb-2">Edge Devices</h4>
                <p className="text-sm text-cyan-200">Raspberry Pi + ESP32 sensors in field</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Wifi className="h-12 w-12 mx-auto mb-3 text-blue-300" />
                <h4 className="font-bold mb-2">Connectivity</h4>
                <p className="text-sm text-blue-200">WiFi, LoRa, 4G for data transmission</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Zap className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                <h4 className="font-bold mb-2">Edge Computing</h4>
                <p className="text-sm text-purple-200">Local AI processing on Raspberry Pi</p>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <Radio className="h-12 w-12 mx-auto mb-3 text-green-300" />
                <h4 className="font-bold mb-2">Cloud Integration</h4>
                <p className="text-sm text-green-200">AWS IoT Core for data aggregation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IoTIntegration;