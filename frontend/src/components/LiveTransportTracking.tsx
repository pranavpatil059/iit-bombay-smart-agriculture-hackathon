import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  Clock,
  Truck,
  User,
  Route,
  Star,
  Shield
} from 'lucide-react';

interface DriverLocation {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: string;
}

interface TripDetails {
  id: string;
  driverName: string;
  driverPhone: string;
  driverRating: number;
  vehicleNumber: string;
  vehicleType: string;
  pickupLocation: string;
  dropLocation: string;
  estimatedTime: string;
  distance: string;
  fare: number;
  status: 'assigned' | 'pickup' | 'in-transit' | 'delivered';
}

const LiveTransportTracking = () => {
  const [driverLocation, setDriverLocation] = useState<DriverLocation>({
    lat: 18.5204,
    lng: 73.8567,
    heading: 45,
    speed: 35,
    timestamp: new Date().toISOString()
  });

  const [tripDetails] = useState<TripDetails>({
    id: 'TRP001',
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
    status: 'in-transit'
  });

  // Simulate live location updates (like Uber/Rapido)
  useEffect(() => {
    const updateLocation = () => {
      setDriverLocation(prev => ({
        ...prev,
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
        heading: prev.heading + (Math.random() - 0.5) * 10,
        speed: 30 + Math.random() * 20,
        timestamp: new Date().toISOString()
      }));
    };

    const interval = setInterval(updateLocation, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-blue-600';
      case 'pickup': return 'bg-orange-600';
      case 'in-transit': return 'bg-green-600';
      case 'delivered': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Driver Assigned';
      case 'pickup': return 'Arriving for Pickup';
      case 'in-transit': return 'On the Way';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Trip Status Header */}
      <Card className="border-4 border-green-400">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">Live Tracking</div>
                <div className="text-sm text-gray-600">Trip ID: {tripDetails.id}</div>
              </div>
            </div>
            <Badge className={`${getStatusColor(tripDetails.status)} text-white text-lg px-4 py-2 animate-pulse`}>
              {getStatusText(tripDetails.status)}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Live Map Section */}
      <Card className="border-4 border-blue-400">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Navigation className="h-6 w-6 mr-2 text-blue-600" />
            Live Map Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
            {/* Google Maps Embed with Live Location */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d${driverLocation.lng}!3d${driverLocation.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
            
            {/* Live Driver Marker Overlay */}
            <div className="absolute top-4 left-4 bg-white/90 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Driver Location</span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Speed: {driverLocation.speed.toFixed(0)} km/h
              </div>
            </div>

            {/* Route Information Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3 shadow-lg">
              <div className="text-sm font-semibold text-green-600">ETA: {tripDetails.estimatedTime}</div>
              <div className="text-xs text-gray-600">{tripDetails.distance} remaining</div>
            </div>

            {/* Pickup and Drop Markers */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Pickup: {tripDetails.pickupLocation}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs mt-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Drop: {tripDetails.dropLocation}</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="mt-4 flex space-x-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Navigation className="mr-2 h-4 w-4" />
              Center on Driver
            </Button>
            <Button size="sm" variant="outline">
              <Route className="mr-2 h-4 w-4" />
              Show Full Route
            </Button>
            <Button size="sm" variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Share Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Driver Details & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Information */}
        <Card className="border-2 border-purple-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-6 w-6 mr-2 text-purple-600" />
              Driver Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <div className="font-bold text-lg">{tripDetails.driverName}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{tripDetails.driverRating}</span>
                    <span className="text-sm text-gray-600">(245 trips)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Vehicle:</span>
                  <div className="font-medium">{tripDetails.vehicleType}</div>
                </div>
                <div>
                  <span className="text-gray-600">Number:</span>
                  <div className="font-medium font-mono">{tripDetails.vehicleNumber}</div>
                </div>
                <div>
                  <span className="text-gray-600">Current Speed:</span>
                  <div className="font-medium text-green-600">{driverLocation.speed.toFixed(0)} km/h</div>
                </div>
                <div>
                  <span className="text-gray-600">Last Update:</span>
                  <div className="font-medium text-blue-600">
                    {new Date(driverLocation.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2 pt-4 border-t">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => window.open(`tel:${tripDetails.driverPhone}`)}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Driver
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => window.open(`sms:${tripDetails.driverPhone}`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Progress */}
        <Card className="border-2 border-orange-300">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Route className="h-6 w-6 mr-2 text-orange-600" />
              Trip Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Timeline */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Driver Assigned</div>
                    <div className="text-sm text-gray-600">Completed ✓</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Pickup Completed</div>
                    <div className="text-sm text-gray-600">Completed ✓</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div>
                    <div className="font-medium">In Transit</div>
                    <div className="text-sm text-blue-600">Current Status</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-500">Delivery</div>
                    <div className="text-sm text-gray-400">Pending</div>
                  </div>
                </div>
              </div>

              {/* Trip Summary */}
              <div className="pt-4 border-t space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{tripDetails.distance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium">{tripDetails.estimatedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Fare:</span>
                  <span className="font-medium text-green-600">₹{tripDetails.fare.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Features */}
      <Card className="border-2 border-red-300 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-6 w-6 mr-2 text-red-600" />
            Safety Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-100">
              <Shield className="mr-2 h-4 w-4" />
              Emergency SOS
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100">
              <MessageSquare className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
            <Button variant="outline" className="border-green-300 text-green-600 hover:bg-green-100">
              <Phone className="mr-2 h-4 w-4" />
              Customer Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTransportTracking;