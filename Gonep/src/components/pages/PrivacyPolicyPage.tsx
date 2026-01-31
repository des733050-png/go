import { SEOHead } from "../SEOHead";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

export function PrivacyPolicyPage() {
  const seoData = {
    title: "Privacy Policy - GONEP Healthcare Data Protection & Privacy",
    description: "GONEP Healthcare Privacy Policy. Learn how we collect, use, protect, and manage your personal information. Our commitment to data privacy and security in healthcare technology.",
    keywords: [
      "GONEP Healthcare privacy policy",
      "data protection",
      "healthcare privacy",
      "medical data security",
      "patient privacy",
      "GDPR compliance"
    ],
    canonical: "/privacy-policy"
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
                <Shield className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how GONEP Healthcare collects, uses, and protects your personal information.
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
            
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                1. Introduction
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                GONEP Healthcare ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href={BASE_URL} className="text-primary hover:underline">{BASE_URL}</a> or use our healthcare technology services, including our Clinic at Hand diagnostic device and related digital health tools.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a healthcare technology company operating in Kenya and across Africa, we understand the sensitive nature of health-related information and are committed to maintaining the highest standards of data protection and privacy.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-foreground mt-6">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Register for an account or request a demo</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Contact us through our website forms or email</li>
                <li>Apply for a job or partnership opportunity</li>
                <li>Use our health tools (BMI calculator, diet recommendations)</li>
                <li>Participate in surveys or feedback programs</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This information may include: name, email address, phone number, organization name, job title, location, and any other information you choose to provide.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.2 Health Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When using our health tools (such as BMI calculator or diet recommendations), you may voluntarily provide health-related information. This information is processed locally in your browser and is not transmitted to our servers unless you explicitly submit it through a form.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6">2.3 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Cookies and similar tracking technologies (see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>)</li>
              </ul>
            </motion.div>

            {/* How We Use Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                3. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Respond to your inquiries, requests, and provide customer support</li>
                <li>Send you marketing communications (with your consent) about our products and services</li>
                <li>Improve our website, products, and services based on usage patterns</li>
                <li>Process job applications and partnership inquiries</li>
                <li>Comply with legal obligations and protect our legal rights</li>
                <li>Prevent fraud, abuse, and security threats</li>
                <li>Conduct analytics and research to improve healthcare delivery</li>
              </ul>
            </motion.div>

            {/* Data Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our website and conducting business (e.g., hosting, analytics, email services)</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>With Your Consent:</strong> When you explicitly consent to sharing</li>
              </ul>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure hosting infrastructure</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">6. Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your information</li>
                <li><strong>Portability:</strong> Request transfer of your information</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </motion.div>

            {/* Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">7. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website and services are not directed to children under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </motion.div>

            {/* International Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
              </p>
            </motion.div>

            {/* Policy Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              className="space-y-4 bg-muted/30 p-6 rounded-lg"
            >
              <h2 className="text-2xl font-bold text-foreground">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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






