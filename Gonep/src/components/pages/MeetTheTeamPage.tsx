import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Linkedin, Twitter, Mail, Users, Award, Heart, Loader2, RefreshCw, Phone, Facebook, Instagram, MessageCircle, ExternalLink, Github, Youtube, Lightbulb, Star, Target, Zap, Shield, Globe, Clock, TrendingUp, CheckCircle, Eye, Brain, Cpu, Database, Wifi, Smartphone, Tablet, Monitor, Server, Cloud, Lock, Unlock, Key, Settings, Wrench, Cog, Filter, Search, Plus, Minus, X, Check, AlertCircle, Info, HelpCircle, BookOpen, GraduationCap, Briefcase, Home, MapPin, Calendar, User, UserPlus, UserCheck, UserX, ThumbsUp, ThumbsDown, Smile, Frown, Meh } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { motion } from "framer-motion";
import { teamAPI } from "../../services/api";
import works from "../../assets/Works.jpg";
import { Link } from "react-router-dom";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  isLeadership: boolean;
  isActive: boolean;
}

interface TeamValue {
  id: number;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}



export function MeetTheTeamPage() {
  const [leaders, setLeaders] = useState<TeamMember[]>([]);
  const [teamValues, setTeamValues] = useState<TeamValue[]>([]);
  const [leadershipLoading, setLeadershipLoading] = useState(false);
  const [valuesLoading, setValuesLoading] = useState(false);
  const [leadershipError, setLeadershipError] = useState<string>('');
  const [valuesError, setValuesError] = useState<string>('');

  // Separate fetch functions for independent loading
  const fetchLeadershipData = async () => {
    try {
      setLeadershipLoading(true);
      setLeadershipError('');

      const leadershipResponse = await teamAPI.getLeadership();
      if (leadershipResponse.success) {
        setLeaders(leadershipResponse.data.leadership || []);
      } else {
        setLeadershipError(leadershipResponse.message || 'Failed to load leadership data');
      }
    } catch (err: any) {
      setLeadershipError(err.message || 'Failed to load leadership data');
      console.error('Error fetching leadership data:', err);
    } finally {
      setLeadershipLoading(false);
    }
  };

  const fetchValuesData = async () => {
    try {
      setValuesLoading(true);
      setValuesError('');

      const valuesResponse = await teamAPI.getTeamValues();
      if (valuesResponse.success) {
        setTeamValues(valuesResponse.data.values || []);
      } else {
        setValuesError(valuesResponse.message || 'Failed to load team values');
      }
    } catch (err: any) {
      setValuesError(err.message || 'Failed to load team values');
      console.error('Error fetching team values:', err);
    } finally {
      setValuesLoading(false);
    }
  };


  useEffect(() => {
    // Load data independently - page loads immediately
    fetchLeadershipData();
    fetchValuesData();
  }, []);



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
              Leadership Team
            </h1>
            <p className="text-lg text-muted-foreground">
              Meet the minds driving our mission: Our diverse team combines decades of healthcare experience, technical expertise, 
              and deep understanding of African healthcare challenges to deliver innovative solutions.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Team Values */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  What Makes Our Team Special
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Our team's unique combination of skills, experience, and passion drives our mission 
                  to transform healthcare access across Africa.
                </p>
              </div>
              
              {/* Refresh Button for Values */}
              <Button
                onClick={fetchValuesData}
                disabled={valuesLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {valuesLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {valuesLoading ? 'Loading...' : 'Refresh Values'}
              </Button>
            </div>
          </motion.div>

          {/* Error Message for Values */}
          {valuesError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8 text-center">
              <p className="text-destructive text-sm">
                {valuesError}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesLoading ? (
              // Loading skeleton for values
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="text-center border-2 h-full">
                    <CardContent className="p-8">
                      <div className="flex justify-center mb-4">
                        <div className="bg-muted p-4 rounded-full w-16 h-16"></div>
                      </div>
                      <div className="h-6 bg-muted rounded mb-3"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : teamValues.length > 0 ? (
              teamValues.map((value, index) => {
                // Map icon strings to components
                const getIconComponent = (iconName: string) => {
                  switch (iconName?.toLowerCase()) {
                    case 'users':
                      return Users;
                    case 'award':
                      return Award;
                    case 'heart':
                      return Heart;
                    case 'lightbulb':
                      return Lightbulb;
                    case 'star':
                      return Star;
                    case 'target':
                      return Target;
                    case 'zap':
                      return Zap;
                    case 'shield':
                      return Shield;
                    case 'globe':
                      return Globe;
                    case 'clock':
                      return Clock;
                    case 'trendingup':
                      return TrendingUp;
                    case 'checkcircle':
                      return CheckCircle;
                    case 'eye':
                      return Eye;
                    case 'brain':
                      return Brain;
                    case 'cpu':
                      return Cpu;
                    case 'database':
                      return Database;
                    case 'wifi':
                      return Wifi;
                    case 'smartphone':
                      return Smartphone;
                    case 'tablet':
                      return Tablet;
                    case 'monitor':
                      return Monitor;
                    case 'server':
                      return Server;
                    case 'cloud':
                      return Cloud;
                    case 'lock':
                      return Lock;
                    case 'unlock':
                      return Unlock;
                    case 'key':
                      return Key;
                    case 'settings':
                      return Settings;
                    case 'wrench':
                      return Wrench;
                    case 'cog':
                      return Cog;
                    case 'filter':
                      return Filter;
                    case 'search':
                      return Search;
                    case 'plus':
                      return Plus;
                    case 'minus':
                      return Minus;
                    case 'x':
                      return X;
                    case 'check':
                      return Check;
                    case 'alertcircle':
                      return AlertCircle;
                    case 'info':
                      return Info;
                    case 'helpcircle':
                      return HelpCircle;
                    case 'bookopen':
                      return BookOpen;
                    case 'graduationcap':
                      return GraduationCap;
                    case 'briefcase':
                      return Briefcase;
                    case 'home':
                      return Home;
                    case 'mappin':
                      return MapPin;
                    case 'calendar':
                      return Calendar;
                    case 'user':
                      return User;
                    case 'userplus':
                      return UserPlus;
                    case 'usercheck':
                      return UserCheck;
                    case 'userx':
                      return UserX;
                    case 'thumbsup':
                      return ThumbsUp;
                    case 'thumbsdown':
                      return ThumbsDown;
                    case 'smile':
                      return Smile;
                    case 'frown':
                      return Frown;
                    case 'meh':
                      return Meh;
                    default:
                      return Users; // Default fallback
                  }
                };
                
                const IconComponent = getIconComponent(value.icon);
                
                return (
                  <motion.div
                    key={value.id}
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
              })
            ) : !valuesError && (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No team values available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Meet the minds driving our mission:
                </h2>
                <p className="text-muted-foreground max-w-2xl">
                  Our diverse team combines decades of healthcare experience, technical expertise, 
                  and deep understanding of African healthcare challenges.
                </p>
              </div>
              
              {/* Refresh Button */}
              <Button
                onClick={fetchLeadershipData}
                disabled={leadershipLoading}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {leadershipLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {leadershipLoading ? 'Loading...' : 'Refresh Team'}
              </Button>
            </div>
          </motion.div>

          {/* Error Message for Leadership */}
          {leadershipError && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-8 text-center">
              <p className="text-destructive text-sm">
                {leadershipError}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {leadershipLoading ? (
              // Loading skeleton - show 3 items by default, but can be dynamic
              Array.from({ length: Math.min(leaders.length || 3, 4) }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-64 bg-muted"></div>
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-4"></div>
                      <div className="flex space-x-3">
                        <div className="h-8 w-8 bg-muted rounded"></div>
                        <div className="h-8 w-8 bg-muted rounded"></div>
                        <div className="h-8 w-8 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="w-full"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    <div className="relative h-64">
                      <ImageWithFallback
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{leader.name}</h3>
                        <p className="text-sm opacity-90">{leader.role}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-4 sm:p-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground text-sm mb-4 flex-1">{leader.bio}</p>
                      
                      {/* Contact Information */}
                      <div className="space-y-2 mb-4">
                        {leader.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{leader.phone}</span>
                          </div>
                        )}
                        {leader.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{leader.email}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Social Media Links */}
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-auto">
                        {leader.linkedinUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.linkedinUrl, '_blank')}
                            title="LinkedIn"
                          >
                            <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                          </Button>
                        )}
                        {leader.twitterUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.twitterUrl, '_blank')}
                            title="Twitter"
                          >
                            <Twitter className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                          </Button>
                        )}
                        {leader.facebookUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.facebookUrl, '_blank')}
                            title="Facebook"
                          >
                            <Facebook className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          </Button>
                        )}
                        {leader.instagramUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.instagramUrl, '_blank')}
                            title="Instagram"
                          >
                            <Instagram className="h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
                          </Button>
                        )}
                        {leader.whatsappUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.whatsappUrl, '_blank')}
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                          </Button>
                        )}
                        {leader.portfolioUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.portfolioUrl, '_blank')}
                            title="Portfolio"
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          </Button>
                        )}
                        {leader.githubUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.githubUrl, '_blank')}
                            title="GitHub"
                          >
                            <Github className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                          </Button>
                        )}
                        {leader.youtubeUrl && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="p-1.5 sm:p-2 h-auto"
                            onClick={() => window.open(leader.youtubeUrl, '_blank')}
                            title="YouTube"
                          >
                            <Youtube className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : !leadershipError && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No leadership team members available.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Culture */}
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
                Our Team Culture
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At GONEP, we believe that the best solutions come from teams that are diverse, 
                  collaborative, and deeply committed to their mission. Our culture is built on 
                  mutual respect, continuous learning, and a shared passion for making a difference.
                </p>
                <p>
                  We foster an environment where every team member's voice is heard, where innovation 
                  is encouraged, and where the impact of our work is always at the forefront of our decisions.
                </p>
                <p>
                  Our team members come from various backgrounds - from rural healthcare workers to 
                  urban medical professionals, from local communities to international organizations. 
                  This diversity of experience and perspective is what makes our solutions so effective.
                </p>
              </div>
              
              <Link to="/careers">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Join Our Team
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <ImageWithFallback
                src={works}
                alt="GONEP team collaboration"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </motion.div>
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
              Join Our Mission
            </h2>
            <p className="text-lg text-muted-foreground">
              We're always looking for passionate individuals who share our vision of transforming 
              healthcare access across Africa. Whether you're a healthcare professional, engineer, 
              or business leader, there's a place for you in our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/careers">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  View Open Positions
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
