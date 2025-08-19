import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Mail, Phone, MapPin, Clock, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: "+254 700 123 456",
      action: "tel:+254700123456",
      copyValue: "+254700123456"
    },
    {
      icon: Mail,
      label: "Email",
      value: "info@gonepharm.com",
      action: "mailto:info@gonepharm.com",
      copyValue: "info@gonepharm.com"
    },
    {
      icon: MapPin,
      label: "Office",
      value: "Innovation Plaza, Nairobi",
      action: "https://maps.google.com",
      copyValue: "Innovation Plaza, Nairobi, Kenya"
    }
  ];

  const handleCopy = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleAction = (action: string) => {
    if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.location.href = action;
    } else {
      window.open(action, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-xl font-bold">
            Contact <span className="text-primary">GONEP</span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Get in touch with our team
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Contact Methods - Compact */}
          <div className="space-y-3">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-foreground">{contact.value}</p>
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                    </div>
                  </div>

                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(contact.copyValue, contact.label)}
                      className="p-1.5 h-auto"
                    >
                      {copiedField === contact.label ? (
                        <span className="text-xs text-secondary">✓</span>
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleAction(contact.action)}
                      className="p-1.5 h-auto"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Office Hours - Compact */}
          <div className="bg-muted/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Office Hours</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mon - Fri</span>
                <span className="text-foreground">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="text-foreground">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="text-foreground">Emergency Only</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => handleAction('tel:+254700123456')}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Phone className="mr-1 h-3 w-3" />
              Call
            </Button>
            <Button
              onClick={() => handleAction('mailto:info@gonepharm.com')}
              size="sm"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <Mail className="mr-1 h-3 w-3" />
              Email
            </Button>
          </div>

          {/* Emergency Note - Compact */}
          <div className="text-center text-xs text-muted-foreground bg-accent/10 p-2 rounded">
            <span className="font-medium">24/7 Emergency Support</span> available for urgent technical issues
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}