import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowRight, Calendar, User, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function FeaturedBlogSection() {
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [isShowingFeatured, setIsShowingFeatured] = useState(true);

  // Fetch featured blogs from backend, fallback to recent blogs if none featured
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoadingBlogs(true);
        
        // First try to get featured blogs
        const featuredResponse = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?featured=true&limit=2`);
        
        if (featuredResponse.ok) {
          const featuredData = await featuredResponse.json();
          if (featuredData.success && featuredData.data.posts.length > 0) {
            // We have featured blogs, use them
            setFeaturedBlogs(featuredData.data.posts);
            setIsShowingFeatured(true);
          } else {
            // No featured blogs, get recent blogs instead
            const recentResponse = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?limit=2`);
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
          const recentResponse = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?limit=2`);
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

  return (
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
  );
}
