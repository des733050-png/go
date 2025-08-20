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
              Tailored Solutions for Every Healthcare Partner
            </h2>
            <p className="text-lg text-muted-foreground">
              GONEP's Clinic at Hand addresses specific challenges across the healthcare ecosystem, 
              delivering value to every stakeholder in the African healthcare landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card id="clinics-hospitals" className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Clinics & Hospitals</h3>
              <p className="text-muted-foreground mb-4">
                Reduce diagnostic backlogs, support frontline staff
              </p>
              <div className="text-sm text-muted-foreground">
                <p>• Streamlined patient flow</p>
                <p>• Enhanced diagnostic capacity</p>
                <p>• Reduced wait times</p>
              </div>
            </Card>

            <Card id="ngos-mobile" className="text-center p-6 hover:shadow-lg transition-shadow border-secondary/20">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">NGOs & Mobile Health Programs</h3>
              <p className="text-muted-foreground mb-4">
                Rapid deployment, ideal for outreach & emergencies
              </p>
              <div className="text-sm text-muted-foreground">
                <p>• Mobile health camps</p>
                <p>• Emergency response</p>
                <p>• Community outreach</p>
              </div>
            </Card>

            <Card id="governments" className="text-center p-6 hover:shadow-lg transition-shadow border-accent/20">
              <div className="bg-accent/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Governments & Ministries of Health</h3>
              <p className="text-muted-foreground mb-4">
                Scalable tool for achieving Universal Health Coverage
              </p>
              <div className="text-sm text-muted-foreground">
                <p>• National health programs</p>
                <p>• Rural health initiatives</p>
                <p>• Policy implementation</p>
              </div>
            </Card>

            <Card id="distributors" className="text-center p-6 hover:shadow-lg transition-shadow border-primary/20">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Distributors / Procurement Agents</h3>
              <p className="text-muted-foreground mb-4">
                High-demand, scalable, ready-to-sell solution
              </p>
              <div className="text-sm text-muted-foreground">
                <p>• Proven market demand</p>
                <p>• Comprehensive support</p>
                <p>• Training programs</p>
              </div>
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
              Our Digital Health Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Simple Tools. Smarter Health. Better Access.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              At GONEP, we believe healthcare shouldn't begin at the hospital it should begin with access, knowledge, and everyday decisions. Alongside our flagship device, Clinic at Hand, we offer a suite of digital health tools to support individuals and communities in taking charge of their well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Find a Health Facility</h3>
              <p className="text-muted-foreground mb-4">
                Quickly locate nearby clinics, pharmacies, or hospitals wherever you are.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                We understand that access to care begins with knowing where to go. Our Find Facility tool uses location data to help users locate the nearest public or private healthcare facility, view operating hours, services offered, and emergency options, and contact clinics directly or request directions via Google Map.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Find a facility Now
              </Button>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">BMI Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Track your body mass index and stay ahead of preventable risks.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Understanding your body is the first step toward a healthier life. Our BMI Calculator lets you enter height and weight to calculate Body Mass Index, instantly see if you're underweight, healthy, overweight, or obese, and receive basic insights on what your BMI means for your health.
              </p>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold">
                Calculate Your BMI
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