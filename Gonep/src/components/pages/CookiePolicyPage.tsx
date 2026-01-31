import { SEOHead } from "../SEOHead";
import { motion } from "framer-motion";
import { Cookie, Settings, BarChart, Shield, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

export function CookiePolicyPage() {
  const seoData = {
    title: "Cookie Policy - GONEP Healthcare Cookie Usage & Preferences",
    description: "GONEP Healthcare Cookie Policy. Learn about how we use cookies and similar tracking technologies on our website. Manage your cookie preferences and understand your privacy options.",
    keywords: [
      "GONEP Healthcare cookie policy",
      "cookie usage",
      "website cookies",
      "tracking technologies",
      "privacy preferences",
      "cookie consent"
    ],
    canonical: "/cookie-policy"
  };

  const contactInfo = {
    email: "info@gonepharm.com",
    phone: "+254 707 231 654",
    address: "2nd Floor, Chandaria Innovation Centre Building, Kenya"
  };

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
                <Cookie className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Cookie Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              This policy explains how GONEP Healthcare uses cookies and similar technologies on our website.
            </p>
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            {/* What are Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                1. What Are Cookies?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps us provide you with a better experience when you browse our website and allows us to improve our services.
              </p>
            </motion.div>

            {/* Types of Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                2. Types of Cookies We Use
              </h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">2.1 Essential Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the website to work.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Session management and authentication</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and performance</li>
                <li>User preference storage (theme, language)</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Analytics Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's functionality and user experience.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Page views and navigation patterns</li>
                <li>Time spent on pages</li>
                <li>Error tracking and debugging</li>
                <li>User flow analysis</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.3 Functional Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Theme preferences (light/dark mode)</li>
                <li>Language preferences</li>
                <li>Form data retention</li>
                <li>Video player preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.4 Marketing Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are used to track visitors across websites to display relevant advertisements. We may use these cookies to measure the effectiveness of our marketing campaigns.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently, we do not use marketing cookies, but we reserve the right to use them in the future with your consent.
              </p>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BarChart className="h-6 w-6 text-primary" />
                3. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics and deliver content. These third parties may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Analytics Providers:</strong> To help us understand website usage and improve performance</li>
                <li><strong>Content Delivery Networks:</strong> To deliver content efficiently</li>
                <li><strong>Social Media Platforms:</strong> For embedded content and sharing features</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These third parties may use cookies to collect information about your online activities across different websites. We do not control these third-party cookies, and you should review their privacy policies.
              </p>
            </motion.div>

            {/* Cookie Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">4. Cookie Duration</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies can be either "session" or "persistent" cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
                <li><strong>Persistent Cookies:</strong> Remain on your device for a set period or until you delete them</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Most cookies we use are session cookies, which are automatically deleted when you close your browser. Some functional cookies may persist for up to 12 months to remember your preferences.
              </p>
            </motion.div>

            {/* Managing Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                5. Managing Your Cookie Preferences
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, please note that blocking or deleting cookies may impact your experience on our website. Some features may not function properly if cookies are disabled.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">Browser Settings</h3>
              <p className="text-muted-foreground leading-relaxed">
                You can manage cookies through your browser settings. Here are links to cookie management for popular browsers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
              </ul>
            </motion.div>

            {/* Do Not Track */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">6. Do Not Track Signals</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As such, we do not currently respond to DNT browser signals or mechanisms.
              </p>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">7. Updates to This Cookie Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last Updated" date.
              </p>
            </motion.div>

            {/* Related Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">8. Related Policies</h2>
              <p className="text-muted-foreground leading-relaxed">
                For more information about how we handle your personal information, please review our <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> and <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="space-y-4 bg-muted/30 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-foreground">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies or this Cookie Policy, please contact us:
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 flex-shrink-0 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Email:</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-primary hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 flex-shrink-0 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Phone:</p>
                    <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-primary hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Address:</p>
                    <p className="text-muted-foreground">{contactInfo.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}






