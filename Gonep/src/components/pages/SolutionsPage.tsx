import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Building2, Heart, Users, Package, ArrowRight, Calculator, MapPin, FlaskConical, Settings, Target, Zap, Stethoscope, GraduationCap, HeadphonesIcon, BarChart3, Users2, MessageSquare } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function SolutionsPage() {

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Tailored Solutions for Every Healthcare Partner
            </h1>
            <p className="text-lg text-muted-foreground">
              GONEP's Clinic at Hand addresses specific challenges across the healthcare ecosystem, 
              delivering value to every stakeholder in the African healthcare landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive healthcare solutions designed to meet your specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card id="diagnostic-solutions" className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Diagnostic Solutions</h3>
              <p className="text-muted-foreground">
                Advanced diagnostic tools and equipment including our flagship Clinic at Hand device, 
                designed to provide accurate and rapid health assessments in any setting.
              </p>
            </Card>

            <Card id="training-programs" className="text-center p-6 hover:shadow-lg transition-shadow border-secondary/20">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Training Programs</h3>
              <p className="text-muted-foreground">
                Comprehensive training for healthcare professionals on our diagnostic tools, 
                ensuring optimal usage and patient care delivery across all facilities.
              </p>
            </Card>

            <Card id="technical-support" className="text-center p-6 hover:shadow-lg transition-shadow border-accent/20">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <HeadphonesIcon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Technical Support</h3>
              <p className="text-muted-foreground">
                24/7 technical support and maintenance services to ensure your diagnostic equipment 
                operates at peak performance with minimal downtime.
              </p>
            </Card>

            <Card id="data-analytics" className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Data Analytics</h3>
              <p className="text-muted-foreground">
                Advanced analytics and reporting tools to track patient outcomes, 
                facility performance, and population health trends for informed decision-making.
              </p>
            </Card>

            <Card id="partnership-programs" className="text-center p-6 hover:shadow-lg transition-shadow border-secondary/20">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users2 className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Partnership Programs</h3>
              <p className="text-muted-foreground">
                Collaborative initiatives with healthcare organizations, NGOs, and government agencies 
                to expand access to quality healthcare across Africa.
              </p>
            </Card>

            <Card id="consulting-services" className="text-center p-6 hover:shadow-lg transition-shadow border-accent/20">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Consulting Services</h3>
              <p className="text-muted-foreground">
                Expert consultation on healthcare technology implementation, 
                facility optimization, and strategic planning for healthcare organizations.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* R&D as a Service Section */}
      <section id="rnd-services" className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              R&D as a Service
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At Gonep Pharmaceuticals, we believe healthcare innovation should be accessible, affordable, and locally relevant. 
              Beyond developing our own products, we work with organizations, healthcare providers, and innovators to turn ideas into impactful medical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Custom Product Development</h3>
              <p className="text-muted-foreground">
                We design and develop medical devices tailored to your specific needs, from concept to prototype and final product.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-secondary/20">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Settings className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Product Customization</h3>
              <p className="text-muted-foreground">
                Whether it's our flagship Clinic at Hand or another solution, we adapt features and capabilities to fit your unique operational requirements.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-accent/20">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Problem-Driven Solutions</h3>
              <p className="text-muted-foreground">
                Bring us your healthcare challenge, and our expert team will work with you to design, test, and deliver a practical, cost-effective solution.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Technology Enhancement & Upgrades</h3>
              <p className="text-muted-foreground">
                We refine existing devices or diagnostic tools to improve efficiency, accuracy, and user experience.
              </p>
            </Card>
          </div>

          <div className="text-center">
            <div className="bg-background rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Goal</h3>
              <p className="text-lg text-muted-foreground">
                To help you create impactful, affordable, and locally relevant healthcare innovations that address real-world problems.
              </p>
              <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                <ArrowRight className="mr-2 h-4 w-4" />
                Start Your R&D Project
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* Digital Health Tools */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Digital Health Tools
            </h2>
            <p className="text-lg text-muted-foreground">
              Additional tools to support your healthcare initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Find a Health Facility</h3>
              <p className="text-muted-foreground mb-6">
                Interactive map to locate nearby healthcare facilities equipped with GONEP technology
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Launch Tool
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">BMI Calculator</h3>
              <p className="text-muted-foreground mb-6">
                Quick and easy BMI calculator for health screening and patient education
              </p>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                Calculate BMI
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Success Stories by Sector
            </h2>
            <p className="text-lg text-muted-foreground">
              Real impact across different healthcare sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">200</div>
              <div className="text-sm text-muted-foreground mb-2">Health Centers</div>
              <div className="text-xs text-muted-foreground">Government partnerships</div>
            </Card>
            
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-secondary mb-2">45</div>
              <div className="text-sm text-muted-foreground mb-2">NGO Programs</div>
              <div className="text-xs text-muted-foreground">Mobile health initiatives</div>
            </Card>
            
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-accent mb-2">150</div>
              <div className="text-sm text-muted-foreground mb-2">Private Clinics</div>
              <div className="text-xs text-muted-foreground">Enhanced diagnostic capacity</div>
            </Card>
            
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground mb-2">Distribution Partners</div>
              <div className="text-xs text-muted-foreground">Across 12 countries</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent text-primary-foreground section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Healthcare in Your Community?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join the growing network of healthcare partners who are making a difference with GONEP's innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8">
              Schedule Consultation
            </Button>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8">
              Download Solution Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}