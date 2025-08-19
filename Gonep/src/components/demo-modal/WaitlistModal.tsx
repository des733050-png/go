import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { EmailInput } from "../validation/EmailInput";
import { CheckCircle, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!isValidEmail || !email.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
      onClose();
    }, 3000);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setEmail("");
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-md mx-auto">
          <div className="text-center py-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-secondary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">You're on the Waitlist!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in our pilot program. We'll notify you as soon as spots become available.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader className="pb-4 border-b border-border">
          <div className="text-center">
            <div className="bg-secondary/10 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <DialogTitle className="text-xl font-bold">
              Join <span className="text-secondary">Pilot Program</span> Waitlist
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Be among the first to experience our solution
            </p>
          </div>
        </DialogHeader>

        <div className="py-5 space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <EmailInput
              value={email}
              onChange={setEmail}
              onValidationChange={setIsValidEmail}
              placeholder="your@email.com"
            />
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-4 rounded-lg border border-secondary/10">
            <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              What you'll get:
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Early access to Clinic at Hand</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Full technical support during trial</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Priority consideration for full deployment</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Exclusive pricing for pilot participants</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-border">
          <Button
            onClick={handleSubmit}
            disabled={!isValidEmail || !email.trim() || isSubmitting}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-50 font-medium py-2.5"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground mr-2"></div>
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={resetModal}
            className="w-full text-muted-foreground hover:text-foreground text-sm py-2"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
