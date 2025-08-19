import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Play, ArrowRight, Phone, CheckCircle, Zap, Clock, Wifi, Smartphone, Star,   Award, Monitor, Database, Stethoscope, Calendar, User, Eye } from "lucide-react";
import { DemoRequestModal } from "../DemoRequestModal";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { NewsletterSubscription } from "../NewsletterSubscription";
import { videoAPI } from "../../services/api";

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2000, delay: number = 0) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.querySelector('.stats-container');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const increment = end / (duration / 16); // 60fps

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, duration, delay, isVisible]);

  return count;
};

// Animated Number Component
const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const count = useCountUp(value, 2000, 500);
  return <span>{count}{suffix}</span>;
};

// Animated Ratio Component
const AnimatedRatio = () => {
  const firstNumber = useCountUp(1, 1000, 500);
  const secondNumber = useCountUp(2500, 2000, 1500);
  return <span>{firstNumber}:{secondNumber}</span>;
};

// Use public URL for assets
import { getImage } from "../../utils/imageUtils";

const clinicAtHandDevice = getImage("clinicAtHandOpenCrossview");

export function HomePage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNewsletterPopupOpen, setIsNewsletterPopupOpen] = useState(false);
  const [hasShownNewsletter, setHasShownNewsletter] = useState(false);
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [isShowingFeatured, setIsShowingFeatured] = useState(true);
  const [featuredVideo, setFeaturedVideo] = useState<any>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string>('');

  // Fetch featured video
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setVideoLoading(true);
        const response = await videoAPI.getVideosByPlacement('homepage-hero');
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
    // Direct video file
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return url;
    }
    return url;
  };

  const partners = [
    {
      name: "Microsoft Founders Hub",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      hasLogo: true
    },
    {
      name: "Chandaria Innovation Centre",
      logo: "",
      hasLogo: false
    },
    {
      name: "Gates Foundation",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Gates_Foundation_Logo.svg",
      hasLogo: true
    },
    {
      name: "African Development Bank",
      logo: "",
      hasLogo: false
    },
    {
      name: "WHO Africa",
      logo: "",
      hasLogo: false
    },
          {
        name: "USAID",
        logo: "https://logotyp.us/file/usaid.svg",
        hasLogo: true
      }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "3-in-1 Diagnostics",
      description: "Blood tests, urine analysis, and vital signs monitoring in one portable device",
      color: "primary"
    },
    {
      icon: Clock,
      title: "15-Minute Results", 
      description: "Fast, accurate results allowing for immediate treatment decisions in remote areas",
      color: "secondary"
    },
    {
      icon: Zap,
      title: "AI-Powered & Offline",
      description: "Advanced AI algorithms that work without internet connection for rural deployment",
      color: "primary"
    }
  ];

  const benefits = [
    "Portable, all-in-one diagnostic solution for remote areas",
    "Immediate 15-minute results with clinical-grade accuracy",
    "Low maintenance, durable design for harsh environments",
    "Intuitive interface requiring minimal training",
    "Works completely offline with cloud sync when available"
  ];

  const iotFeatures = [
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "Continuous health data collection and analysis"
    },
    {
      icon: Database,
      title: "Cloud Integration",
      description: "Secure data storage and accessibility"
    },
    {
      icon: Wifi,
      title: "IoT Connectivity",
      description: "Seamless device-to-device communication"
    }
  ];

  // Fetch featured blogs from backend, fallback to recent blogs if none featured
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        
        // First try to get featured blogs
        const featuredResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/blog/posts?featured=true&limit=2`);
        
        if (featuredResponse.ok) {
          const featuredData = await featuredResponse.json();
          if (featuredData.success && featuredData.data.posts.length > 0) {
            // We have featured blogs, use them
            setFeaturedBlogs(featuredData.data.posts);
            setIsShowingFeatured(true);
          } else {
            // No featured blogs, get recent blogs instead
            const recentResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/blog/posts?limit=2`);
            if (recentResponse.ok) {
              const recentData = await recentResponse.json();
              if (recentData.success) {
                setFeaturedBlogs(recentData.data.posts);
                setIsShowingFeatured(false);
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        // Fallback to recent blogs on error
        try {
          const recentResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/blog/posts?limit=2`);
          if (recentResponse.ok) {
            const recentData = await recentResponse.json();
            if (recentData.success) {
              setFeaturedBlogs(recentData.data.posts);
            }
          }
        } catch (fallbackErr) {
          console.error('Failed to fetch fallback blogs:', fallbackErr);
        }
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, []);

  // Scroll detection effect
  useEffect(() => {
    const handleScroll = () => {
      if (hasShownNewsletter) return;
      
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show popup when user scrolls to 80% of the page
      if (scrollPosition >= documentHeight * 0.8) {
        setIsNewsletterPopupOpen(true);
        setHasShownNewsletter(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownNewsletter]);

  // Kenya SVG Map Component
  const KenyaMapSVG = () => (
    <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 400 300" fill="none">
      <path 
        d="M50 80 Q80 70 120 75 L160 80 Q200 85 240 90 L280 95 Q320 100 350 105 L380 120 Q370 150 350 180 L320 210 Q280 240 240 250 L200 255 Q160 250 120 240 L80 220 Q50 190 45 160 L40 130 Q45 100 50 80 Z" 
        fill="currentColor" 
        className="text-primary/20"
      />
      <circle cx="180" cy="160" r="3" fill="currentColor" className="text-secondary/30" />
      <circle cx="220" cy="140" r="2" fill="currentColor" className="text-primary/30" />
      <circle cx="160" cy="180" r="2" fill="currentColor" className="text-secondary/30" />
    </svg>
  );

  return (
    <div className="bg-background">
      {/* Enhanced Hero Section with Kenya Map and IoT Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Background with Kenya Map and IoT Elements */}
        <div className="absolute inset-0 bg-muted">
          {/* Kenya Map SVG */}
          <KenyaMapSVG />
          
          {/* IoT Network Pattern */}
          <div className="absolute inset-0 opacity-10">
            {/* IoT Nodes */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}
                style={{
                  left: `${20 + (i * 7)}%`,
                  top: `${30 + Math.sin(i) * 20}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full">
              {[...Array(8)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={`${25 + i * 10}%`}
                  y1={`${35 + Math.sin(i) * 15}%`}
                  x2={`${35 + i * 10}%`}
                  y2={`${45 + Math.cos(i) * 15}%`}
                  stroke="currentColor"
                  strokeWidth="1"
                  className={i % 2 === 0 ? "text-primary/20" : "text-secondary/20"}
                  strokeDasharray="3,3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </svg>
          </div>

          {/* Floating Brand Elements */}
          <motion.div
            animate={{ 
              y: [-20, 20, -20],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{ 
              y: [20, -20, 20],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/8 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-3 space-y-8 text-center lg:text-left"
            >
              <div className="space-y-6">
                {/* Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center"
                >
                  <Badge className="bg-primary text-white px-6 py-3 text-sm font-semibold shadow-lg border-0">
                    <Star className="mr-2 h-4 w-4" />
                    Transforming African Healthcare
                  </Badge>
                </motion.div>
                
                {/* Main Headline */}
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
                >
                  Africa's First{" "}
                  <span className="text-primary">
                    IoT-Powered
                  </span>{" "}
                  Healthcare Solution
                </motion.h1>
                
                {/* Product Name */}
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl text-secondary font-bold"
                >
                  Clinic at Hand
                </motion.h2>
                
                {/* Description */}
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
                >
                  Bridging the diagnostic gap in rural Africa with our revolutionary IoT-enabled 3-in-1 portable diagnostic kit. 
                  Delivering healthcare solutions through AI-powered, offline-capable technology that provides results in just{" "}
                  <span className="font-bold text-secondary">15 minutes</span>.
                </motion.p>
              </div>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button 
                  size="lg" 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <Phone className="mr-3 h-6 w-6" />
                  Request a Demo
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Content - Floating Device Showcase */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="lg:col-span-2 relative flex justify-center lg:justify-end"
            >
              {/* Floating Video Player */}
              <motion.div 
                animate={{ 
                  y: [-10, 10, -10],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative w-full max-w-2xl"
              >
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  {/* Video Player or Device Image */}
                  {featuredVideo ? (
                    <div className="relative w-full aspect-video rounded-2xl shadow-2xl overflow-hidden">
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
                      className="w-full h-auto rounded-2xl shadow-2xl relative z-10"
                    />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground"
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
              />
            </div>
            <span className="text-xs">Scroll to explore</span>
          </div>
        </motion.div>
      </section>

      {/* Kenya Healthcare Statistics Section */}
      <section className="section-padding bg-primary/5 dark:bg-primary/10">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Healthcare Reality in Kenya
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding the challenges we're solving with data-driven insights from Kenya's healthcare landscape.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto stats-container"
          >
            {/* Kenya Statistics Container */}
            <div className="bg-card rounded-2xl p-8 relative overflow-hidden shadow-lg border border-border">
              {/* Subtle map background */}
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground rounded-2xl"></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-8">In Kenya,</h3>
                
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedNumber value={20} suffix="%" />
                    </div>
                    <p className="text-sm text-foreground">Of Kenyans lack access to essential health services.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedRatio />
                    </div>
                    <p className="text-sm text-foreground">Doctor to patient ratio in Kenya.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedNumber value={58} suffix="%" />
                    </div>
                    <p className="text-sm text-foreground">Rural Kenyans struggle to access quality healthcare.</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors duration-300 bg-background"
                  >
                    <div className="text-3xl font-bold text-primary mb-2">
                      <AnimatedNumber value={77} suffix="%" />
                    </div>
                    <p className="text-sm text-foreground">Healthcare expenses are paid out-of-pocket.</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-center mt-8"
          >
            <p className="text-muted-foreground mb-6">
              These statistics drive our mission to make healthcare accessible to every Kenyan community.
            </p>
            <Link to="/about">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg">
                Learn About Our Impact
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* IoT Features Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              IoT-Powered <span className="text-secondary">Healthcare Innovation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced Internet of Things technology enabling connected healthcare solutions for remote communities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {iotFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full group">
                    <CardContent className="p-8">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex justify-center mb-6"
                      >
                        <div className="bg-primary/10 p-4 rounded-full border border-primary/20 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-300">
                          <IconComponent className="h-8 w-8 text-primary group-hover:text-green-600 transition-colors duration-300" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center border-2 hover:border-primary/20 hover:shadow-xl transition-all duration-300 h-full group">
                    <CardContent className="p-8">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex justify-center mb-6"
                      >
                        <div className="bg-primary/10 p-4 rounded-full border border-primary/20 group-hover:bg-green-100 group-hover:border-green-300 transition-all duration-300">
                          <IconComponent className="h-8 w-8 text-primary group-hover:text-green-600 transition-colors duration-300" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA to Product Page */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/clinic-at-hand">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6"
              >
                Explore Clinic at Hand
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Section */}
      <section className="section-padding bg-muted">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {isShowingFeatured ? "Latest Healthcare Insights" : "Recent Healthcare Insights"}
            </h2>
            <p className="text-lg text-muted-foreground">
              Stay informed with the latest developments in IoT healthcare and African medical innovation.
            </p>
            </div>
            <Link to="/blogs">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All Blogs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {loadingBlogs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div key={index} className="animate-pulse">
                  <Card className="overflow-hidden border-2 border-border h-full">
                    <div className="relative h-48 bg-muted"></div>
                    <CardContent className="p-6">
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : featuredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group border-2 border-border hover:border-primary/20 h-full">
                    <div className="relative h-48">
                      <img
                        src={blog.image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40" />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                        {isShowingFeatured ? "Featured" : "Recent"}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{blog.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{blog.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{blog.views}</span>
                          </div>
                          <span>{blog.readTime}</span>
                        </div>
                        <Link to={`/blogs/${blog.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2 2m2-13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">No Featured Articles Yet</h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're working on creating amazing featured content for you. Check back soon for insights, stories, and innovations from the frontlines of African healthcare transformation.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Featured content coming soon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>Stay tuned</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Why GONEP Section */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose GONEP?
              </h2>
              <p className="text-lg text-muted-foreground">
                Our innovative IoT approach combines cutting-edge technology with deep understanding 
                of African healthcare challenges to deliver practical, impactful solutions.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Link to="/about">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-0">
                  Learn More About Our Impact
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border">
                <div className="aspect-square bg-primary/5 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* IoT Healthcare Visual */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-4">
                      <Stethoscope className="h-12 w-12 text-primary/60" />
                      <Monitor className="h-12 w-12 text-secondary/60" />
                      <Database className="h-12 w-12 text-primary/60" />
                    </div>
                  </div>
                  <div className="text-center space-y-4 relative z-10">
                    <Award className="h-20 w-20 text-secondary mx-auto" />
                    <p className="text-muted-foreground font-medium">IoT Healthcare Innovation</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              x: [-20, 20, -20],
              y: [-10, 10, -10]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              x: [20, -20, 20],
              y: [10, -10, 10]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/15 rounded-full blur-2xl"
          />
        </div>

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Backed By Leading Organizations
            </h2>
            <p className="text-muted-foreground">
              Trusted partners supporting our mission to transform African healthcare
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary rounded-2xl p-8 border border-border shadow-lg"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center ">
              {partners.map((partner, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="bg-background rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-border h-24 flex flex-col items-center justify-center">
                    {partner.hasLogo ? (
                      <div className="flex flex-col items-center space-y-3">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="h-10 w-auto object-contain max-w-full"
                        />
                        <span className="text-xs font-bold text-foreground text-center leading-tight">
                          {partner.name}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-bold text-foreground text-center leading-tight">
                        {partner.name}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Final CTA Strip - Floating Card Effect */}
      <section className="bg-muted/30 py-16 relative overflow-hidden">
        {/* Well-distributed Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              x: [-50, 50, -50],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [50, -50, 50],
              y: [20, -20, 20]
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-10 right-10 w-56 h-56 bg-secondary/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [-30, 30, -30],
              y: [30, -30, 30]
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/3 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [30, -30, 30],
              y: [-30, 30, -30]
            }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/3 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-background rounded-3xl p-12 shadow-2xl border border-border relative overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                    Ready to Transform Healthcare?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Join us in revolutionizing healthcare across Africa through innovative IoT technology. 
                    Together, we can make quality healthcare accessible to every community.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => setIsDemoModalOpen(true)}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    <Phone className="mr-3 h-6 w-6" />
                    Request Live Demo
                  </Button>
                  <Link to="/health-tools/bmi-calculator">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-10 py-6 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-background"
                    >
                      Try Health Tools
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



              {/* Newsletter Popup */}
        {isNewsletterPopupOpen && (
          <NewsletterSubscription 
            variant="popup"
            onClose={() => setIsNewsletterPopupOpen(false)} 
          />
        )}

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </div>
  );
}