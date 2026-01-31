import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { 
  MapPin, 
  Clock, 
  Heart,
  ArrowRight, 
  ArrowLeft,
  Calendar,
  DollarSign,
  Briefcase,
  GraduationCap,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Star,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";

interface JobDetail {
  id: number;
  title: string;
  slug: string;
  department: {
    name: string;
  };
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  niceToHave: string;
  salaryRange: string;
  experience: string;
  education: string;
  teamInfo: string;
  growthOpportunities: string;
  isActive: boolean;
  isFeatured: boolean;
  applicationDeadline: string;
  createdAt: string;
  updatedAt: string;
}

export function JobDetailPage() {
  const { jobId } = useParams();
  const [isApplying, setIsApplying] = useState(false);
  const [jobDetail, setJobDetail] = useState<JobDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: "",
    portfolio: "",
    linkedin: ""
  });

  const fetchJobDetail = async () => {
    if (!jobId) return;
    
    // Check cache first
    const cacheKey = `gonep_job_${jobId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // If cache is still valid (5 minutes), use it
        if (now - timestamp < 5 * 60 * 1000) {
          setJobDetail(data);
          setLastUpdated(new Date(timestamp));
          setLoading(false);
          return;
        }
      } catch (e) {
        // Invalid cache, remove it
        localStorage.removeItem(cacheKey);
      }
    }
    
    try {
      // Add cache-busting parameter to ensure fresh data
      const timestamp = Date.now();
              const response = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/careers/jobs/${jobId}?t=${timestamp}`);
      if (!response.ok) {
        throw new Error('Job not found');
      }
      const result = await response.json();
      const job = result.data.job;
      
      setJobDetail(job);
      setLastUpdated(new Date());
      
      // Debug: Log the job data to see its structure
      console.log('Job detail data:', job);
      console.log('Requirements field type:', typeof job.requirements);
      console.log('Requirements field value:', job.requirements);
      console.log('Responsibilities field type:', typeof job.responsibilities);
      console.log('Responsibilities field value:', job.responsibilities);
      console.log('Benefits field type:', typeof job.benefits);
      console.log('Benefits field value:', job.benefits);
      
      // Cache the job data
      localStorage.setItem(cacheKey, JSON.stringify({
        data: job,
        timestamp: Date.now()
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetail();
  }, [jobId]);

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case "Full-time": return "bg-primary/10 text-primary";
      case "Part-time": return "bg-secondary/10 text-secondary";
      case "Contract": return "bg-accent/10 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Senior": return "bg-destructive/10 text-destructive";
      case "Mid-level": return "bg-accent/10 text-accent";
      case "Entry-level": return "bg-secondary/10 text-secondary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Helper function to parse JSON strings safely
  const parseJsonField = (field: any): any[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    if (typeof field === 'string') {
      try {
        return JSON.parse(field);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  // Function to clear cache and refresh data
  const refreshJobData = () => {
    if (!jobId) return;
    
    // Clear the cache for this job
    const cacheKey = `gonep_job_${jobId}`;
    localStorage.removeItem(cacheKey);
    
    // Reset loading state and fetch fresh data
    setLoading(true);
    setError(null);
    fetchJobDetail();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobDetail) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('jobId', jobDetail.id.toString());
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      if (formData.phone) formDataToSend.append('phone', formData.phone);
      if (formData.coverLetter) formDataToSend.append('coverLetter', formData.coverLetter);
      if (formData.resume) formDataToSend.append('resume', formData.resume);

              const response = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/careers/applications`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // Reset form and close modal
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        resume: null,
        coverLetter: "",
        portfolio: "",
        linkedin: ""
      });
    setIsApplying(false);
      
      // Show success message (you could add a toast notification here)
      alert('Application submitted successfully!');
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !jobDetail) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Job Not Found</h1>
          <p className="text-muted-foreground">{error || 'The job you\'re looking for doesn\'t exist.'}</p>
          <Link to="/careers">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic SEO based on job
  const seoData = jobDetail ? {
    title: `${jobDetail.title} - Careers at GONEP Healthcare`,
    description: `Apply for ${jobDetail.title} at GONEP Healthcare. ${jobDetail.department.name} position in ${jobDetail.location}. ${jobDetail.type} role. Join our mission to transform African healthcare.`,
    keywords: [
      jobDetail.title,
      `GONEP Healthcare ${jobDetail.title}`,
      `healthcare jobs ${jobDetail.location}`,
      `medical device jobs`,
      `healthcare technology careers`,
      jobDetail.department.name
    ],
    canonical: `/careers/${jobDetail.id}`,
    ogType: "article"
  } : {
    title: "Job Opening - GONEP Healthcare Careers",
    description: "View job opening at GONEP Healthcare. Join our mission to transform African healthcare.",
    canonical: `/careers/${jobId}`
  };

  return (
    <div className="bg-background">
      <SEOHead seo={seoData} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Link to="/careers" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Careers
            </Link>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    {jobDetail.title}
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl">
                    {jobDetail.description}
                  </p>
                </div>
                
                {/* Refresh Button and Last Updated Info */}
                <div className="flex flex-col items-end gap-2">
                  <Button 
                    onClick={refreshJobData} 
                    variant="outline" 
                    size="sm"
                    disabled={loading}
                    className="text-xs"
                  >
                    <RefreshCw className={`w-3 h-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  {lastUpdated && (
                    <p className="text-xs text-muted-foreground">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge className={getJobTypeColor(jobDetail.type)}>
                  <Clock className="w-3 h-3 mr-1" />
                  {jobDetail.type}
                </Badge>
                <Badge className={getLevelColor(jobDetail.level)}>
                  {jobDetail.level}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {jobDetail.location}
                </Badge>
                <Badge variant="outline">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {jobDetail.department?.name || 'General'}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Details */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Job Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {jobDetail.salaryRange && (
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Salary Range</p>
                            <p className="font-semibold">{jobDetail.salaryRange}</p>
                          </div>
                        </div>
                      )}
                      {jobDetail.experience && (
                      <div className="flex items-center space-x-3">
                          <Briefcase className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Experience</p>
                            <p className="font-semibold">{jobDetail.experience}</p>
                          </div>
                        </div>
                      )}
                      {jobDetail.education && (
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Education</p>
                            <p className="font-semibold">{jobDetail.education}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Posted</p>
                          <p className="font-semibold">{new Date(jobDetail.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Job Description</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {jobDetail.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Responsibilities */}
              {(() => {
                try {
                  const responsibilities = parseJsonField(jobDetail.responsibilities);
                  // Double-check that responsibilities is actually an array
                  if (Array.isArray(responsibilities) && responsibilities.length > 0) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Key Responsibilities</h2>
                            <ul className="space-y-3">
                              {responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{responsibility}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  }
                  return null;
                } catch (error) {
                  console.warn('Error parsing responsibilities for job:', jobDetail.id, error);
                  return null;
                }
              })()}

              {/* Requirements */}
              {(() => {
                try {
                  const requirements = parseJsonField(jobDetail.requirements);
                  const niceToHave = parseJsonField(jobDetail.niceToHave);
                  // Double-check that requirements is actually an array
                  if (Array.isArray(requirements) && requirements.length > 0) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Requirements</h2>
                            <ul className="space-y-3 mb-6">
                              {requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-muted-foreground">{requirement}</span>
                                </li>
                              ))}
                            </ul>
                            
                            {Array.isArray(niceToHave) && niceToHave.length > 0 && (
                              <>
                                <h3 className="text-lg font-semibold text-foreground mb-3">Nice to Have</h3>
                                <ul className="space-y-3">
                                  {niceToHave.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                      <Star className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  }
                  return null;
                } catch (error) {
                  console.warn('Error parsing requirements for job:', jobDetail.id, error);
                  return null;
                }
              })()}

              {/* Team & Growth */}
              {(jobDetail.teamInfo || jobDetail.growthOpportunities) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Team & Growth</h2>
                    <div className="space-y-6">
                        {jobDetail.teamInfo && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Your Team</h3>
                            <p className="text-muted-foreground">{jobDetail.teamInfo}</p>
                      </div>
                        )}
                        {jobDetail.growthOpportunities && (
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Growth Opportunities</h3>
                            <p className="text-muted-foreground">{jobDetail.growthOpportunities}</p>
                      </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
              {/* Benefits */}
              {(() => {
                try {
                  const benefits = parseJsonField(jobDetail.benefits);
                  // Double-check that benefits is actually an array
                  if (Array.isArray(benefits) && benefits.length > 0) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Benefits</h3>
                            <ul className="space-y-3">
                              {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <Heart className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  }
                  return null;
                } catch (error) {
                  console.warn('Error parsing benefits for job:', jobDetail.id, error);
                  return null;
                }
              })()}

              {/* Application */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Apply Now</h3>
                    {jobDetail.applicationDeadline && (
                    <p className="text-sm text-muted-foreground mb-4">
                        Application deadline: {new Date(jobDetail.applicationDeadline).toLocaleDateString()}
                    </p>
                    )}
                    <Button 
                      onClick={() => setIsApplying(true)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Apply for this Position
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">Questions?</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">careers@gonepharm.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">+254 707 231 654</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {isApplying && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">Apply for {jobDetail.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsApplying(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="resume">Resume/CV *</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <div>
                  <Label htmlFor="coverLetter">Cover Letter</Label>
                  <Textarea
                    id="coverLetter"
                    placeholder="Tell us why you're interested in this position and how your experience aligns with our mission..."
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="portfolio">Portfolio URL</Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://your-portfolio.com"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/your-profile"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsApplying(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Submit Application
                    <FileText className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
