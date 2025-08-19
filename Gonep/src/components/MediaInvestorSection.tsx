import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Download, ExternalLink, Calendar, Award, Users, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MediaInvestorSection() {
  const partners = [
    { name: "Microsoft Founders Hub", logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Chandaria Innovation Centre", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Gates Foundation", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "African Development Bank", logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "WHO Africa", logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "USAID", logo: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  const pressItems = [
    {
      title: "GONEP Wins Innovation Award at Africa Health Summit 2024",
      publication: "Africa Business Daily",
      date: "March 15, 2024",
      excerpt: "Revolutionary diagnostic technology recognized for transforming rural healthcare access across Sub-Saharan Africa.",
      link: "#"
    },
    {
      title: "Closing the Healthcare Gap: How AI is Revolutionizing African Medicine",
      publication: "Global Health Today",
      date: "February 28, 2024",
      excerpt: "Feature story on GONEP's AI-powered diagnostic solutions and their impact on underserved communities.",
      link: "#"
    },
    {
      title: "GONEP Secures $5M Series A to Scale Healthcare Solutions",
      publication: "TechCrunch Africa",
      date: "January 22, 2024",
      excerpt: "Funding round led by prominent African VCs to expand Clinic at Hand deployment across 10 countries.",
      link: "#"
    }
  ];

  const resources = [
    {
      title: "Clinical Efficacy White Paper",
      description: "Comprehensive study on diagnostic accuracy and patient outcomes",
      type: "PDF Report",
      size: "2.4 MB",
      icon: Download
    },
    {
      title: "Product Specifications Brochure",
      description: "Technical specifications and implementation guide",
      type: "PDF Brochure",
      size: "1.8 MB",
      icon: Download
    },
    {
      title: "ROI Calculator for Healthcare Providers",
      description: "Interactive tool to calculate potential cost savings and ROI",
      type: "Excel Tool",
      size: "890 KB",
      icon: Download
    },
    {
      title: "Implementation Case Studies",
      description: "Detailed analysis of successful deployments across Africa",
      type: "PDF Collection",
      size: "4.2 MB",
      icon: Download
    }
  ];

  const achievements = [
    { icon: Award, title: "Africa Innovation Award 2024", description: "Best Healthcare Technology Solution" },
    { icon: Users, title: "50,000+ Patients Served", description: "Across 12 African countries" },
    { icon: TrendingUp, title: "$5M Series A Funding", description: "Led by leading African VCs" },
    { icon: Calendar, title: "Founded 2021", description: "Rapid growth and market adoption" }
  ];

  return (
    <section id="media" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Media & Investor Information
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with GONEP's latest developments, partnerships, and resources 
            for investors, media, and healthcare stakeholders.
          </p>
        </div>

        {/* Key Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={index} className="text-center border-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Partners & Investors */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Partners & Supporters
          </h3>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <div key={index} className="flex justify-center">
                  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                    <ImageWithFallback
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 w-auto mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Press & Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Latest Press Coverage
            </h3>
            
            <div className="space-y-6">
              {pressItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-sm text-blue-600 font-medium">{item.publication}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-4">{item.excerpt}</p>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                      Read Full Article
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full">
                View All Press Coverage
              </Button>
            </div>
          </div>

          {/* Downloadable Resources */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Downloadable Resources
            </h3>
            
            <div className="space-y-4">
              {resources.map((resource, index) => {
                const IconComponent = resource.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{resource.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{resource.type} • {resource.size}</span>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Investor Information */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Investor Information
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              GONEP is actively scaling across Africa with proven market traction and strong unit economics. 
              Learn more about our investment opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">$12M</div>
              <div className="text-gray-600">Market Size (TAM)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">150%</div>
              <div className="text-gray-600">YoY Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600">Countries Deployed</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
              Investor Deck
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
              Schedule Investor Meeting
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}