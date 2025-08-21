import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Linkedin, Twitter, Mail, Award, Target, Users } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { AnimatedTimeline } from "../AnimatedTimeline";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import kusmile from "../../assets/kusmile.jpeg";
import WhoWeAre from "../../assets/Grantedcert.jpeg";
import works from "../../assets/Works.jpg";
import trial from "../../assets/trial.jpeg";

export function AboutPage() {
  const aboutSections = [
    {
      title: "Who We Are",
      description: "Discover our vision, mission, values, and the guiding principles that drive our commitment to transforming African healthcare.",
      path: "/about/who-we-are",
      icon: Target,
      image: WhoWeAre,
      features: ["Vision & Mission", "Core Values", "Our Mottos", "Purpose-Driven Approach"]
    },
    {
      title: "History",
      description: "Explore our journey from humble beginnings to transformative impact, including key milestones and the stories that shaped our mission.",
      path: "/about/history",
      icon: Award,
      image: trial,
      features: ["Our Story", "Key Milestones", "Impact Statistics", "Future Vision"]
    },
    {
      title: "Meet the Team",
      description: "Get to know our diverse leadership team and learn about the expertise, passion, and commitment that drives our mission forward.",
      path: "/about/meet-the-team",
      icon: Users,
      image: works,
        features: ["Leadership Team", "Team Culture", "Expertise", "Join Our Mission"]
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
              About GONEP
            </h1>
            <p className="text-lg text-muted-foreground">
              At GONEP, we believe healthcare should never be a luxury of geography. In 2022, we set out to close the critical diagnostic gap that leaves millions across Africa undiagnosed, untreated, and unheard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Sections Overview */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Discover Our Story
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the different aspects of GONEP Pharmaceuticals - from our founding vision to our 
              dedicated team and remarkable journey of impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {aboutSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full group">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary/20 backdrop-blur-sm p-3 rounded-full">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3">{section.title}</h3>
                      <p className="text-muted-foreground mb-4">{section.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Link to={section.path}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                          Explore {section.title}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our Impact at a Glance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Numbers that reflect our commitment to transforming healthcare access across Africa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2022", label: "Founded", description: "From concept to prototype" },
              { number: "95%", label: "Diagnostic Accuracy", description: "Validated through clinical trials" },
              { number: "15min", label: "Test Results", description: "Rapid processing time" },
              { number: "3-in-1", label: "Diagnostic Device", description: "Blood, urine, and vital signs" }
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
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Learn More?
            </h2>
            <p className="text-lg text-muted-foreground">
              Dive deeper into our story, meet our team, and discover how we're transforming 
              healthcare access across Africa. Choose a section above to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about/who-we-are">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Start with Who We Are
                </Button>
              </Link>
              <Link to="/about/meet-the-team">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}