import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, Zap, Globe, Award, Users, TrendingUp } from 'lucide-react';

const HackathonFeatures = () => {
  const features = [
    {
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      title: "AI-Powered Agriculture",
      description: "Advanced machine learning for crop prediction and disease detection",
      badge: "AI/ML"
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "IoT Integration",
      description: "Real-time sensor data from Raspberry Pi for smart farming",
      badge: "IoT"
    },
    {
      icon: <Globe className="h-8 w-8 text-green-500" />,
      title: "Multi-language Support",
      description: "Available in 20+ Indian languages for all farmers",
      badge: "Accessibility"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Market Intelligence",
      description: "Real-time price tracking and profit optimization",
      badge: "Analytics"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Community Platform",
      description: "Connect farmers, sellers, and agricultural experts",
      badge: "Social"
    },
    {
      icon: <Award className="h-8 w-8 text-red-500" />,
      title: "Government Integration",
      description: "Direct access to schemes and subsidies",
      badge: "Policy"
    }
  ];

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600 text-white">IIT Bombay Hackathon 2025</Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            🏆 Award-Winning Smart Agriculture Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionizing Indian agriculture through cutting-edge technology and AI innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-white rounded-full shadow-lg">
                  {feature.icon}
                </div>
                <Badge variant="secondary" className="mb-2">{feature.badge}</Badge>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">🚀 Innovation Highlights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-gray-600">Accuracy in Crop Prediction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">40%</div>
                <div className="text-gray-600">Water Savings with IoT</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">20+</div>
                <div className="text-gray-600">Indian Languages Supported</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonFeatures;