import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NewsletterSubscription } from "./NewsletterSubscription";
import logoWithoutTagline from "../assets/logo without tagline bg white.jpeg";

export function Footer() {
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (path: string) => {
    if (location.pathname === path) {
      // If on the same page, just scroll to top
      scrollToTop();
    } else {
      // If navigating to different page, scroll to top after navigation
      setTimeout(scrollToTop, 100);
    }
  };

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Clinic at Hand", path: "/clinic-at-hand" },
    { label: "Solutions", path: "/solutions" },
    { label: "Blogs", path: "/blogs" },
    { label: "Contact", path: "/contact" },
    { label: "Careers", path: "/careers" },
    { label: "Media", path: "/media", comingSoon: true },
    { label: "Support", path: "/support", comingSoon: true },
  ];

  const services = [
    { label: "Diagnostic Solutions", path: "/solutions#diagnostic-solutions" },
    { label: "Training Programs", path: "/solutions#training-programs" },
    { label: "Technical Support", path: "/solutions#technical-support" },
    { label: "Data Analytics", path: "/solutions#data-analytics" },
    { label: "Partnership Programs", path: "/solutions#partnership-programs" },
    { label: "Consulting Services", path: "/solutions#consulting-services" }
  ];

  const partnershipLinks = [
    { label: "Partner With Us", path: "/contact" },
    { label: "Schedule Consultation", path: "/contact" },
    { label: "Request Demo", path: "/contact" },
    { label: "Investment Opportunities", path: "/contact" },
    { label: "Healthcare Partnerships", path: "/contact" },
    { label: "Distribution Partnerships", path: "/contact" }
  ];

  return (
    <footer className="text-white bg-gradient-to-br from-primary via-primary/90 to-accent">
      <div className="container">
        {/* Main Footer Content */}
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <img 
                    src={logoWithoutTagline} 
                    alt="GONEP Pharmaceuticals Logo" 
                    className="h-12 w-auto"
                  />
                  <div>
                    <div className="text-3xl font-bold text-white">GONEP</div>
                    <div className="text-white font-medium">Pharmaceuticals</div>
                  </div>
                </div>
                <p className="mt-4 leading-relaxed text-white/90">
                  Transforming African healthcare through innovative diagnostic solutions. 
                  Bringing quality healthcare to every community across the continent.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/g-one-pharmaceuticals/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 h-auto hover:bg-white/20 text-white/90 hover:text-white transition-colors rounded-md"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/gonep_pharmaceauticals/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 h-auto hover:bg-white/20 text-white/90 hover:text-white transition-colors rounded-md"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/Gonepharmaceuticals" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 h-auto hover:bg-white/20 text-white/90 hover:text-white transition-colors rounded-md"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path} className="flex items-center justify-between">
                    <Link 
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className="text-white/90 hover:text-white transition-colors text-left"
                    >
                      {link.label}
                    </Link>
                    {link.comingSoon && (
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium animate-pulse">
                        Coming Soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path}
                      onClick={() => handleLinkClick(service.path)}
                      className="text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnership & Consultation */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Partnership & Consultation</h4>
              <ul className="space-y-3">
                {partnershipLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className="text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 flex-shrink-0 mt-1 text-white" />
                    <div className="text-white/90">
                      <button 
                        onClick={() => window.open('https://maps.google.com/?q=Chandaria+Innovation+Centre+Building+Kenya', '_blank')}
                        className="font-medium hover:text-white transition-colors cursor-pointer text-left"
                      >
                        2nd Floor, Chandaria Innovation Centre Building
                      </button>
                      <div>Kenya</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 flex-shrink-0 text-white" />
                    <button 
                      onClick={() => window.open('tel:+254707231654')}
                      className="text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      +254 707 231 654
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 flex-shrink-0 text-white" />
                    <button 
                      onClick={() => window.open('mailto:info@gonepharm.com')}
                      className="text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      info@gonepharm.com
                    </button>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                <NewsletterSubscription variant="compact" />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20" />

        {/* Bottom Footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/90">
              © {new Date().getFullYear()} GONEP Pharmaceuticals. All rights reserved.
            </div>
            
            <div className="text-white/70 text-xs">
              Developed with ❤️ by <span className="font-medium">GONEP Development Team</span>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <button className="text-white/90 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/90 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-white/90 hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}