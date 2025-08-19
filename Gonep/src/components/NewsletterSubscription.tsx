import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, X } from "lucide-react";
import { newsletterAPI } from "../services/api";

interface NewsletterSubscriptionProps {
  variant?: "default" | "compact" | "popup";
  onClose?: () => void;
  onSuccessfulSubscription?: () => void;
}

export function NewsletterSubscription({ variant = "default", onClose, onSuccessfulSubscription }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage(""); // Clear any previous messages
    
    try {
      // For popup variant, include name data
      const subscriptionData = variant === "popup" 
        ? { email, firstName, lastName }
        : { email };
      
      console.log('Submitting newsletter subscription:', subscriptionData);
      
      const response = await newsletterAPI.subscribe(subscriptionData);
      console.log('Newsletter subscription response:', response);
      
      setStatus("success");
      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
      setFirstName("");
      setLastName("");
      
      // Close popup after success
      if (variant === "popup" && onClose) {
        setTimeout(() => {
          onClose();
        }, 2000);
      }
      if (onSuccessfulSubscription) {
        onSuccessfulSubscription();
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error);
      setStatus("error");
      
      // Provide more specific error messages
      if (error.message?.includes('already subscribed')) {
        setMessage("This email is already subscribed to our newsletter.");
      } else if (error.message?.includes('400')) {
        setMessage("Invalid email address. Please check and try again.");
      } else if (error.message?.includes('500')) {
        setMessage("Server error. Please try again later.");
      } else {
        setMessage("Failed to subscribe. Please check your connection and try again.");
      }
    }
  };

  // Popup variant
  if (variant === "popup") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-background border border-border rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-in fade-in-0 zoom-in-95 duration-300">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted/50 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Stay Updated with GONEP</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest healthcare innovations and updates delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">First Name *</label>
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Last Name *</label>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={status === "loading"}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe to Newsletter"}
            </Button>
          </form>

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              status === "success" 
                ? "bg-secondary/10 text-secondary-foreground border border-secondary/20" 
                : "bg-destructive/10 text-destructive-foreground border border-destructive/20"
            }`}>
              {message}
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our privacy policy and terms of service.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant (for footer)
  if (variant === "compact") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-white" />
          <h4 className="text-sm font-semibold text-white">Newsletter</h4>
        </div>
        <p className="text-xs text-white/90">
          Stay updated with healthcare innovations.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 text-sm h-8 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 border-white/20 focus:border-white/40 focus:bg-white/20"
            required
          />
          <Button 
            type="submit" 
            disabled={status === "loading"}
            size="sm"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground h-8 px-3 font-medium"
          >
            {status === "loading" ? "..." : "Join"}
          </Button>
        </form>
        {message && (
          <p className={`mt-2 text-xs ${status === "success" ? "text-secondary" : "text-red-300"}`}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        Subscribe to our newsletter for the latest healthcare innovations and updates.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === "success" ? "text-secondary" : "text-destructive"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
