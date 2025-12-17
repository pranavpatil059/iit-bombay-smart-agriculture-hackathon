import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Phone, 
  Clock, 
  Users,
  ShoppingBag,
  Search,
  Star,
  Heart,
  Share2,
  Zap,
  Globe,
  BarChart3,
  DollarSign,
  CheckCircle,
  Truck
} from 'lucide-react';

const ModernDirectMarket = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('mumbai-markets');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mumbai Markets Live Rates - Real-time data simulation
  const [liveMarketData, setLiveMarketData] = useState([
    // Mumbai APMC Markets
    {
      id: 1,
      crop: "Onion (प्याज)",
      currentPrice: 42,
      previousPrice: 38,
      change: +4,
      changePercent: +10.53,
      market: "Vashi APMC, Navi Mumbai",
      volume: "3,200 tons",
      quality: "Medium Grade",
      lastUpdated: "1 min ago",
      trend: "up",
      buyers: 156,
      sellers: 89,
      category: "vegetables",
      marketCode: "MH001"
    },
    {
      id: 2,
      crop: "Potato (आलू)",
      currentPrice: 28,
      previousPrice: 32,
      change: -4,
      changePercent: -12.5,
      market: "Vashi APMC, Navi Mumbai",
      volume: "2,800 tons",
      quality: "Grade A",
      lastUpdated: "2 mins ago",
      trend: "down",
      buyers: 134,
      sellers: 67,
      category: "vegetables",
      marketCode: "MH001"
    },
    {
      id: 3,
      crop: "Tomato (टमाटर)",
      currentPrice: 55,
      previousPrice: 48,
      change: +7,
      changePercent: +14.58,
      market: "Dadar Wholesale Market",
      volume: "1,500 tons",
      quality: "Premium",
      lastUpdated: "3 mins ago",
      trend: "up",
      buyers: 98,
      sellers: 145,
      category: "vegetables",
      marketCode: "MH002"
    },
    {
      id: 4,
      crop: "Cauliflower (फूलगोभी)",
      currentPrice: 35,
      previousPrice: 40,
      change: -5,
      changePercent: -12.5,
      market: "Crawford Market, Mumbai",
      volume: "890 tons",
      quality: "Fresh Grade",
      lastUpdated: "1 min ago",
      trend: "down",
      buyers: 67,
      sellers: 34,
      category: "vegetables",
      marketCode: "MH003"
    },
    {
      id: 5,
      crop: "Cabbage (पत्तागोभी)",
      currentPrice: 22,
      previousPrice: 25,
      change: -3,
      changePercent: -12.0,
      market: "Mulund Wholesale Market",
      volume: "1,200 tons",
      quality: "Grade A",
      lastUpdated: "4 mins ago",
      trend: "down",
      buyers: 78,
      sellers: 56,
      category: "vegetables",
      marketCode: "MH004"
    },
    {
      id: 6,
      crop: "Green Chili (हरी मिर्च)",
      currentPrice: 85,
      previousPrice: 78,
      change: +7,
      changePercent: +8.97,
      market: "Andheri Vegetable Market",
      volume: "450 tons",
      quality: "Hot Grade",
      lastUpdated: "2 mins ago",
      trend: "up",
      buyers: 89,
      sellers: 67,
      category: "vegetables",
      marketCode: "MH005"
    },
    {
      id: 7,
      crop: "Brinjal (बैंगन)",
      currentPrice: 38,
      previousPrice: 35,
      change: +3,
      changePercent: +8.57,
      market: "Borivali Market Yard",
      volume: "780 tons",
      quality: "Medium",
      lastUpdated: "5 mins ago",
      trend: "up",
      buyers: 45,
      sellers: 78,
      category: "vegetables",
      marketCode: "MH006"
    },
    {
      id: 8,
      crop: "Okra (भिंडी)",
      currentPrice: 65,
      previousPrice: 58,
      change: +7,
      changePercent: +12.07,
      market: "Kandivali Wholesale Market",
      volume: "560 tons",
      quality: "Fresh",
      lastUpdated: "3 mins ago",
      trend: "up",
      buyers: 67,
      sellers: 45,
      category: "vegetables",
      marketCode: "MH007"
    },
    {
      id: 9,
      crop: "Carrot (गाजर)",
      currentPrice: 45,
      previousPrice: 42,
      change: +3,
      changePercent: +7.14,
      market: "Thane APMC Market",
      volume: "920 tons",
      quality: "Grade A",
      lastUpdated: "2 mins ago",
      trend: "up",
      buyers: 56,
      sellers: 34,
      category: "vegetables",
      marketCode: "MH008"
    },
    {
      id: 10,
      crop: "Spinach (पालक)",
      currentPrice: 25,
      previousPrice: 28,
      change: -3,
      changePercent: -10.71,
      market: "Kalyan Market Committee",
      volume: "340 tons",
      quality: "Fresh Leaves",
      lastUpdated: "1 min ago",
      trend: "down",
      buyers: 78,
      sellers: 89,
      category: "vegetables",
      marketCode: "MH009"
    },
    {
      id: 11,
      crop: "Coriander (धनिया)",
      currentPrice: 120,
      previousPrice: 110,
      change: +10,
      changePercent: +9.09,
      market: "Jogeshwari Vegetable Market",
      volume: "180 tons",
      quality: "Fresh Green",
      lastUpdated: "4 mins ago",
      trend: "up",
      buyers: 45,
      sellers: 23,
      category: "vegetables",
      marketCode: "MH010"
    },
    {
      id: 12,
      crop: "Ginger (अदरक)",
      currentPrice: 180,
      previousPrice: 165,
      change: +15,
      changePercent: +9.09,
      market: "Malad Wholesale Market",
      volume: "290 tons",
      quality: "Dry Grade",
      lastUpdated: "3 mins ago",
      trend: "up",
      buyers: 34,
      sellers: 56,
      category: "vegetables",
      marketCode: "MH011"
    },
    {
      id: 13,
      crop: "Garlic (लहसुन)",
      currentPrice: 220,
      previousPrice: 210,
      change: +10,
      changePercent: +4.76,
      market: "Goregaon Market Yard",
      volume: "450 tons",
      quality: "Dry Bulbs",
      lastUpdated: "2 mins ago",
      trend: "up",
      buyers: 67,
      sellers: 45,
      category: "vegetables",
      marketCode: "MH012"
    },
    {
      id: 14,
      crop: "Cucumber (खीरा)",
      currentPrice: 32,
      previousPrice: 35,
      change: -3,
      changePercent: -8.57,
      market: "Bhandup Vegetable Market",
      volume: "670 tons",
      quality: "Fresh",
      lastUpdated: "5 mins ago",
      trend: "down",
      buyers: 89,
      sellers: 67,
      category: "vegetables",
      marketCode: "MH013"
    },
    {
      id: 15,
      crop: "Bitter Gourd (करेला)",
      currentPrice: 55,
      previousPrice: 52,
      change: +3,
      changePercent: +5.77,
      market: "Vikhroli Market Committee",
      volume: "380 tons",
      quality: "Medium",
      lastUpdated: "1 min ago",
      trend: "up",
      buyers: 45,
      sellers: 78,
      category: "vegetables",
      marketCode: "MH014"
    },
    // Fruits from Mumbai Markets
    {
      id: 16,
      crop: "Banana (केला)",
      currentPrice: 45,
      previousPrice: 42,
      change: +3,
      changePercent: +7.14,
      market: "Crawford Market, Mumbai",
      volume: "2,100 tons",
      quality: "Robusta",
      lastUpdated: "2 mins ago",
      trend: "up",
      buyers: 123,
      sellers: 89,
      category: "fruits",
      marketCode: "MH003"
    },
    {
      id: 17,
      crop: "Apple (सेब)",
      currentPrice: 180,
      previousPrice: 175,
      change: +5,
      changePercent: +2.86,
      market: "Dadar Fruit Market",
      volume: "890 tons",
      quality: "Kashmir Grade",
      lastUpdated: "3 mins ago",
      trend: "up",
      buyers: 67,
      sellers: 45,
      category: "fruits",
      marketCode: "MH002"
    },
    {
      id: 18,
      crop: "Orange (संतरा)",
      currentPrice: 85,
      previousPrice: 80,
      change: +5,
      changePercent: +6.25,
      market: "Vashi APMC, Navi Mumbai",
      volume: "1,200 tons",
      quality: "Nagpur Sweet",
      lastUpdated: "1 min ago",
      trend: "up",
      buyers: 89,
      sellers: 56,
      category: "fruits",
      marketCode: "MH001"
    },
    {
      id: 19,
      crop: "Grapes (अंगूर)",
      currentPrice: 120,
      previousPrice: 115,
      change: +5,
      changePercent: +4.35,
      market: "Andheri Fruit Market",
      volume: "650 tons",
      quality: "Thompson",
      lastUpdated: "4 mins ago",
      trend: "up",
      buyers: 78,
      sellers: 34,
      category: "fruits",
      marketCode: "MH005"
    },
    {
      id: 20,
      crop: "Mango (आम)",
      currentPrice: 150,
      previousPrice: 140,
      change: +10,
      changePercent: +7.14,
      market: "Mulund Fruit Market",
      volume: "780 tons",
      quality: "Alphonso",
      lastUpdated: "2 mins ago",
      trend: "up",
      buyers: 145,
      sellers: 67,
      category: "fruits",
      marketCode: "MH004"
    }
  ]);

  // Direct seller listings
  const [directListings, setDirectListings] = useState([
    {
      id: 1,
      title: "Premium Basmati Rice",
      seller: "Krishna Organic Farms",
      location: "Karnal, Haryana",
      price: 3400,
      unit: "per quintal",
      quantity: "500 quintals",
      quality: "Export Quality",
      rating: 4.8,
      reviews: 156,
      verified: true,
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&auto=format&fit=crop&q=80",
      category: "grains",
      contact: "+91-98765-43210",
      description: "Certified organic basmati rice, aged for 2 years. Direct from farm to your doorstep.",
      features: ["Organic Certified", "Export Quality", "Aged 2 Years", "Direct Farm"],
      deliveryTime: "2-3 days",
      minOrder: "10 quintals",
      lastActive: "Online now"
    },
    {
      id: 2,
      title: "Fresh Alphonso Mangoes",
      seller: "Coastal Orchards",
      location: "Ratnagiri, Maharashtra",
      price: 800,
      unit: "per dozen",
      quantity: "200 dozens",
      quality: "Grade A+",
      rating: 4.9,
      reviews: 89,
      verified: true,
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&auto=format&fit=crop&q=80",
      category: "fruits",
      contact: "+91-87654-32109",
      description: "Handpicked Alphonso mangoes from Konkan region. Sweet, juicy and naturally ripened.",
      features: ["Handpicked", "Naturally Ripened", "GI Tagged", "Premium Quality"],
      deliveryTime: "1-2 days",
      minOrder: "5 dozens",
      lastActive: "2 hours ago"
    },
    {
      id: 3,
      title: "Organic Wheat Flour",
      seller: "Punjab Agro Mills",
      location: "Ludhiana, Punjab",
      price: 45,
      unit: "per kg",
      quantity: "10,000 kg",
      quality: "Stone Ground",
      rating: 4.7,
      reviews: 234,
      verified: true,
      image: "https://5.imimg.com/data5/SELLER/Default/2023/5/310043896/VX/HT/NI/156804476/organic-wheat-for-food-industries.webp",
      category: "grains",
      contact: "+91-76543-21098",
      description: "Stone ground organic wheat flour. No chemicals, no preservatives. Pure and healthy.",
      features: ["Stone Ground", "Organic", "No Preservatives", "Fresh Milled"],
      deliveryTime: "3-4 days",
      minOrder: "50 kg",
      lastActive: "1 hour ago"
    }
  ]);

  // Filter functions
  const filteredMarketData = liveMarketData.filter(item => 
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.crop.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.market.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredListings = directListings.filter(item =>
    (selectedCategory === 'all' || item.category === selectedCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg">
            <Globe className="mr-2 h-4 w-4" />
            {t('directMarket.realTimeMarketplace')}
          </Badge>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('directMarket.title')}
          </h1>
          <p className="text-gray-600 text-lg">{t('directMarket.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('directMarket.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-green-500"
                />
              </div>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500"
              >
                <option value="all">{t('directMarket.allCategories')}</option>
                <option value="grains">{t('directMarket.grains')}</option>
                <option value="vegetables">{t('directMarket.vegetables')}</option>
                <option value="fruits">{t('directMarket.fruits')}</option>
                <option value="cash-crops">{t('directMarket.cashCrops')}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Mumbai Markets Overview */}
        <Card className="mb-8 shadow-2xl border-0 bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">🏙️ Mumbai Live Market Rates</h2>
              <p className="text-orange-100">Real-time prices from all major Mumbai wholesale markets</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Vashi APMC</div>
                <div className="text-xs opacity-90">15 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Crawford Market</div>
                <div className="text-xs opacity-90">8 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Dadar Market</div>
                <div className="text-xs opacity-90">6 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Andheri Market</div>
                <div className="text-xs opacity-90">4 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Mulund Market</div>
                <div className="text-xs opacity-90">3 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Thane APMC</div>
                <div className="text-xs opacity-90">5 Products</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <MapPin className="h-6 w-6 mx-auto mb-2" />
                <div className="text-sm font-semibold">Kalyan Market</div>
                <div className="text-xs opacity-90">2 Products</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-lg">
            <TabsTrigger value="mumbai-markets" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              Mumbai Markets
            </TabsTrigger>
            <TabsTrigger value="live-market" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              All India
            </TabsTrigger>
            <TabsTrigger value="direct-buy" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Direct Buy
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Mumbai Markets Tab */}
          <TabsContent value="mumbai-markets" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-6 w-6" />
                    Mumbai Market Live Rates (मुंबई मंडी भाव)
                  </span>
                  <Badge className="bg-white/20 text-white animate-pulse">
                    LIVE • मुंबई
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Market-wise grouping */}
                {['Vashi APMC, Navi Mumbai', 'Crawford Market, Mumbai', 'Dadar Wholesale Market', 'Andheri Vegetable Market', 'Mulund Wholesale Market', 'Thane APMC Market'].map((marketName) => {
                  const marketItems = filteredMarketData.filter(item => item.market === marketName);
                  if (marketItems.length === 0) return null;
                  
                  return (
                    <div key={marketName} className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-orange-600" />
                        {marketName}
                        <Badge className="ml-2 bg-orange-100 text-orange-800">
                          {marketItems.length} items
                        </Badge>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {marketItems.map((item) => (
                          <div key={item.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-all duration-300 hover:shadow-lg bg-white">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-bold text-lg text-gray-800">{item.crop}</h4>
                                <p className="text-xs text-gray-500">{item.quality}</p>
                              </div>
                              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                                item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {item.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                                {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-orange-600">₹{item.currentPrice}</span>
                                <span className={`text-sm font-semibold ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {item.change > 0 ? '+' : ''}₹{item.change}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-1 text-xs">
                                <div>Volume: <strong>{item.volume}</strong></div>
                                <div>Buyers: <strong>{item.buyers}</strong></div>
                                <div>Sellers: <strong>{item.sellers}</strong></div>
                                <div className="text-gray-500">
                                  <Clock className="inline h-3 w-3 mr-1" />
                                  {item.lastUpdated}
                                </div>
                              </div>
                              
                              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                Contact Traders
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Live Market Tab */}
          <TabsContent value="live-market" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Zap className="mr-2 h-6 w-6" />
                    Live Market Prices (मंडी भाव)
                  </span>
                  <Badge className="bg-white/20 text-white animate-pulse">
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredMarketData.map((item) => (
                    <div key={item.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-all duration-300 hover:shadow-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">{item.crop}</h3>
                          <p className="text-sm text-gray-600">{item.market}</p>
                        </div>
                        <div className={`flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          item.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                          {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold text-green-600">₹{item.currentPrice.toLocaleString()}</span>
                          <span className={`text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change > 0 ? '+' : ''}₹{item.change}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Volume: <strong>{item.volume}</strong></div>
                          <div>Quality: <strong>{item.quality}</strong></div>
                          <div>Buyers: <strong>{item.buyers}</strong></div>
                          <div>Sellers: <strong>{item.sellers}</strong></div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {item.lastUpdated}
                          </span>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Direct Buy Tab */}
          <TabsContent value="direct-buy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredListings.map((listing) => (
                <Card key={listing.id} className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={listing.image} 
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 right-4">
                      {listing.verified && (
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white">
                        {listing.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
                        <p className="text-gray-600">{listing.seller}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {listing.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{listing.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">{listing.unit}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < Math.floor(listing.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="ml-2 text-sm text-gray-600">{listing.rating} ({listing.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4">{listing.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div>Quantity: <strong>{listing.quantity}</strong></div>
                      <div>Min Order: <strong>{listing.minOrder}</strong></div>
                      <div>Delivery: <strong>{listing.deliveryTime}</strong></div>
                      <div>Status: <strong className="text-green-600">{listing.lastActive}</strong></div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Seller
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-3xl font-bold">2,456</div>
                  <div className="text-sm opacity-90">Active Sellers</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-3xl font-bold">8,923</div>
                  <div className="text-sm opacity-90">Products Listed</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-3xl font-bold">₹45.2L</div>
                  <div className="text-sm opacity-90">Daily Volume</div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-3xl font-bold">+12.5%</div>
                  <div className="text-sm opacity-90">Price Growth</div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>📊 Market Insights & Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-800">🌾 Wheat Market Update</h4>
                    <p className="text-sm text-green-700">Prices showing upward trend due to export demand. Expected to rise by 5-8% in next month.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-800">🍅 Vegetable Market Alert</h4>
                    <p className="text-sm text-blue-700">Tomato prices volatile due to weather conditions. Onion prices stabilizing after recent dip.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-800">🚜 Equipment Demand</h4>
                    <p className="text-sm text-purple-700">High demand for harvesters during peak season. Book in advance for better rates.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ModernDirectMarket;