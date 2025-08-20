import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Play, Download, ArrowRight, CheckCircle, Zap, Clock, Smartphone, Wifi, Shield, Globe, Stethoscope, Droplets, Heart, Brain, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Use public URL for assets
import { getImage } from "../../utils/imageUtils";

const clinicAtHandDevice = getImage("clinicAtHandOpenCrossview");
import { DemoRequestModal } from "../DemoRequestModal";
import { videoAPI } from "../../services/api";

export function ProductPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [featuredVideo, setFeaturedVideo] = useState<any>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string>('');

  // Fetch featured video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setVideoLoading(true);
        const response = await videoAPI.getVideosByPlacement('clinic-hero');
        if (response.success && response.data.videos && response.data.videos.length > 0) {
          setFeaturedVideo(response.data.videos[0]);
        }
      } catch (err: any) {
        setVideoError(err.message || 'Failed to load demo video');
        console.error('Error fetching video:', err);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideo();
  }, []);

  // Helper function to get video embed URL
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
    // Dailymotion
    if (url.includes('dailymotion.com/video/')) {
      const videoId = url.split('dailymotion.com/video/')[1]?.split('?')[0];
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId}?autoplay=1&mute=1&loop=1` : url;
    }
    // Facebook
    if (url.includes('facebook.com/') && url.includes('/videos/')) {
      return url.replace('facebook.com', 'facebook.com/plugins/video.php') + '&autoplay=1&mute=1';
    }
    // Instagram
    if (url.includes('instagram.com/p/') && url.includes('/')) {
      const postId = url.split('instagram.com/p/')[1]?.split('/')[0];
      return postId ? `https://www.instagram.com/p/${postId}/embed/` : url;
    }
    // TikTok
    if (url.includes('tiktok.com/@') && url.includes('/video/')) {
      return url.replace('tiktok.com', 'tiktok.com/embed');
    }
    // Direct video file
    if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
      return url;
    }
    // For any other URL, return as is (will be handled by iframe)
    return url;
  };

  const clinicApplications = [
    {
      icon: Droplets,
      title: "Blood Analysis",
      description: "Comprehensive blood testing including glucose, hemoglobin, and cholesterol levels with lab-grade accuracy",
      features: ["Glucose monitoring", "Hemoglobin testing", "Cholesterol screening", "Infection markers"],
      color: "primary"
    },
    {
      icon: Heart,
      title: "Vital Signs Monitoring",
      description: "Real-time monitoring of essential vital signs for immediate health assessment",
      features: ["Blood pressure", "Heart rate", "Temperature"],
      color: "secondary"
    },
    {
      icon: Stethoscope,
      title: "Urine Analysis",
      description: "Complete urinalysis for detecting infections, kidney function, and metabolic conditions",
      features: ["Protein levels", "Glucose detection", "Liver function", "Kidney function"],
      color: "primary"
    }
  ];

  const technicalSpecs = [
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms provide clinical-grade diagnostic accuracy"
    },
    {
      icon: Clock,
      title: "15-Minute Results",
      description: "Rapid processing delivers comprehensive test results in just 15 minutes"
    },
    {
      icon: Wifi,
      title: "Offline Capability",
      description: "Operates completely offline with cloud sync when connectivity is available"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "End-to-end encryption ensures patient data privacy and regulatory compliance"
    },
    {
      icon: Smartphone,
      title: "Intuitive Interface",
      description: "User-friendly touchscreen interface requires minimal training to operate"
    },
    {
      icon: Globe,
      title: "Remote Connectivity",
      description: " Point-of -Care for seamless integration with healthcare management systems"
    }
  ];

  const useCases = [
    {
      title: "Rural Health Clinics",
      description: "Bringing comprehensive diagnostics to remote communities with limited healthcare infrastructure",
      icon: "🏥"
    },
    {
      title: "Mobile Health Units",
      description: "Portable solution for outreach programs and community health initiatives",
      icon: "🚐"
    },
    {
      title: "Home Based Care",
      description: "Comprehensive diagnostic testing for convenient at-home healthcare monitoring and management",
      icon: "🚨"
    },
    {
      title: "School Health Programs",
      description: "Regular health screenings and monitoring for educational institutions",
      icon: "🏫"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Video Demo */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        <div className="container relative z-10 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="space-y-6">
                <Badge className="bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold border-0">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Revolutionary Healthcare Technology
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="text-primary">
                    Clinic at Hand
                  </span>
                </h1>
                
                <h2 className="text-2xl md:text-3xl text-black dark:text-white font-semibold">
                  3-in-1 Portable Diagnostic Solution
                </h2>
                
                <p className="text-lg text-black dark:text-white leading-relaxed max-w-2xl">
                  The Problem → Our Solution → Tangible Impact
                </p>
                
                <p className="text-lg text-black dark:text-white leading-relaxed max-w-2xl">
                  Transform healthcare delivery with our revolutionary  Point-of -Care diagnostic device. 
                  Perform blood tests, urine analysis, and vital signs monitoring anywhere, anytime, 
                  with results in just 15 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  Request Live Demo
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              {/* <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Download className="mr-3 h-6 w-6" />
                  Download Specs
                </Button> */}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">15min</div>
                  <div className="text-xs text-muted-foreground">Test Results</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-secondary">3-in-1</div>
                  <div className="text-xs text-muted-foreground">Diagnostics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Offline Ready</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Video Demo Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative"
            >
              <div className="relative bg-card backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-border overflow-hidden">
                {featuredVideo ? (
                  /* Video Player */
                  <div className="relative">
                    <div className="aspect-video bg-muted rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        src={getVideoEmbedUrl(featuredVideo.videoUrl)}
                        title={featuredVideo.title}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  /* Device Image with Play Button */
                  <div className="relative">
                    {featuredVideo ? (
                      <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                        <iframe
                          src={getVideoEmbedUrl(featuredVideo.videoUrl)}
                          title={featuredVideo.title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <img
                        src={clinicAtHandDevice}
                        alt="GONEP Clinic at Hand diagnostic device"
                        className="w-full h-auto rounded-2xl shadow-lg"
                      />
                    )}
                  </div>
                )}

                
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic Applications Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Comprehensive <span className="text-secondary">Diagnostic Capabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three essential healthcare tests integrated into one revolutionary device, 
              delivering clinical-grade results in remote and resource-limited settings.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {clinicApplications.map((app, index) => {
              const IconComponent = app.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="text-center space-y-6">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="flex justify-center"
                        >
                          <div className={`bg-${app.color}/10 p-6 rounded-full border border-${app.color}/20`}>
                            <IconComponent className={`h-12 w-12 text-${app.color}`} />
                          </div>
                        </motion.div>
                        
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">{app.title}</h3>
                          <p className="text-muted-foreground mb-6">{app.description}</p>
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground text-sm">Key Features:</h4>
                          <ul className="space-y-2">
                            {app.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className={`h-4 w-4 text-${app.color} flex-shrink-0`} />
                                <span className="text-muted-foreground">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Advanced <span className="text-primary">Technology Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge IoT technology and AI algorithms to deliver 
              reliable, accurate, and user-friendly healthcare diagnostics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalSpecs.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center border-2 hover:border-secondary/20 hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="bg-secondary/10 p-3 rounded-full border border-secondary/20">
                          <IconComponent className="h-6 w-6 text-secondary" />
                        </div>
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground mb-3">{spec.title}</h3>
                      <p className="text-muted-foreground text-sm">{spec.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Real-World <span className="text-secondary">Applications</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Versatile healthcare solution designed for various environments and use cases 
              across the African healthcare ecosystem.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-2 hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl mb-2">{useCase.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-3">{useCase.title}</h3>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground section-padding">
        <div className="container text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Transform Healthcare Delivery?
            </h2>
            <p className="text-xl opacity-90">
              Experience the future of healthcare diagnostics with Clinic at Hand. 
              Request a demo and see how our IoT-powered solution can revolutionize 
              healthcare access in your community.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0"
              >
                Request Live Demo
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}