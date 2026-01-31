import { SEOHead } from "../SEOHead";
import { motion } from "framer-motion";
import { FileText, Scale, AlertCircle, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

export function TermsOfServicePage() {
  const seoData = {
    title: "Terms of Service - GONEP Healthcare Website Terms & Conditions",
    description: "GONEP Healthcare Terms of Service. Read our terms and conditions for using our website, products, and services. Understand your rights and responsibilities when engaging with GONEP Healthcare.",
    keywords: [
      "GONEP Healthcare terms of service",
      "website terms and conditions",
      "healthcare technology terms",
      "medical device terms",
      "service agreement"
    ],
    canonical: "/terms-of-service"
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
                <Scale className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using our website and services.
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
            
            {/* Agreement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                1. Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the GONEP Healthcare website at <a href={BASE_URL} className="text-primary hover:underline">{BASE_URL}</a> ("Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Website or services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                GONEP Healthcare ("we," "us," or "our") reserves the right to modify these Terms at any time. Your continued use of the Website after any changes constitutes acceptance of the modified Terms.
              </p>
            </motion.div>

            {/* Services Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">2. Description of Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                GONEP Healthcare provides:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Information about our healthcare technology products and services</li>
                <li>Clinic at Hand portable diagnostic device information and specifications</li>
                <li>Digital health tools (BMI calculator, diet recommendations, facility finder)</li>
                <li>Educational content and blog articles about healthcare innovation</li>
                <li>Contact forms for inquiries, demo requests, and partnerships</li>
                <li>Career opportunities and job application portals</li>
              </ul>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">3. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Provide accurate and truthful information when using our services</li>
                <li>Use the Website only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to any part of the Website</li>
                <li>Not transmit any viruses, malware, or harmful code</li>
                <li>Respect intellectual property rights</li>
                <li>Not use the Website to harass, abuse, or harm others</li>
                <li>Not impersonate any person or entity</li>
              </ul>
            </motion.div>

            {/* Health Tools Disclaimer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4 bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800"
            >
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                4. Medical Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed font-semibold">
                IMPORTANT: The health tools and information provided on this Website are for informational and educational purposes only and are not intended as medical advice, diagnosis, or treatment.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The BMI calculator, diet recommendations, and other health tools are not substitutes for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions you may have regarding a medical condition.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Never disregard professional medical advice or delay seeking it because of information obtained from this Website. In case of a medical emergency, contact your local emergency services immediately.
              </p>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this Website, including text, graphics, logos, images, software, and other materials, is the property of GONEP Healthcare or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or use any content from this Website without our prior written permission, except for personal, non-commercial use.
              </p>
            </motion.div>

            {/* Product Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">6. Product Information and Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Product descriptions, specifications, and availability information on this Website are subject to change without notice. We strive to provide accurate information but do not warrant that product descriptions or other content on the Website is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Clinic at Hand device and other products are subject to regulatory approvals and may not be available in all jurisdictions. Contact us for specific availability information.
              </p>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, GONEP Healthcare and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Your use or inability to use the Website or services</li>
                <li>Any unauthorized access to or use of our servers or data</li>
                <li>Any errors or omissions in content</li>
                <li>Any interruption or cessation of transmission to or from the Website</li>
              </ul>
            </motion.div>

            {/* Indemnification */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">8. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless GONEP Healthcare and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your use of the Website or violation of these Terms.
              </p>
            </motion.div>

            {/* Governing Law */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">9. Governing Law and Jurisdiction</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Website shall be subject to the exclusive jurisdiction of the courts of Kenya.
              </p>
            </motion.div>

            {/* Severability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-foreground">10. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
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
              <h2 className="text-2xl font-bold text-foreground">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these Terms of Service, please contact us:
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






