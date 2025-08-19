import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Award, Calendar, Target, TrendingUp } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: any;
  color?: string;
}

interface AnimatedTimelineProps {
  items: TimelineItem[];
}

export function AnimatedTimeline({ items }: AnimatedTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (isInView) {
      // Animate items one by one with delay
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, index * 200);
      });
    }
  }, [isInView, items]);

  const getIconComponent = (index: number) => {
    const icons = [Target, Calendar, Award, TrendingUp];
    return icons[index % icons.length];
  };

  const getColor = (index: number) => {
    const colors = ["primary", "secondary", "accent", "primary"];
    return colors[index % colors.length];
  };

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Animated Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-border hidden md:block">
        <motion.div
          className="bg-primary w-full origin-top"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ height: "100%" }}
        />
      </div>

      <div className="space-y-8">
        {items.map((item, index) => {
          const IconComponent = getIconComponent(index);
          const color = getColor(index);
          const isVisible = visibleItems.includes(index);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow duration-300 bg-card border border-border">
                    <CardContent className="p-0">
                      <div className="space-y-3">
                        {/* Year Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={isVisible ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                          className={`inline-flex items-center px-4 py-2 bg-${color}/10 text-${color} rounded-full text-sm font-bold`}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          {item.year}
                        </motion.div>

                        {/* Title */}
                        <motion.h3
                          initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 20 : -20 }}
                          transition={{ delay: 0.3 }}
                          className="text-xl font-bold text-foreground"
                        >
                          {item.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-muted-foreground"
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Timeline Dot */}
              <div className="hidden md:flex w-2/12 justify-center relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
                  className={`bg-${color} text-white rounded-full p-3 shadow-lg border-4 border-background`}
                >
                  <IconComponent className="h-6 w-6" />
                </motion.div>

                {/* Pulsing Ring */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isVisible ? { scale: 1.2, opacity: 0 } : { scale: 0.8, opacity: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className={`absolute inset-0 bg-${color} rounded-full`}
                />
              </div>

              {/* Mobile Icon */}
              <div className="md:hidden flex items-center mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
                  className={`bg-${color} text-white rounded-full p-2 mr-4`}
                >
                  <IconComponent className="h-5 w-5" />
                </motion.div>
              </div>

              <div className="hidden md:block w-5/12"></div>
            </motion.div>
          );
        })}
      </div>

      {/* Completion Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={visibleItems.length === items.length ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-lg">
          <Award className="h-5 w-5 mr-2" />
          <span className="font-semibold">Our Journey Continues</span>
        </div>
      </motion.div>
    </div>
  );
}