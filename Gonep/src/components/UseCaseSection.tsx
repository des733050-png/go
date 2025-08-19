import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, MapPin, Users, CheckCircle, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function UseCaseSection() {
  const useCases = [
    {
      title: "Sarah's Story",
      subtitle: "Rural Patient Journey",
      location: "Kibera, Kenya",
      patient: "Sarah, 34, Mother of 3",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      problem: "Sarah experienced recurring fever and fatigue but lived 80km from the nearest hospital. Previous visits required a full day of travel and expensive transport costs, often with no immediate results.",
      solution: "With GONEP's Clinic at Hand deployed at her local community health center, Sarah received comprehensive blood work and urine analysis in 15 minutes. The AI-powered system identified her condition and recommended immediate treatment.",
      outcome: "Early diagnosis prevented progression to severe complications. Sarah saved $50 in transport costs and returned to caring for her family the same day.",
      stats: [
        { icon: Clock, label: "Time Saved", value: "8 hours" },
        { icon: MapPin, label: "Distance Avoided", value: "160 km" },
        { icon: Users, label: "Family Impact", value: "5 people" }
      ]
    },
    {
      title: "Mobile Clinic Success",
      subtitle: "NGO Outreach Program",
      location: "Northern Uganda",
      patient: "Reach the Unreached NGO",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      problem: "The NGO's mobile clinic could only reach 3 villages per week due to bulky diagnostic equipment. Many patients went undiagnosed, and follow-ups were nearly impossible.",
      solution: "GONEP's portable diagnostic kit allowed the team to carry comprehensive testing capabilities in a single backpack. Offline data collection ensured no patient records were lost.",
      outcome: "The mobile clinic now serves 8 villages weekly, with 300% increase in diagnostic capacity. Patient follow-up improved from 20% to 85%.",
      stats: [
        { icon: Users, label: "Villages Served", value: "8 per week" },
        { icon: CheckCircle, label: "Patients Diagnosed", value: "1,200/month" },
        { icon: ArrowRight, label: "Follow-up Rate", value: "85%" }
      ]
    },
    {
      title: "Government Scale-Up",
      subtitle: "National Health Initiative",
      location: "Ghana Health Service",
      patient: "Ministry of Health Program",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      problem: "Ghana's rural health centers lacked diagnostic capabilities, forcing patients to travel to urban hospitals. This created bottlenecks and delayed treatment for critical conditions.",
      solution: "GONEP partnered with Ghana Health Service to deploy 200 Clinic at Hand units across rural health centers. Training programs equipped local health workers with diagnostic skills.",
      outcome: "Reduced hospital referrals by 60%, improved early detection of diabetes and hypertension by 400%, and saved the health system $2M annually in transport and accommodation costs.",
      stats: [
        { icon: Users, label: "Health Centers", value: "200" },
        { icon: CheckCircle, label: "Referrals Reduced", value: "60%" },
        { icon: ArrowRight, label: "Cost Savings", value: "$2M/year" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Real Stories, Real Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how GONEP's Clinic at Hand is transforming lives across Africa through 
            real patient stories and measurable community impact.
          </p>
        </div>

        {/* Use Cases */}
        <div className="space-y-16">
          {useCases.map((useCase, index) => (
            <Card key={index} className="bg-white shadow-xl overflow-hidden">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Image */}
                <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <ImageWithFallback
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
                  <div className="absolute top-6 left-6 text-white">
                    <div className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      Case Study
                    </div>
                    <h3 className="text-2xl font-bold mb-1">{useCase.title}</h3>
                    <p className="text-sm opacity-90">{useCase.subtitle}</p>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{useCase.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {useCase.patient}
                      </h4>
                    </div>

                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">The Challenge</h5>
                      <p className="text-gray-600 text-sm">{useCase.problem}</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-blue-600 mb-2">GONEP Solution</h5>
                      <p className="text-gray-600 text-sm">{useCase.solution}</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">Impact & Results</h5>
                      <p className="text-gray-600 text-sm">{useCase.outcome}</p>
                    </div>

                    {/* Stats */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4">
                        {useCase.stats.map((stat, statIndex) => {
                          const IconComponent = stat.icon;
                          return (
                            <div key={statIndex} className="text-center">
                              <div className="flex justify-center mb-2">
                                <IconComponent className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                              <div className="text-xs text-gray-600">{stat.label}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Success Story?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of healthcare providers, NGOs, and government programs 
              who are transforming their communities with GONEP's solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8">
                Share Your Story
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8">
                View More Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}