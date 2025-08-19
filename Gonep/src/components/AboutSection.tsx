import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Target, Users, Award, Linkedin, Twitter, Mail } from 'lucide-react';

// Use public URL for assets
import { getImage } from "../utils/imageUtils";

const clinicAtHandDevice = getImage("clinicAtHandOpenWithIllustration");

export function AboutSection() {
  const leaders = [
    {
      name: "Dr. Amara Okafor",
      role: "Chief Executive Officer",
      bio: "MD with 15+ years in African healthcare systems. Former WHO consultant on rural health initiatives.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Kwame Asante",
      role: "Chief Technology Officer",
      bio: "PhD in Biomedical Engineering. AI/ML expert with patents in diagnostic technologies for developing markets.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Dr. Fatima Al-Rashid",
      role: "Chief Medical Officer",
      bio: "Pediatrician and public health specialist with extensive field experience in Sub-Saharan Africa.",
      image: "https://images.unsplash.com/photo-1594824606847-593a89c9a4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Samuel Mbeki",
      role: "Chief Operating Officer",
      bio: "MBA with 12+ years scaling healthcare solutions across African markets. Former McKinsey consultant.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      linkedin: "#",
      twitter: "#"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Committed to eliminating healthcare disparities across Africa through innovative technology"
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Building solutions with and for the communities we serve, ensuring cultural relevance and adoption"
    },
    {
      icon: Award,
      title: "Excellence in Innovation",
      description: "Combining cutting-edge technology with practical, field-tested solutions for real-world impact"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            About GONEP Pharmaceuticals
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Founded by healthcare professionals who witnessed firsthand the diagnostic gaps in African communities, 
            GONEP is driven by a mission to democratize healthcare access across the continent.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Story & Vision
            </h3>
            <div className="space-y-4 text-gray-600">
              <p>
                GONEP Pharmaceuticals was born from a simple yet powerful observation: millions of Africans 
                lack access to basic diagnostic services that could save lives and improve health outcomes.
              </p>
              <p>
                Our founders, a team of medical professionals and engineers, spent years working in rural 
                African communities and witnessed the devastating impact of delayed or unavailable diagnostics. 
                They saw patients traveling hundreds of kilometers for basic tests, waiting weeks for results, 
                and often resorting to dangerous self-medication.
              </p>
              <p>
                This experience inspired the creation of Clinic at Hand - a revolutionary diagnostic solution 
                that brings comprehensive testing capabilities directly to underserved communities. Our vision 
                is a future where every African, regardless of location or economic status, has access to 
                quality healthcare.
              </p>
            </div>
            
            <div className="pt-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Learn More About Our Mission
              </Button>
            </div>
          </div>

          <div className="relative">
            <img
              src={clinicAtHandDevice}
              alt="Clinic at Hand device - innovative diagnostic solution for African communities"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center border-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-full">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Leadership Team */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Meet Our Leadership Team
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Our diverse team combines decades of healthcare experience, technical expertise, 
            and deep understanding of African healthcare challenges.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold">{leader.name}</h4>
                    <p className="text-sm opacity-90">{leader.role}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 text-sm mb-4">{leader.bio}</p>
                  
                  <div className="flex space-x-3">
                    <Button size="sm" variant="ghost" className="p-2 h-auto">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2 h-auto">
                      <Twitter className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2 h-auto">
                      <Mail className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}