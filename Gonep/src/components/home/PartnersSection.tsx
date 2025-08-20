import React from "react";
import { motion } from "framer-motion";
import { partners } from "../../config/partners";

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
          className="bg-primary rounded-2xl p-8 border border-border shadow-lg overflow-hidden"
        >
          {/* CSS Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div className="flex gap-8 items-center infinite-scroll">
              {/* First set of partners */}
              {partners.map((partner, index) => (
                <motion.div 
                  key={`first-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center flex-shrink-0"
                  style={{ minWidth: '180px', maxWidth: '200px' }}
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
              
              {/* Duplicate set for seamless loop */}
              {partners.map((partner, index) => (
                <motion.div 
                  key={`second-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center flex-shrink-0"
                  style={{ minWidth: '180px', maxWidth: '200px' }}
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
              
              {/* Third set for extra smoothness */}
              {partners.map((partner, index) => (
                <motion.div 
                  key={`third-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center flex-shrink-0"
                  style={{ minWidth: '180px', maxWidth: '200px' }}
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
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .infinite-scroll {
            animation: scroll 25s linear infinite;
          }
          
          .infinite-scroll:hover {
            animation-play-state: paused;
          }
          
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * ${partners.length}));
            }
          }
        `
      }} />
    </section>
  );
}
