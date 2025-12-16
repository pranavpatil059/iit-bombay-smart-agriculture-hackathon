
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { BarChart3, FileText, Image, ShoppingBag, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';

const Index = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "🌾 Welcome to Smart Agriculture Hub",
      description: "AI-powered farming solutions for 600M+ Indian farmers",
      duration: 5000,
    });
  }, [toast]);

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Crop Price Estimation",
      description: "Get accurate price forecasts based on your land, resources, and market trends using our AI algorithms.",
      chip: "AI-Powered",
      link: "/price-estimation",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Government Schemes",
      description: "Stay updated with the latest agricultural schemes, subsidies, and loan offers from government agencies.",
      chip: "Updated Weekly",
      link: "/government-schemes",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "Crop Health Analysis",
      description: "Upload images of your crops and receive instant health assessments and treatment recommendations.",
      chip: "Computer Vision",
      link: "/crop-health",
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Direct Market Access",
      description: "Connect directly with consumers and industries to sell your produce without intermediaries.",
      chip: "Marketplace",
      link: "/direct-market",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Farm Loan Hub",
      description: "Connect with banks offering low-interest agricultural loans. Compare rates, calculate EMI, and apply online.",
      chip: "Banking",
      link: "/farm-loans",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-green-600 text-white text-lg px-4 py-2">
            🏆 IIT Bombay AWS X Impact Hackathon 2025
          </Badge>
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            🌾 Smart Agriculture Hub
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-12">
            AI-powered farming solutions empowering <strong>600M+ Indian farmers</strong> with real-time insights, weather intelligence, and wildlife protection
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Advanced machine learning for crop analysis and predictions</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌤️</div>
              <h3 className="text-xl font-bold mb-2">Live Weather</h3>
              <p className="text-gray-600">Real-time weather data for 30+ Indian states</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🐆</div>
              <h3 className="text-xl font-bold mb-2">Wildlife Protection</h3>
              <p className="text-gray-600">AI-powered leopard conflict prevention system</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link to="/farmshield">🐆 FarmShield Pro</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/wether">🌤️ Live Weather</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/crop-health">🔬 Crop Analysis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions designed to revolutionize farming operations and increase profitability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.link} key={index} className="block hover:no-underline">
                <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      {feature.icon}
                    </div>
                    <Badge className="bg-green-600 text-white text-xs">{feature.chip}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FarmShield Pro Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-lg px-4 py-2">
            🐆 NEW: Wildlife Protection AI
          </Badge>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            FarmShield Pro - Maharashtra Edition
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI-powered wildlife risk intelligence system reducing human-leopard conflicts in Maharashtra's sugarcane belt
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg border-2 border-orange-200">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="font-bold mb-2">Real-Time Alerts</h3>
              <p className="text-sm text-gray-600">Live leopard movement tracking with &lt;2 min response time</p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-red-200">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">95% AI Accuracy</h3>
              <p className="text-sm text-gray-600">Advanced ML models trained on Maharashtra wildlife patterns</p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-yellow-200">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold mb-2">8 Districts Coverage</h3>
              <p className="text-sm text-gray-600">Junnar, Mulshi, Nashik Rural & 5 more conflict zones</p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            asChild
          >
            <Link to="/farmshield">🐆 Launch FarmShield Pro</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of farmers already using our platform to increase productivity and profitability
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
            <Link to="/price-estimation">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
