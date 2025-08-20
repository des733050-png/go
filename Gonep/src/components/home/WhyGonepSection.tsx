import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle, Award, Monitor, Database, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const benefits = [
  "Groundbreaking innovation closing Africa's diagnostic gap",
  "Designed for underserved communities",
  "Portable, all-in-one diagnostic solution for remote areas",
  "Immediate 15-minute results with clinical-grade accuracy",
  "Low maintenance, durable design for harsh environments"
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
              Why GonePharm?
            </h2>
            <p className="text-lg text-muted-foreground">
              Our innovative approach combines cutting-edge technology with deep understanding 
              of African healthcare challenges to deliver practical, impactful solutions.
            </p>
            
            <ul className="space-y-4 mb-8">
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
            
            <div className="pt-4 border-t border-border/50">
              <Link to="/about">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-0 px-8 py-3">
                  Learn More About Our Impact
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
              <div className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* GONEP People Visual */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="GONEP team working together"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Our Team</h3>
                  <p className="text-sm opacity-90">Dedicated to transforming African healthcare</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
