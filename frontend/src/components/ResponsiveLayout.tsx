import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, className }) => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      
      // Device type detection
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      // Low-end device detection (common farmer phone specs)
      const isLowEnd = (
        width <= 480 || // Small screen
        height <= 800 || // Short screen
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        (navigator as any).deviceMemory <= 2 // Low RAM (if available)
      );
      
      setIsLowEndDevice(isLowEnd);
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  // Adaptive styles based on device capabilities
  const getAdaptiveStyles = () => {
    const baseStyles = "w-full min-h-screen";
    
    if (isLowEndDevice) {
      return cn(
        baseStyles,
        "text-base", // Larger text for readability
        "p-2", // Reduced padding to save space
        "space-y-3", // Tighter spacing
        className
      );
    }
    
    switch (deviceType) {
      case 'mobile':
        return cn(
          baseStyles,
          "text-sm sm:text-base",
          "p-3 sm:p-4",
          "space-y-4",
          className
        );
      case 'tablet':
        return cn(
          baseStyles,
          "text-base md:text-lg",
          "p-4 md:p-6",
          "space-y-6",
          className
        );
      case 'desktop':
        return cn(
          baseStyles,
          "text-lg",
          "p-6 lg:p-8",
          "space-y-8",
          className
        );
      default:
        return cn(baseStyles, className);
    }
  };

  return (
    <div className={getAdaptiveStyles()}>
      {/* Device info for debugging (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-0 right-0 bg-black/80 text-white text-xs p-2 z-50">
          <div>Device: {deviceType}</div>
          <div>Size: {screenSize.width}x{screenSize.height}</div>
          <div>Low-end: {isLowEndDevice ? 'Yes' : 'No'}</div>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default ResponsiveLayout;