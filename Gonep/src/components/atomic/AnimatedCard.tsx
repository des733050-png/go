import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  hoverEffect?: boolean;
}

export function AnimatedCard({ 
  children, 
  delay = 0, 
  className = "", 
  hoverEffect = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hoverEffect ? { y: -5 } : undefined}
      className={className}
    >
      <Card className="border-2 hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
        {children}
      </Card>
    </motion.div>
  );
}