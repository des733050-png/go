import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Smartphone, Zap, Clock, Wifi, Play, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ProductHighlightSection() {
  return (
    <section id="product" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Meet <span className="text-green-600">Clinic at Hand</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our revolutionary 3-in-1 portable diagnostic kit that brings comprehensive healthcare 
            testing directly to communities that need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Product Image */}
          <div className="relative">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="GONEP Clinic at Hand diagnostic device"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              
              {/* Video Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-white/90 text-blue-600 hover:bg-white shadow-lg">
                  <Play className="mr-2 h-6 w-6" />
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Floating Feature Badges */}
            <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">15-Min Results</div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
              <div className="text-sm font-semibold">Offline Ready</div>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Three Essential Tests in One Device
              </h3>
              <p className="text-gray-600 mb-6">
                Our integrated diagnostic platform combines multiple testing capabilities 
                in a single, portable device designed for African healthcare environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Smartphone className="h-8 w-8 text-blue-600" />
                    <h4 className="font-semibold text-gray-900">3-in-1 Diagnostics</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Blood tests, urine analysis, and vital signs monitoring in one device
                  </p>
                </CardContent>
              </Card>

              <Card className="border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Clock className="h-8 w-8 text-green-600" />
                    <h4 className="font-semibold text-gray-900">15-Minute Results</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Fast, accurate results allowing for immediate treatment decisions
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Zap className="h-8 w-8 text-orange-600" />
                    <h4 className="font-semibold text-gray-900">AI Integration</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Advanced AI algorithms for accurate diagnosis and treatment recommendations
                  </p>
                </CardContent>
              </Card>

              <Card className="border-purple-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <Wifi className="h-8 w-8 text-purple-600" />
                    <h4 className="font-semibold text-gray-900">Offline Support</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Works without internet connection, perfect for remote areas
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="pt-6">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Request Product Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Technical Specifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Device Capabilities</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Blood glucose testing</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Blood pressure monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Urine analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Temperature measurement</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Connectivity</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">WiFi & Bluetooth enabled</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Offline mode capability</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Cloud data sync</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Mobile app integration</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Power & Durability</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">12-hour battery life</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Solar charging option</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">IP65 dust/water resistant</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">Shock-resistant design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}