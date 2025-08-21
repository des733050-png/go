import React from "react";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface FinalCTASectionProps {
  onDemoRequest: () => void;
}

export function FinalCTASection({ onDemoRequest }: FinalCTASectionProps) {
  return (
    <section className="bg-muted/30 py-16 relative overflow-hidden">
      {/* Well-distributed Background Animation */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            x: [-50, 50, -50],
            y: [-20, 20, -20]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [50, -50, 50],
            y: [20, -20, 20]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/8 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [-30, 30, -30],
            y: [30, -30, 30]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/3 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [30, -30, 30],
            y: [-30, 30, -30]
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-background rounded-3xl p-12 shadow-2xl border border-border relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                  Let's make healthcare truly universal. Partner with us today.
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Join us in revolutionizing healthcare across Africa through innovative technology. 
                  Together, we can make quality healthcare accessible to every community.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  onClick={onDemoRequest}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Request Demo
                </Button>
                
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary text-primary-foreground font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    Invest in Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
