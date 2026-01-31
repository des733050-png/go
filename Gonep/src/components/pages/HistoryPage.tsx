import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Clock, BookOpen, Award, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AnimatedTimeline } from "../AnimatedTimeline";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { videoAPI } from "../../services/api";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";

// Use public URL for assets
import { getImage } from "../../utils/imageUtils";
import kusmile from "../../assets/kusmile.jpeg";
import trial from "../../assets/trial.jpeg";

const clinicAtHandDevice = getImage("clinicAtHandOpenWithIllustration");        
const clinicAtHandClosed = getImage("clinicAtHandClosedFrontLandscape");


export function HistoryPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string>('');

  // Fetch videos for this page
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
        const response = await videoAPI.getVideosByPlacement('about-history');
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

  const milestones = [
    { 
      year: "2021", 
      title: "Company Founded", 
      description: "GONEP Pharmaceuticals established by healthcare professionals with a vision to transform African healthcare through innovative diagnostic solutions."
    },
    { 
      year: "2022", 
      title: "First Prototype Developed", 
      description: "Clinic at Hand prototype completed and initial field testing conducted across 3 African countries with promising results."
    },
    { 
      year: "2023", 
      title: "Clinical Trials Success", 
      description: "Comprehensive clinical trials across 5 African countries achieved 95% diagnostic accuracy and received regulatory approvals."
    },
    { 
      year: "2024", 
      title: "Commercial Launch & Funding", 
      description: "Official market launch with Series A funding secured, enabling expansion to 12 countries and serving 50,000+ patients."
    }
  ];

  const stories = [
    {
      icon: BookOpen,
      title: "The Beginning",
      description: "Founded by healthcare professionals who witnessed firsthand the diagnostic gaps in African communities, GONEP was born from a simple yet powerful observation: millions of Africans lack access to basic diagnostic services that could save lives and improve health outcomes.",
      image: clinicAtHandClosed
    },
    {
      icon: TrendingUp,
      title: "The Innovation Journey",
      description: "Our founders, a team of medical professionals and engineers, spent years working in rural African communities and witnessed the devastating impact of delayed or unavailable diagnostics. They saw patients traveling hundreds of kilometers for basic tests, waiting weeks for results, and often resorting to dangerous self-medication.",
      image: trial
    },
    {
      icon: Award,
      title: "The Breakthrough",
      description: "This experience inspired the creation of Clinic at Hand - a revolutionary diagnostic solution that brings comprehensive testing capabilities directly to underserved communities. Our vision is a future where every African, regardless of location or economic status, has access to quality healthcare.",
      image: clinicAtHandClosed
    }
  ];

  const seoData = {
    title: "GONEP Healthcare History - Our Journey & Milestones",
    description: "Explore GONEP Healthcare's journey from 2022 to today. Learn about our founding story, key milestones, clinical trials, regulatory approvals, and impact across 12 African countries serving 50,000+ patients.",
    keywords: [
      "GONEP Healthcare history",
      "healthcare startup story",
      "African healthcare innovation",
      "medical device company history",
      "healthcare technology milestones"
    ],
    canonical: "/about/history"
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
            className="text-center space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Our History
            </h1>
            <p className="text-lg text-muted-foreground">
              From humble beginnings to transformative impact - discover the journey that brought GONEP 
              Pharmaceuticals from vision to reality, and the milestones that mark our commitment to African healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The story of GONEP is one of passion, innovation, and unwavering commitment to making healthcare 
              accessible to every African community.
            </p>
          </motion.div>

          <div className="space-y-16">
            {stories.map((story, index) => {
              const IconComponent = story.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                        {story.title}
                      </h3>
                    </div>
                    <div className="space-y-4 text-muted-foreground">
                      <p className="text-lg leading-relaxed">
                        {story.description}
                      </p>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    {videos[index] ? (
                      <div className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                        <iframe
                          src={getVideoEmbedUrl(videos[index].videoUrl)}
                          title={videos[index].title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <ImageWithFallback
                        src={story.image}
                        alt={`${story.title} - GONEP Healthcare history and milestones`}
                        className="w-full h-auto rounded-2xl shadow-lg"
                        loading="lazy"
                        width="600"
                        height="400"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Animated Milestones & Recognition */}
      {/* <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Milestones & Recognition
              </h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key achievements in our journey to transform African healthcare, marked by innovation, 
              impact, and recognition from leading healthcare organizations.
            </p>
          </motion.div>

          <AnimatedTimeline items={milestones} />
        </div>
      </section> */}

      {/* Impact Statistics */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Impact So Far
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that tell the story of our commitment to transforming healthcare access across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Patients Served", description: "Across 12 African countries" },
              { number: "95%", label: "Diagnostic Accuracy", description: "Validated through clinical trials" },
              { number: "500+", label: "Healthcare Workers", description: "Trained and empowered" },
              { number: "3", label: "Years of Innovation", description: "From concept to impact" }
            ].map((stat, index) => (
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
                    <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{stat.label}</h3>
                    <p className="text-muted-foreground text-sm">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Be Part of Our Future
            </h2>
            <p className="text-lg text-muted-foreground">
              Our journey is far from over. Join us as we continue to expand our impact and reach 
              more communities across Africa with life-saving diagnostic solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Join Our Mission
                </Button>
              </Link>
              <Link to="/solutions">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Learn About Our Technology
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
