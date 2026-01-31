import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the notification and if 2 hours have passed
    const dismissedTimestamp = localStorage.getItem("faq-notification-dismissed");
    
    if (!dismissedTimestamp) {
      // Never dismissed, show notification
      setIsVisible(true);
    } else {
      // Check if time has passed
      const dismissedTime = parseInt(dismissedTimestamp, 10);
      const currentTime = Date.now();
      const twoHoursInMs = 60 * 6 ; // 
      
      if (currentTime - dismissedTime >= twoHoursInMs) {
        // 2 hours have passed, show notification again
        setIsVisible(true);
        // Remove the old timestamp so it can be set again when closed
        localStorage.removeItem("faq-notification-dismissed");
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Store current timestamp when dismissed
    localStorage.setItem("faq-notification-dismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-40 bg-primary text-primary-foreground shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Info className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm md:text-base">
                  <span className="font-semibold">Support page updated!</span>{" "}
                  We've added a comprehensive FAQ section.{" "}
                  <Link
                    to="/support"
                    className="underline hover:no-underline font-medium"
                  >
                    Check it out
                  </Link>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
                aria-label="Close notification"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

