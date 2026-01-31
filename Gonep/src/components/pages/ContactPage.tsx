import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, Phone, MapPin, Clock, ArrowRight, Upload } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { SEOHead } from "../SEOHead";
import { SchemaMarkup } from "../SchemaMarkup";

export function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "24/7 technical support for urgent issues",
      contact: "+254 707 231 654",
      hours: "Available 24/7",
      color: "primary",
      action: () => window.open('tel:+254707231654')
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed assistance and documentation",
      contact: "info@gonepharm.com",
      hours: "Response within 24 hours",
      color: "secondary",
      action: () => window.open('mailto:info@gonepharm.com')
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      description: "2nd Floor, Chandaria Innovation Centre Building, Kenya",
      contact: "Schedule a visit",
      hours: "Mon-Fri: 8:00 AM - 6:00 PM",
      color: "accent",
      action: () => window.open('https://maps.google.com/?q=Chandaria+Innovation+Centre+Building+Kenya', '_blank')
    }
  ];

  const seoData = {
    title: "Contact GONEP Healthcare - Get Involved & Request Demo",
    description: "Contact GONEP Healthcare for partnerships, demo requests, sales inquiries, or support. Located in Kenya at Chandaria Innovation Centre. Phone: +254 707 231 654 | Email: info@gonepharm.com",
    keywords: [
      "contact GONEP Healthcare",
      "GONEP Healthcare contact",
      "request demo Clinic at Hand",
      "healthcare partnership",
      "medical device sales",
      "GONEP Healthcare Kenya",
      "healthcare technology contact"
    ],
    canonical: "/contact"
  };

  return (
    <div className="bg-background">
      <SEOHead seo={seoData} />
      <SchemaMarkup type="localBusiness" />
      {/* Hero Section */}
      <section className="bg-muted/30 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Contact / Get Involved
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect with <strong>GONEP Healthcare</strong> for <strong>healthcare partnerships</strong>, <strong>demo requests</strong>, <strong>medical device inquiries</strong>, and <strong>healthcare technology collaborations</strong>. Whether you're a <strong>healthcare provider</strong>, <strong>investor</strong>, <strong>NGO partner</strong>, or someone passionate about 
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
                <Card 
                  key={index} 
                  className={`text-center border-2 hover:border-${colorClass}/20 hover:shadow-lg transition-all cursor-pointer`}
                  onClick={method.action}
                >
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
                      onClick={() => window.location.href = 'tel:+254707231654'}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us: +254 707 231 654
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
                      <SelectItem value="partnership">Partner With Us</SelectItem>
                      <SelectItem value="demo">Request Demo / Trial Unit</SelectItem>
                      <SelectItem value="investment">Invest in GONEP</SelectItem>
                      <SelectItem value="media">Press & Media Inquiry</SelectItem>
                      <SelectItem value="careers">Career Opportunities</SelectItem>
                      <SelectItem value="product">Product Information</SelectItem>
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
                        <p className="text-muted-foreground">2nd Floor, Chandaria Innovation Centre Building</p>
                        <p className="text-muted-foreground">Kenya</p>
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

              {/* Interactive Map */}
              <Card className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Our Location</CardTitle>
                </CardHeader>
                <div className="relative h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199999999997!2d36.8175!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMy4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GONEP Office Location"
                  />
                </div>
                <CardContent className="p-4">
                  <Button
                    onClick={() => window.open('https://maps.google.com/?q=Chandaria+Innovation+Centre+Building+Kenya', '_blank')}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Open in Google Maps
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}