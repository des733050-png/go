import { useState, useCallback, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Calendar, Users, MapPin, Phone, Mail, CheckCircle, Zap, Clock, ArrowRight, ArrowLeft, User, Building, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EmailInput } from "./validation/EmailInput";
import { PhoneInput } from "./validation/PhoneInput";
import { CountrySelector } from "./validation/CountrySelector";
import { validateRequired, validateMinLength, validateEmail, validatePhone } from "./validation/validationUtils";
import { WaitlistModal } from "./demo-modal/WaitlistModal";
import { demoAPI } from "../services/api";

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  // Step 1: Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Step 2: Organization & Requirements
  organization: string;
  title: string;
  organizationType: string;
  country: string;
  interests: string[];
  message: string;
  
  // Step 3: Demo Scheduling
  demoType: string;
  preferredDate: string;
  attendeeCount: string;
  agreeToTerms: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  organization?: string;
  title?: string;
  organizationType?: string;
  country?: string;
  interests?: string;
  demoType?: string;
  preferredDate?: string;
}

interface Interest {
  id: number;
  name: string;
  description?: string;
  category: string;
}

interface DemoType {
  id: number;
  name: string;
  duration: string;
  description?: string;
  maxAttendees?: number;
}

export function DemoRequestModal({ isOpen, onClose }: DemoRequestModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    title: "",
    organizationType: "",
    country: "",
    interests: [],
    message: "",
    demoType: "",
    preferredDate: "",
    attendeeCount: "",
    agreeToTerms: false
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  
  // New state for dynamic data
  const [interests, setInterests] = useState<Interest[]>([]);
  const [demoTypes, setDemoTypes] = useState<DemoType[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Debounce timer refs
  const debounceTimers = useRef<{ [key: string]: number }>({});

  const steps = [
    { id: 1, title: "Contact Info", icon: User, description: "Your basic information" },
    { id: 2, title: "Requirements", icon: Building, description: "Organization & needs" },
    { id: 3, title: "Demo & Pilot", icon: Calendar, description: "Demo preferences & pilot program" },
    { id: 4, title: "Summary", icon: CheckCircle, description: "Review your request" }
  ];

  // Fetch interests and demo types from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        
        // Fetch interests, demo types, and available dates in parallel
        const [interestsResponse, demoTypesResponse, availableDatesResponse] = await Promise.all([
          demoAPI.getDemoInterests(),
          demoAPI.getDemoTypes(),
          demoAPI.getAvailableDates()
        ]);

        if (interestsResponse.success) {
          setInterests(interestsResponse.data);
        }

        if (demoTypesResponse.success) {
          setDemoTypes(demoTypesResponse.data);
        }

        if (availableDatesResponse.success) {
          // Store available dates for validation
          setAvailableDates(availableDatesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching demo configuration:', error);
        // Fallback to default values if API fails
        setInterests([
          { id: 1, name: "Blood glucose testing", category: "diagnostics" },
          { id: 2, name: "Blood pressure monitoring", category: "diagnostics" },
          { id: 3, name: "Urine analysis capabilities", category: "diagnostics" },
          { id: 4, name: "AI diagnostic features", category: "ai" },
          { id: 5, name: "Offline functionality", category: "technical" },
          { id: 6, name: "Data analytics & reporting", category: "analytics" },
          { id: 7, name: "Training & support programs", category: "support" },
          { id: 8, name: "Implementation planning", category: "planning" },
          { id: 9, name: "Pricing & financing options", category: "business" }
        ]);

        setDemoTypes([
          { id: 1, name: "Virtual Demo", duration: "45 min", description: "Online presentation with live Q&A" },
          { id: 2, name: "On-site Demo", duration: "2 hours", description: "In-person demonstration at your facility" }
        ]);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  // Add state for available dates
  const [availableDates, setAvailableDates] = useState<any[]>([]);

  // Function to check if a date is available
  const isDateAvailable = (date: string) => {
    const dateInfo = availableDates.find(d => d.date === date);
    return dateInfo ? dateInfo.isAvailable : false;
  };

  // Function to get available dates for the date picker
  const getAvailableDatesForPicker = () => {
    return availableDates
      .filter(d => d.isAvailable)
      .map(d => d.date)
      .sort();
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Debounced validation function
  const debouncedValidation = useCallback((field: keyof ValidationErrors, value: string, validator: (val: string) => boolean, errorMessage: string) => {
    // Clear existing timer for this field
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }

    // Set new timer
    debounceTimers.current[field] = window.setTimeout(() => {
      if (!validator(value)) {
        setValidationErrors(prev => ({ ...prev, [field]: errorMessage }));
      } else {
        setValidationErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }, 500); // 500ms debounce delay
  }, []);

  // Real-time validation check for current step
  const isCurrentStepValid = (): boolean => {
    const errors: ValidationErrors = {};
    
    switch (currentStep) {
      case 1:
        if (!validateRequired(formData.firstName)) errors.firstName = "First name is required";
        if (!validateRequired(formData.lastName)) errors.lastName = "Last name is required";
        if (!validateRequired(formData.email)) {
          errors.email = "Email is required";
        } else if (!isValidEmail) {
          errors.email = "Please enter a valid email address";
        }
        if (!validateRequired(formData.phone)) {
          errors.phone = "Phone is required";
        } else if (!isValidPhone) {
          errors.phone = "Please enter a valid phone number";
        }
        break;
      case 2:
        if (!validateRequired(formData.organization)) errors.organization = "Organization name is required";
        if (!validateRequired(formData.title)) errors.title = "Title is required";
        if (!validateRequired(formData.organizationType)) errors.organizationType = "Organization type is required";
        if (!validateRequired(formData.country)) errors.country = "Country is required";
        if (formData.interests.length === 0) errors.interests = "Please select at least one area of interest";
        if (formData.interests.length > 4) errors.interests = "You can select a maximum of 4 areas of interest";
        break;
      case 3:
        if (!validateRequired(formData.demoType)) errors.demoType = "Demo type is required";
        break;
      case 4:
        // Summary step - no validation needed
        break;
    }
    
    return Object.keys(errors).length === 0;
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => {
      const newInterests = checked 
        ? [...prev.interests, interest]
        : prev.interests.filter(i => i !== interest);
      
      return { ...prev, interests: newInterests };
    });
    
    // Clear any existing interest error when user makes changes
    setValidationErrors(prev => ({ ...prev, interests: undefined }));
    
    // Debounced validation for interests
    if (debounceTimers.current['interests']) {
      clearTimeout(debounceTimers.current['interests']);
    }
    
    debounceTimers.current['interests'] = window.setTimeout(() => {
      setFormData(prev => {
        if (prev.interests.length === 0) {
          setValidationErrors(validationErrors => ({ ...validationErrors, interests: "Please select at least one area of interest" }));
        } else if (prev.interests.length > 4) {
          setValidationErrors(validationErrors => ({ ...validationErrors, interests: "You can select a maximum of 4 areas of interest" }));
        }
        return prev;
      });
    }, 300); // Shorter debounce for checkboxes
  };

  const validateStep = (step: number): boolean => {
    const errors: ValidationErrors = {};
    
    switch (step) {
      case 1:
        if (!validateRequired(formData.firstName)) errors.firstName = "First name is required";
        if (!validateRequired(formData.lastName)) errors.lastName = "Last name is required";
        if (!validateRequired(formData.email)) {
          errors.email = "Email is required";
        } else if (!isValidEmail) {
          errors.email = "Please enter a valid email address";
        }
        if (!validateRequired(formData.phone)) {
          errors.phone = "Phone is required";
        } else if (!isValidPhone) {
          errors.phone = "Please enter a valid phone number";
        }
        break;
      case 2:
        if (!validateRequired(formData.organization)) errors.organization = "Organization name is required";
        if (!validateRequired(formData.title)) errors.title = "Title is required";
        if (!validateRequired(formData.organizationType)) errors.organizationType = "Organization type is required";
        if (!validateRequired(formData.country)) errors.country = "Country is required";
        if (formData.interests.length === 0) errors.interests = "Please select at least one area of interest";
        if (formData.interests.length > 4) errors.interests = "You can select a maximum of 4 areas of interest";
        break;
      case 3:
        if (!validateRequired(formData.demoType)) errors.demoType = "Demo type is required";
        break;
      case 4:
        // Summary step - no validation needed
        break;
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      // Prepare the data to send to backend
      const demoRequestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        title: formData.title,
        organizationType: formData.organizationType,
        country: formData.country,
        interests: formData.interests,
        message: formData.message,
        demoType: formData.demoType,
        preferredDate: formData.preferredDate || undefined,
        attendeeCount: formData.attendeeCount || undefined
      };

      // Send to backend API using the service
              const result = await demoAPI.submitDemoRequest(demoRequestData);
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Reset form after 3 seconds and close modal
        setTimeout(() => {
          setIsSubmitted(false);
          setCurrentStep(1);
          onClose();
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            organization: "",
            title: "",
            organizationType: "",
            country: "",
            interests: [],
            message: "",
            demoType: "",
            preferredDate: "",
            attendeeCount: "",
            agreeToTerms: false
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to submit demo request');
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      // You could show an error message to the user here
      alert('Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetModal = () => {
    // Clear all debounce timers
    Object.values(debounceTimers.current).forEach(timer => {
      clearTimeout(timer);
    });
    debounceTimers.current = {};
    
    setCurrentStep(1);
    setIsSubmitted(false);
    setValidationErrors({});
    setIsValidEmail(true);
    setIsValidPhone(true);
    setShowWaitlistModal(false);
    onClose();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={resetModal}>
        <DialogContent className="max-w-md mx-auto">
          <div className="text-center py-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-secondary" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Demo Requested Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest in Clinic at Hand. Our team will contact you within 24 hours to schedule your personalized demonstration.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation and next steps.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="!max-w-none w-3/4 mx-auto max-h-[95vh] flex flex-col">
        <DialogHeader className="pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-center">
            Request a <span className="text-secondary">Clinic at Hand</span> Demo
          </DialogTitle>
          <p className="text-muted-foreground text-center text-sm">
            Experience Africa's first transformative healthcare solution
          </p>
        </DialogHeader>

        
        {/* Progress Steps */}
        <div className="py-4 flex-shrink-0">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-border">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
            
            {steps.map((step) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted 
                        ? 'bg-primary border-primary' 
                        : isActive 
                        ? 'bg-primary border-primary' 
                        : 'bg-background border-border'
                    }`}
                  >
                    <IconComponent 
                      className={`h-5 w-5 ${
                        isCompleted || isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                      }`} 
                    />
                  </div>
                  <div className="text-center mt-2">
                    <p className={`text-xs font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 pb-4"
            >
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                    <p className="text-sm text-muted-foreground">Tell us who you are</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, firstName: e.target.value }));
                          clearFieldError('firstName');
                          // Debounced validation
                          debouncedValidation('firstName', e.target.value, validateRequired, "First name is required");
                        }}
                        placeholder="Your first name"
                        className={`w-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${validationErrors.firstName ? "border-destructive/50 focus:border-destructive" : ""}`}
                      />
                      {validationErrors.firstName && (
                        <p className="text-xs text-destructive">{validationErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, lastName: e.target.value }));
                          clearFieldError('lastName');
                          // Debounced validation
                          debouncedValidation('lastName', e.target.value, validateRequired, "Last name is required");
                        }}
                        placeholder="Your last name"
                        className={`w-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${validationErrors.lastName ? "border-destructive/50 focus:border-destructive" : ""}`}
                      />
                      {validationErrors.lastName && (
                        <p className="text-xs text-destructive">{validationErrors.lastName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <EmailInput
                        value={formData.email}
                        onChange={(value) => {
                          setFormData(prev => ({ ...prev, email: value }));
                          clearFieldError('email');
                          // Debounced email validation
                          if (!validateRequired(value)) {
                            debouncedValidation('email', value, validateRequired, "Email is required");
                          } else {
                            debouncedValidation('email', value, validateEmail, "Please enter a valid email address");
                          }
                        }}
                        onValidationChange={setIsValidEmail}
                        placeholder="your@email.com"
                        error={!!validationErrors.email}
                      />
                      {validationErrors.email && (
                        <p className="text-xs text-destructive">{validationErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <PhoneInput
                        value={formData.phone}
                        onChange={(value) => {
                          setFormData(prev => ({ ...prev, phone: value }));
                          clearFieldError('phone');
                          // Debounced phone validation
                          if (!validateRequired(value)) {
                            debouncedValidation('phone', value, validateRequired, "Phone is required");
                          } else {
                            debouncedValidation('phone', value, validatePhone, "Please enter a valid phone number");
                          }
                        }}
                        onValidationChange={setIsValidPhone}
                        placeholder="+254 XXX XXX XXX"
                        error={!!validationErrors.phone}
                      />
                      {validationErrors.phone && (
                        <p className="text-xs text-destructive">{validationErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Organization & Requirements */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Organization & Requirements</h3>
                    <p className="text-sm text-muted-foreground">Tell us about your organization and needs</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Organization Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.organization}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, organization: e.target.value }));
                          clearFieldError('organization');
                          // Debounced validation
                          debouncedValidation('organization', e.target.value, validateRequired, "Organization name is required");
                        }}
                        placeholder="Your organization"
                        className={`w-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${validationErrors.organization ? "border-destructive/50 focus:border-destructive" : ""}`}
                      />
                      {validationErrors.organization && (
                        <p className="text-xs text-destructive">{validationErrors.organization}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Your Title <span className="text-destructive">*</span>
                      </label>
                      <Input
                        value={formData.title}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, title: e.target.value }));
                          clearFieldError('title');
                          // Debounced validation
                          debouncedValidation('title', e.target.value, validateRequired, "Title is required");
                        }}
                        placeholder="Your job title"
                        className={`w-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary ${validationErrors.title ? "border-destructive/50 focus:border-destructive" : ""}`}
                      />
                      {validationErrors.title && (
                        <p className="text-xs text-destructive">{validationErrors.title}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Organization Type <span className="text-destructive">*</span>
                      </label>
                      <Select 
                        onValueChange={(value) => {
                          setFormData(prev => ({ ...prev, organizationType: value }));
                          clearFieldError('organizationType');
                          // Debounced validation
                          debouncedValidation('organizationType', value, validateRequired, "Organization type is required");
                        }}
                        value={formData.organizationType}
                      >
                        <SelectTrigger className={`w-full bg-background border-border text-foreground focus:border-primary focus:ring-primary ${validationErrors.organizationType ? "border-destructive/50 focus:border-destructive" : ""}`}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hospital">Hospital/Medical Center</SelectItem>
                          <SelectItem value="clinic">Primary Health Clinic</SelectItem>
                          <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                          <SelectItem value="government">Government/Ministry</SelectItem>
                          <SelectItem value="distributor">Healthcare Distributor</SelectItem>
                          <SelectItem value="investor">Investor/Funding Organization</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.organizationType && (
                        <p className="text-xs text-destructive">{validationErrors.organizationType}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Country <span className="text-destructive">*</span>
                      </label>
                      <CountrySelector
                        value={formData.country}
                        onValueChange={(value) => {
                          setFormData(prev => ({ ...prev, country: value }));
                          clearFieldError('country');
                          // Debounced validation
                          debouncedValidation('country', value, validateRequired, "Country is required");
                        }}
                        placeholder="Select your country"
                        error={!!validationErrors.country}
                      />
                      {validationErrors.country && (
                        <p className="text-xs text-destructive">{validationErrors.country}</p>
                      )}
                    </div>
                  </div>

                  {/* Areas of Interest */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">
                      Areas of Interest <span className="text-destructive">*</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        (Select 1-4 areas)
                      </span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
                      {interests.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest.name}
                            checked={formData.interests.includes(interest.name)}
                            onCheckedChange={(checked) => handleInterestChange(interest.name, checked as boolean)}
                          />
                          <label htmlFor={interest.name} className="text-sm text-foreground cursor-pointer">
                            {interest.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {validationErrors.interests && (
                      <p className="text-xs text-destructive">{validationErrors.interests}</p>
                    )}
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Additional Information (Optional)</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about your specific needs or questions..."
                      rows={3}
                      className="w-full bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Demo Scheduling & Pilot Program */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Schedule Your Demo</h3>
                    <p className="text-sm text-muted-foreground">Choose your preferred demo experience</p>
                  </div>

                  {/* Demo Type Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground">
                      Demo Type <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {demoTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            formData.demoType === type.name
                              ? 'border-primary bg-primary/5 shadow-md'
                              : validationErrors.demoType
                              ? 'border-destructive/50 hover:border-primary/50'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, demoType: type.name }));
                            clearFieldError('demoType');
                            // Immediate validation for demo type selection
                            if (!validateRequired(type.name)) {
                              setValidationErrors(prev => ({ ...prev, demoType: "Demo type is required" }));
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.demoType === type.name
                                ? 'border-primary bg-primary'
                                : 'border-border'
                            }`}>
                              {formData.demoType === type.name && (
                                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                              )}
                            </div>
                            <span className="font-semibold text-foreground">{type.name}</span>
                            <Badge variant="outline" className="text-xs">{type.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground ml-8">{type.description}</p>
                        </div>
                      ))}
                    </div>
                    {validationErrors.demoType && (
                      <p className="text-xs text-destructive">{validationErrors.demoType}</p>
                    )}
                  </div>

                  {/* Demo Preferences */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Preferred Date (Optional)</label>
                      <Input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          setFormData(prev => ({ ...prev, preferredDate: selectedDate }));
                          
                          // Clear any existing date error
                          if (validationErrors.preferredDate) {
                            setValidationErrors(prev => ({ ...prev, preferredDate: undefined }));
                          }
                          
                          // Validate date availability if a date is selected
                          if (selectedDate && !isDateAvailable(selectedDate)) {
                            setValidationErrors(prev => ({ 
                              ...prev, 
                              preferredDate: "This date is not available for demos" 
                            }));
                          }
                        }}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full bg-background border-border text-foreground focus:border-primary focus:ring-primary ${
                          validationErrors.preferredDate ? 'border-red-500' : ''
                        }`}
                      />
                      {validationErrors.preferredDate && (
                        <p className="text-sm text-red-500 mt-1">{validationErrors.preferredDate}</p>
                      )}
                      {formData.preferredDate && !validationErrors.preferredDate && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ Date available for demo
                        </p>
                      )}
                      
                      {/* Available Dates Preview */}
                      {availableDates.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-muted-foreground mb-2">
                            Next available dates:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {availableDates
                              .filter(d => d.isAvailable && d.currentBookings < d.maxBookings)
                              .slice(0, 5)
                              .map((dateInfo) => (
                                <Badge
                                  key={dateInfo.date}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                  onClick={() => setFormData(prev => ({ ...prev, preferredDate: dateInfo.date }))}
                                >
                                  {new Date(dateInfo.date).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                  {dateInfo.currentBookings > 0 && (
                                    <span className="ml-1 text-xs">
                                      ({dateInfo.maxBookings - dateInfo.currentBookings} slots left)
                                    </span>
                                  )}
                                </Badge>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Number of Attendees (Optional)</label>
                      <Select onValueChange={(value) => setFormData(prev => ({ ...prev, attendeeCount: value }))}>
                        <SelectTrigger className="w-full bg-background border-border text-foreground focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="How many people?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 people</SelectItem>
                          <SelectItem value="3-5">3-5 people</SelectItem>
                          <SelectItem value="6-10">6-10 people</SelectItem>
                          <SelectItem value="11-20">11-20 people</SelectItem>
                          <SelectItem value="20+">20+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                      className="mt-0.5"
                    />
                    <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
                      I agree to be contacted by GONEP regarding this demo request and understand that my information will be used according to GONEP's privacy policy.
                    </label>
                  </div>

                  {/* Pilot Program Section */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border border-secondary/20">
                    <div className="text-center mb-4">
                      <div className="bg-secondary/20 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-secondary" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">Pilot Program</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Something new for development coming
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Join the waitlist for early access
                      </p>
                    </div>
                    <div className="text-center">
                      <Button
                        onClick={() => setShowWaitlistModal(true)}
                        variant="outline"
                        className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                      >
                        Join Waitlist
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Summary */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-3">Review Your Request</h3>
                    <p className="text-muted-foreground">Please review all details before submitting your demo request</p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Contact Information */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          Contact Information
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-blue-100 dark:border-blue-800/50">
                            <span className="font-medium text-muted-foreground">Full Name:</span>
                            <span className="font-semibold text-foreground">{formData.firstName} {formData.lastName}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-blue-100 dark:border-blue-800/50">
                            <span className="font-medium text-muted-foreground">Email:</span>
                            <span className="font-semibold text-foreground">{formData.email}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium text-muted-foreground">Phone:</span>
                            <span className="font-semibold text-foreground">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Organization Information */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <Building className="h-4 w-4 text-green-600 dark:text-green-400" />
                          </div>
                          Organization Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-green-100 dark:border-green-800/50">
                            <span className="font-medium text-muted-foreground">Organization:</span>
                            <span className="font-semibold text-foreground">{formData.organization}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-green-100 dark:border-green-800/50">
                            <span className="font-medium text-muted-foreground">Your Title:</span>
                            <span className="font-semibold text-foreground">{formData.title}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-green-100 dark:border-green-800/50">
                            <span className="font-medium text-muted-foreground">Type:</span>
                            <span className="font-semibold text-foreground capitalize">{formData.organizationType}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium text-muted-foreground">Country:</span>
                            <span className="font-semibold text-foreground">{formData.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Areas of Interest */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <Settings className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          Areas of Interest
                        </h4>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {formData.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                          {formData.message && (
                            <div className="pt-3 border-t border-purple-200 dark:border-purple-800/50">
                              <span className="font-medium text-muted-foreground text-sm block mb-2">Additional Message:</span>
                              <p className="text-sm text-foreground bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                                {formData.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Demo Preferences */}
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
                        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          Demo Preferences
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-orange-100 dark:border-orange-800/50">
                            <span className="font-medium text-muted-foreground">Demo Type:</span>
                            <span className="font-semibold text-foreground capitalize">{formData.demoType}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-orange-100 dark:border-orange-800/50">
                            <span className="font-medium text-muted-foreground">Preferred Date:</span>
                            <span className="font-semibold text-foreground">
                              {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString() : 'Not specified'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-orange-100 dark:border-orange-800/50">
                            <span className="font-medium text-muted-foreground">Attendees:</span>
                            <span className="font-semibold text-foreground">{formData.attendeeCount || 'Not specified'}</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium text-muted-foreground">Terms Accepted:</span>
                            <span className={`font-semibold flex items-center gap-2 ${formData.agreeToTerms ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {formData.agreeToTerms ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  Yes
                                </>
                              ) : (
                                <>
                                  <span className="text-red-500">✗</span>
                                  No
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Confirmation */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20 text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <CheckCircle className="h-6 w-6 text-primary" />
                      <h5 className="text-lg font-semibold text-foreground">Ready to Submit</h5>
                    </div>
                    <p className="text-muted-foreground">
                      By clicking "Request Demo" below, you confirm that all information provided is accurate and you agree to be contacted by GONEP regarding this demo request.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="flex justify-between items-center pt-6 border-t border-border flex-shrink-0 bg-background">
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            )}
            <Button
              type="button"
              variant="ghost"
              onClick={resetModal}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>

          <div className="flex space-x-3">
            {currentStep < 4 ? (
              <div className="flex flex-col items-end">
                {!isCurrentStepValid() && (
                  <p className="text-xs text-destructive mb-2">Please fill all the necessary details above</p>
                )}
                <Button
                  onClick={nextStep}
                  disabled={!isCurrentStepValid()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed px-6"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreeToTerms || isSubmitting}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-50 px-6"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary-foreground mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Request Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>


      </DialogContent>

      {/* Waitlist Modal */}
      <WaitlistModal 
        isOpen={showWaitlistModal} 
        onClose={() => setShowWaitlistModal(false)} 
      />
    </Dialog>
  );
}