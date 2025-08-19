import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle, Award, Monitor, Database, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const benefits = [
  "Portable, all-in-one diagnostic solution for remote areas",
  "Immediate 15-minute results with clinical-grade accuracy",
  "Low maintenance, durable design for harsh environments",
  "Intuitive interface requiring minimal training",
  "Works completely offline with cloud sync when available"
];

export function WhyGonepSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose GONEP?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our innovative IoT approach combines cutting-edge technology with deep understanding 
              of African healthcare challenges to deliver practical, impactful solutions.
            </p>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>
            
            <Link to="/about">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-0">
                Learn More About Our Impact
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* IoT Healthcare Visual */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    <Stethoscope className="h-12 w-12 text-primary/60" />
                    <Monitor className="h-12 w-12 text-secondary/60" />
                    <Database className="h-12 w-12 text-primary/60" />
                  </div>
                </div>
                <div className="text-center space-y-4 relative z-10">
                  <Award className="h-20 w-20 text-secondary mx-auto" />
                  <p className="text-muted-foreground font-medium">IoT Healthcare Innovation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
