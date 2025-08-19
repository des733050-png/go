import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
}

export function CTAButton({ 
  children, 
  onClick, 
  href,
  variant = "primary", 
  size = "md",
  icon: Icon,
  className = "",
  disabled = false
}: CTAButtonProps) {
  const variantClasses = {
    primary: "bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg",
    secondary: "bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg", 
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
  };

  const sizeClasses = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4"
  };

  const ButtonContent = () => (
    <>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </>
  );

  const commonProps = {
    className: `font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md ${variantClasses[variant]} ${sizeClasses[size]} ${className}`,
    disabled
  };

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center justify-center rounded-md ${commonProps.className}`}
      >
        <ButtonContent />
      </motion.a>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button {...commonProps} onClick={onClick}>
        <ButtonContent />
      </Button>
    </motion.div>
  );
}