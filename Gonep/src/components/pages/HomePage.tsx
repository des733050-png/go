import { useState, useEffect } from "react";
import { DemoRequestModal } from "../DemoRequestModal";
import { NewsletterSubscription } from "../NewsletterSubscription";
import { SEOHead } from "../SEOHead";
import {
  HeroSection,
  StatisticsSection,
  IoTFeaturesSection,
  FeaturedBlogSection,
  WhyGonepSection,
  PartnersSection,
  FinalCTASection
} from "../home";

export function HomePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNewsletterPopupOpen, setIsNewsletterPopupOpen] = useState(false);
  const [hasShownNewsletter, setHasShownNewsletter] = useState(false);

  const handleDemoRequest = () => {
    setIsDemoModalOpen(true);
  };

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownNewsletter) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show popup when user scrolls to 80% of the page
      if (scrollPosition >= documentHeight * 0.8) {
        setIsNewsletterPopupOpen(true);
        setHasShownNewsletter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownNewsletter]);

  const seoData = {
    title: "GONEP Healthcare - Portable Diagnostic Device & Point of Care Testing Solutions",
    description: "Africa's first transformative healthcare solution. GONEP's Clinic at Hand is a 3-in-1 portable diagnostic device delivering blood tests, urine analysis, and vital signs monitoring in 15 minutes. IoT healthcare solutions for rural communities across Africa.",
    keywords: [
      "portable diagnostic device",
      "point of care testing device",
      "rural healthcare solutions",
      "IoT healthcare device",
      "portable medical diagnostics",
      "Africa healthcare technology",
      "Clinic at Hand",
      "portable blood test device",
      "mobile health device",
      "point of care diagnostics",
      "healthcare IoT solutions",
      "medical device Kenya",
      "African healthcare innovation"
    ],
    canonical: "/"
  };

  return (
    <div className="bg-background">
      <SEOHead seo={seoData} />
      <HeroSection onDemoRequest={handleDemoRequest} />
      <StatisticsSection />
      <IoTFeaturesSection />
      <FeaturedBlogSection />
      <WhyGonepSection />
      <PartnersSection />
      <FinalCTASection onDemoRequest={handleDemoRequest} />

              {/* Newsletter Popup */}
        {isNewsletterPopupOpen && (
          <NewsletterSubscription 
            variant="popup"
            onClose={() => setIsNewsletterPopupOpen(false)} 
          />
        )}

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}