import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, Phone, MapPin, Clock, ArrowRight, Upload } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 technical support for urgent issues",
      contact: "+254 700 123 456",
      hours: "Available 24/7",
      color: "primary"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed assistance and documentation",
      contact: "info@gonepharm.com",
      hours: "Response within 24 hours",
      color: "secondary"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "Innovation Plaza, Nairobi, Kenya",
      contact: "Schedule a visit",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      color: "accent"
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Get in Touch with GONEP
            </h1>
            <p className="text-lg text-muted-foreground">
              Whether you're a healthcare provider, investor, partner, or someone passionate about 
              improving African healthcare, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              const colorClass = method.color === "primary" ? "primary" : method.color === "secondary" ? "secondary" : "accent";
              
              return (
                <Card key={index} className={`text-center border-2 hover:border-${colorClass}/20 hover:shadow-lg transition-all`}>
                  <CardContent className="p-8">
                    <div className={`bg-${colorClass}/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                      <IconComponent className={`h-8 w-8 text-${colorClass}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{method.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{method.description}</p>
                    <p className={`font-semibold text-${colorClass} mb-2`}>{method.contact}</p>
                    <p className="text-xs text-muted-foreground">{method.hours}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="relative">
              {/* Maintenance Overlay */}
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                <div className="text-center p-8 max-w-sm">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Form Under Maintenance</h3>
                  <p className="text-muted-foreground mb-6">
                    Our contact form is currently being updated. Please use the alternative contact methods below or request a demo.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => window.location.href = 'tel:+254700123456'}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us: +254 700 123 456
                    </Button>
                    <Button 
                      onClick={() => window.location.href = 'mailto:info@gonepharm.com'}
                      variant="outline"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email: info@gonepharm.com
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input placeholder="Your full name" required disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" placeholder="your@email.com" required disabled />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select disabled>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Information</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="investment">Investment Inquiries</SelectItem>
                      <SelectItem value="media">Media & Press</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization (Optional)</label>
                  <Input placeholder="Your organization name" disabled />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea 
                    placeholder="Tell us about your inquiry, project, or how we can help..."
                    rows={4}
                    required
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Attach File (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-not-allowed opacity-50">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, or images up to 10MB
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold" disabled>
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>

            {/* Map & Location Info */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Visit Our Office</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">GONEP Pharmaceuticals HQ</p>
                        <p className="text-muted-foreground">Innovation Plaza, 3rd Floor</p>
                        <p className="text-muted-foreground">Nairobi, Kenya</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Office Hours</p>
                        <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Saturday: 9:00 AM - 2:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="relative h-64 bg-muted">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="GONEP office location map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                      <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-semibold">GONEP Office</p>
                      <p className="text-sm text-muted-foreground">Nairobi, Kenya</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}