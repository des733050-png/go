interface GradientBackgroundProps {
  variant?: "primary" | "secondary" | "muted";
  children: React.ReactNode;
  className?: string;
}

export function GradientBackground({ 
  variant = "primary", 
  children, 
  className = "" 
}: GradientBackgroundProps) {
  const backgroundClasses = {
    primary: "bg-muted",
    secondary: "bg-muted", 
    muted: "bg-muted"
  };

  return (
    <div className={`${backgroundClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}