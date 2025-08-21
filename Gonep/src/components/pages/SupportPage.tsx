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
      category: "Coming Soon",
      items: [
        {
          question: "FAQ section is under maintenance",
          answer: "We're currently updating our FAQ section with the latest information. Please use our contact methods below for immediate support."
        }
      ]
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Support & FAQs
            </h1>
            <p className="text-lg text-muted-foreground">
              Help new or potential users navigate product usage smoothly. 
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
                <p className="font-semibold text-primary">+254 707 231 654</p>
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
                <p className="font-semibold text-secondary">info@gonepharm.com</p>
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
          <div className="relative max-w-2xl mx-auto">
            <Card className="opacity-50 blur-sm pointer-events-none">
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

            {/* Maintenance Message Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Support Form Under Maintenance</h3>
                <p className="text-yellow-700">
                  Our support form is currently being updated. Please use the contact methods above for immediate assistance.
                </p>
              </div>
            </div>
          </div>
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
              We will upload resources for you soon. Please be patient.
            </p>
          </div>

          <div className="text-center p-12 bg-muted/30 rounded-lg">
            <div className="bg-primary/10 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Download className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Resources Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're currently preparing comprehensive support resources including guides, manuals, and training materials. 
              Please use our contact methods above for immediate support.
            </p>
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
          <div className="space-y-4">
            <Button 
              size="lg" 
              variant="secondary" 
              disabled
              className="bg-secondary/50 text-secondary-foreground/50 font-semibold cursor-not-allowed"
            >
              Contact Technical Specialists
            </Button>
            <div className="text-sm opacity-90">
              <p>Contact us at: <span className="font-semibold">+254 707 231 654</span></p>
              <p>Email: <span className="font-semibold">info@gonepharm.com</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}