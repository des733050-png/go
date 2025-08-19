import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Microsoft Founders Hub",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    hasLogo: true
  },
  {
    name: "Chandaria Innovation Centre",
    logo: "",
    hasLogo: false
  },
  {
    name: "Gates Foundation",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Gates_Foundation_Logo.svg",
    hasLogo: true
  },
  {
    name: "African Development Bank",
    logo: "",
    hasLogo: false
  },
  {
    name: "WHO Africa",
    logo: "",
    hasLogo: false
  },
  {
    name: "USAID",
    logo: "https://logotyp.us/file/usaid.svg",
    hasLogo: true
  }
];

export function PartnersSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            x: [20, -20, 20],
            y: [10, -10, 10]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/15 rounded-full blur-2xl"
        />
      </div>

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Backed By Leading Organizations
          </h2>
          <p className="text-muted-foreground">
            Trusted partners supporting our mission to transform African healthcare
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-2xl p-8 border border-border shadow-lg"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center ">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-border h-24 flex flex-col items-center justify-center">
                  {partner.hasLogo ? (
                    <div className="flex flex-col items-center space-y-3">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-10 w-auto object-contain max-w-full"
                      />
                      <span className="text-xs font-bold text-foreground text-center leading-tight">
                        {partner.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm font-bold text-foreground text-center leading-tight">
                      {partner.name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
