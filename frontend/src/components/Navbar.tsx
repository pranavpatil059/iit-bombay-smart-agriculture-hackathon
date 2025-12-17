import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Cloud } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import image from "./logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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
    { name: "Home", path: "/" },
    { name: "Token", path: "/tokenform" },
    { name: "Price Estimation", path: "/price-estimation" },
    { name: "Government Schemes", path: "/government-schemes" },
    { name: "Crop Health", path: "/crop-health" },
    { name: "Direct Market", path: "/direct-market" },
    { name: "Land", path: "/landselling" },
    { name: "Prices", path: "/prices" },
    {
      name: "Weather",
      path: "/wether",
      icon: <Cloud className="w-4 h-4 mr-1" />,
    },
    { name: "Soil Monitoring", path: "/iot-monitoring" },
    { name: "Login", path: "/farmerform" },
    { name: "WorkPlace", path: "/workplace" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky w-full top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold overflow-hidden">
                <img
                  src={image}
                  alt="KrishiHub"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="font-semibold text-sm md:text-base">
                Project Kisan
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
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

          {/* Mobile Menu Toggle & Theme Switch */}
          <div className="flex items-center space-x-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden py-2 px-2 bg-background border-b border-border/40 animate-in fade-in slide-in-from-top-5 duration-300 max-h-[70vh] overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm rounded-md hover:bg-accent transition-all duration-150",
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
