import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Target, Users, Award, Heart, Globe, Lightbulb, Shield, Star } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { videoAPI } from "../../services/api";
import WhoWeAre from "../../assets/Grantedcert.jpeg";

export function WhoWeArePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string>('');

  // Fetch videos for this page
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
        const response = await videoAPI.getVideosByPlacement('about-who-we-are');
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

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Committed to eliminating healthcare disparities across Africa through innovative technology"
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Building solutions with and for the communities we serve, ensuring cultural relevance and adoption"
    },
    {
      icon: Award,
      title: "Excellence in Innovation",
      description: "Combining cutting-edge technology with practical, field-tested solutions for real-world impact"
    }
  ];

  const mottos = [
    {
      icon: Heart,
      title: "Healthcare for All",
      description: "Every individual deserves access to quality healthcare, regardless of their location or economic status"
    },
    {
      icon: Globe,
      title: "African Solutions for African Challenges",
      description: "We believe in developing solutions that are specifically tailored to the unique healthcare needs of African communities"
    },
    {
      icon: Lightbulb,
      title: "Innovation with Purpose",
      description: "Technology should serve humanity, especially in areas where it can make the most significant impact"
    },
    {
      icon: Shield,
      title: "Trust and Reliability",
      description: "Building trust through consistent, reliable, and transparent healthcare solutions"
    }
  ];

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
              Who We Are
            </h1>
            <p className="text-lg text-muted-foreground">
              GONEP Pharmaceuticals is more than a company - we're a movement dedicated to transforming 
              healthcare access across Africa through innovation, compassion, and unwavering commitment to our communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Our Vision
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">
                  A future where every African, regardless of location or economic status, has access to quality healthcare.
                </p>
                <p>
                  We envision a continent where diagnostic services are as accessible as mobile phones, 
                  where rural communities have the same healthcare capabilities as urban centers, and where 
                  no life is lost due to lack of access to basic medical testing.
                </p>
                <p>
                  Our vision extends beyond just providing technology - we're building a healthcare ecosystem 
                  that empowers communities, educates healthcare workers, and creates sustainable solutions 
                  that grow with the communities they serve.
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
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="African healthcare vision"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              {videos.length > 1 ? (
                <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                  <iframe
                    src={getVideoEmbedUrl(videos[1].videoUrl)}
                    title={videos[1].title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <ImageWithFallback
                  src={WhoWeAre}
                  alt="GONEP team working in African community"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Our Mission
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg font-semibold text-foreground">
                  To develop innovative, field-ready medical technologies that bring life-saving diagnostics and care to the last mile.
                </p>
                <p>
                  Our mission is driven by the belief that healthcare is a fundamental human right. We work 
                  tirelessly to bridge the gap between advanced medical technology and the communities that 
                  need it most.
                </p>
                <p>
                  Through our Clinic at Hand solution, we're bringing comprehensive diagnostic capabilities 
                  to the most remote areas, empowering healthcare workers with the tools they need to make 
                  informed decisions and save lives.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These values guide every decision we make and every action we take in our journey to transform African healthcare.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
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
                    <CardContent className="p-8">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="bg-primary/10 p-4 rounded-full">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mottos Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Mottos
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These guiding principles reflect our commitment to making a meaningful difference in African healthcare.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mottos.map((motto, index) => {
              const IconComponent = motto.icon;
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
                        <div className="bg-primary/10 p-3 rounded-full">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{motto.title}</h3>
                      <p className="text-sm text-muted-foreground">{motto.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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
              Join Us in Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              Together, we can build a healthier future for Africa. Whether you're a healthcare professional, 
              investor, or partner, there's a place for you in our journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Partner With Us
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold">
                Learn More About Our Impact
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
