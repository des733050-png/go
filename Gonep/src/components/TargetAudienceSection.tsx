import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Building2, Heart, Users, Package, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TargetAudienceSection() {
  const audiences = [
    {
      icon: Building2,
      title: "Clinics & Hospitals",
      subtitle: "Healthcare Providers",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      painPoints: [
        "Limited diagnostic equipment",
        "Long wait times for results",
        "High equipment maintenance costs",
        "Staff training challenges"
      ],
      solutions: [
        "Portable, all-in-one diagnostic solution",
        "Immediate 15-minute results",
        "Low maintenance, durable design",
        "Intuitive interface, minimal training"
      ],
      ctaText: "Transform Your Clinic"
    },
    {
      icon: Heart,
      title: "NGOs & Mobile Health",
      subtitle: "Community Outreach",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      painPoints: [
        "Limited reach to remote areas",
        "Bulky equipment transport",
        "Power supply challenges",
        "Data collection difficulties"
      ],
      solutions: [
        "Lightweight, portable design",
        "Battery & solar power options",
        "Offline data collection",
        "Cloud sync when connected"
      ],
      ctaText: "Expand Your Reach"
    },
    {
      icon: Users,
      title: "Government Health",
      subtitle: "Public Health Ministries",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      painPoints: [
        "Healthcare infrastructure gaps",
        "Limited budget for equipment",
        "Data transparency needs",
        "Population health monitoring"
      ],
      solutions: [
        "Cost-effective diagnostic solution",
        "Comprehensive data analytics",
        "Real-time health monitoring",
        "Scalable deployment options"
      ],
      ctaText: "Scale Healthcare Access"
    },
    {
      icon: Package,
      title: "Distributors",
      subtitle: "Channel Partners",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      painPoints: [
        "Market penetration challenges",
        "Product differentiation",
        "Training and support needs",
        "Competitive pricing pressure"
      ],
      solutions: [
        "Unique, innovative product",
        "Comprehensive partner support",
        "Marketing and training materials",
        "Competitive partner margins"
      ],
      ctaText: "Partner With Us"
    }
  ];

  return (
    <section id="solutions" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tailored Solutions for Every Healthcare Partner
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GONEP's Clinic at Hand addresses specific challenges across the healthcare ecosystem, 
            delivering value to every stakeholder in the African healthcare landscape.
          </p>
        </div>

        {/* Audience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {audiences.map((audience, index) => {
            const IconComponent = audience.icon;
            return (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={audience.image}
                    alt={audience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <IconComponent className="h-6 w-6" />
                      <span className="text-sm font-medium">{audience.subtitle}</span>
                    </div>
                    <h3 className="text-xl font-bold">{audience.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pain Points */}
                    <div>
                      <h4 className="font-semibold text-red-600 mb-3">Current Challenges</h4>
                      <ul className="space-y-2">
                        {audience.painPoints.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solutions */}
                    <div>
                      <h4 className="font-semibold text-green-600 mb-3">GONEP Solutions</h4>
                      <ul className="space-y-2">
                        {audience.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      {audience.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Healthcare in Your Community?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the growing network of healthcare partners who are making a difference with GONEP's innovative solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}