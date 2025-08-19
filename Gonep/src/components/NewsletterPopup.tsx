import { useState, useEffect } from "react";
import { NewsletterSubscription } from "./NewsletterSubscription";

export function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    // Check if popup was already shown today or user has subscribed
    const today = new Date().toDateString();
    const lastShown = localStorage.getItem('gonep-newsletter-popup-date');
    const hasSubscribed = localStorage.getItem('gonep-newsletter-subscribed');
    
    if (lastShown === today || hasSubscribed === 'true') {
      setHasShown(true);
      return;
    }

    // Wait 5 seconds before allowing popup to show
    const timer = setTimeout(() => {
      setCanShow(true);
    }, 5000);

    const handleScroll = () => {
      if (hasShown || !canShow) return; // Only show once per session and after delay

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      // Show popup when user scrolls to 90% of the page
      if (scrollPercentage >= 0.9) {
        setShowPopup(true);
        setHasShown(true);
        // Remember that popup was shown today
        localStorage.setItem('gonep-newsletter-popup-date', today);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasShown, canShow]);

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleSuccessfulSubscription = () => {
    // Mark user as subscribed so popup won't show again
    localStorage.setItem('gonep-newsletter-subscribed', 'true');
    setShowPopup(false);
  };

  // Don't render anything if popup shouldn't be shown
  if (!showPopup) {
    return null;
  }

  return (
    <NewsletterSubscription 
      variant="popup" 
      onClose={handleClose}
      onSuccessfulSubscription={handleSuccessfulSubscription}
    />
  );
}
