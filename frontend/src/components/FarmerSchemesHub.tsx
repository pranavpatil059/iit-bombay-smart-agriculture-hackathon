import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Bell, 
  Calendar, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ExternalLink,
  Download,
  Search,
  Filter,
  MapPin,
  Phone,
  Globe,
  Zap,
  Target,
  Award,
  Banknote,
  Tractor,
  Droplets,
  Leaf,
  Shield
} from 'lucide-react';

const FarmerSchemesHub = () => {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('schemes');
  const [language, setLanguage] = useState('english'); // Default to English

  // Daily Updates Data with bilingual support
  const dailyUpdates = [
    {
      id: 1,
      date: "13 Dec 2024",
      title: language === 'english' ? "PM-KISAN 16th Installment Released - ₹2000 Direct to Account" : "PM-KISAN 16वीं किस्त जारी - ₹2000 सीधे खाते में",
      description: language === 'english' ? "Prime Minister transferred ₹19,000 crore to 9.5 crore farmers' accounts" : "प्रधानमंत्री ने 9.5 करोड़ किसानों के खाते में ₹19,000 करोड़ की राशि ट्रांसफर की",
      type: "payment",
      urgent: true,
      amount: "₹2,000",
      beneficiaries: language === 'english' ? "9.5 Crore Farmers" : "9.5 करोड़ किसान"
    },
    {
      id: 2,
      date: "12 Dec 2024", 
      title: language === 'english' ? "Kisan Credit Card New Interest Rates Announced" : "Kisan Credit Card नई ब्याज दरें घोषित",
      description: language === 'english' ? "4% annual interest rate on KCC, loan up to ₹3 lakh without guarantee" : "KCC पर 4% वार्षिक ब्याज दर, 3 लाख तक का लोन बिना गारंटी",
      type: "loan",
      urgent: false,
      amount: language === 'english' ? "Up to ₹3 Lakh" : "₹3 लाख तक",
      beneficiaries: language === 'english' ? "All Eligible Farmers" : "सभी पात्र किसान"
    },
    {
      id: 3,
      date: "11 Dec 2024",
      title: language === 'english' ? "Pradhan Mantri Fasal Bima Yojana - Rabi Season Registration" : "Pradhan Mantri Fasal Bima Yojana - रबी सीजन रजिस्ट्रेशन",
      description: language === 'english' ? "Insurance registration for Rabi crops till 31st December, only 2% premium" : "रबी फसलों के लिए बीमा रजिस्ट्रेशन 31 दिसंबर तक, केवल 2% प्रीमियम",
      type: "insurance",
      urgent: true,
      amount: language === 'english' ? "2% Premium" : "2% प्रीमियम",
      beneficiaries: language === 'english' ? "Rabi Farmers" : "रबी किसान"
    },
    {
      id: 4,
      date: "10 Dec 2024",
      title: language === 'english' ? "Solar Pump Subsidy Scheme - 90% Subsidy" : "Solar Pump Subsidy Scheme - 90% सब्सिडी",
      description: language === 'english' ? "Up to 90% subsidy on solar pumps, online applications started" : "सोलर पंप पर 90% तक सब्सिडी, ऑनलाइन आवेदन शुरू",
      type: "subsidy",
      urgent: false,
      amount: language === 'english' ? "90% Subsidy" : "90% सब्सिडी",
      beneficiaries: language === 'english' ? "Small Farmers" : "छोटे किसान"
    },
    {
      id: 5,
      date: "09 Dec 2024",
      title: language === 'english' ? "MSP Rates Update - Wheat ₹2275/Quintal" : "MSP रेट्स अपडेट - गेहूं ₹2275/क्विंटल",
      description: language === 'english' ? "Minimum Support Price announced for Rabi season, ₹150 increase in wheat" : "रबी सीजन के लिए न्यूनतम समर्थन मूल्य घोषित, गेहूं में ₹150 की बढ़ोतरी",
      type: "msp",
      urgent: false,
      amount: "₹2,275/Quintal",
      beneficiaries: language === 'english' ? "Wheat Producers" : "गेहूं उत्पादक"
    }
  ];

  // Comprehensive Farmer Schemes with bilingual support
  const farmerSchemes = [
    {
      id: 1,
      name: "PM-KISAN Samman Nidhi",
      nameHindi: "प्रधानमंत्री किसान सम्मान निधि",
      description: language === 'english' ? "₹6000 per year to all landholding farmer families" : "सभी भूमिधारक किसान परिवारों को ₹6000 प्रति वर्ष",
      amount: language === 'english' ? "₹6,000/year" : "₹6,000/वर्ष",
      eligibility: language === 'english' ? "Farmers with up to 2 hectares of land" : "2 हेक्टेयर तक भूमि वाले किसान",
      applicationProcess: language === 'english' ? "Online/CSC Center" : "ऑनलाइन/CSC केंद्र",
      documents: language === 'english' ? ["Aadhaar Card", "Bank Passbook", "Land Documents"] : ["आधार कार्ड", "बैंक पासबुक", "भूमि दस्तावेज"],
      status: "Active",
      beneficiaries: language === 'english' ? "12 Crore+" : "12 करोड़+",
      category: "financial",
      lastUpdate: "13 Dec 2024",
      website: "https://pmkisan.gov.in",
      helpline: "155261"
    },
    {
      id: 2,
      name: "Kisan Credit Card (KCC)",
      nameHindi: "किसान क्रेडिट कार्ड",
      description: language === 'english' ? "Credit facility for agriculture and allied activities" : "कृषि और संबद्ध गतिविधियों के लिए क्रेडिट सुविधा",
      amount: language === 'english' ? "Up to ₹3 Lakh" : "₹3 लाख तक",
      eligibility: language === 'english' ? "All farmers (landowners/tenants)" : "सभी किसान (भूमि मालिक/किरायेदार)",
      applicationProcess: language === 'english' ? "Bank Branch/Online" : "बैंक शाखा/ऑनलाइन",
      documents: language === 'english' ? ["Aadhaar Card", "PAN Card", "Land Documents", "Bank Statement"] : ["आधार कार्ड", "पैन कार्ड", "भूमि दस्तावेज", "बैंक स्टेटमेंट"],
      status: "Active",
      beneficiaries: language === 'english' ? "7 Crore+" : "7 करोड़+",
      category: "credit",
      lastUpdate: "12 Dec 2024",
      website: "https://www.nabard.org/auth/writereaddata/tender/1608180417KCC%20Guidelines%202018-19.pdf",
      helpline: "1800-180-1551"
    },
    {
      id: 3,
      name: "Pradhan Mantri Fasal Bima Yojana",
      nameHindi: "प्रधानमंत्री फसल बीमा योजना",
      description: language === 'english' ? "Insurance for crop loss due to natural calamities" : "प्राकृतिक आपदाओं से फसल नुकसान का बीमा",
      amount: language === 'english' ? "2% Premium (Kharif), 1.5% (Rabi)" : "2% प्रीमियम (खरीफ), 1.5% (रबी)",
      eligibility: language === 'english' ? "All farmers (landowners/tenants)" : "सभी किसान (भूमि मालिक/किरायेदार)",
      applicationProcess: language === 'english' ? "Bank/Insurance Company/CSC" : "बैंक/बीमा कंपनी/CSC",
      documents: language === 'english' ? ["Aadhaar Card", "Bank Passbook", "Land Documents", "Sowing Certificate"] : ["आधार कार्ड", "बैंक पासबुक", "भूमि दस्तावेज", "बुआई प्रमाण"],
      status: "Active",
      beneficiaries: language === 'english' ? "5.5 Crore+" : "5.5 करोड़+",
      category: "insurance",
      lastUpdate: "11 Dec 2024",
      website: "https://pmfby.gov.in",
      helpline: "14447"
    },
    {
      id: 4,
      name: "PM Kusum Yojana",
      nameHindi: "प्रधानमंत्री कुसुम योजना",
      description: language === 'english' ? "Solar pumps and grid-connected solar plants" : "सोलर पंप और ग्रिड कनेक्टेड सोलर प्लांट",
      amount: language === 'english' ? "90% Subsidy" : "90% सब्सिडी",
      eligibility: language === 'english' ? "All farmers and farmer groups" : "सभी किसान और किसान समूह",
      applicationProcess: language === 'english' ? "State Nodal Agency" : "राज्य नोडल एजेंसी",
      documents: language === 'english' ? ["Aadhaar Card", "Land Documents", "Electricity Bill", "Bank Passbook"] : ["आधार कार्ड", "भूमि दस्तावेज", "बिजली बिल", "बैंक पासबुक"],
      status: "Active",
      beneficiaries: language === 'english' ? "20 Lakh+" : "20 लाख+",
      category: "energy",
      lastUpdate: "10 Dec 2024",
      website: "https://pmkusum.mnre.gov.in",
      helpline: "1800-180-3333"
    },
    {
      id: 5,
      name: "Soil Health Card Scheme",
      nameHindi: "मृदा स्वास्थ्य कार्ड योजना",
      description: language === 'english' ? "Soil testing and nutrient information" : "मिट्टी की जांच और पोषक तत्वों की जानकारी",
      amount: language === 'english' ? "Free" : "निःशुल्क",
      eligibility: language === 'english' ? "All farmers" : "सभी किसान",
      applicationProcess: language === 'english' ? "Agriculture Department/Online" : "कृषि विभाग/ऑनलाइन",
      documents: language === 'english' ? ["Aadhaar Card", "Land Documents"] : ["आधार कार्ड", "भूमि दस्तावेज"],
      status: "Active",
      beneficiaries: language === 'english' ? "22 Crore+" : "22 करोड़+",
      category: "advisory",
      lastUpdate: "09 Dec 2024",
      website: "https://soilhealth.dac.gov.in",
      helpline: "1800-180-1551"
    },
    {
      id: 6,
      name: "National Agriculture Market (e-NAM)",
      nameHindi: "राष्ट्रीय कृषि बाजार",
      description: language === 'english' ? "Online agricultural product marketing platform" : "ऑनलाइन कृषि उत्पाद विपणन प्लेटफॉर्म",
      amount: language === 'english' ? "Commission Free Trading" : "कमीशन फ्री ट्रेडिंग",
      eligibility: language === 'english' ? "All farmers and traders" : "सभी किसान और व्यापारी",
      applicationProcess: language === 'english' ? "Online Registration" : "ऑनलाइन रजिस्ट्रेशन",
      documents: language === 'english' ? ["Aadhaar Card", "Bank Passbook", "Mobile Number"] : ["आधार कार्ड", "बैंक पासबुक", "मोबाइल नंबर"],
      status: "Active",
      beneficiaries: language === 'english' ? "1.7 Crore+" : "1.7 करोड़+",
      category: "marketing",
      lastUpdate: "08 Dec 2024",
      website: "https://enam.gov.in/web/",
      helpline: "1800-270-0224"
    }
  ];

  // State-wise scheme availability
  const stateSchemes = {
    "punjab": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "Punjab Crop Loan Waiver"],
    "haryana": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "Bhavantar Bharpayee"],
    "up": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "UP Kisan Karj Rahat"],
    "maharashtra": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "Shetkari Sanman Yojana"],
    "gujarat": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "Mukhyamantri Kisan Sahay"],
    "rajasthan": ["PM-KISAN", "KCC", "PMFBY", "Kusum", "Rajasthan Kisan Karj Mafi"]
  };

  const getUpdateTypeIcon = (type) => {
    switch (type) {
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'loan': return <Banknote className="h-4 w-4" />;
      case 'insurance': return <Shield className="h-4 w-4" />;
      case 'subsidy': return <Award className="h-4 w-4" />;
      case 'msp': return <TrendingUp className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getUpdateTypeColor = (type) => {
    switch (type) {
      case 'payment': return 'bg-green-100 text-green-800';
      case 'loan': return 'bg-blue-100 text-blue-800';
      case 'insurance': return 'bg-purple-100 text-purple-800';
      case 'subsidy': return 'bg-orange-100 text-orange-800';
      case 'msp': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial': return <DollarSign className="h-5 w-5" />;
      case 'credit': return <Banknote className="h-5 w-5" />;
      case 'insurance': return <Shield className="h-5 w-5" />;
      case 'energy': return <Zap className="h-5 w-5" />;
      case 'advisory': return <Leaf className="h-5 w-5" />;
      case 'marketing': return <TrendingUp className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const filteredSchemes = farmerSchemes.filter(scheme => 
    scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.nameHindi.includes(searchTerm) ||
    scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/1200px-Emblem_of_India.svg.png" 
              alt="Government of India" 
              className="h-16 w-16 mr-4"
            />
            <div>
              <Badge className="mb-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-green-600 text-white text-lg">
                🇮🇳 {language === 'english' ? 'Government of India - Ministry of Agriculture' : 'भारत सरकार - कृषि मंत्रालय'}
              </Badge>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {language === 'english' ? 'Farmer Schemes Hub' : 'किसान योजना केंद्र'}
              </h1>
              <p className="text-gray-600 text-lg mt-2">
                {language === 'english' ? 'Daily Updates & Complete Information' : 'किसान योजना केंद्र - Daily Updates & Complete Information'}
              </p>
            </div>
          </div>
          
          {/* Language Toggle */}
          <div className="flex justify-center mt-4">
            <div className="inline-flex rounded-lg border-2 border-green-600 p-1 bg-white">
              <Button
                variant={language === 'english' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('english')}
                className={language === 'english' ? 'bg-green-600 text-white' : 'text-gray-700'}
              >
                English
              </Button>
              <Button
                variant={language === 'hindi' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('hindi')}
                className={language === 'hindi' ? 'bg-green-600 text-white' : 'text-gray-700'}
              >
                हिंदी
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg rounded-lg">
            <TabsTrigger value="updates" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              {language === 'english' ? 'Daily Updates' : 'दैनिक अपडेट'}
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              {language === 'english' ? 'All Schemes' : 'सभी योजनाएं'}
            </TabsTrigger>
            <TabsTrigger value="apply" className="flex items-center">
              <Target className="mr-2 h-4 w-4" />
              {language === 'english' ? 'Quick Apply' : 'त्वरित आवेदन'}
            </TabsTrigger>
          </TabsList>

          {/* Daily Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Bell className="mr-2 h-6 w-6" />
                    {language === 'english' ? "Today's Latest Updates" : 'आज की ताजा खबरें'}
                  </span>
                  <Badge className="bg-white/20 text-white animate-pulse">
                    LIVE
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {dailyUpdates.map((update, index) => (
                    <div key={update.id} className={`p-4 rounded-lg border-l-4 ${update.urgent ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50'} hover:shadow-lg transition-all duration-300`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`p-2 rounded-full mr-3 ${getUpdateTypeColor(update.type)}`}>
                              {getUpdateTypeIcon(update.type)}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{update.title}</h3>
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="mr-1 h-3 w-3" />
                                {update.date}
                                {update.urgent && (
                                  <Badge className="ml-2 bg-red-600 text-white text-xs">
                                    URGENT
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{update.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center">
                              <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                              <span className="font-semibold text-green-600">{update.amount}</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="mr-2 h-4 w-4 text-blue-600" />
                              <span className="font-semibold text-blue-600">{update.beneficiaries}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="ml-4">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Schemes Tab */}
          <TabsContent value="schemes" className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={language === 'english' ? "Search schemes..." : "योजना खोजें..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-gray-200 focus:border-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme, index) => (
                <Card key={scheme.id} className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-white/20 rounded-lg mr-3">
                          {getCategoryIcon(scheme.category)}
                        </div>
                        <div>
                          <div className="text-lg font-bold">{scheme.name}</div>
                          <div className="text-sm opacity-90">{scheme.nameHindi}</div>
                        </div>
                      </div>
                      <Badge className="bg-white/20 text-white">
                        {scheme.status === 'Active' ? (language === 'english' ? 'Active' : 'सक्रिय') : (language === 'english' ? 'Closed' : 'बंद')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-700 mb-4">{scheme.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">{language === 'english' ? 'Amount/Benefit' : 'राशि/लाभ'}</div>
                        <div className="font-bold text-green-600">{scheme.amount}</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">{language === 'english' ? 'Beneficiaries' : 'लाभार्थी'}</div>
                        <div className="font-bold text-blue-600">{scheme.beneficiaries}</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">{language === 'english' ? 'Eligibility:' : 'पात्रता:'}</div>
                        <div className="text-sm text-gray-600">{scheme.eligibility}</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">{language === 'english' ? 'Application Process:' : 'आवेदन प्रक्रिया:'}</div>
                        <div className="text-sm text-gray-600">{scheme.applicationProcess}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {scheme.documents.slice(0, 3).map((doc, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                      {scheme.documents.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{scheme.documents.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Last Updated: {scheme.lastUpdate}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => window.open(scheme.website.startsWith('http') ? scheme.website : `https://${scheme.website}`, '_blank')}
                        >
                          <ExternalLink className="mr-1 h-3 w-3" />
                          Apply Now
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(`tel:${scheme.helpline}`, '_self')}
                        >
                          <Phone className="mr-1 h-3 w-3" />
                          {scheme.helpline}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quick Apply Tab */}
          <TabsContent value="apply" className="space-y-6">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-6 w-6" />
                  Quick Application Portal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {farmerSchemes.slice(0, 6).map((scheme) => (
                    <div key={scheme.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          {getCategoryIcon(scheme.category)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{scheme.name}</div>
                          <div className="text-xs text-gray-600">{scheme.nameHindi}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-3">{scheme.description}</div>
                      <Button 
                        size="sm" 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          const schemeUrls = {
                            1: "https://pmkisan.gov.in",
                            2: "https://www.nabard.org/auth/writereaddata/tender/1608180417KCC%20Guidelines%202018-19.pdf",
                            3: "https://pmfby.gov.in",
                            4: "https://pmkusum.mnre.gov.in",
                            5: "https://soilhealth.dac.gov.in",
                            6: "https://enam.gov.in/web/"
                          };
                          window.open(schemeUrls[scheme.id] || scheme.website, '_blank');
                        }}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Apply Online
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                    <h4 className="font-semibold mb-3">📞 Helpline Numbers:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:155261', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        PM-KISAN: 155261
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:1800-180-1551', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        KCC: 1800-180-1551
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:14447', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        PMFBY: 14447
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:1800-180-3333', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        Kusum: 1800-180-3333
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:1800-270-0224', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        e-NAM: 1800-270-0224
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="justify-start"
                        onClick={() => window.open('tel:1800-180-1551', '_self')}
                      >
                        <Phone className="mr-2 h-3 w-3" />
                        General: 1800-180-1551
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg">
                    <h4 className="font-semibold mb-3">🌐 Quick Links:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://pmkisan.gov.in', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        PM-KISAN Portal
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://pmfby.gov.in', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        Crop Insurance
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://enam.gov.in/web/', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        e-NAM Market
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://soilhealth.dac.gov.in', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        Soil Health Card
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://pmkusum.mnre.gov.in', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        Solar Pump
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://agricoop.nic.in/', '_blank')}
                      >
                        <Globe className="mr-2 h-3 w-3" />
                        Agriculture Ministry
                      </Button>
                    </div>
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

export default FarmerSchemesHub;