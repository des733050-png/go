import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Download, ExternalLink, Calendar, FileText, Video, Image as ImageIcon, Search } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useState } from "react";

export function MediaPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const mediaItems = [
    {
      type: "whitepaper",
      title: "Clinical Efficacy White Paper",
      description: "Comprehensive study on diagnostic accuracy and patient outcomes across 5 African countries",
      date: "March 2024",
      fileSize: "2.4 MB",
      category: "research",
      featured: true
    },
    {
      type: "case-study",
      title: "Ghana Health Service Implementation",
      description: "Detailed analysis of 200-unit deployment across rural health centers",
      date: "February 2024", 
      fileSize: "1.8 MB",
      category: "case-studies",
      featured: true
    },
    {
      type: "brochure",
      title: "Product Specifications Brochure",
      description: "Technical specifications and implementation guide for healthcare providers",
      date: "January 2024",
      fileSize: "890 KB",
      category: "product"
    },
    {
      type: "whitepaper",
      title: "ROI Analysis for Healthcare Providers",
      description: "Economic impact study showing cost savings and improved outcomes",
      date: "December 2023",
      fileSize: "1.2 MB", 
      category: "research"
    },
    {
      type: "case-study",
      title: "Mobile Health Camp Success Stories",
      description: "Real-world impact from NGO mobile health initiatives across East Africa",
      date: "November 2023",
      fileSize: "3.1 MB",
      category: "case-studies"
    },
    {
      type: "report",
      title: "Annual Impact Report 2023",
      description: "Comprehensive overview of GONEP's impact across African healthcare systems",
      date: "October 2023",
      fileSize: "4.5 MB",
      category: "reports"
    },
    {
      type: "clinical-data",
      title: "Clinical Data & Performance Summary",
      description: "Performance metrics and clinical validation results from field trials",
      date: "September 2023",
      fileSize: "1.6 MB",
      category: "research"
    },
    {
      type: "press-mention",
      title: "Press Coverage & Interviews",
      description: "Media coverage and executive interviews about GONEP's mission",
      date: "August 2023",
      fileSize: "2.1 MB",
      category: "press"
    }
  ];

  const pressItems = [
    {
      title: "GONEP Wins Innovation Award at Africa Health Summit 2024",
      publication: "Africa Business Daily",
      date: "March 15, 2024",
      excerpt: "Revolutionary diagnostic technology recognized for transforming rural healthcare access across Sub-Saharan Africa.",
      link: "#",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Closing the Healthcare Gap: How AI is Revolutionizing African Medicine",
      publication: "Global Health Today",
      date: "February 28, 2024",
      excerpt: "Feature story on GONEP's AI-powered diagnostic solutions and their impact on underserved communities.",
      link: "#",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "GONEP Secures $5M Series A to Scale Healthcare Solutions",
      publication: "TechCrunch Africa",
      date: "January 22, 2024",
      excerpt: "Funding round led by prominent African VCs to expand Clinic at Hand deployment across 10 countries.",
      link: "#",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Healthcare Innovation in Rural Africa: The GONEP Story",
      publication: "Medical Innovation Weekly",
      date: "December 10, 2023",
      excerpt: "In-depth profile of GONEP's founders and their mission to democratize healthcare access.",
      link: "#",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const filterCategories = [
    { id: "all", label: "All Resources" },
    { id: "case-studies", label: "Case Studies" },
    { id: "research", label: "Research" },
    { id: "product", label: "Product Info" },
    { id: "reports", label: "Reports" },
    { id: "press", label: "Press & Media" }
  ];

  const filteredItems = activeFilter === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeFilter);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "whitepaper":
      case "case-study":
      case "report":
        return FileText;
      case "brochure":
        return ImageIcon;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Media Center
            </h1>
            <p className="text-lg text-muted-foreground">
              Establish credibility, provide proof points, and support due diligence. 
              Access the latest research, case studies, press coverage, and resources 
              about GONEP's impact on African healthcare.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10 bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {mediaItems.filter(item => item.featured).map((item, index) => {
              const IconComponent = getTypeIcon(item.type);
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          Featured
                        </Badge>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {item.date} • {item.fileSize}
                      </div>
                      <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filterable Library */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-0">
              Resource Library
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category.id)}
                  className={activeFilter === category.id 
                    ? "bg-primary text-primary-foreground" 
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const IconComponent = getTypeIcon(item.type);
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">
                          {item.type.replace("-", " ").toUpperCase()}
                        </Badge>
                        <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground">
                        {item.date} • {item.fileSize}
                      </div>
                      <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Press Coverage */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Latest Press Coverage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pressItems.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-90 mb-1">{item.publication}</div>
                    <div className="text-xs opacity-75">{item.date}</div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.excerpt}</p>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                    Read Full Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Press Coverage
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with GONEP
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Get the latest research, case studies, and impact stories delivered directly to your inbox.
          </p>
          
          <div className="max-w-md mx-auto flex gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white text-foreground flex-1"
            />
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}