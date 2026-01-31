import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle, Award, Monitor, Database, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import gonepCheque from "../../assets/gonepcheque.jpeg";

const benefits = [
  "<strong>Award-Winning Innovation</strong> - Presidential Innovation Award winner",
  "<strong>Affordable for Africa</strong> - designed for resource-limited healthcare",
  "<strong>Portable 3-in-1 Solution</strong> - blood, urine, vitals in one device",
  "<strong>15-Minute Lab Results</strong> - 95% accuracy offline, no internet needed",
  "<strong>50,000+ Patients Served</strong> - proven impact across 12 African countries"
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
              Why Choose <span className="text-primary">GONEP Healthcare</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              <strong>GONEP Clinic at Hand</strong> is the affordable, proven solution transforming healthcare across Africa. Trusted by 50,000+ patients and recognized with the Presidential Innovation Award, it's designed specifically for African healthcare realities.
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
                  <span className="text-foreground" dangerouslySetInnerHTML={{ __html: benefit }}></span>
                </motion.li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-border/50">
              <Link to="/about">
                <Button className="bg-blue-600 hover:bg-blue-600 text-white font-semibold border-0 px-8 py-3">
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
                  src={gonepCheque}
                  alt="GONEP receiving Presidential Innovation Award"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold mb-1">Presidential Innovation Award</h3>
                  <p className="text-sm opacity-90">Recognized for transforming African healthcare</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
