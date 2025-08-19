import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ArrowRight, Clock, Wifi, Smartphone, Monitor, Database } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const iotFeatures = [
  {
    icon: Monitor,
    title: "Real-time Monitoring",
    description: "Continuous health data collection and analysis"
  },
  {
    icon: Database,
    title: "Cloud Integration",
    description: "Secure data storage and accessibility"
  },
  {
    icon: Wifi,
    title: "IoT Connectivity",
    description: "Seamless device-to-device communication"
  }
];

const features = [
  {
    icon: Smartphone,
    title: "3-in-1 Diagnostics",
    description: "Blood tests, urine analysis, and vital signs monitoring in one portable device",
    color: "primary"
  },
  {
    icon: Clock,
    title: "15-Minute Results", 
    description: "Fast, accurate results allowing for immediate treatment decisions in remote areas",
    color: "secondary"
  },
  {
    icon: Wifi,
    title: "AI-Powered & Offline",
    description: "Advanced AI algorithms that work without internet connection for rural deployment",
    color: "primary"
  }
];

export function IoTFeaturesSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            IoT-Powered <span className="text-secondary">Healthcare Innovation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Advanced Internet of Things technology enabling connected healthcare solutions for remote communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {iotFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full group">
                  <CardContent className="p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex justify-center mb-6"
                    >
                      <div className="bg-primary/10 p-4 rounded-full border border-primary/20 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-primary group-hover:text-green-600 transition-colors duration-300" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full group">
                  <CardContent className="p-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex justify-center mb-6"
                    >
                      <div className="bg-primary/10 p-4 rounded-full border border-primary/20 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-300">
                        <IconComponent className="h-8 w-8 text-primary group-hover:text-green-600 transition-colors duration-300" />
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to Product Page */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/clinic-at-hand">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6"
            >
              Explore Clinic at Hand
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
