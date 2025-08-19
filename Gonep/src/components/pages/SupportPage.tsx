import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Mail, Phone, MessageCircle, Download, BookOpen, Users, ArrowRight } from "lucide-react";

export function SupportPage() {
  const faqs = [
    {
      category: "Setup",
      items: [
        {
          question: "How long does it take to set up the Clinic at Hand device?",
          answer: "The initial setup takes approximately 15-20 minutes. Our device comes pre-configured with AI algorithms and only requires basic power connection and user account setup. Detailed setup instructions are included in the package."
        },
        {
          question: "What are the technical requirements for installation?",
          answer: "The device requires a standard power outlet (100-240V) and can operate in temperatures from 10°C to 40°C. No special infrastructure is needed. Optional WiFi connection enhances functionality but is not required for basic operation."
        },
        {
          question: "Do I need internet connectivity for the device to work?",
          answer: "No, the Clinic at Hand operates fully offline. Internet connectivity is optional and only used for software updates and cloud data synchronization when available."
        }
      ]
    },
    {
      category: "Operation",
      items: [
        {
          question: "How accurate are the diagnostic results?",
          answer: "Our clinical trials show 95%+ accuracy rates across all three diagnostic functions. The AI algorithms have been trained on diverse African patient populations to ensure reliable results across different demographics."
        },
        {
          question: "What types of tests can the device perform?",
          answer: "The device performs blood glucose testing, blood pressure monitoring, and comprehensive urine analysis including protein, glucose, ketones, and infection markers. Results are available within 15 minutes."
        },
        {
          question: "How many tests can be performed per day?",
          answer: "The device can handle 50-80 patient tests per day depending on the test mix. Each test takes 15 minutes including sample processing and result generation."
        }
      ]
    },
    {
      category: "Maintenance",
      items: [
        {
          question: "What maintenance is required?",
          answer: "Daily cleaning with provided sanitizing wipes, weekly calibration check (automated), and monthly deep cleaning following our maintenance protocol. Consumable supplies need replenishment every 200-300 tests."
        },
        {
          question: "How often do consumable supplies need replacement?",
          answer: "Test strips and reagents typically last for 200-300 tests. The device will alert you when supplies are running low. We offer subscription-based automatic replenishment services."
        },
        {
          question: "What is the warranty coverage?",
          answer: "All devices come with a 2-year comprehensive warranty covering parts, labor, and remote technical support. Extended warranty options up to 5 years are available."
        }
      ]
    },
    {
      category: "Training",
      items: [
        {
          question: "How much training is required to operate the device?",
          answer: "Basic operation can be learned in 2-3 hours. We provide comprehensive training materials, video tutorials, and on-site training for healthcare teams. No specialized technical background is required."
        },
        {
          question: "Is ongoing training support available?",
          answer: "Yes, we offer continuous learning resources including online modules, monthly webinars, and access to our technical support team. New feature training is provided with software updates."
        }
      ]
    }
  ];

  const supportResources = [
    {
      title: "Quick Start Guide",
      description: "Step-by-step setup and first-use instructions",
      type: "PDF Guide",
      icon: BookOpen
    },
    {
      title: "Training Materials",
      description: "Comprehensive training videos and presentations",
      type: "Video Library",
      icon: Users
    },
    {
      title: "Maintenance Manual",
      description: "Complete maintenance and troubleshooting guide",
      type: "PDF Manual",
      icon: Download
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Support & Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Get the help you need to maximize your Clinic at Hand experience. 
              From setup to advanced features, we're here to support your healthcare mission.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-2 hover:border-primary/20 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                <p className="text-muted-foreground mb-4">
                  24/7 technical support for urgent issues
                </p>
                <p className="font-semibold text-primary">+254 700 123 456</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-secondary/20 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed technical assistance and documentation
                </p>
                <p className="font-semibold text-secondary">support@gonepharm.com</p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-accent/20 hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-4">
                  Instant help during business hours
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Support Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Submit Support Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="setup">Setup & Installation</SelectItem>
                    <SelectItem value="operation">Device Operation</SelectItem>
                    <SelectItem value="maintenance">Maintenance & Repairs</SelectItem>
                    <SelectItem value="training">Training & Education</SelectItem>
                    <SelectItem value="supplies">Consumable Supplies</SelectItem>
                    <SelectItem value="billing">Billing & Account</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Device Serial Number (if applicable)</label>
                <Input placeholder="e.g., GONEP-CAH-2024-001234" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Describe your issue</label>
                <Textarea 
                  placeholder="Please provide detailed information about the issue you're experiencing..."
                  rows={4}
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Submit Support Request
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about setup, operation, and maintenance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h3 className="text-2xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                  {category.category}
                </h3>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.items.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-white border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Support Resources
            </h2>
            <p className="text-lg text-muted-foreground">
              Download helpful guides and access training materials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportResources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <div className="text-sm text-muted-foreground mb-4">{resource.type}</div>
                    <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact for Advanced Support */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Advanced Technical Support?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our technical specialists are available for on-site support, custom training, 
            and specialized implementation assistance.
          </p>
          <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
            Contact Technical Specialists
          </Button>
        </div>
      </section>
    </div>
  );
}