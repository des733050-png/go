import { useState, useEffect } from "react";
import { DemoRequestModal } from "../DemoRequestModal";
import { NewsletterSubscription } from "../NewsletterSubscription";
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

  return (
    <div className="bg-background">
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