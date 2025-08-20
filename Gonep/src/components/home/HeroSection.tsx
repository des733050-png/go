import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Phone, Star } from "lucide-react";
import { motion } from "framer-motion";
import { videoAPI } from "../../services/api";
import { getImage } from "../../utils/imageUtils";

const clinicAtHandDevice = getImage("clinicAtHandOpenCrossview");

interface HeroSectionProps {
  onDemoRequest: () => void;
}

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

export function HeroSection({ onDemoRequest }: HeroSectionProps) {
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

  return (
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
                  transformative
                </span>{" "}
                healthcare solution
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
                When hospitals can't reach the people, our device does. 
                Bridging the diagnostic gap in rural Africa with our revolutionary  Point-of -Care 3-in-1 portable diagnostic kit. 
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
                onClick={onDemoRequest}
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

    </section>
  );
}
