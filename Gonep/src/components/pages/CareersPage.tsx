import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Clock, Users, Heart, Lightbulb, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { videoAPI } from "../../services/api";

interface JobOpening {
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
}

const CACHE_KEY = 'gonep_careers_jobs';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function CareersPage() {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string>('');

  // Fetch videos for this page (general placement)
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
        const response = await videoAPI.getVideosByPlacement('general');
        if (response.success && response.data.videos) {
          setVideos(response.data.videos);
        }
      } catch (err: any) {
        setVideoError(err.message || 'Failed to load videos');
        console.error('Error fetching videos:', err);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Helper function to get video embed URL with autoplay
  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` : url;
    }
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1` : url;
    }
    // Direct video file
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return url;
    }
    return url;
  };

  const fetchJobs = async () => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const now = Date.now();
        
        // If cache is still valid, use it
        if (now - timestamp < CACHE_DURATION) {
          setJobOpenings(data || []);
          return;
        }
      } catch (e) {
        // Invalid cache, remove it
        localStorage.removeItem(CACHE_KEY);
      }
    }

    // Fetch fresh data
    setLoading(true);
    setError(null);
    
    try {
      // Add cache-busting parameter to ensure fresh data
      const timestamp = Date.now();
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/careers/jobs?t=${timestamp}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const result = await response.json();
      const jobs = result.data.jobs || [];
      
      // Debug: Log the first job to see its structure
      if (jobs.length > 0) {
        console.log('Sample job data:', jobs[0]);
        console.log('Requirements field type:', typeof jobs[0].requirements);
        console.log('Requirements field value:', jobs[0].requirements);
      }
      
      setJobOpenings(jobs);
      
      // Cache the data
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: jobs,
        timestamp: Date.now()
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const benefits = [
    {
      icon: Heart,
      title: "Healthcare Impact",
      description: "Make a direct difference in millions of African lives through innovative healthcare solutions"
    },
    {
      icon: Users,
      title: "Diverse Community", 
      description: "Work with talented professionals from across Africa and the global healthcare ecosystem"
    },
    {
      icon: Lightbulb,
      title: "Innovation Focus",
      description: "Lead cutting-edge research and development in diagnostic technologies and AI"
    },
    {
      icon: Trophy,
      title: "Growth Opportunities",
      description: "Advance your career while building Africa's most impactful healthcare technology company"
    }
  ];

  const values = [
    {
      title: "Mission-Driven Excellence",
      description: "We're committed to eliminating healthcare disparities through innovative, accessible diagnostic solutions."
    },
    {
      title: "Community-Centered Approach", 
      description: "Every solution is built with and for the African communities we serve, ensuring cultural relevance and adoption."
    },
    {
      title: "Collaborative Innovation",
      description: "We foster an environment where diverse perspectives drive breakthrough solutions for complex healthcare challenges."
    },
    {
      title: "Sustainable Impact",
      description: "We build for long-term positive change, creating sustainable healthcare infrastructure across Africa."
    }
  ];

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
        const parsed = JSON.parse(field);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn('Failed to parse JSON field:', field, e);
        return [];
      }
    }
    // If it's not a string or array, log it for debugging
    if (field !== null && field !== undefined) {
      console.warn('Unexpected field type:', typeof field, field);
    }
    return [];
  };

  const handleRetry = () => {
    // Clear cache and retry
    localStorage.removeItem(CACHE_KEY);
    window.location.reload();
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 section-padding">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Join Our Mission to Transform African Healthcare
            </h1>
            <p className="text-lg text-muted-foreground">
              Be part of a diverse, passionate team building innovative solutions that improve healthcare 
              access for millions across Africa. Together, we're making quality diagnostics accessible to every community.
            </p>
            <Button 
              onClick={() => document.getElementById('job-openings')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Join GONEP */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose GONEP?
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At GONEP, you'll be part of Africa's most impactful healthcare innovation journey. 
                  We're not just building products – we're creating solutions that save lives and strengthen communities.
                </p>
                <p>
                  Our team combines deep healthcare expertise with cutting-edge technology, working directly 
                  with African communities to ensure our solutions meet real needs and drive lasting change.
                </p>
                <p>
                  Join us in democratizing healthcare across Africa, where your skills and passion can make 
                  a measurable difference in millions of lives.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {videos.length > 0 ? (
                <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                  <iframe
                    src={getVideoEmbedUrl(videos[0].videoUrl)}
                    title={videos[0].title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="GONEP team collaboration"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits & Culture */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Benefits & Culture
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We believe in supporting our team members' growth, well-being, and impact through comprehensive benefits and a culture of innovation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center border-2 hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="bg-primary/10 p-4 rounded-full">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Values
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center space-y-3"
              >
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section id="job-openings" className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Current Openings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our growing team and help us expand access to quality healthcare across Africa.
            </p>
          </motion.div>
          
          {/* Loading State - Only for the careers section */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading career opportunities...</p>
            </div>
          )}

          {/* Error State - Only for the careers section */}
          {error && !loading && (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-foreground mb-4">Error Loading Careers</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRetry} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Try Again
              </Button>
            </div>
          )}

          {/* Jobs Display */}
          {!loading && !error && jobOpenings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No job openings available at the moment.</p>
              <p className="text-muted-foreground">Check back later or send us your resume for future opportunities.</p>
            </div>
          )}

          {/* Refresh Button */}
          {!loading && !error && jobOpenings.length > 0 && (
            <div className="text-center mb-6">
              <Button 
                onClick={fetchJobs} 
                variant="outline" 
                className="text-sm"
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Jobs
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          )}

          {!loading && !error && jobOpenings.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.department?.name || 'General'}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getJobTypeColor(job.type)}>
                            <Clock className="w-3 h-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge className={getLevelColor(job.level)}>
                            {job.level}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm">{job.description}</p>
                        
                        {(() => {
                          try {
                            const requirements = parseJsonField(job.requirements);
                            // Double-check that requirements is actually an array
                            if (Array.isArray(requirements) && requirements.length > 0) {
                              return (
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-sm text-foreground">Key Requirements:</h4>
                                  <ul className="text-xs text-muted-foreground space-y-1">
                                    {requirements.slice(0, 3).map((req, reqIndex) => (
                                      <li key={reqIndex} className="flex items-start">
                                        <span className="text-primary mr-2">•</span>
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            }
                            return null;
                          } catch (error) {
                            console.warn('Error parsing requirements for job:', job.id, error);
                            return null;
                          }
                        })()}
                        
                        <div className="flex gap-2">
                          <Link to={`/careers/${job.slug}`} className="flex-1">
                            <Button variant="outline" className="w-full">
                              View Details
                            </Button>
                          </Link>
                          <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-lg text-muted-foreground">
              We're always looking for passionate individuals who share our mission. 
              Send us your resume and tell us how you'd like to contribute to transforming African healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Your Resume
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Contact HR Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}