import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IconFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: "primary" | "secondary" | "accent";
}

export function IconFeature({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  variant = "primary"
}: IconFeatureProps) {
  const variantClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary", 
    accent: "bg-accent/10 text-accent"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="text-center space-y-4"
    >
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex justify-center"
      >
        <div className={`p-4 rounded-full ${variantClasses[variant]}`}>
          <Icon className="h-8 w-8" />
        </div>
      </motion.div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}