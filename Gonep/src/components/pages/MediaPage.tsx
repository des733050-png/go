import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { FileText, Video, Image as ImageIcon, Download, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NewsletterSubscription } from "../NewsletterSubscription";

export function MediaPage() {
  const [isNewsletterPopupOpen, setIsNewsletterPopupOpen] = useState(false);

  const handleNewsletterOpen = () => {
    setIsNewsletterPopupOpen(true);
  };
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Animations */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 section-padding relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-lg"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-accent/5 rounded-full blur-2xl"
        />

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8 max-w-4xl mx-auto"
          >
            {/* Sparkles Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex justify-center"
            >
              <div className="bg-primary p-6 rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-foreground"
            >
              Media Center
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
            >
              Something amazing is coming soon...
            </motion.p>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold text-lg">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨ Coming Soon ✨
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What's Coming Section */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What's Coming to Our Media Center
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're building a comprehensive media hub that will showcase our impact, research, and stories from across Africa.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Research & Reports",
                description: "Clinical studies, impact reports, and comprehensive analyses of our healthcare solutions across Africa.",
                color: "bg-primary"
              },
              {
                icon: Video,
                title: "Video Content",
                description: "Documentaries, interviews, and behind-the-scenes footage of our work in communities.",
                color: "bg-secondary"
              },
              {
                icon: ImageIcon,
                title: "Press & Media",
                description: "Latest press coverage, media mentions, and stories about GONEP's mission and impact.",
                color: "bg-accent"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                    <CardContent className="p-8 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`${feature.color} p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white section-padding">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Be the First to Know
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Sign up to get notified when our Media Center launches with exclusive content and early access.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={handleNewsletterOpen}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 py-4 text-lg"
              >
                Get Notified
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.p
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-sm opacity-80"
            >
              📧 We'll send you an email when it's ready
            </motion.p>
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
    </div>
  );
}