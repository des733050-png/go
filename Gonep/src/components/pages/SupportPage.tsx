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
      category: "About GONEP Healthcare",
      items: [
        {
          question: "What is GONEP Healthcare and what does it stand for?",
          answer: "GONEP Healthcare is Kenya's first integrated healthcare operating system. The name GONEP stands for Global Nursing for Essential Protection, representing our commitment to creating a seamless, technologically advanced ecosystem that protects Kenyan families through intelligent, accessible, and immediate care. We are not merely digitizing existing problems but fundamentally reimagining healthcare delivery from the ground up."
        },
        {
          question: "What is GONEP's business model?",
          answer: "GONEP Healthcare operates as an enabler, not an employer. We provide the digital infrastructure that enables Kenya's independent healthcare providers to connect with patients efficiently while ensuring quality, accountability, and accessibility. We create a sophisticated platform where doctors, nurses, pharmacists, lab technicians, and community health workers can offer their services directly to patients through a coordinated, technology-enabled system."
        },
        {
          question: "Where is GONEP Healthcare currently operating?",
          answer: "GONEP Healthcare is launching with a pilot implementation in Utawala, Kenya. We deliberately constrain initial operations to a 3km radius from our GONEP Command Center in Utawala Central. This geographic limitation is strategic, allowing us to perfect logistics, response times, quality control, and operational protocols before expanding to other regions."
        }
      ]
    },
    {
      category: "Clinic at Hand Device",
      items: [
        {
          question: "What is Clinic at Hand and what does it do?",
          answer: "Clinic at Hand is GONEP's revolutionary 3-in-1 portable diagnostic device. It combines blood testing, urine analysis, and vital signs monitoring in a single, portable unit. The device provides lab-grade results in just 15 minutes, works completely offline without internet connectivity, and is designed specifically for rural and underserved healthcare settings across Africa."
        },
        {
          question: "How accurate are the test results from Clinic at Hand?",
          answer: "Clinic at Hand delivers 95% accurate lab results, meeting international standards for point-of-care testing. The device uses advanced diagnostic technology to ensure reliable results comparable to traditional laboratory testing, making it suitable for clinical decision-making."
        },
        {
          question: "Does Clinic at Hand require internet connectivity?",
          answer: "No, Clinic at Hand operates completely offline. This is one of its key features designed for rural and remote areas where internet connectivity may be unreliable or unavailable. The device can function independently and sync data when connectivity is restored."
        },
        {
          question: "What types of tests can Clinic at Hand perform?",
          answer: "Clinic at Hand can perform comprehensive blood work including glucose monitoring, hemoglobin testing, cholesterol screening, and infection markers. It also conducts urine analysis for various health indicators and monitors vital signs including blood pressure, heart rate, temperature, and oxygen saturation. The device is particularly useful for chronic disease monitoring, infectious disease screening, and basic metabolic panels."
        },
        {
          question: "How long does it take to get results?",
          answer: "Clinic at Hand provides results in just 15 minutes for most critical tests. This rapid turnaround time enables healthcare providers to diagnose and treat patients during the same visit, eliminating the need for patients to travel long distances to laboratories and wait days for results."
        }
      ]
    },
    {
      category: "Services & Operations",
      items: [
        {
          question: "What services does GONEP Healthcare offer?",
          answer: "GONEP Healthcare offers three core services: GONEP Express Consultations (home visits from verified healthcare providers), GONEP Pharmacy Hub (guaranteed 45-minute medication delivery), and Clinic-At-Hand Diagnostics (on-site testing at patients' homes). Our integrated model enables single-visit resolution where consultation, testing, prescription, and medication delivery often happen in one home visit."
        },
        {
          question: "How do GONEP Express Consultations work?",
          answer: "Patients can book home visits from verified general practitioners and clinical officers for common conditions including respiratory infections, UTIs, mild gastrointestinal issues, and chronic disease monitoring. Each consultation includes basic vital signs measurement using our GONEP Smart Diagnostic Kit, which captures temperature, blood pressure, heart rate, and oxygen saturation. The standard 30-minute consultation includes assessment, basic advice, and if needed, prescription generation through our integrated e-prescription system."
        },
        {
          question: "What is the GONEP Pharmacy Hub?",
          answer: "GONEP Pharmacy Hub operates our own pharmacy within the Utawala Command Center, stocked with Kenya's 150 most common prescriptions covering 85% of healthcare needs. This enables 45-minute guaranteed delivery, reduces costs by 30-40% through bulk purchasing, and ensures full quality control. Medications come in smart, color-coded packaging with Swahili and English instructions."
        },
        {
          question: "How does the medication delivery service work?",
          answer: "We operate a dedicated medical rider network trained in medical logistics. These riders handle both medication deliveries and sample collections, equipped with temperature-controlled delivery boxes with digital temperature logging. We guarantee 45-minute delivery within our service area, ensuring medications maintain proper storage conditions throughout transit."
        }
      ]
    },
    {
      category: "For Healthcare Providers",
      items: [
        {
          question: "How can healthcare providers join the GONEP platform?",
          answer: "Healthcare providers can join GONEP through our rigorous four-step verification process. We target recently licensed doctors and clinical officers seeking to build their practice, experienced professionals looking to supplement their income through additional consultations, and semi-retired healthcare professionals willing to conduct limited home visits. Each provider undergoes verification to ensure quality and accountability."
        },
        {
          question: "What are the benefits for healthcare providers using GONEP?",
          answer: "GONEP enables healthcare providers to build sustainable micro-practices and expand their patient reach beyond physical clinic locations. Providers can set their own availability through our intuitive platform, work flexible hours, and increase their professional reach while maintaining independence. The platform handles logistics, patient coordination, and technology infrastructure, allowing providers to focus on delivering quality care."
        },
        {
          question: "How does GONEP ensure quality of care?",
          answer: "GONEP maintains quality through our comprehensive verification process for all healthcare providers, standardized protocols for consultations and diagnostics, quality control measures for medications and supplies, and integrated health records that track patient outcomes. We also provide ongoing training and support to ensure consistent, high-quality care delivery."
        }
      ]
    },
    {
      category: "For Patients",
      items: [
        {
          question: "How do I book a consultation or request services?",
          answer: "Patients can book services through our GONEP Patient Application, which is available as a Progressive Web App that works seamlessly across smartphones, tablets, and basic browsers. The app features large, clearly labeled buttons and voice-navigation options to accommodate users with varying digital literacy levels. You can also contact us directly via phone at +254 707 231 654 or email at info@gonepharm.com."
        },
        {
          question: "What areas does GONEP currently serve?",
          answer: "Currently, GONEP Healthcare is operating in Utawala, Kenya, within a 3km radius from our Command Center. This pilot phase allows us to perfect our operations before expanding to other regions. We are actively working toward expanding our service coverage to reach more communities across Kenya."
        },
        {
          question: "How much do GONEP services cost?",
          answer: "GONEP Healthcare is designed to be affordable and accessible. Our pricing model reduces healthcare costs by 30-40% through bulk purchasing and efficient operations. We offer various service packages and are developing corporate partnership programs and value-based pricing for chronic disease management. Contact us for specific pricing information tailored to your needs."
        },
        {
          question: "Is my health information secure and private?",
          answer: "Yes, patient privacy and data security are fundamental to GONEP Healthcare. All patient health records are stored securely in our integrated system with appropriate privacy protections. We comply with healthcare data protection regulations and use secure, encrypted systems to protect patient information. Your health data is only accessible to authorized healthcare providers involved in your care."
        }
      ]
    },
    {
      category: "Technical Support & Maintenance",
      items: [
        {
          question: "What should I do if I experience technical issues with Clinic at Hand?",
          answer: "If you experience any technical issues with Clinic at Hand, please contact our 24/7 technical support line at +254 707 231 654. Our support team can assist with troubleshooting, device operation questions, and coordinate maintenance or repairs if needed. For detailed technical assistance, you can also email info@gonepharm.com."
        },
        {
          question: "How do I get training on using Clinic at Hand?",
          answer: "GONEP provides comprehensive training for all healthcare providers and technicians who will be using Clinic at Hand. Training covers device operation, sample collection procedures, result interpretation, and maintenance protocols. We also offer ongoing support and refresher training as needed. Contact us to schedule training for your team."
        },
        {
          question: "What maintenance does Clinic at Hand require?",
          answer: "Clinic at Hand is designed for durability and minimal maintenance. Regular cleaning and calibration checks are recommended, and our support team can guide you through these procedures. For more complex maintenance or repairs, our technical specialists are available. The device comes with warranty coverage and support documentation."
        },
        {
          question: "Where can I get consumable supplies for Clinic at Hand?",
          answer: "Consumable supplies for Clinic at Hand are available through GONEP Healthcare. We maintain inventory of all necessary testing supplies and can coordinate delivery along with our medication delivery service. Contact our support team to order supplies or discuss supply management for your facility."
        }
      ]
    },
    {
      category: "Partnerships & Collaboration",
      items: [
        {
          question: "How can my organization partner with GONEP Healthcare?",
          answer: "GONEP Healthcare welcomes partnerships with healthcare facilities, NGOs, government agencies, pharmacies, and other organizations. We offer corporate partnership programs, referral relationships, pharmacy partnerships, and collaboration opportunities for research and development. Contact us to discuss how we can work together to improve healthcare access in your community."
        },
        {
          question: "Can pharmacies partner with GONEP?",
          answer: "Yes, we actively partner with pharmacies to enhance their capabilities and reach. We offer partner pharmacies a digital storefront that expands their catchment area from their physical location to our entire service area. In exchange for access to our patient base, pharmacies agree to maintain real-time inventory updates through our API integration, ensuring seamless medication delivery coordination."
        },
        {
          question: "Does GONEP work with government health programs?",
          answer: "Yes, GONEP Healthcare is designed to work strategically with county governments and national health programs to supplement and enhance public healthcare services. This could involve performance-based contracts, digitally managing community health worker programs, operating after-hours services for public facilities, or providing telemedicine support to remote health centers."
        }
      ]
    },
    {
      category: "Future Plans & Expansion",
      items: [
        {
          question: "What are GONEP's plans for expansion?",
          answer: "GONEP Healthcare is implementing a phased expansion strategy. Phase 1 focuses on perfecting operations in Utawala. Phase 2 will expand to additional Nairobi constituencies and introduce specialized programs. Phase 3 aims for national coverage across all 47 counties in Kenya, with particular density in major urban centers. Our expansion is adaptive and localized to meet the unique needs of different regions."
        },
        {
          question: "What new services is GONEP planning to offer?",
          answer: "GONEP is developing comprehensive service integration including preventive health programs, maternal and child health services, elderly care solutions, and palliative care services. We're also expanding our technology platform to serve as critical national healthcare infrastructure with capabilities for public health intelligence, interoperability standards, and digital health literacy initiatives."
        },
        {
          question: "How can I stay updated on GONEP's developments?",
          answer: "You can stay updated on GONEP Healthcare developments by contacting us at info@gonepharm.com to join our newsletter, following our updates through our website, or connecting with us directly. We regularly share information about new services, expansion plans, and healthcare innovations through various communication channels."
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
              Whether you're setting up Clinic at Hand for the first time, troubleshooting a technical issue, or exploring how our services can enhance your healthcare delivery, our support team is here to help. We understand that every question matters when it comes to patient care, and we're committed to ensuring you have the resources and assistance you need to succeed.
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

          {/* Advanced Support Form - Commented out but kept in code */}
          {/* 
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

            <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
              <div className="text-center p-6">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Support Form Under Maintenance</h3>
                <p className="text-yellow-700">
                  Our support form is currently being updated. Please use the contact methods above for immediate assistance.
                </p>
              </div>
            </div>
          </div>
          */}
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
                      className="bg-card border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:no-underline text-foreground">
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