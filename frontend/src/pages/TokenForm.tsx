import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Smartphone, User, CreditCard, Loader2, CheckCircle, XCircle, Navigation } from "lucide-react";
import { toast } from "sonner";
import EnhancedParticleBackground from "@/components/EnhancedParticleBackground";

// Form validation schema
const tokenFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  contact: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number"),
  aadharNumber: z.string().regex(/^\d{12}$/, "Aadhar number must be 12 digits"),
  landArea: z.string().min(1, "Land area is required"),
  email: z.string().email("Enter valid email address"),
  crop: z.string().optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  pincode: z.string().regex(/^\d{6}$/, "Enter valid 6-digit pincode"),
});

type TokenFormData = z.infer<typeof tokenFormSchema>;

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

const TokenForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [statusData, setStatusData] = useState<{ status: string; allottedDate: string } | null>(null);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TokenFormData>({
    resolver: zodResolver(tokenFormSchema),
  });

  // Get current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Reverse geocoding to get address
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );
          const data = await response.json();
          if (data.results && data.results[0]) {
            const address = data.results[0].formatted;
            setLocation(prev => prev ? { ...prev, address } : null);
            setValue("address", address);
          }
        } catch (error) {
          console.log("Could not get address from coordinates");
        }
        
        setIsLoadingLocation(false);
        toast.success("Location captured successfully!");
      },
      (error) => {
        setIsLoadingLocation(false);
        toast.error("Unable to get location. Please enter manually.");
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  // Handle form submission for adding a new token (farmer entry)
  const onSubmit = async (data: TokenFormData) => {
    setIsSubmitting(true);
    try {
      const formDataWithLocation = {
        ...data,
        Crop: data.crop || "",
        location: location ? {
          latitude: location.latitude,
          longitude: location.longitude,
          address: location.address || data.address,
        } : null,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/tokens`, formDataWithLocation);
      toast.success("Token registered successfully!");
      setMessage("✅ Token added successfully!");
      reset();
      setLocation(null);
    } catch (error) {
      toast.error("Error adding token. Please try again.");
      setMessage("❌ Error adding token. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fetch status by phone number
  const checkStatus = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tokens/status/${phone}`);
      setStatusData(response.data);
      setMessage("");
    } catch (error) {
      setStatusData(null);
      setMessage("❌ No record found for this phone number.");
    }
  };

  return (
    <div className="min-h-screen relative py-8 px-4">
      {/* Enhanced Animated Background */}
      <EnhancedParticleBackground theme="agriculture" className="opacity-85" />
      
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/70 to-black/80"></div>
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
            🌱 <span>Token Registration System</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Register for agricultural services with enhanced security and location verification
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Registration Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="h-6 w-6 text-green-600" />
                  Farmer Registration
                </CardTitle>
                <CardDescription>
                  Fill in your details to register for agricultural token services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Enter your full name"
                          className="h-12"
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact">Mobile Number *</Label>
                        <Input
                          id="contact"
                          {...register("contact")}
                          placeholder="10-digit mobile number"
                          className="h-12"
                        />
                        {errors.contact && (
                          <p className="text-sm text-red-600">{errors.contact.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aadharNumber" className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Aadhar Number *
                        </Label>
                        <Input
                          id="aadharNumber"
                          {...register("aadharNumber")}
                          placeholder="12-digit Aadhar number"
                          maxLength={12}
                          className="h-12"
                        />
                        {errors.aadharNumber && (
                          <p className="text-sm text-red-600">{errors.aadharNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your.email@example.com"
                          className="h-12"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Farm Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">🚜 Farm Information</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="landArea">Land Area (in acres) *</Label>
                        <Input
                          id="landArea"
                          {...register("landArea")}
                          placeholder="e.g., 5.5"
                          className="h-12"
                        />
                        {errors.landArea && (
                          <p className="text-sm text-red-600">{errors.landArea.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="crop">Primary Crop (Optional)</Label>
                        <Input
                          id="crop"
                          {...register("crop")}
                          placeholder="e.g., Rice, Wheat, Cotton"
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Location Information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        Location Information
                      </h3>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={getCurrentLocation}
                        disabled={isLoadingLocation}
                        className="flex items-center gap-2"
                      >
                        {isLoadingLocation ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Navigation className="h-4 w-4" />
                        )}
                        {isLoadingLocation ? "Getting Location..." : "Get Current Location"}
                      </Button>
                    </div>

                    {location && (
                      <Alert className="border-green-200 bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Location captured: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea
                          id="address"
                          {...register("address")}
                          placeholder="Enter your complete farm address"
                          className="min-h-[80px]"
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          {...register("pincode")}
                          placeholder="6-digit pincode"
                          maxLength={6}
                          className="h-12"
                        />
                        {errors.pincode && (
                          <p className="text-sm text-red-600">{errors.pincode.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        🚜 Register Token
                      </>
                    )}
                  </Button>
                </form>

                {message && (
                  <Alert className={`mt-4 ${message.includes('✅') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    {message.includes('✅') ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={message.includes('✅') ? 'text-green-800' : 'text-red-800'}>
                      {message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Status Check Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  Check Status
                </CardTitle>
                <CardDescription>
                  Enter your mobile number to check registration status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="statusPhone">Mobile Number</Label>
                  <Input
                    id="statusPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter mobile number"
                    className="h-12"
                  />
                </div>
                <Button onClick={checkStatus} className="w-full h-12">
                  🔍 Check Status
                </Button>

                {statusData && (
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Status:</span>
                          <Badge 
                            variant={statusData.status === "Approved" ? "default" : "secondary"}
                            className={statusData.status === "Approved" ? "bg-green-600" : ""}
                          >
                            {statusData.status}
                          </Badge>
                        </div>
                        {statusData.status === "Approved" && (
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Allotted Date:</span>
                            <span className="text-sm">
                              {new Date(statusData.allottedDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Location Display */}
            {location && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Current Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm space-y-1">
                    <p><strong>Latitude:</strong> {location.latitude.toFixed(6)}</p>
                    <p><strong>Longitude:</strong> {location.longitude.toFixed(6)}</p>
                    {location.address && (
                      <p><strong>Address:</strong> {location.address}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenForm;
