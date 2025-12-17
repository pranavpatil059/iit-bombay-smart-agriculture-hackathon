import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  Package, 
  Route,
  Users,
  IndianRupee,
  Navigation,
  Fuel,
  Shield
} from 'lucide-react';
import Layout from '@/components/Layout';
import { useToast } from "@/hooks/use-toast";
import LiveTransportTracking from '@/components/LiveTransportTracking';

interface Transporter {
  id: string;
  name: string;
  vehicleType: string;
  capacity: string;
  rating: number;
  completedTrips: number;
  pricePerKm: number;
  phone: string;
  location: string;
  availability: 'Available' | 'Busy' | 'Offline';
  specializations: string[];
  vehicleNumber: string;
  experience: string;
}

interface TransportRequest {
  id: string;
  cropType: string;
  quantity: string;
  pickupLocation: string;
  dropLocation: string;
  preferredDate: string;
  distance: number;
  estimatedCost: number;
  status: 'Open' | 'Assigned' | 'In Transit' | 'Delivered';
}

const Transportation = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('find-transport');
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [requests, setRequests] = useState<TransportRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // Sample data
  useEffect(() => {
    const sampleTransporters: Transporter[] = [
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
        experience: '8 years'
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
        experience: '5 years'
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
        experience: '12 years'
      }
    ];

    const sampleRequests: TransportRequest[] = [
      {
        id: '1',
        cropType: 'Tomatoes',
        quantity: '2 Tons',
        pickupLocation: 'Baramati, Pune',
        dropLocation: 'Vashi Market, Navi Mumbai',
        preferredDate: '2024-12-15',
        distance: 145,
        estimatedCost: 1740,
        status: 'Open'
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
        status: 'Assigned'
      }
    ];

    setTransporters(sampleTransporters);
    setRequests(sampleRequests);
  }, []);

  const handleBookTransporter = (transporterId: string) => {
    toast({
      title: "🚚 Booking Request Sent",
      description: "Transporter will contact you within 30 minutes",
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-600';
      case 'Busy': return 'bg-orange-600';
      case 'Offline': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-600';
      case 'Assigned': return 'bg-orange-600';
      case 'In Transit': return 'bg-purple-600';
      case 'Delivered': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Truck className="h-12 w-12 text-green-600" />
              <h1 className="text-5xl font-bold text-gray-800">
                🚚 Crop Transportation Hub
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified transporters for safe and timely crop delivery across India
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="find-transport" className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Find Transport</span>
              </TabsTrigger>
              <TabsTrigger value="my-requests" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>My Requests</span>
              </TabsTrigger>
              <TabsTrigger value="live-tracking" className="flex items-center space-x-2">
                <Navigation className="h-4 w-4" />
                <span>Live Tracking</span>
              </TabsTrigger>
              <TabsTrigger value="create-request" className="flex items-center space-x-2">
                <Route className="h-4 w-4" />
                <span>Create Request</span>
              </TabsTrigger>
            </TabsList>

            {/* Find Transport Tab */}
            <TabsContent value="find-transport">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {transporters.map((transporter) => (
                  <Card key={transporter.id} className="border-2 hover:border-green-400 transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Truck className="h-6 w-6 text-green-600" />
                          <div>
                            <div className="font-bold">{transporter.name}</div>
                            <div className="text-sm text-gray-600">{transporter.vehicleType}</div>
                          </div>
                        </div>
                        <Badge className={`${getAvailabilityColor(transporter.availability)} text-white`}>
                          {transporter.availability}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Rating and Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="font-medium">{transporter.rating}</span>
                            <span className="text-sm text-gray-600">({transporter.completedTrips} trips)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <IndianRupee className="h-4 w-4 text-green-600" />
                            <span className="font-medium">{transporter.pricePerKm}/km</span>
                          </div>
                        </div>

                        {/* Vehicle Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Capacity:</span>
                            <div className="font-medium">{transporter.capacity}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Experience:</span>
                            <div className="font-medium">{transporter.experience}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Vehicle No:</span>
                            <div className="font-medium font-mono">{transporter.vehicleNumber}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Location:</span>
                            <div className="font-medium">{transporter.location}</div>
                          </div>
                        </div>

                        {/* Specializations */}
                        <div>
                          <span className="text-sm text-gray-600">Specializes in:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {transporter.specializations.map((spec, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Contact and Book */}
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(`tel:${transporter.phone}`)}
                          >
                            <Phone className="h-4 w-4 mr-1" />
                            Call
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleBookTransporter(transporter.id)}
                            disabled={transporter.availability !== 'Available'}
                          >
                            <Truck className="h-4 w-4 mr-1" />
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Requests Tab */}
            <TabsContent value="my-requests">
              <div className="space-y-6">
                {requests.map((request) => (
                  <Card key={request.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Package className="h-6 w-6 text-blue-600" />
                          <div>
                            <div className="font-bold">{request.cropType} - {request.quantity}</div>
                            <div className="text-sm text-gray-600">Request #{request.id}</div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(request.status)} text-white`}>
                          {request.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <span className="text-sm text-gray-600">Pickup:</span>
                          <div className="font-medium flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-green-600" />
                            {request.pickupLocation}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Drop:</span>
                          <div className="font-medium flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-red-600" />
                            {request.dropLocation}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Distance:</span>
                          <div className="font-medium flex items-center">
                            <Route className="h-4 w-4 mr-1 text-blue-600" />
                            {request.distance} km
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Estimated Cost:</span>
                          <div className="font-medium flex items-center">
                            <IndianRupee className="h-4 w-4 mr-1 text-green-600" />
                            {request.estimatedCost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setActiveTab('live-tracking')}
                        >
                          <Navigation className="h-4 w-4 mr-1" />
                          Live Track
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact Driver
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Live Tracking Tab */}
            <TabsContent value="live-tracking">
              <LiveTransportTracking />
            </TabsContent>

            {/* Create Request Tab */}
            <TabsContent value="create-request">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Route className="h-6 w-6 text-green-600" />
                    <span>Create Transport Request</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cropType">Crop Type</Label>
                        <Input id="cropType" placeholder="e.g., Tomatoes, Onions" />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity</Label>
                        <Input id="quantity" placeholder="e.g., 2 Tons, 500 kg" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <Input id="pickup" placeholder="Enter pickup address" />
                      </div>
                      <div>
                        <Label htmlFor="drop">Drop Location</Label>
                        <Input id="drop" placeholder="Enter destination address" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <select className="w-full p-2 border rounded-md">
                          <option>Mini Truck (1-2 Tons)</option>
                          <option>Medium Truck (3-5 Tons)</option>
                          <option>Large Truck (5+ Tons)</option>
                        </select>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Package className="h-4 w-4 mr-2" />
                      Create Transport Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Verified Drivers</h3>
                <p className="text-sm text-green-100">All transporters are background verified</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <Navigation className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Live Tracking</h3>
                <p className="text-sm text-blue-100">Track your crop in real-time</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardContent className="p-6">
                <IndianRupee className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Best Prices</h3>
                <p className="text-sm text-purple-100">Competitive rates for all routes</p>
              </CardContent>
            </Card>
            
            <Card className="text-center bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 mx-auto mb-3" />
                <h3 className="font-bold mb-2">On-Time Delivery</h3>
                <p className="text-sm text-orange-100">98% on-time delivery rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transportation;