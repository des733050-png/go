import { Card, CardContent } from "./ui/card";
import { AlertTriangle, Target, Zap, Globe, Clock, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProblemSolutionSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            The Healthcare Challenge in Africa
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Millions of Africans face critical healthcare barriers. GONEP's innovative solution 
            is transforming how healthcare is delivered across the continent.
          </p>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* The Problem */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-2xl font-bold text-gray-900">The Problem</h3>
            </div>
            
            <div className="space-y-6">
              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500 text-white rounded-full p-2 mt-1">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Limited Access</h4>
                      <p className="text-gray-700">672 million Africans lack adequate access to healthcare services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500 text-white rounded-full p-2 mt-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Delayed Diagnosis</h4>
                      <p className="text-gray-700">Rural communities wait weeks for basic diagnostic results</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-500 text-white rounded-full p-2 mt-1">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Self-Medication</h4>
                      <p className="text-gray-700">60% resort to dangerous self-medication practices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Solution */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-green-500" />
              <h3 className="text-2xl font-bold text-gray-900">Our Solution</h3>
            </div>
            
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Portable Diagnostics</h4>
                      <p className="text-gray-700">3-in-1 diagnostic kit brings healthcare directly to communities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
                      <p className="text-gray-700">Get accurate diagnostic results in just 15 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500 text-white rounded-full p-2 mt-1">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">AI-Powered</h4>
                      <p className="text-gray-700">Advanced AI integration with offline capability for remote areas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Transforming Healthcare Across Africa
            </h3>
            <p className="text-gray-600">
              See the impact GONEP is making in communities across the continent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Communities Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Patients Diagnosed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}