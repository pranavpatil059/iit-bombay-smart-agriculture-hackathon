import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, Wheat, Bot, Building2, Menu, Phone, Wifi, WifiOff, Volume2, VolumeX, Sun, Moon, Zap, Battery, Signal } from 'lucide-react';
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

// Farmer-Friendly Input Component
export const FarmerInput: React.FC<{
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}> = ({ label, placeholder, value, onChange, type = 'text' }) => {
  const { isBasicPhone } = useDeviceInfo();
  
  return (
    <div className="space-y-2">
      <label className={`font-medium text-gray-700 ${isBasicPhone ? 'text-lg' : 'text-base'}`}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 border-2 border-gray-300 rounded-lg
          focus:border-green-500 focus:ring-2 focus:ring-green-200
          placeholder:text-gray-400 transition-colors
          ${isBasicPhone ? 'h-14 text-lg' : 'h-12 text-base'}
        `}
      />
    </div>
  );
};
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
      {/* Icon/Image Section */}
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
      
      {/* Content Section */}
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

// Network Status Indicator
export const NetworkStatus: React.FC = () => {
  const { isOnline, connectionType } = useDeviceInfo();
  
  if (isOnline) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white p-2 text-center z-50">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          📶 ऑफलाइन मोड - Offline Mode
        </span>
      </div>
    </div>
  );
};

// Optimized Image Component
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className = '' }) => {
  const [loaded, setLoaded] = useState(false);
  const { connectionType } = useDeviceInfo();
  
  const isSlowConnection = ['slow-2g', '2g'].includes(connectionType);
  
  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={isSlowConnection ? src.replace('.jpg', '_compressed.jpg') : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

// FINAL SOLUTION - MANUAL VOICE RECOGNITION
export const VoiceNavigation: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  
  // MANUAL COMMAND EXECUTION - NO SPEECH API
  const manualCommands = [
    { name: 'Crop Health', hindi: 'फसल स्वास्थ्य', url: '/crop-health' },
    { name: 'Home', hindi: 'होम पेज', url: '/' },
    { name: 'Farm Loans', hindi: 'किसान लोन', url: '/farm-loans' },
    { name: 'Weather', hindi: 'मौसम', url: '/weather' },
    { name: 'Market', hindi: 'मार्केट', url: '/direct-market' },
    { name: 'Price', hindi: 'कीमत', url: '/price-estimation' },
    { name: 'Feedback', hindi: 'फीडबैक', url: '/feedback-dashboard' }
  ];
  
  const [showCommands, setShowCommands] = useState(false);
  
  const executeCommand = (url: string, name: string) => {
    setTranscript(`✅ Opening ${name}...`);
    setShowCommands(false);
    
    setTimeout(() => {
      window.location.href = url;
    }, 800);
  };
  
  const startVoiceCommand = () => {
    // SHOW MANUAL COMMAND SELECTION
    setShowCommands(true);
    setTranscript('Select a command:');
  };
  
  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* COMMAND SELECTION MODAL */}
      {showCommands && (
        <div className="mb-4 bg-white rounded-xl shadow-2xl p-4 w-64 border-2 border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-blue-600">🎤 Voice Commands</h3>
            <button 
              onClick={() => setShowCommands(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {manualCommands.map((cmd, index) => (
              <button
                key={index}
                onClick={() => executeCommand(cmd.url, cmd.name)}
                className="w-full text-left p-3 rounded-lg border hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <div className="font-medium text-gray-800">{cmd.name}</div>
                <div className="text-sm text-gray-500">{cmd.hindi}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* STATUS DISPLAY */}
      {transcript && !showCommands && (
        <div className="mb-2 bg-white rounded-lg shadow-xl p-4 max-w-sm border-2 border-green-200">
          <div className="text-xs font-bold text-green-600 mb-2">
            🎤 VOICE ASSISTANT
          </div>
          <div className="text-sm font-medium text-gray-800">
            {transcript}
          </div>
        </div>
      )}
      
      {/* VOICE BUTTON */}
      <button
        onClick={startVoiceCommand}
        className="w-16 h-16 rounded-full shadow-2xl border-4 border-white bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-all duration-200 transform hover:scale-105 active:scale-95"
      >
        <Phone className="h-8 w-8" />
      </button>
      
      {/* HELP TOOLTIP */}
      <div className="absolute bottom-20 right-0 bg-black bg-opacity-90 text-white text-xs p-3 rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
        <div className="font-bold mb-1">🎤 CLICK FOR COMMANDS</div>
        <div>Manual voice navigation</div>
        <div>No speech recognition issues!</div>
      </div>
    </div>
  );
};

// UI Complexity Toggle
export const UIComplexityToggle: React.FC<{
  children: (simpleMode: boolean) => React.ReactNode;
}> = ({ children }) => {
  const [simpleMode, setSimpleMode] = useState(true);
  const { isBasicPhone } = useDeviceInfo();
  
  // Force simple mode on basic phones
  useEffect(() => {
    if (isBasicPhone) {
      setSimpleMode(true);
    }
  }, [isBasicPhone]);
  
  return (
    <div>
      {!isBasicPhone && (
        <div className="fixed top-20 right-4 z-40">
          <FarmerButton
            onClick={() => setSimpleMode(!simpleMode)}
            size="small"
            variant="secondary"
          >
            {simpleMode ? '🔧 एडवांस' : '📱 सिंपल'}
          </FarmerButton>
        </div>
      )}
      {children(simpleMode || isBasicPhone)}
    </div>
  );
};