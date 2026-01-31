import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Eye, 
  MessageCircle, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  BookOpen,
  Tag,
  ExternalLink,
  Bookmark,
  Mail
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { SEOHead } from '../SEOHead';
import { SchemaMarkup } from '../SchemaMarkup';
import { sanitizeHTML } from '../../utils/sanitizeHTML';

export function BlogDetailPage() {
  const { blogId } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [blogPost, setBlogPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError('');
        
        // For now, we'll use the blogId to fetch from the posts endpoint
        const response = await fetch(`${import.meta.env.PROD ? 'https://gonepbackend.vercel.app/api' : 'http://localhost:8000/api'}/blog/posts?limit=50`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const post = data.data.posts.find((p: any) => p.id === parseInt(blogId || "1"));
            if (post) {
              setBlogPost(post);
            } else {
              setError('Blog post not found');
            }
          } else {
            setError('Failed to load blog post');
          }
        } else {
          setError('Failed to load blog post');
        }
      } catch (err: any) {
        setError('Failed to load blog post');
        console.error('Blog fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlogPost();
    }
  }, [blogId]);

  // Reading progress effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock blog data - in a real app, this would come from an API
  const blogPosts = [
    {
      id: 1,
      title: "Transforming Rural Healthcare: A Year with Clinic at Hand",
      excerpt: "After 12 months of deployment across rural Kenya, we share insights, success stories, and the measurable impact on community health outcomes.",
      content: `
        <p class="mb-6 text-lg leading-relaxed">
          In the heart of rural Kenya, where access to quality healthcare has long been a challenge, 
          Clinic at Hand has been quietly revolutionizing how communities receive medical care. 
          After a full year of deployment across 50 villages, the results are nothing short of transformative.
        </p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The Challenge We Faced</h2>
        <p class="mb-6 leading-relaxed">
          Rural communities in Kenya face numerous healthcare challenges: limited access to medical facilities, 
          shortage of qualified healthcare workers, and the high cost of transportation to urban centers. 
          These barriers often result in delayed diagnosis, preventable complications, and unnecessary suffering.
        </p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Our Solution: Portable Diagnostics</h2>
        <p class="mb-6 leading-relaxed">
          Clinic at Hand's portable diagnostic device brings laboratory-quality testing to the doorstep 
          of rural communities. With the ability to perform 15 different diagnostic tests in under 15 minutes, 
          our device has become an essential tool for community health workers.
        </p>

        <div class="bg-muted/30 p-6 rounded-lg my-8">
          <h3 class="text-xl font-semibold mb-3">Key Achievements in Year One:</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>15,000+ diagnostic tests performed</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>200+ community health workers trained</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>85% reduction in time to diagnosis</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>60% decrease in preventable complications</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold mb-4 mt-8">Success Stories</h2>
        <p class="mb-6 leading-relaxed">
          Sarah Muthoni, a community health worker in Nyeri County, shares her experience: 
          "Before Clinic at Hand, I had to send patients to the nearest hospital, which was 
          a 3-hour journey. Now, I can provide immediate results and start treatment right away. 
          It's changed everything for our community."
        </p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Looking Ahead</h2>
        <p class="mb-6 leading-relaxed">
          As we enter our second year, we're expanding to 100 additional villages across Kenya 
          and beginning pilot programs in neighboring countries. Our goal is to reach 1 million 
          people with accessible healthcare by 2025.
        </p>

        <p class="mb-6 leading-relaxed">
          The success of Clinic at Hand in rural Kenya demonstrates that innovative technology, 
          when designed with local communities in mind, can bridge the healthcare gap and create 
          lasting positive impact.
        </p>
      `,
      author: "Dr. Amara Okafor",
      authorBio: "Dr. Amara Okafor is the Director of Community Health Programs at GONEP Health, with over 15 years of experience in rural healthcare delivery across Africa.",
      authorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Impact Stories",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
      views: 1234,
      comments: 23,
      tags: ["Rural Healthcare", "Kenya", "Community Health", "Diagnostics"]
    },
    {
      id: 2,
      title: "The Science Behind 15-Minute Diagnostics",
      excerpt: "Exploring the AI algorithms and biomarker analysis technology that enables rapid, accurate diagnostic results in resource-limited settings.",
      content: `
        <p class="mb-6 text-lg leading-relaxed">
          The ability to perform laboratory-quality diagnostic tests in just 15 minutes might seem 
          like science fiction, but it's the result of years of research and development in 
          microfluidics, artificial intelligence, and biomarker analysis.
        </p>

        <h2 class="text-2xl font-bold mb-4 mt-8">The Technology Stack</h2>
        <p class="mb-6 leading-relaxed">
          Clinic at Hand combines three cutting-edge technologies to achieve its remarkable speed 
          and accuracy: microfluidic channels, AI-powered image analysis, and advanced biomarker detection.
        </p>

        <h3 class="text-xl font-semibold mb-3">Microfluidic Channels</h3>
        <p class="mb-6 leading-relaxed">
          Our device uses microfluidic technology to manipulate tiny amounts of fluid through 
          channels smaller than a human hair. This allows us to perform multiple tests simultaneously 
          with minimal sample volume.
        </p>

        <h3 class="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
        <p class="mb-6 leading-relaxed">
          Machine learning algorithms analyze test results in real-time, comparing them against 
          a database of millions of samples to ensure accuracy and detect patterns that might 
          be missed by human observers.
        </p>

        <h2 class="text-2xl font-bold mb-4 mt-8">Biomarker Detection</h2>
        <p class="mb-6 leading-relaxed">
          The device can detect 15 different biomarkers, including glucose, cholesterol, 
          hemoglobin, and various disease markers. Each test is optimized for sensitivity 
          and specificity in resource-limited environments.
        </p>

        <div class="bg-muted/30 p-6 rounded-lg my-8">
          <h3 class="text-xl font-semibold mb-3">Technical Specifications:</h3>
          <ul class="space-y-2">
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>Test time: 15 minutes or less</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>Sample volume: 50-100 microliters</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>Accuracy: 95%+ compared to laboratory standards</span>
            </li>
            <li class="flex items-start">
              <span class="text-primary font-bold mr-2">•</span>
              <span>Battery life: 8 hours of continuous use</span>
            </li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold mb-4 mt-8">Future Developments</h2>
        <p class="mb-6 leading-relaxed">
          We're currently developing next-generation capabilities including molecular diagnostics, 
          genetic testing, and integration with telemedicine platforms for remote consultation.
        </p>
      `,
      author: "Dr. Kwame Asante",
      authorBio: "Dr. Kwame Asante is the Chief Technology Officer at GONEP Health, specializing in medical device innovation and AI applications in healthcare.",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
      views: 892,
      comments: 15,
      tags: ["AI", "Diagnostics", "Technology", "Biomarkers"]
    }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Link to="/blogs">
            <Button>Back to Blogs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentPost = blogPost;
  const relatedPosts: any[] = []; // For now, we'll leave this empty since we don't have a related posts endpoint

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = currentPost.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`);
        break;
    }
  };

  // Dynamic SEO based on blog post
  const seoData = blogPost ? {
    title: `${blogPost.title} | GONEP Healthcare Blog`,
    description: blogPost.excerpt || blogPost.description || `Read about ${blogPost.title} on GONEP Healthcare's blog. Insights and innovations from the frontlines of African healthcare transformation.`,
    keywords: [
      ...(blogPost.tags || []),
      "healthcare blog",
      "healthcare innovation",
      "African healthcare",
      "medical technology"
    ],
    canonical: `/blogs/${blogPost.id}`,
    ogType: "article",
    ogImage: blogPost.image
  } : {
    title: "Blog Post | GONEP Healthcare",
    description: "Read insights and innovations from GONEP Healthcare's blog.",
    canonical: `/blogs/${blogId}`
  };

  // Article schema for blog posts
  const articleSchema = blogPost ? {
    headline: blogPost.title,
    description: blogPost.excerpt || blogPost.description || "",
    image: blogPost.image,
    author: {
      name: blogPost.author || "GONEP Healthcare",
      url: blogPost.authorUrl
    },
    datePublished: blogPost.date || blogPost.createdAt,
    dateModified: blogPost.updatedAt || blogPost.date || blogPost.createdAt
  } : null;

  return (
    <div className="bg-background min-h-screen">
      <SEOHead seo={seoData} />
      {articleSchema && <SchemaMarkup type="article" data={articleSchema} />}
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border/50">
        <div className="container py-6">
          <Link to="/blogs" className="inline-flex items-center text-muted-foreground hover:text-primary transition-all duration-300 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blogs</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container max-w-5xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                {currentPost.category}
              </Badge>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
              {currentPost.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light max-w-4xl">
              {currentPost.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={currentPost.image}
              alt={`${currentPost.title} - GONEP Healthcare blog article image`}
              className="w-full h-full object-cover"
              loading="lazy"
              width="1200"
              height="500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-background/95 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{currentPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{currentPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{currentPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl border border-border/50">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">{currentPost.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">{currentPost.comments} comments</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`${isBookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"} transition-all duration-300`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span className="ml-2 text-sm font-medium">{isBookmarked ? "Saved" : "Save"}</span>
              </Button>
              
              <div className="relative group">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-all duration-300">
                  <Share2 className="h-4 w-4" />
                  <span className="ml-2 text-sm font-medium">Share</span>
                </Button>
                <div className="absolute right-0 top-full mt-3 bg-background border border-border rounded-xl shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 backdrop-blur-sm">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="p-3 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      title="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="p-3 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      title="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      className="p-3 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      title="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('email')}
                      className="p-3 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                      title="Share via Email"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Main Content */}
            <article className="prose prose-lg max-w-none lg:col-span-3">
              <div 
                dangerouslySetInnerHTML={{ __html: sanitizeHTML(currentPost.content) }}
                className="text-foreground leading-relaxed"
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
                {/* Reading Time */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-border/50">
                  <h3 className="font-semibold text-lg mb-3 text-foreground">Reading Progress</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{Math.round(readingProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${readingProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{currentPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-border/50">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Article Stats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Views</span>
                      <span className="font-medium text-foreground">{currentPost.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Comments</span>
                      <span className="font-medium text-foreground">{currentPost.comments}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Category</span>
                      <Badge variant="outline" className="text-xs">
                        {currentPost.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Share Section */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-2xl border border-border/50">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">Share Article</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      className="flex-1 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      className="flex-1 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      className="flex-1 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Tags */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="mb-16">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Article Tags</h3>
              <div className="flex flex-wrap gap-3">
                {currentPost.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-2 text-sm font-medium hover:bg-primary/10 transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <Card className="mb-16 bg-gradient-to-r from-primary/5 to-secondary/5 border border-border/50">
            <CardContent className="p-8">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={currentPost.authorImage}
                    alt={`${currentPost.author} - GONEP Healthcare blog author`}
                    className="w-20 h-20 rounded-full object-cover border-4 border-background shadow-lg"
                    loading="lazy"
                    width="80"
                    height="80"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-background"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 text-foreground">{currentPost.author}</h3>
                  <p className="text-muted-foreground leading-relaxed">{currentPost.authorBio}</p>
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Published {currentPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{currentPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-foreground">Related Articles</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post) => (
                  <Link key={post.id} to={`/blogs/${post.id}`} className="group">
                    <Card className="hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 overflow-hidden group-hover:scale-[1.02]">
                      <div className="relative h-56">
                        <img
                          src={post.image}
                          alt={`${post.title} - Related GONEP Healthcare blog article`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          width="400"
                          height="250"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <Badge variant="outline" className="absolute top-4 left-4 text-white border-white/50 bg-black/20">
                          {post.category}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="font-medium">{post.author}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t border-border/50 pt-12">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-bold text-foreground">Comments ({currentPost.comments})</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent"></div>
            </div>
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-12 rounded-2xl border border-border/50 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Comments Coming Soon</h3>
                <p className="text-muted-foreground leading-relaxed">We're working on adding a comments system to enhance community engagement. Stay tuned!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
