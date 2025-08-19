import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Building2, Heart, Users, Package, ArrowRight, Calculator, MapPin } from "lucide-react";
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