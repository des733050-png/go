import { SEOHead } from "../SEOHead";
import { motion } from "framer-motion";
import { Map as SitemapIcon, Link as LinkIcon, FileText, Home, Building2, Heart, Users, Briefcase, BookOpen, Calculator, Mail, HelpCircle, Image, Shield, Scale, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { generateSitemapUrl } from "../../utils/sitemapGenerator";

export function SitemapPage() {
  const seoData = {
    title: "Sitemap - GONEP Healthcare Website Structure & Navigation",
    description: "Complete sitemap of GONEP Healthcare website. Find all pages, resources, and navigation links organized by category. Easy access to all our healthcare technology content.",
    keywords: [
      "GONEP Healthcare sitemap",
      "website navigation",
      "site structure",
      "page index"
    ],
    canonical: "/sitemap"
  };

  const siteStructure = [
    {
      category: "Main Pages",
      icon: Home,
      pages: [
        { path: "/", title: "Home", description: "GONEP Healthcare homepage - Portable diagnostic devices and IoT healthcare solutions" },
        { path: "/clinic-at-hand", title: "Clinic at Hand", description: "3-in-1 portable diagnostic device for blood analysis, urine testing, and vital signs monitoring" },
        { path: "/solutions", title: "Solutions", description: "Tailored healthcare solutions for clinics, NGOs, governments, and mobile health programs" },
        { path: "/contact", title: "Contact Us", description: "Get in touch with GONEP Healthcare for partnerships, demos, and inquiries" },
      ]
    },
    {
      category: "About",
      icon: Building2,
      pages: [
        { path: "/about", title: "About GONEP", description: "Learn about GONEP Healthcare's mission, vision, and commitment to transforming African healthcare" },
        { path: "/about/who-we-are", title: "Who We Are", description: "Our vision, mission, values, and guiding principles driving healthcare innovation" },
        { path: "/about/history", title: "History", description: "Our journey from 2022 to today - milestones, achievements, and impact across Africa" },
        { path: "/about/meet-the-team", title: "Meet the Team", description: "Meet our diverse leadership team and experts transforming healthcare delivery" },
      ]
    },
    {
      category: "Resources",
      icon: BookOpen,
      pages: [
        { path: "/blogs", title: "Blog", description: "Healthcare innovation insights, success stories, and industry insights from GONEP Healthcare" },
        { path: "/media", title: "Media & Resources", description: "Press kit, downloadable resources, images, and media materials" },
        { path: "/support", title: "Support & FAQs", description: "Customer support, frequently asked questions, and technical assistance" },
      ]
    },
    {
      category: "Health Tools",
      icon: Heart,
      pages: [
        { path: "/health-tools/bmi-calculator", title: "BMI Calculator", description: "Free Body Mass Index calculator with personalized health insights and recommendations" },
        { path: "/health-tools/diet-recommendation", title: "Diet Recommendation", description: "Personalized nutrition plans based on your health goals and dietary preferences" },
      ]
    },
    {
      category: "Careers",
      icon: Briefcase,
      pages: [
        { path: "/careers", title: "Careers", description: "Join GONEP Healthcare - Open positions in healthcare technology, engineering, and operations" },
      ]
    },
    {
      category: "Legal & Policies",
      icon: Shield,
      pages: [
        { path: "/privacy-policy", title: "Privacy Policy", description: "How GONEP Healthcare collects, uses, and protects your personal information" },
        { path: "/terms-of-service", title: "Terms of Service", description: "Terms and conditions for using GONEP Healthcare website and services" },
        { path: "/cookie-policy", title: "Cookie Policy", description: "Information about how we use cookies and similar tracking technologies" },
        { path: "/sitemap", title: "Sitemap", description: "Complete website structure and navigation guide" },
      ]
    }
  ];

  return (
    <div className="bg-background min-h-screen">
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
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <SitemapIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Sitemap
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete navigation guide to all pages and resources on the GONEP Healthcare website.
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="section-padding">
        <div className="container max-w-6xl">
          <div className="space-y-12">
            {siteStructure.map((section, sectionIndex) => {
              const IconComponent = section.icon;
              return (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <IconComponent className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{section.category}</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.pages.map((page, pageIndex) => (
                      <motion.div
                        key={page.path}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (sectionIndex * 0.1) + (pageIndex * 0.05) }}
                        className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <LinkIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <Link
                              to={page.path}
                              className="text-lg font-semibold text-foreground hover:text-primary transition-colors block mb-2"
                            >
                              {page.title}
                            </Link>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {page.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-mono bg-muted px-2 py-1 rounded">
                                {generateSitemapUrl(page.path)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* XML Sitemap Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-muted/30 p-6 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold text-foreground">XML Sitemap</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              For search engines and automated tools, you can access our XML sitemap:
            </p>
            <a
              href={`${BASE_URL}/sitemap.xml`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-mono text-sm bg-background px-4 py-2 rounded border border-border"
            >
              <FileText className="h-4 w-4" />
              {BASE_URL}/sitemap.xml
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

