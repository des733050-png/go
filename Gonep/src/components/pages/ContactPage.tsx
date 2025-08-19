import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Mail, Phone, MapPin, Clock, Users, Briefcase, Heart, ArrowRight, Upload } from "lucide-react";
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

  const jobOpenings = [
    {
      title: "Senior Biomedical Engineer",
      type: "Full-time",
      location: "Nairobi, Kenya",
      department: "Engineering",
      description: "Lead the development of next-generation diagnostic devices for African healthcare."
    },
    {
      title: "Clinical Research Manager",
      type: "Full-time", 
      location: "Accra, Ghana",
      department: "Research",
      description: "Oversee clinical trials and regulatory compliance across West African markets."
    },
    {
      title: "Field Operations Specialist",
      type: "Full-time",
      location: "Lagos, Nigeria",
      department: "Operations",
      description: "Support on-ground implementation and training programs for healthcare partners."
    },
    {
      title: "Data Scientist",
      type: "Full-time",
      location: "Remote",
      department: "Technology",
      description: "Develop AI/ML models for diagnostic accuracy and population health insights."
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Get Involved with GONEP
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
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name *</label>
                    <Input placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email *</label>
                    <Input type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Product Information</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                      <SelectItem value="investment">Investment Inquiries</SelectItem>
                      <SelectItem value="media">Media & Press</SelectItem>
                      <SelectItem value="careers">Career Opportunities</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization (Optional)</label>
                  <Input placeholder="Your organization name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea 
                    placeholder="Tell us about your inquiry, project, or how we can help..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Attach File (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF, DOC, or images up to 10MB
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
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

      {/* Careers Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be part of a team that's transforming healthcare across Africa. 
              We're looking for passionate individuals who share our vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{job.title}</h3>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="secondary">{job.department}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                  
                  <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Don't see a role that fits? We're always looking for talented individuals.
            </p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Send General Application
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Partner with GONEP
              </h2>
              <p className="text-lg opacity-90">
                Whether you're an NGO looking to expand your reach, a government ministry 
                planning healthcare initiatives, or an investor interested in African healthcare, 
                we'd love to explore partnership opportunities.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">NGO Partnerships</p>
                    <p className="text-sm opacity-80">Mobile health programs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Impact Investing</p>
                    <p className="text-sm opacity-80">Healthcare innovation funding</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold px-8">
                Explore Partnerships
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}