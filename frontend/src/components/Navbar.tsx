import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { useDeviceInfo } from './FarmerResponsive';
import image from "./logo.png";

const Navbar = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { isBasicPhone, isMidRange } = useDeviceInfo();

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Lock scroll on mobile when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: t('navigation.home'), path: "/" },
    { name: t('navigation.token'), path: "/tokenform" },
    { name: t('navigation.priceEstimation'), path: "/price-estimation" },
    { name: t('navigation.governmentSchemes'), path: "/government-schemes" },
    { name: t('navigation.cropHealth'), path: "/crop-health" },
    { name: t('navigation.directMarket'), path: "/direct-market" },
    { name: t('navigation.land'), path: "/landselling" },
    { name: t('navigation.prices'), path: "/prices" },
    { name: "🚚 Transportation", path: "/transportation" },
    { name: "📊 Feedback Dashboard", path: "/feedback-dashboard" },
    { name: "📍 Live Tracking", path: "/live-tracking" },
    {
      name: t('navigation.weather'),
      path: "/wether",
      icon: <Cloud className="w-4 h-4 mr-1" />,
    },
    { name: "Soil Monitoring", path: "/iot-monitoring" },
    { name: "Login", path: "/farmerform" },
    { name: "WorkPlace", path: "/workplace" },
    { name: t('navigation.login'), path: "/farmerform" },
    { name: t('navigation.workplace'), path: "/workplace" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`sticky w-full top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 ${(isBasicPhone || isMidRange) ? 'pb-safe-bottom' : ''}`}>
      <div className="container mx-auto px-2 sm:px-4">
        <div className={`flex items-center justify-between ${isBasicPhone ? 'h-12' : 'h-14 md:h-16'}`}>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold overflow-hidden ${isBasicPhone ? 'h-6 w-6' : 'h-8 w-8'}`}>
                <img
                  src={image}
                  alt="KrishiHub"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className={`font-semibold ${isBasicPhone ? 'text-xs' : 'text-sm md:text-base'}`}>
                {isBasicPhone ? 'किसान हब' : t('navigation.projectKisan')}
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Hidden on basic phones */}
          {!isBasicPhone && (
            <div className="hidden md:flex items-center space-x-1 overflow-x-auto max-w-[calc(100vw-200px)]">
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  variant="ghost"
                  asChild
                  size="sm"
                  className={cn(
                    "px-2 whitespace-nowrap",
                    isActive(link.path) && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link to={link.path} className="flex items-center text-sm">
                    {link.icon && link.icon}
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          )}

          {/* Language Selector, Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {!isBasicPhone && (
              <div className="hidden md:block">
                <LanguageSelector />
              </div>
            )}
            {!isBasicPhone && <ThemeToggle />}
            {(isBasicPhone || isMidRange) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMenu}
                className="md:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Only for mid-range phones, basic phones use bottom tab */}
      {isOpen && isMidRange && (
        <div className="md:hidden py-2 px-2 bg-background border-b border-border/40 animate-in fade-in slide-in-from-top-5 duration-300 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {/* Language Selector for Mobile */}
            <div className="px-4 py-2 border-b border-border/20 mb-2">
              <LanguageSelector />
            </div>
            
            {navLinks.slice(0, 8).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-base rounded-md hover:bg-accent transition-all duration-150",
                  isActive(link.path) && "bg-accent text-accent-foreground"
                )}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
