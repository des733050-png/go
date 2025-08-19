import { Button } from "./ui/button";
import { Play, ArrowRight, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
// import { unsplash_tool } from "../tools/unsplash";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="African healthcare worker in rural clinic"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                <span className="text-sm font-medium">🏥 Transforming African Healthcare</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Africa's First <span className="text-blue-600">Transformative</span> Healthcare Solution
              </h1>
              
              <h2 className="text-xl md:text-2xl text-green-600 font-semibold">
                Clinic at Hand
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Bridging the diagnostic gap in rural Africa with our revolutionary 3-in-1 portable diagnostic kit. 
                Delivering healthcare solutions to 672 million underserved Africans through AI-powered, 
                offline-capable technology that provides results in just 15 minutes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Phone className="mr-2 h-5 w-5" />
                Request a Demo
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Play className="mr-2 h-5 w-5" />
                Explore How It Works
              </Button>
              <Button size="lg" variant="ghost" className="text-gray-700 hover:text-blue-600 px-8 py-3">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">672M</div>
                <div className="text-sm text-gray-600">Africans lack healthcare access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600">60%</div>
                <div className="text-sm text-gray-600">Resort to self-medication</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600">15min</div>
                <div className="text-sm text-gray-600">Diagnosis results</div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="GONEP Clinic at Hand diagnostic kit"
                className="w-full h-auto rounded-lg"
              />
              
              {/* Floating Features */}
              <div className="absolute -top-4 -left-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-sm font-semibold">3-in-1 Diagnostics</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="text-sm font-semibold">AI Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}