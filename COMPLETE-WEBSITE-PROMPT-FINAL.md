# 🌾 IIT BOMBAY SMART AGRICULTURE - COMPLETE IMPLEMENTATION PROMPT

## 🎯 **SINGLE PROMPT TO CREATE EXACT REPLICA**

Create a comprehensive Smart Agriculture Platform with farmer-friendly responsive design, AI features, and feedback system. 

**LIVE REFERENCE**: https://iit-bombay-agriculture-frontend-cdvv9bw9r.vercel.app

---

## 🚀 **QUICK SETUP COMMANDS**

```bash
# Frontend Setup
npx create-vite@latest frontend --template react-ts
cd frontend
npm install react-router-dom @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-dialog @radix-ui/react-select tailwindcss @tailwindcss/forms class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate
npx tailwindcss init -p

# Backend Setup
mkdir backend && cd backend
npm init -y
npm install express mongoose cors dotenv multer jsonwebtoken bcryptjs axios socket.io
```

---

## 📱 **FARMER-RESPONSIVE DESIGN SYSTEM**

### **Device Breakpoints**
- **xs (320px)**: Basic phones - Bottom tabs, Hindi labels, large buttons
- **sm (360px)**: Standard phones - Balanced UI
- **md (640px)**: Large phones - Enhanced features
- **lg+ (768px+)**: Tablets/Desktop - Full experience

### **Key Responsive Components**

#### **1. FarmerResponsive.tsx** - Core responsive system
```typescript
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Wheat, Bot, Building2, Menu, Phone, Wifi, WifiOff } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Device Detection Hook
export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    screenWidth: window.innerWidth,
    isBasicPhone: false,
    isMidRange: false,
    isHighEnd: false,
    connectionType: '4g',
    isOnline: navigator.onLine
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      setDeviceInfo(prev => ({
        ...prev,
        screenWidth: width,
        isBasicPhone: width <= 360,
        isMidRange: width > 360 && width <= 640,
        isHighEnd: width > 640,
        connectionType: (navigator as any).connection?.effectiveType || '4g',
        isOnline: navigator.onLine
      }));
    };

    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('online', updateDeviceInfo);
    window.addEventListener('offline', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('online', updateDeviceInfo);
      window.removeEventListener('offline', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

// Farmer-Friendly Button Component
export const FarmerButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ children, onClick, variant = 'primary', size = 'medium', className = '' }) => {
  const { isBasicPhone } = useDeviceInfo();
  
  const baseClasses = `
    font-semibold rounded-lg transition-all duration-150 
    active:scale-95 shadow-lg hover:shadow-xl
    flex items-center justify-center gap-2
    ${isBasicPhone ? 'text-lg' : 'text-base'}
  `;
  
  const sizeClasses = {
    small: isBasicPhone ? 'min-h-[48px] px-4 py-3' : 'min-h-[40px] px-3 py-2',
    medium: isBasicPhone ? 'min-h-[56px] px-6 py-4' : 'min-h-[48px] px-4 py-3',
    large: isBasicPhone ? 'min-h-[64px] px-8 py-5' : 'min-h-[56px] px-6 py-4'
  };
  
  const variantClasses = {
    primary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    success: 'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800',
    warning: 'bg-orange-600 text-white hover:bg-orange-700 active:bg-orange-800'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Bottom Tab Bar for Mobile Navigation
export const BottomTabBar: React.FC = () => {
  const { isBasicPhone, isMidRange } = useDeviceInfo();
  const location = useLocation();
  
  if (!isBasicPhone && !isMidRange) return null;
  
  const tabs = [
    { icon: Home, label: 'होम', labelEn: 'Home', href: '/' },
    { icon: Wheat, label: 'फसल', labelEn: 'Crop', href: '/crop-health' },
    { icon: Bot, label: 'सार्थी', labelEn: 'Sarthi', href: '/sarthi' },
    { icon: Building2, label: 'लोन', labelEn: 'Loan', href: '/farm-loans' },
    { icon: Menu, label: 'मेन्यू', labelEn: 'Menu', href: '/menu' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-50 safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.href;
          
          return (
            <Link
              key={tab.href}
              to={tab.href}
              className={`
                flex flex-col items-center justify-center space-y-1
                transition-colors duration-200
                ${isActive 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">
                {isBasicPhone ? tab.label : tab.labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// Voice Navigation Component
export const VoiceNavigation: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  
  const startVoiceCommand = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };
      
      recognition.start();
    }
  };
  
  const handleVoiceCommand = (command: string) => {
    if (command.includes('होम') || command.includes('home')) {
      window.location.href = '/';
    } else if (command.includes('फसल') || command.includes('crop')) {
      window.location.href = '/crop-health';
    } else if (command.includes('लोन') || command.includes('loan')) {
      window.location.href = '/farm-loans';
    } else if (command.includes('सार्थी') || command.includes('sarthi')) {
      window.location.href = '/sarthi';
    }
  };
  
  return (
    <FarmerButton
      onClick={startVoiceCommand}
      variant="secondary"
      className={`fixed bottom-20 right-4 rounded-full w-14 h-14 ${isListening ? 'animate-pulse bg-red-500' : ''}`}
    >
      <Phone className="h-6 w-6" />
    </FarmerButton>
  );
};

// Responsive Grid Component
export const ResponsiveGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`
      grid gap-4
      grid-cols-1 
      xs:grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4 
      xl:grid-cols-5
      2xl:grid-cols-6
      ${className}
    `}>
      {children}
    </div>
  );
};

// Farmer-Friendly Card Component
export const FarmerCard: React.FC<{
  title: string;
  content: string;
  icon?: React.ReactNode;
  image?: string;
  onClick?: () => void;
  href?: string;
}> = ({ title, content, icon, image, onClick, href }) => {
  const { isBasicPhone } = useDeviceInfo();
  
  const cardContent = (
    <Card className="
      bg-white rounded-xl shadow-md overflow-hidden
      hover:shadow-lg transition-all duration-300
      border border-gray-100 cursor-pointer
      hover:scale-105 active:scale-95
    ">
      <div className={`
        bg-gradient-to-br from-green-400 to-blue-500
        flex items-center justify-center text-white
        ${isBasicPhone ? 'h-32' : 'h-40'}
      `}>
        {image ? (
          <img src={image} alt={title} className="w-16 h-16 object-contain" />
        ) : (
          <div className="text-4xl">{icon}</div>
        )}
      </div>
      
      <CardContent className={isBasicPhone ? 'p-4' : 'p-6'}>
        <h3 className={`
          font-bold text-gray-800 mb-2
          ${isBasicPhone ? 'text-lg' : 'text-xl'}
        `}>
          {title}
        </h3>
        <p className={`
          text-gray-600 leading-relaxed
          ${isBasicPhone ? 'text-sm' : 'text-base'}
        `}>
          {content}
        </p>
      </CardContent>
    </Card>
  );
  
  if (href) {
    return <Link to={href}>{cardContent}</Link>;
  }
  
  return <div onClick={onClick}>{cardContent}</div>;
};
```

#### **2. FeedbackSystem.tsx** - Complete feedback system
```typescript
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Send, MessageCircle, X, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FarmerButton, FarmerInput, useDeviceInfo } from './FarmerResponsive';

interface FeedbackData {
  rating: number;
  category: string;
  message: string;
  name: string;
  location: string;
  cropType: string;
  phoneModel: string;
}

export const FeedbackSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    category: '',
    message: '',
    name: '',
    location: '',
    cropType: '',
    phoneModel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { isBasicPhone, screenWidth } = useDeviceInfo();

  const categories = [
    { id: 'ui', label: 'यूजर इंटरफेस', labelEn: 'User Interface', emoji: '📱' },
    { id: 'features', label: 'फीचर्स', labelEn: 'Features', emoji: '⚡' },
    { id: 'performance', label: 'परफॉर्मेंस', labelEn: 'Performance', emoji: '🚀' },
    { id: 'accuracy', label: 'एआई सटीकता', labelEn: 'AI Accuracy', emoji: '🎯' },
    { id: 'language', label: 'भाषा सपोर्ट', labelEn: 'Language Support', emoji: '🗣️' },
    { id: 'other', label: 'अन्य', labelEn: 'Other', emoji: '💭' }
  ];

  const handleSubmit = async () => {
    if (!feedback.rating || !feedback.category || !feedback.message) {
      toast({
        title: "कृपया सभी फील्ड भरें",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const deviceInfo = {
        screenWidth,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        language: navigator.language
      };

      const feedbackWithDevice = {
        ...feedback,
        deviceInf
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedbackWithDevice)
      });

      if (response.ok) {
        toast({
          title: "🙏 धन्यवाद! Feedback भेजा गया",
          description: "Thank you! Your feedback has been submitted",
          duration: 5000
        });
        
        setFeedback({
          rating: 0,
          category: '',
          message: '',
          name: '',
          location: '',
          cropType: '',
          phoneModel: ''
        });
        setIsOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error submitting feedback",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = () => (
    <div className="flex gap-2 justify-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
          className={`transition-all duration-200 ${isBasicPhone ? 'text-3xl' : 'text-2xl'}`}
        >
          <Star 
            className={`${feedback.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
          />
        </button>
      ))}
    </div>
  );

  const QuickFeedback = () => (
    <div className="flex gap-2 justify-center mb-4">
      <FarmerButton
        onClick={() => {
          setFeedback(prev => ({ ...prev, rating: 5, category: 'features', message: 'बहुत अच्छा ऐप है! Very good app!' }));
          handleSubmit();
        }}
        variant="success"
        size="small"
      >
        <ThumbsUp className="h-4 w-4" />
        {isBasicPhone ? '👍 अच्छा' : '👍 Good'}
      </FarmerButton>
      
      <FarmerButton
        onClick={() => setIsOpen(true)}
        variant="warning"
        size="small"
      >
        <ThumbsDown className="h-4 w-4" />
        {isBasicPhone ? '👎 सुधार' : '👎 Improve'}
      </FarmerButton>
    </div>
  );

  if (!isOpen) {
    return (
      <div className={`fixed z-50 ${isBasicPhone ? 'bottom-20 right-2' : 'bottom-6 right-6'}`}>
        <div className="mb-2">
          <QuickFeedback />
        </div>
        <FarmerButton
          onClick={() => setIsOpen(true)}
          variant="primary"
          className="rounded-full shadow-lg animate-pulse"
        >
          <MessageCircle className="h-5 w-5" />
          {!isBasicPhone && 'Feedback'}
        </FarmerButton>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className={`w-full max-h-[90vh] overflow-y-auto ${isBasicPhone ? 'max-w-sm' : 'max-w-md'}`}>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className={`${isBasicPhone ? 'text-lg' : 'text-xl'}`}>
              📝 {isBasicPhone ? 'फीडबैक दें' : 'किसान फीडबैक - Farmer Feedback'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              ⭐ रेटिंग दें (Rating) *
            </label>
            <StarRating />
          </div>

          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              📂 श्रेणी (Category) *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFeedback(prev => ({ ...prev, category: cat.id }))}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    feedback.category === cat.id 
                      ? 'bg-green-100 border-green-500' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  } ${isBasicPhone ? 'text-xs' : 'text-sm'}`}
                >
                  <div>{cat.emoji} {isBasicPhone ? cat.label : cat.labelEn}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block font-medium mb-2 ${isBasicPhone ? 'text-sm' : 'text-base'}`}>
              💬 आपका संदेश (Your Message) *
            </label>
            <Textarea
              value={feedback.message}
              onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
              placeholder={isBasicPhone ? "अपनी बात लिखें..." : "अपनी राय लिखें... Share your thoughts..."}
              className={`${isBasicPhone ? 'h-20 text-sm' : 'h-24'}`}
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <FarmerInput
              label="👤 नाम (Name)"
              value={feedback.name}
              onChange={(e) => setFeedback(prev => ({ ...prev, name: e.target.value }))}
              placeholder="आपका नाम"
            />
            
            <FarmerInput
              label="📍 स्थान (Location)"
              value={feedback.location}
              onChange={(e) => setFeedback(prev => ({ ...prev, location: e.target.value }))}
              placeholder="गांव, जिला, राज्य"
            />
            
            <FarmerInput
              label="🌾 फसल (Crop Type)"
              value={feedback.cropType}
              onChange={(e) => setFeedback(prev => ({ ...prev, cropType: e.target.value }))}
              placeholder="गेहूं, धान, मक्का..."
            />
            
            <FarmerInput
              label="📱 फोन मॉडल (Phone Model)"
              value={feedback.phoneModel}
              onChange={(e) => setFeedback(prev => ({ ...prev, phoneModel: e.target.value }))}
              placeholder="Jio Phone, Redmi Note..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <FarmerButton
              onClick={() => setIsOpen(false)}
              variant="secondary"
              className="flex-1"
            >
              रद्द करें (Cancel)
            </FarmerButton>
            
            <FarmerButton
              onClick={handleSubmit}
              variant="primary"
              className="flex-1"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'भेजा जा रहा...' : 'भेजें (Send)'}
            </FarmerButton>
          </div>

          <p className={`text-gray-500 text-center ${isBasicPhone ? 'text-xs' : 'text-sm'}`}>
            🔒 आपकी जानकारी सुरक्षित है | Your data is secure
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSystem;
```

---

## 🔧 **BACKEND API IMPLEMENTATION**

### **Main Server (backend/index.js)**
```javascript
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Load routes
const airoute = require("./routes/airoutes");
const techRoutes = require("./routes/techRoutes");
const wildlifeRoutes = require("./routes/enhancedWildlifeRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const internationalFeaturesRoutes = require("./routes/internationalFeaturesRoutes");
const farmLoansRoutes = require("./routes/farmLoans");
const transportationRoutes = require("./routes/transportationRoutes");
const iotRoutes = require("./routes/iotRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

// API Routes
app.use("/api/ai", airoute);
app.use('/api/tech', techRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/wildlife', wildlifeRoutes);
app.use('/api/international', internationalFeaturesRoutes);
app.use('/api/farm-loans', farmLoansRoutes);
app.use('/api/transportation', transportationRoutes);
app.use('/api/iot', iotRoutes);
app.use('/api', feedbackRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        message: '🌾 IIT Bombay Smart Agriculture API',
        status: 'Active',
        features: [
            '🤖 AI Crop Health Detection',
            '💰 Smart Price Estimation', 
            '🏛️ Government Schemes Portal',
            '🛒 Direct Market Access',
            '🏦 Farm Loans (15+ Banks)',
            '🚚 Transportation System',
            '📡 IoT Soil Monitoring',
            '🌤️ Weather Analytics',
            '🐆 FarmShield Wildlife Protection',
            '🤖 Sarthi AI Assistant',
            '📝 Farmer Feedback System'
        ]
    });
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/agriculture';
if (mongoURI !== 'mongodb://localhost:27017/agriculture') {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Failed:', err));
}

// Error handling
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Route not found', 
        path: req.originalUrl,
        message: 'IIT Bombay Agriculture API - Route not found'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
```

### **Feedback Routes (backend/routes/feedbackRoutes.js)**
```javascript
const express = require('express');
const router = express.Router();

let feedbackData = [];

// Submit feedback
router.post('/feedback', async (req, res) => {
  try {
    const {
      rating,
      category,
      message,
      name,
      location,
      cropType,
      phoneModel,
      deviceInfo
    } = req.body;

    if (!rating || !category || !message) {
      return res.status(400).json({
        success: false,
        message: 'Rating, category, and message are required'
      });
    }

    const feedback = {
      id: Date.now().toString(),
      rating: parseInt(rating),
      category,
      message,
      name: name || 'Anonymous',
      location: location || 'Not specified',
      cropType: cropType || 'Not specified',
      phoneModel: phoneModel || 'Not specified',
      deviceInfo: deviceInfo || {},
      timestamp: new Date().toISOString(),
      status: 'new'
    };

    feedbackData.push(feedback);

    console.log('📝 New Farmer Feedback Received:');
    console.log(`⭐ Rating: ${feedback.rating}/5`);
    console.log(`📂 Category: ${feedback.category}`);
    console.log(`👤 Farmer: ${feedback.name} from ${feedback.location}`);
    console.log(`🌾 Crop: ${feedback.cropType}`);
    console.log(`📱 Device: ${feedback.phoneModel}`);
    console.log(`💬 Message: ${feedback.message}`);
    console.log('---');

    res.json({
      success: true,
      message: 'Feedback submitted successfully',
      feedbackId: feedback.id
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get feedback statistics
router.get('/feedback/stats', async (req, res) => {
  try {
    const stats = {
      total: feedbackData.length,
      averageRating: feedbackData.length > 0 
        ? (feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)
        : 0,
      categoryBreakdown: {},
      ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      deviceBreakdown: {},
      recentFeedback: feedbackData
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5)
    };

    feedbackData.forEach(f => {
      stats.categoryBreakdown[f.category] = (stats.categoryBreakdown[f.category] || 0) + 1;
      stats.ratingBreakdown[f.rating]++;
      
      const deviceType = f.deviceInfo?.screenWidth < 360 ? 'Basic Phone' : 
                        f.deviceInfo?.screenWidth < 640 ? 'Mid-Range Phone' : 'High-End Phone';
      stats.deviceBreakdown[deviceType] = (stats.deviceBreakdown[deviceType] || 0) + 1;
    });

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      mes🏆**tem! sysback  feedgn, andve desi responsi features,allform with culture Platy Smart Agrihe IIT Bombaa of treplicct the exacreates  This PI

**🌾th backend Acel wier Live on Voyed**:ction DeploduPr
✅ **cexperienapp-like ene mode, lidy**: Off**PWA Reational
✅ ds funce comman: Hindi voicNavigation** **Voice ction
✅colle feedback te farmer: Complek System**dbac
✅ **FeetoringIoT moniking, e tractures**: LivFeame til-ea✅ **Rpported
anks suIndian b: 15+ ion**g IntegratBankin
✅ ** workingedictionh, price prltea h Crop Features**: **AIort
✅e suppdian languag InleteCompges**: ngua22 La
✅ **nspx screeo 2560on 320px tWorks Design**: ve onsi

✅ **Resp CRITERIA**CESS
## 🎯 **SUC-
`

--s
`` keyCRET, AWS JWT_SEGO_URI,d: MONckenRL
# Ba_UE_APId: VITontenes
# Frment Variablnvironod

# Eercel --prbackend
voy
cd ackend Depl
# Bcel --prod
d
ver run builtend
npmoy
cd fronplld & Derontend Bui```bash
# F
S**
ANDNT COMMEPLOYME
## 🚀 **D
---
s
 endpointalchnicjs** - Teoutes.8. **techReatures
 - Demo fnRoutes.js**hackathoem
7. **k systedbac- Feoutes.js** backRed
6. **fetionldlife detecs.js** - WiRouteedWildlifehanc*en *
5.yticsa, anal Sensor dat.js** -es4. **iotRoutg
live trackinking, .js** - BoonRoutestatio*transporator
3. *loan calculntegration, Banking ioans.js** - 
2. **farmLnedictioce prealth, priop h cr.js** - AIutes*airo *:**

1.Requiredes kend Rout### **Bac

portes supguaglanndian x** - 22 Iext.tseContLanguagon
14. **ge navigatiulti-langua.tsx** - Mbar
13. **Navonatiigive navresponswith out Main layt.tsx** - yount
12. **Lasistaot ashatb cAI - arthi.tsx**1. **Son system
1protectiildlife * - Wtsx*FarmShield.. **ecasts
10cs and forytiWeather analtsx** - **Weather.ard
9.  dashbo sensor Real-timeng.tsx** -riIoTMonitoem
8. **oking systUber-like bo.tsx** - nsportation*Tra
7. *n banks)5+ India(1tem anking sys** - Bns.tsx **FarmLoaings
6.st litplace withMarke.tsx** - arketirectMters
5. **Dth filportal wis Schemex** - es.tsntSchem **Governmediction
4. price pre- Markettion.tsx** stima
3. **PriceEmage upload with itectiondisease de* - AI alth.tsx*ropHegn
2. **Consive desiesp features, rero,.tsx)** - H (Index. **Homepagered:**

1equiomponents Res & C**All Pag## 
#
**ENTATIONTURE IMPLEMFEACOMPLETE ## 🌐 **

---

er;
```routxports = ule.e});

mod});
  }
r'
    rver erronternal se'Isage: 