import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector('.stats-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const increment = end / (duration / 16); // 60fps

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, isVisible]);

  return count;
};

// Animated Number Component
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useCountUp(value, 2000, 500);
  return <span>{count}{suffix}</span>;
};

// Animated Ratio Component
const AnimatedRatio = () => {
  const firstNumber = useCountUp(1, 1000, 500);
  const secondNumber = useCountUp(2500, 2000, 1500);
  return <span>{firstNumber}:{secondNumber}</span>;
};

export function StatisticsSection() {
  return (
    <section className="section-padding bg-primary/5 dark:bg-primary/10">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            The Healthcare Reality in Kenya
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Understanding the challenges we're solving with data-driven insights from Kenya's healthcare landscape.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto stats-container"
        >
          {/* Kenya Statistics Container */}
          <div className="bg-card rounded-2xl p-8 relative overflow-hidden shadow-lg border border-border">
            {/* Subtle map background */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground rounded-2xl"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-semibold text-foreground mb-8">In Kenya,</h3>
              
              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedNumber value={20} suffix="%" />
                  </div>
                  <p className="text-sm text-foreground">Of Kenyans lack access to essential health services.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedRatio />
                  </div>
                  <p className="text-sm text-foreground">Doctor to patient ratio in Kenya.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedNumber value={58} suffix="%" />
                  </div>
                  <p className="text-sm text-foreground">Rural Kenyans struggle to access quality healthcare.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                >
                  <div className="text-3xl font-bold text-primary mb-2">
                    <AnimatedNumber value={77} suffix="%" />
                  </div>
                  <p className="text-sm text-foreground">Healthcare expenses are paid out-of-pocket.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground mb-6">
            These statistics drive our mission to make healthcare accessible to every Kenyan community.
          </p>
          <Link to="/about">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg">
              Learn About Our Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
