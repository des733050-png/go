import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { validatePhone } from "./validationUtils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

export function PhoneInput({ 
  value, 
  onChange, 
  placeholder = "+254 XXX XXX XXX",
  className,
  error = false,
  onValidationChange
}: PhoneInputProps) {
  const [isValid, setIsValid] = useState(true);
  const [hasBlurred, setHasBlurred] = useState(false);

  useEffect(() => {
    if (value.trim() === '') {
      setIsValid(true); // Don't show error for empty field initially
      onValidationChange?.(true);
    } else {
      const valid = validatePhone(value);
      setIsValid(valid);
      onValidationChange?.(valid);
    }
  }, [value, onValidationChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const handleBlur = () => {
    setHasBlurred(true);
  };

  const showError = error || (hasBlurred && !isValid && value.length > 0);

  return (
    <div className="space-y-1">
      <Input
        type="tel"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`${className || ''} ${showError ? 'border-destructive/50 focus:border-destructive' : ''}`}
      />
      {showError && (
        <p className="text-xs text-destructive">
          Please enter a valid phone number (e.g., +254 123 456 789 or 0712345678)
        </p>
      )}
    </div>
  );
}
