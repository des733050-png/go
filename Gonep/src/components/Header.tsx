import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Menu, X, ChevronDown, Calculator, Apple, Phone, Mail, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DemoRequestModal } from "./DemoRequestModal";
import { ContactModal } from "./ContactModal";
import { useTheme } from "./Router";
// GONEP Logo - using the proper GONEP logo
// Use public URL for assets
import { getImage } from "../utils/imageUtils";

const gonepLogo = getImage("logoWithoutTaglineBgWhite");

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Scroll detection for footer area
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const footerThreshold = documentHeight - 400; // 400px before footer
      
      setIsNearFooter(scrollPosition > footerThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open and handle keyboard events
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      
      // Handle escape key to close mobile menu
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navigationItems = [
    { id: 'product', label: 'Clinic at Hand', path: '/clinic-at-hand' },
    { id: 'solutions', label: 'Solutions', path: '/solutions' },
    { id: 'blogs', label: 'Blogs', path: '/blogs' },
  ];

  const aboutItems = [
    {
      id: 'who-we-are',
      label: 'Who We Are',
      path: '/about/who-we-are',
      description: 'Vision, Mission, Values & Mottos'
    },
    {
      id: 'history',
      label: 'History',
      path: '/about/history',
      description: 'Our Story & Milestones'
    },
    {
      id: 'meet-the-team',
      label: 'Meet the Team',
      path: '/about/meet-the-team',
      description: 'Leadership & Team'
    }
  ];

  const healthToolsItems = [
    {
      id: 'bmi-calculator',
      label: 'BMI Calculator',
      path: '/health-tools/bmi-calculator',
      icon: Calculator
    },
    {
      id: 'diet-recommendation',
      label: 'Diet Recommendation',
      path: '/health-tools/diet-recommendation',
      icon: Apple
    }
  ];

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isAboutActive = () => {
    return location.pathname.startsWith('/about');
  };

  const isHealthToolsActive = () => {
    return location.pathname.startsWith('/health-tools');
  };

  const handleDemoClick = () => {
    setIsDemoModalOpen(true);
    setMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b border-border shadow-lg transition-all duration-300 ${
        isNearFooter 
          ? 'bg-white/95 text-gray-900' 
          : 'bg-background/95'
      }`}>
        <div className="container max-w-full px-4 lg:px-8">
          <div className="flex justify-between items-center py-4 gap-4">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
              <img 
                src={gonepLogo} 
                alt="GONEP Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 flex-1 justify-center">
              {/* Home Link */}
              <Link
                to="/"
                className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary relative px-1 xl:px-2 py-1 whitespace-nowrap ${
                  isActivePath('/') 
                    ? 'text-primary' 
                    : isNearFooter 
                      ? 'text-gray-900 hover:text-primary' 
                      : 'text-foreground hover:scale-105'
                }`}
              >
                Home
                {isActivePath('/') && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
              
              {/* About Dropdown with Hover */}
              <div className="relative group">
                <button className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary relative px-1 xl:px-2 py-1 flex items-center space-x-1 whitespace-nowrap ${
                  isAboutActive() 
                    ? 'text-primary' 
                    : isNearFooter 
                      ? 'text-gray-900 hover:text-primary' 
                      : 'text-foreground hover:scale-105'
                }`}>
                  <span>About</span>
                  <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                  {isAboutActive() && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                
                {/* Dropdown Content */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-background border border-border shadow-lg rounded-lg w-64 py-2">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="block px-4 py-3 hover:bg-primary/10 transition-colors duration-200"
                      >
                        <div className="text-foreground font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary relative px-1 xl:px-2 py-1 whitespace-nowrap ${
                    isActivePath(item.path) 
                      ? 'text-primary' 
                      : isNearFooter 
                        ? 'text-gray-900 hover:text-primary' 
                        : 'text-foreground hover:scale-105'
                  }`}
                >
                  {item.label}
                  {isActivePath(item.path) && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Health Tools Dropdown with Hover */}
              <div className="relative group">
                <button className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary relative px-1 xl:px-2 py-1 flex items-center space-x-1 whitespace-nowrap ${
                  isHealthToolsActive() 
                    ? 'text-primary' 
                    : isNearFooter 
                      ? 'text-gray-900 hover:text-primary' 
                      : 'text-foreground hover:scale-105'
                }`}>
                  <span>Health Tools</span>
                  <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 group-hover:rotate-180 transition-transform duration-300" />
                  {isHealthToolsActive() && (
                    <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
                
                {/* Dropdown Content */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-background border border-border shadow-lg rounded-lg w-56 py-2">
                    {healthToolsItems.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Link
                          key={tool.id}
                          to={tool.path}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-primary/10 transition-colors duration-200"
                        >
                          <IconComponent className="h-4 w-4 text-primary" />
                          <span className="text-foreground font-medium">{tool.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Careers Link */}
              <Link
                to="/careers"
                className={`text-sm xl:text-base font-medium transition-all duration-300 hover:text-primary relative px-1 xl:px-2 py-1 whitespace-nowrap ${
                  isActivePath('/careers') 
                    ? 'text-primary' 
                    : isNearFooter 
                      ? 'text-gray-900 hover:text-primary' 
                      : 'text-foreground hover:scale-105'
                }`}
              >
                Careers
                {isActivePath('/careers') && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            </nav>

            {/* Right: Action Buttons and Theme Toggle */}
            <div className="flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
              {/* Theme Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 p-0 hover:bg-muted/50"
              >
                {theme === "dark" ? (
                  <Sun className={`h-4 w-4 ${isNearFooter ? 'text-gray-900' : 'text-foreground'}`} />
                ) : (
                  <Moon className={`h-4 w-4 ${isNearFooter ? 'text-gray-900' : 'text-foreground'}`} />
                )}
              </Button>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
                <Button 
                  variant="outline" 
                  onClick={handleDemoClick}
                  className="text-primary border-2 border-primary hover:bg-primary hover:text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md text-sm px-3 xl:px-4 whitespace-nowrap"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Request Demo
                </Button>
                <Button 
                  onClick={handleContactClick}
                  className="bg-secondary hover:bg-secondary/90 text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md text-sm px-3 xl:px-4 whitespace-nowrap"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>

              {/* Mobile Menu Button - Only show on smaller screens */}
              <button
                className="lg:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className={`h-6 w-6 ${isNearFooter ? 'text-gray-900' : 'text-foreground'}`} />
                ) : (
                  <Menu className={`h-6 w-6 ${isNearFooter ? 'text-gray-900' : 'text-foreground'}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <img 
                    src={gonepLogo} 
                    alt="GONEP Logo" 
                    className="h-8 w-auto"
                  />
                  <span className="text-lg font-semibold text-foreground">Menu</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted/50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Navigation Content */}
              <div className="flex-1 overflow-y-auto py-6">
                <nav className="flex flex-col space-y-2 px-4">
                  {/* Home Link */}
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActivePath('/') 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    Home
                  </Link>
                  
                  {/* About Section */}
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      About
                    </div>
                    {aboutItems.map((item) => (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                      >
                        <div className="text-foreground font-medium">{item.label}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                      </Link>
                    ))}
                  </div>

                  {/* Main Navigation Items */}
                  {navigationItems.map((item) => (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActivePath(item.path) 
                          ? 'text-primary bg-primary/10 border border-primary/20' 
                          : 'text-foreground hover:text-primary hover:bg-muted/50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  
                  {/* Health Tools Section */}
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Health Tools
                    </div>
                    {healthToolsItems.map((tool) => {
                      const IconComponent = tool.icon;
                      return (
                        <Link
                          key={tool.id}
                          to={tool.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
                        >
                          <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-foreground font-medium">{tool.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Careers Link */}
                  <Link
                    to="/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActivePath('/careers') 
                        ? 'text-primary bg-primary/10 border border-primary/20' 
                        : 'text-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    Careers
                  </Link>
                </nav>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-border space-y-3">
                <Button 
                  variant="outline" 
                  onClick={handleDemoClick}
                  className="w-full text-primary border-2 border-primary hover:bg-primary hover:text-white font-semibold transition-all duration-200"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Request Demo
                </Button>
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-secondary hover:bg-secondary/90 text-black font-semibold transition-all duration-200"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}