import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar, User, ArrowRight, Clock, Eye, MessageCircle, Filter, Tag, FolderOpen, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { SEOHead } from "../SEOHead";

export function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState("all");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [blogsLoading, setBlogsLoading] = useState(true);
  
  // Newsletter subscription state
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");

  // Newsletter subscription handler
  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setNewsletterMessage("Please enter a valid email address");
      return;
    }

    setNewsletterLoading(true);
    setNewsletterMessage("");

    try {
              const response = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail.trim(),
          source: 'blog_page'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewsletterMessage("Successfully subscribed! Check your email for confirmation.");
        setNewsletterEmail(""); // Clear the input
      } else {
        setNewsletterMessage(data.message || "Subscription failed. Please try again.");
      }
    } catch (err) {
      setNewsletterMessage("Network error. Please try again.");
      console.error('Newsletter subscription error:', err);
    } finally {
      setNewsletterLoading(false);
    }
  };

  // Fetch blog posts and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setBlogsLoading(true);
        setError('');
        
        // Add timeout to prevent long requests (8 seconds for frontend)
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 8000)
        );
        
        const fetchPromise = Promise.all([
          fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?limit=50`),
          fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/categories`)
        ]);
        
        const [postsResponse, categoriesResponse] = await Promise.race([
          fetchPromise,
          timeoutPromise
        ]) as Response[];

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          if (postsData.success) {
            setBlogPosts(postsData.data.posts);
          }
        }

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setCategories(categoriesData.data.categories);
          }
        }
      } catch (err: any) {
        if (err.message === 'Request timeout') {
          setError('Loading timed out. Using cached content.');
        } else {
          setError('Unable to load latest content. Showing cached data.');
        }
        console.error('Blog fetch error:', err);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fallback static data in case API fails
  const fallbackPosts = [
    {
      id: 1,
      title: "Transforming Rural Healthcare: A Year with Clinic at Hand",
      excerpt: "After 12 months of deployment across rural Kenya, we share insights, success stories, and the measurable impact on community health outcomes.",
      author: "Dr. Amara Okafor",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Impact Stories",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
      views: 1234,
      comments: 23
    },
    {
      id: 2,
      title: "The Science Behind 15-Minute Diagnostics",
      excerpt: "Exploring the AI algorithms and biomarker analysis technology that enables rapid, accurate diagnostic results in resource-limited settings.",
      author: "Dr. Kwame Asante",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
      views: 892,
      comments: 15
    },
    {
      id: 3,
      title: "Training Community Health Workers: Best Practices from Ghana",
      excerpt: "How we developed an effective training program that enabled 200+ CHWs to operate Clinic at Hand devices with confidence.",
      author: "Dr. Fatima Al-Rashid",
      date: "March 5, 2024",
      readTime: "6 min read",
      category: "Training",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 567,
      comments: 8
    },
    {
      id: 4,
      title: "Maternal Health Innovation: Reducing Pregnancy Complications",
      excerpt: "How early detection through portable diagnostics is preventing maternal mortality in remote African communities.",
      author: "Dr. Amara Okafor",
      date: "February 28, 2024",
      readTime: "10 min read",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 743,
      comments: 19
    },
    {
      id: 5,
      title: "Securing Series A: Our Journey to $5M Funding",
      excerpt: "Behind the scenes of our fundraising journey and how we're using investment to scale healthcare solutions across Africa.",
      author: "Samuel Mbeki",
      date: "February 20, 2024",
      readTime: "7 min read",
      category: "Company",
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 1456,
      comments: 34
    },
    {
      id: 6,
      title: "AI in African Healthcare: Opportunities and Challenges",
      excerpt: "Examining the potential of artificial intelligence to revolutionize healthcare delivery across the African continent.",
      author: "Dr. Kwame Asante",
      date: "February 15, 2024",
      readTime: "15 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      views: 623,
      comments: 12
    }
  ];

  // Use API data if available, fallback to empty state
  const displayPosts = blogPosts.length > 0 ? blogPosts : [];
  
  // Check if we have any featured posts
  const hasFeaturedPosts = displayPosts.some(post => post.featured);
  
  // Extract all unique tags from posts
  const allTags = Array.from(new Set(
    displayPosts
      .filter(post => post.tags && Array.isArray(post.tags))
      .flatMap(post => post.tags)
  )).sort();

  // Use API categories if available, fallback to empty state
  const displayCategories = categories.length > 0 ? [
    { id: "all", label: "All Posts", count: displayPosts.length },
    // Only show featured filter if we actually have featured posts
    ...(hasFeaturedPosts ? [{ id: "featured", label: "Featured", count: displayPosts.filter(post => post.featured).length }] : []),
    ...categories.filter(cat => cat.id !== "all") // Remove duplicate "all" from API categories
  ] : [
    { id: "all", label: "All Posts", count: displayPosts.length },
    // Only show featured filter if we actually have featured posts
    ...(hasFeaturedPosts ? [{ id: "featured", label: "Featured", count: displayPosts.filter(post => post.featured).length }] : [])
  ];

  // Create tag filters
  const tagFilters = [
    { id: "all", label: "All Tags", count: displayPosts.length },
    ...allTags.map(tag => ({
      id: tag,
      label: tag,
      count: displayPosts.filter(post => post.tags && post.tags.includes(tag)).length
    }))
  ];

  const filteredPosts = displayPosts.filter(post => {
    let matchesCategory = false;
    
    if (activeCategory === "all") {
      matchesCategory = true; // Show all posts
    } else if (activeCategory === "featured") {
      matchesCategory = post.featured; // Show only featured posts
    } else {
      matchesCategory = post.category === activeCategory; // Show posts by specific category
    }
    
    let matchesTag = false;
    if (activeTag === "all") {
      matchesTag = true; // Show all posts
    } else {
      matchesTag = post.tags && post.tags.includes(activeTag); // Show posts with specific tag
    }
    
    return matchesCategory && matchesTag;
  });

  const handleBlogsRetry = () => {
    // Retry loading blogs
    setError('');
    setBlogsLoading(true);
    const fetchData = async () => {
      try {
        setBlogsLoading(true);
        setError('');
        
        const [postsResponse, categoriesResponse] = await Promise.all([
          fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?limit=50`),
          fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/categories`)
        ]);

        if (postsResponse.ok) {
          const postsData = await postsResponse.json();
          if (postsData.success) {
            setBlogPosts(postsData.data.posts);
          }
        }

        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          if (categoriesData.success) {
            setCategories(categoriesData.data.categories);
          }
        }
      } catch (err: any) {
        setError('Failed to load blogs. Please try again.');
        console.error('Blog fetch error:', err);
      } finally {
        setBlogsLoading(false);
      }
    };
    fetchData();
  };

  const featuredPosts = displayPosts.filter(post => post.featured);
  const regularPosts = filteredPosts; // Include all posts (both featured and non-featured)

  // Remove the full-page loading state - let the page render and show loading only for blogs section

  const seoData = {
    title: "GONEP Health Blog - Healthcare Innovation Insights & Stories",
    description: "Discover insights, stories, and innovations from the frontlines of African healthcare transformation. Learn about portable diagnostics, rural healthcare solutions, IoT in healthcare, and success stories from GONEP Healthcare.",
    keywords: [
      "healthcare blog",
      "healthcare innovation",
      "rural healthcare",
      "portable diagnostics",
      "IoT healthcare",
      "African healthcare",
      "medical technology blog",
      "healthcare technology insights",
      "point of care diagnostics",
      "healthcare transformation"
    ],
    canonical: "/blogs"
  };

  return (
    <div className="bg-background min-h-screen">
      <SEOHead seo={seoData} />
      {/* Hero Section */}
      <section className="bg-muted/30 py-8">
        <div className="container">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              GONEP Health Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Insights, stories, and innovations from the frontlines of African healthcare transformation. 
              Discover how we're making quality healthcare accessible to every community.
            </p>
            
            {/* Navigation breadcrumb */}
            <div className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">•</span>
              <span className="text-primary">Blogs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-4 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <Select value={activeCategory} onValueChange={(value) => {
                setActiveCategory(value);
                setActiveTag("all"); // Reset tag filter when category changes
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {displayCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tag Filter */}
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <Select value={activeTag} onValueChange={(value) => {
                setActiveTag(value);
                setActiveCategory("all"); // Reset category filter when tag changes
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Tag" />
                </SelectTrigger>
                <SelectContent>
                  {tagFilters.map((tag) => (
                    <SelectItem key={tag.id} value={tag.id}>
                      {tag.label} ({tag.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {(activeCategory !== "all" || activeTag !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveTag("all");
                }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Loading State - Only for the blogs section */}
      {blogsLoading && (
        <section className="py-8 bg-background">
          <div className="container">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading blog posts...</p>
            </div>
          </div>
        </section>
      )}

      {/* Error State - Only for the blogs section */}
      {error && !blogsLoading && (
        <section className="py-8 bg-background">
          <div className="container">
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Error Loading Blogs</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleBlogsRetry} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Try Again
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* No Blogs State */}
      {displayPosts.length === 0 && !blogsLoading && !error && (
        <section className="py-12 bg-background">
          <div className="container">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2 2m2-13V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">No Blogs Yet</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're working on creating amazing content for you. Check back soon for insights, stories, and innovations from the frontlines of African healthcare transformation.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Content coming soon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                  <span>Stay tuned</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Posts - Only show when no filters are active AND there are featured posts */}
      {activeCategory === "all" && activeTag === "all" && hasFeaturedPosts && (
        <section className="py-6 bg-background">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Featured Articles
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {featuredPosts.map((post) => (
                <Link key={post.id} to={`/blogs/${post.id}`} className="block">
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group border-2 border-border hover:border-primary/20">
                  <div className="relative h-64">
                    <img
                      src={post.image}
                      alt={`${post.title} - Featured GONEP Healthcare blog article`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      width="600"
                      height="400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0">
                      Featured
                    </Badge>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="outline" className="text-white border-white/50 mb-2 bg-black/20">
                        {post.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    
                                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      <Link to={`/blogs/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      {displayPosts.length > 0 && (
        <section className={`py-6 ${activeCategory === "all" ? "bg-muted/30" : "bg-background"}`}>
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {activeCategory === "all" ? "All Articles" : `${activeCategory} Articles`}
              </h2>
              <span className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </span>
            </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Link key={post.id} to={`/blogs/${post.id}`} className="block">
                <Card className="hover:shadow-lg transition-shadow group border-2 border-border hover:border-primary/20">
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={`${post.title} - GONEP Healthcare blog article`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    width="400"
                    height="250"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <Badge variant="outline" className="absolute top-4 left-4 text-white border-white/50 bg-black/20">
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <Link to={`/blogs/${post.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 text-sm">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No articles found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setActiveCategory("all");
                  setActiveTag("all");
                }}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
      )}

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 relative overflow-hidden section-padding">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-20 w-72 h-72 bg-primary/3 rounded-full blur-3xl"
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
                    Stay Updated with GONEP Insights
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Get the latest healthcare innovations, success stories, and insights delivered directly to your inbox.
                  </p>
                </div>
                
                <form onSubmit={handleNewsletterSubscribe} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-background text-foreground flex-1 border border-border focus:border-primary"
                      required
                    />
                    <Button 
                      type="submit"
                      disabled={newsletterLoading}
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 border-0 font-semibold"
                    >
                      {newsletterLoading ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                  {newsletterMessage && (
                    <p className={`mt-3 text-sm ${newsletterMessage.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                      {newsletterMessage}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}