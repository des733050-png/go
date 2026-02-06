export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  // Trim whitespace before validation
  const trimmedEmail = email.trim();
  
  // More robust email validation regex
  // Allows: letters, numbers, dots, hyphens, underscores, plus signs before @
  // Domain: letters, numbers, dots, hyphens
  // TLD: at least 2 letters
  const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(trimmedEmail);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters except + for international format
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  // Basic validation: at least 10 digits, can start with +
  return cleanPhone.length >= 10 && /^\+?[\d\s\-\(\)]+$/.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const getValidationError = (field: string, value: string, type: string): string => {
  switch (type) {
    case 'required':
      return !validateRequired(value) ? `${field} is required` : '';
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : '';
    case 'phone':
      return !validatePhone(value) ? 'Please enter a valid phone number' : '';
    case 'minLength':
      return !validateMinLength(value, 2) ? `${field} must be at least 2 characters` : '';
    default:
      return '';
  }
};
