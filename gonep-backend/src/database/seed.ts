import { db } from '../config/database';
import { 
  users,
  blogCategories, 
  blogAuthors, 
  blogPosts, 
  teamMembers, 
  teamValues,
  departments,
  jobOpenings,
  partners,
  contactMethods,
  impactStatistics,
  faqs,
  supportResources,
  productFeatures,
  technicalSpecs,
  useCases,
  mediaResources,
  pressCoverage
} from '../database/schema';
import bcrypt from 'bcryptjs';

export async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminPasswordHash = await bcrypt.hash('password123', 12);
    
    try {
      await db.insert(users).values({
        email: 'admin@gonep.com',
        passwordHash: adminPasswordHash,
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567890',
        organization: 'GONEP Healthcare',
        title: 'System Administrator',
        organizationType: 'Healthcare',
        country: 'United States',
        role: 'admin',
        isActive: true,
        emailVerified: true,
      });
      console.log('✅ Admin user created: admin@gonep.com / password123');
    } catch (error: any) {
      if (error.message.includes('Duplicate entry')) {
        console.log('⚠️ Admin user already exists');
      } else {
        console.log('❌ Error creating admin user:', error.message);
      }
    }

    // Create blog categories
    console.log('📝 Creating blog categories...');
    const categories = await db.insert(blogCategories).values([
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Latest technology trends and innovations',
        isActive: true
      },
      {
        name: 'Healthcare',
        slug: 'healthcare',
        description: 'Healthcare technology and medical innovations',
        isActive: true
      },
      {
        name: 'IoT',
        slug: 'iot',
        description: 'Internet of Things and connected devices',
        isActive: true
      },
      {
        name: 'Diagnostics',
        slug: 'diagnostics',
        description: 'Medical diagnostics and testing solutions',
        isActive: true
      }
    ]);

    // Create blog authors
    console.log('👤 Creating blog authors...');
    const authors = await db.insert(blogAuthors).values([
      {
        name: 'Dr. Sarah Johnson',
        bio: 'Chief Medical Officer with 15+ years in healthcare technology',
        image: '/images/authors/sarah-johnson.jpg',
        email: 'sarah.johnson@gonep.com',
        role: 'Chief Medical Officer',
        department: 'Medical',
        isActive: true
      },
      {
        name: 'Michael Chen',
        bio: 'Lead Software Engineer specializing in IoT and AI solutions',
        image: '/images/authors/michael-chen.jpg',
        email: 'michael.chen@gonep.com',
        role: 'Lead Software Engineer',
        department: 'Engineering',
        isActive: true
      },
      {
        name: 'Dr. Emily Rodriguez',
        bio: 'Research Director focused on diagnostic technology innovation',
        image: '/images/authors/emily-rodriguez.jpg',
        email: 'emily.rodriguez@gonep.com',
        role: 'Research Director',
        department: 'Research',
        isActive: true
      }
    ]);

    // Create blog posts
    console.log('📄 Creating blog posts...');
    const posts = await db.insert(blogPosts).values([
      {
        title: 'The Future of IoT in Healthcare',
        slug: 'future-iot-healthcare',
        content: `
          <h2>The Revolution of Connected Healthcare</h2>
          <p>The Internet of Things (IoT) is transforming healthcare in unprecedented ways. From wearable devices that monitor vital signs to smart diagnostic tools that provide real-time analysis, IoT technology is creating a more connected and efficient healthcare ecosystem.</p>
          
          <h3>Key Benefits of IoT in Healthcare</h3>
          <ul>
            <li>Real-time patient monitoring</li>
            <li>Improved diagnostic accuracy</li>
            <li>Reduced healthcare costs</li>
            <li>Enhanced patient engagement</li>
          </ul>
          
          <p>At GONEP, we're at the forefront of this revolution, developing cutting-edge IoT solutions that bridge the gap between technology and healthcare.</p>
        `,
        authorId: 1,
        categoryId: 1,
        image: '/images/blog/iot-healthcare.jpg',
        featured: true,
        published: true,
        tags: ['IoT', 'Healthcare', 'Technology', 'Innovation']
      },
      {
        title: 'Advancements in Medical Diagnostics',
        slug: 'advancements-medical-diagnostics',
        content: `
          <h2>Revolutionary Diagnostic Technologies</h2>
          <p>Medical diagnostics have come a long way from traditional laboratory testing. Today's diagnostic tools are faster, more accurate, and more accessible than ever before.</p>
          
          <h3>Modern Diagnostic Solutions</h3>
          <p>Our latest diagnostic platform combines AI-powered analysis with portable testing devices, enabling healthcare providers to deliver results in minutes rather than days.</p>
          
          <p>This advancement is particularly crucial in emergency situations where time is of the essence.</p>
        `,
        authorId: 3,
        categoryId: 4,
        image: '/images/blog/medical-diagnostics.jpg',
        featured: false,
        published: true,
        tags: ['Diagnostics', 'Medical Technology', 'AI', 'Healthcare']
      },
      {
        title: 'Building Smart Healthcare Networks',
        slug: 'smart-healthcare-networks',
        content: `
          <h2>Connected Healthcare Ecosystems</h2>
          <p>Smart healthcare networks are the backbone of modern medical infrastructure. These networks connect devices, systems, and healthcare providers to create a seamless flow of information.</p>
          
          <h3>Network Benefits</h3>
          <ul>
            <li>Centralized data management</li>
            <li>Real-time communication</li>
            <li>Improved resource allocation</li>
            <li>Enhanced patient care coordination</li>
          </ul>
        `,
        authorId: 2,
        categoryId: 3,
        image: '/images/blog/smart-networks.jpg',
        featured: true,
        published: true,
        tags: ['IoT', 'Networks', 'Healthcare', 'Technology']
      }
    ]);

    // Create team members
    console.log('👥 Creating team members...');
    const teamMembersData = await db.insert(teamMembers).values([
      {
        name: 'Dr. Amara Okafor',
        role: 'Chief Executive Officer',
        bio: 'MD with 15+ years in African healthcare systems. Former WHO consultant on rural health initiatives.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'amara.okafor@gonep.com',
        phone: '+234 801 234 5678',
        department: 'Executive',
        location: 'Lagos, Nigeria',
        expertise: ['Healthcare Systems', 'Public Health', 'Leadership'],
        yearsExperience: 15,
        education: 'MD, University of Lagos; MPH, Harvard University',
        certifications: ['Board Certified in Internal Medicine', 'WHO Consultant Certification'],
        achievements: ['WHO Consultant of the Year 2022', 'Healthcare Innovation Award 2021'],
        isLeadership: true,
        orderIndex: 1,
        isActive: true,
        linkedinUrl: 'https://linkedin.com/in/amara-okafor',
        twitterUrl: 'https://twitter.com/dramaraokafor',
        portfolioUrl: 'https://amaraokafor.com'
      },
      {
        name: 'Dr. Kwame Asante',
        role: 'Chief Technology Officer',
        bio: 'PhD in Biomedical Engineering. AI/ML expert with patents in diagnostic technologies for developing markets.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'kwame.asante@gonep.com',
        phone: '+233 20 123 4567',
        department: 'Technology',
        location: 'Accra, Ghana',
        expertise: ['Artificial Intelligence', 'Biomedical Engineering', 'Machine Learning'],
        yearsExperience: 12,
        education: 'PhD Biomedical Engineering, MIT; MSc Computer Science, Stanford',
        certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
        achievements: ['3 Patents in Diagnostic Technology', 'AI Innovation Award 2023'],
        isLeadership: true,
        orderIndex: 2,
        isActive: true,
        linkedinUrl: 'https://linkedin.com/in/kwame-asante',
        twitterUrl: 'https://twitter.com/kwameasante',
        githubUrl: 'https://github.com/kwameasante',
        portfolioUrl: 'https://kwameasante.dev'
      },
      {
        name: 'Dr. Fatima Al-Rashid',
        role: 'Chief Medical Officer',
        bio: 'Pediatrician and public health specialist with extensive field experience in Sub-Saharan Africa.',
        image: 'https://images.unsplash.com/photo-1594824606847-593a89c9a4e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'fatima.alrashid@gonep.com',
        phone: '+254 700 987 6543',
        department: 'Medical',
        location: 'Nairobi, Kenya',
        expertise: ['Pediatrics', 'Public Health', 'Community Medicine'],
        yearsExperience: 10,
        education: 'MD, University of Nairobi; Fellowship in Pediatric Medicine',
        certifications: ['Board Certified Pediatrician', 'Public Health Specialist'],
        achievements: ['Community Health Excellence Award', 'Published 15+ Research Papers'],
        isLeadership: true,
        orderIndex: 3,
        isActive: true,
        linkedinUrl: 'https://linkedin.com/in/fatima-alrashid',
        twitterUrl: 'https://twitter.com/drfatima',
        facebookUrl: 'https://facebook.com/fatima.alrashid'
      },
      {
        name: 'Samuel Mbeki',
        role: 'Chief Operating Officer',
        bio: 'MBA with 12+ years scaling healthcare solutions across African markets. Former McKinsey consultant.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'samuel.mbeki@gonep.com',
        phone: '+27 82 456 7890',
        department: 'Operations',
        location: 'Johannesburg, South Africa',
        expertise: ['Operations Management', 'Healthcare Strategy', 'Market Expansion'],
        yearsExperience: 12,
        education: 'MBA, Harvard Business School; BSc Economics, University of Cape Town',
        certifications: ['Project Management Professional', 'Six Sigma Black Belt'],
        achievements: ['McKinsey Excellence Award', 'Healthcare Operations Leader 2022'],
        isLeadership: true,
        orderIndex: 4,
        isActive: true,
        linkedinUrl: 'https://linkedin.com/in/samuel-mbeki',
        twitterUrl: 'https://twitter.com/samuelmbeki',
        whatsappUrl: 'https://wa.me/27824567890'
      },
      {
        name: 'Aisha Diallo',
        role: 'Senior Software Engineer',
        bio: 'Full-stack developer specializing in healthcare applications and IoT integration.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'aisha.diallo@gonep.com',
        phone: '+221 77 123 4567',
        department: 'Engineering',
        location: 'Dakar, Senegal',
        expertise: ['Full-Stack Development', 'IoT Integration', 'Healthcare Applications'],
        yearsExperience: 6,
        education: 'BSc Computer Science, Université Cheikh Anta Diop',
        certifications: ['React Certified Developer', 'AWS Developer Associate'],
        achievements: ['Best Developer Award 2023', 'Open Source Contributor'],
        isLeadership: false,
        orderIndex: 5,
        isActive: true,
        linkedinUrl: 'https://linkedin.com/in/aisha-diallo',
        githubUrl: 'https://github.com/aishadiallo',
        portfolioUrl: 'https://aishadiallo.dev'
      }
    ]);

    // Create team values
    console.log('💎 Creating team values...');
    const values = await db.insert(teamValues).values([
      {
        title: 'Diverse Expertise',
        description: 'Our team brings together medical professionals, engineers, and business leaders with deep understanding of African healthcare challenges.',
        icon: 'users',
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'Proven Track Record',
        description: 'Combined experience of 50+ years in healthcare innovation, with successful implementations across multiple African countries.',
        icon: 'award',
        orderIndex: 2,
        isActive: true
      },
      {
        title: 'Community-Driven',
        description: 'Every team member has firsthand experience working in African communities, ensuring our solutions are culturally relevant and effective.',
        icon: 'heart',
        orderIndex: 3,
        isActive: true
      }
    ]);

    // Create departments
    console.log('🏢 Creating departments...');
    const depts = await db.insert(departments).values([
      {
        name: 'Engineering',
        description: 'Software development and technical innovation',
        jobCount: 0,
        isActive: true
      },
      {
        name: 'Medical',
        description: 'Healthcare technology and medical expertise',
        jobCount: 0,
        isActive: true
      },
      {
        name: 'Research',
        description: 'Research and development of new technologies',
        jobCount: 0,
        isActive: true
      },
      {
        name: 'Sales',
        description: 'Business development and customer relations',
        jobCount: 0,
        isActive: true
      }
    ]);

    // Create job openings
    console.log('💼 Creating job openings...');
    const jobs = await db.insert(jobOpenings).values([
      {
        title: 'Senior Biomedical Engineer',
        slug: 'senior-biomedical-engineer',
        departmentId: 1,
        location: 'Nairobi, Kenya',
        type: 'Full-time',
        level: 'Senior',
        description: 'Lead the development of next-generation diagnostic devices for African healthcare markets.',
        requirements: [
          '5+ years of experience in biomedical engineering or medical device development',
          'Strong knowledge of medical device regulations and standards',
          'Experience with diagnostic device development and validation',
          'Proficiency in CAD software (SolidWorks, AutoCAD) and simulation tools',
          'Experience with rapid prototyping and manufacturing processes',
          'Strong project management and cross-functional collaboration skills',
          'Experience working in resource-constrained environments preferred',
          'Knowledge of African healthcare systems and challenges preferred'
        ],
        responsibilities: [
          'Lead the design and development of next-generation diagnostic devices',
          'Conduct feasibility studies and prototype development',
          'Ensure compliance with international medical device regulations (ISO 13485, FDA, CE)',
          'Collaborate with clinical teams to validate device performance',
          'Manage relationships with manufacturing partners and suppliers',
          'Mentor junior engineers and contribute to technical strategy',
          'Participate in field testing and user feedback sessions',
          'Develop and maintain technical documentation and quality systems'
        ],
        benefits: [
          'Competitive salary with equity options',
          'Comprehensive health insurance for you and your family',
          'Professional development budget and conference attendance',
          'Flexible work arrangements and remote work options',
          'Opportunity to travel across Africa for field work',
          'Direct impact on healthcare access for millions of people',
          'Collaboration with leading healthcare institutions globally'
        ],
        niceToHave: [
          'Experience with point-of-care diagnostic devices',
          'Knowledge of microfluidics and lab-on-chip technologies',
          'Experience with regulatory submissions and clinical trials',
          'Familiarity with AI/ML integration in medical devices',
          'Experience working in emerging markets'
        ],
        salaryRange: '$80,000 - $120,000 USD',
        experience: '5+ years',
        education: 'Bachelor\'s in Biomedical Engineering or related field',
        teamInfo: 'You\'ll work with our Engineering team of 15+ professionals, including mechanical engineers, electrical engineers, software developers, and quality assurance specialists. You\'ll also collaborate closely with our Medical Affairs, Operations, and Business Development teams.',
        growthOpportunities: 'This role offers significant growth opportunities, including potential advancement to Engineering Director or Chief Technology Officer positions. You\'ll have the opportunity to lead larger teams and influence the company\'s technical strategy.',
        isActive: true,
        isFeatured: true,
        applicationDeadline: new Date('2025-03-15')
      },
      {
        title: 'Clinical Research Coordinator',
        slug: 'clinical-research-coordinator',
        departmentId: 2,
        location: 'Lagos, Nigeria',
        type: 'Full-time',
        level: 'Mid-level',
        description: 'Coordinate clinical trials and research studies across multiple African countries.',
        requirements: [
          '3+ years of clinical research experience in healthcare or medical devices',
          'GCP (Good Clinical Practice) certification required',
          'Experience with regulatory submissions and clinical trial management',
          'Strong understanding of African healthcare systems and regulations',
          'Excellent written and verbal communication skills',
          'Ability to work independently and manage multiple priorities',
          'Experience with electronic data capture systems',
          'Willingness to travel extensively across Africa'
        ],
        responsibilities: [
          'Develop and implement clinical study protocols and procedures',
          'Coordinate with healthcare facilities and research sites across Africa',
          'Manage regulatory submissions and approvals in multiple countries',
          'Recruit and train clinical research staff and site coordinators',
          'Monitor study progress and ensure compliance with protocols',
          'Collect, validate, and analyze clinical data',
          'Prepare regulatory submissions and clinical study reports',
          'Maintain relationships with key opinion leaders and healthcare institutions'
        ],
        benefits: [
          'Competitive salary with performance bonuses',
          'Comprehensive health and travel insurance',
          'Professional development and certification opportunities',
          'Extensive travel across Africa with accommodation provided',
          'Direct contribution to healthcare innovation and validation',
          'Networking with leading healthcare professionals globally',
          'Opportunity to publish research findings'
        ],
        niceToHave: [
          'Experience with diagnostic device clinical studies',
          'Knowledge of African regulatory frameworks',
          'Experience with point-of-care testing validation',
          'Familiarity with statistical analysis and data management',
          'Experience working with international research organizations'
        ],
        salaryRange: '$50,000 - $70,000 USD',
        experience: '3+ years',
        education: 'Bachelor\'s in Life Sciences, Nursing, or related field',
        teamInfo: 'You\'ll work within our Medical Affairs team of 8 professionals, including medical doctors, regulatory specialists, and clinical data analysts. You\'ll also collaborate with our Engineering, Quality Assurance, and Business Development teams.',
        growthOpportunities: 'This role offers clear progression to Senior Clinical Research Manager or Medical Affairs Director positions. You\'ll have opportunities to lead larger clinical programs and contribute to our global expansion strategy.',
        isActive: true,
        isFeatured: true,
        applicationDeadline: new Date('2025-03-20')
      },
      {
        title: 'AI/ML Engineer',
        slug: 'ai-ml-engineer',
        departmentId: 1,
        location: 'Remote',
        type: 'Full-time',
        level: 'Senior',
        description: 'Develop AI algorithms for diagnostic accuracy and healthcare data analysis.',
        requirements: [
          '4+ years of experience in AI/ML development and deployment',
          'Strong proficiency in Python, TensorFlow, PyTorch, and related frameworks',
          'Experience with computer vision and medical image analysis',
          'Knowledge of machine learning model optimization and deployment',
          'Experience with edge computing and model compression techniques',
          'Strong understanding of statistical analysis and experimental design',
          'Experience with healthcare data and medical imaging preferred',
          'Knowledge of regulatory requirements for AI in medical devices'
        ],
        responsibilities: [
          'Develop and optimize AI/ML algorithms for diagnostic accuracy',
          'Design and implement computer vision systems for medical image analysis',
          'Build predictive models for disease detection and risk assessment',
          'Create data processing pipelines for healthcare data analytics',
          'Ensure algorithm performance in low-resource computing environments',
          'Collaborate with clinical teams to validate AI model performance',
          'Implement explainable AI techniques for medical applications',
          'Maintain and improve existing AI systems and models'
        ],
        benefits: [
          'Competitive salary with equity options',
          'Flexible remote work arrangements',
          'Access to cutting-edge computing resources and datasets',
          'Professional development and conference attendance',
          'Collaboration with leading AI researchers and healthcare professionals',
          'Opportunity to publish research and contribute to open-source projects',
          'Direct impact on healthcare outcomes through AI innovation'
        ],
        niceToHave: [
          'Experience with federated learning and privacy-preserving ML',
          'Knowledge of African healthcare data patterns and challenges',
          'Experience with real-time AI systems and edge deployment',
          'Familiarity with medical device software development',
          'Experience with multi-modal AI systems'
        ],
        salaryRange: '$90,000 - $130,000 USD',
        experience: '4+ years',
        education: 'Master\'s or PhD in Computer Science, AI/ML, or related field',
        teamInfo: 'You\'ll work within our Technology team of 12 professionals, including software engineers, data scientists, and DevOps specialists. You\'ll also collaborate closely with our Engineering, Medical Affairs, and Product teams.',
        growthOpportunities: 'This role offers advancement to AI/ML Lead, Technical Director, or Chief Technology Officer positions. You\'ll have opportunities to lead AI strategy and build larger AI/ML teams.',
        isActive: true,
        isFeatured: true,
        applicationDeadline: new Date('2025-03-25')
      }
    ]);

    // Create partners
    console.log('🤝 Creating partners...');
    const partnersData = await db.insert(partners).values([
      {
        name: 'MedTech Solutions',
        logoUrl: '/images/partners/medtech-solutions.png',
        websiteUrl: 'https://medtechsolutions.com',
        description: 'Leading medical technology provider',
        category: 'Technology Partner',
        isActive: true,
        orderIndex: 1
      },
      {
        name: 'HealthCare Innovations',
        logoUrl: '/images/partners/healthcare-innovations.png',
        websiteUrl: 'https://healthcareinnovations.com',
        description: 'Innovative healthcare solutions provider',
        category: 'Healthcare Partner',
        isActive: true,
        orderIndex: 2
      },
      {
        name: 'IoT Connect',
        logoUrl: '/images/partners/iot-connect.png',
        websiteUrl: 'https://iotconnect.com',
        description: 'IoT connectivity and platform solutions',
        category: 'Technology Partner',
        isActive: true,
        orderIndex: 3
      }
    ]);

    // Create contact methods
    console.log('📞 Creating contact methods...');
    const contactMethodsData = await db.insert(contactMethods).values([
      {
        type: 'Phone',
        title: 'Call Us',
        description: 'Speak directly with our team',
        contact: '+254 707 231 654',
        hours: 'Mon-Fri 8AM-6PM EAT',
        color: '#667eea',
        orderIndex: 1,
        isActive: true
      },
      {
        type: 'Email',
        title: 'Email Us',
        description: 'Send us a message anytime',
        contact: 'info@gonepharm.com',
        hours: '24/7',
        color: '#764ba2',
        orderIndex: 2,
        isActive: true
      },
      {
        type: 'Office',
        title: 'Visit Us',
        description: 'Come see our innovation lab',
        contact: '2nd Floor, Chandaria Innovation Centre Building, Kenya',
        hours: 'Mon-Fri 8AM-6PM EAT',
        color: '#f093fb',
        orderIndex: 3,
        isActive: true
      }
    ]);

    // Create impact statistics
    console.log('📊 Creating impact statistics...');
    const stats = await db.insert(impactStatistics).values([
      {
        number: '10,000+',
        label: 'Lives Impacted',
        description: 'Patients helped through our diagnostic solutions',
        orderIndex: 1,
        isActive: true
      },
      {
        number: '50+',
        label: 'Healthcare Partners',
        description: 'Hospitals and clinics using our technology',
        orderIndex: 2,
        isActive: true
      },
      {
        number: '99.9%',
        label: 'Uptime',
        description: 'Reliable service for critical healthcare applications',
        orderIndex: 3,
        isActive: true
      },
      {
        number: '24/7',
        label: 'Support',
        description: 'Round-the-clock technical support for our partners',
        orderIndex: 4,
        isActive: true
      }
    ]);

    // Create FAQs
    console.log('❓ Creating FAQs...');
    const faqsData = await db.insert(faqs).values([
      {
        category: 'General',
        question: 'What is GONEP?',
        answer: 'GONEP is a healthcare technology company specializing in IoT diagnostic solutions that connect patients, healthcare providers, and medical devices.',
        orderIndex: 1,
        isActive: true
      },
      {
        category: 'Technology',
        question: 'How does your IoT platform work?',
        answer: 'Our IoT platform connects medical devices to a secure cloud network, enabling real-time data collection, analysis, and sharing between healthcare providers.',
        orderIndex: 2,
        isActive: true
      },
      {
        category: 'Support',
        question: 'What kind of support do you provide?',
        answer: 'We provide 24/7 technical support, training programs, and ongoing maintenance for all our healthcare solutions.',
        orderIndex: 3,
        isActive: true
      }
    ]);

    // Create support resources
    console.log('📚 Creating support resources...');
    const supportResourcesData = await db.insert(supportResources).values([
      {
        title: 'User Manual',
        description: 'Complete guide to using our diagnostic platform',
        type: 'PDF',
        downloadUrl: '/resources/user-manual.pdf',
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'API Documentation',
        description: 'Technical documentation for developers',
        type: 'PDF',
        downloadUrl: '/resources/api-docs.pdf',
        orderIndex: 2,
        isActive: true
      },
      {
        title: 'Training Videos',
        description: 'Video tutorials for platform features',
        type: 'Video',
        downloadUrl: '/resources/training-videos',
        orderIndex: 3,
        isActive: true
      }
    ]);

    // Create product features
    console.log('⚡ Creating product features...');
    const features = await db.insert(productFeatures).values([
      {
        title: 'Real-time Monitoring',
        description: 'Monitor patient vitals and diagnostic results in real-time',
        icon: 'monitor',
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'AI-Powered Analysis',
        description: 'Advanced AI algorithms for accurate diagnostic interpretation',
        icon: 'brain',
        orderIndex: 2,
        isActive: true
      },
      {
        title: 'Secure Data Transmission',
        description: 'HIPAA-compliant secure data transmission and storage',
        icon: 'shield',
        orderIndex: 3,
        isActive: true
      },
      {
        title: 'Mobile Integration',
        description: 'Seamless integration with mobile devices and apps',
        icon: 'mobile',
        orderIndex: 4,
        isActive: true
      }
    ]);

    // Create technical specifications
    console.log('🔧 Creating technical specifications...');
    const specs = await db.insert(technicalSpecs).values([
      {
        title: 'Cloud Infrastructure',
        description: 'AWS-based scalable cloud infrastructure with 99.9% uptime',
        icon: 'cloud',
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'Data Security',
        description: 'End-to-end encryption with HIPAA and GDPR compliance',
        icon: 'lock',
        orderIndex: 2,
        isActive: true
      },
      {
        title: 'API Performance',
        description: 'RESTful APIs with sub-100ms response times',
        icon: 'zap',
        orderIndex: 3,
        isActive: true
      },
      {
        title: 'Device Compatibility',
        description: 'Compatible with major medical device manufacturers',
        icon: 'devices',
        orderIndex: 4,
        isActive: true
      }
    ]);

    // Create use cases
    console.log('🎯 Creating use cases...');
    const useCasesData = await db.insert(useCases).values([
      {
        title: 'Remote Patient Monitoring',
        description: 'Monitor patients remotely with connected devices',
        icon: 'user-check',
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'Diagnostic Testing',
        description: 'Rapid diagnostic testing with instant results',
        icon: 'test-tube',
        orderIndex: 2,
        isActive: true
      },
      {
        title: 'Clinical Research',
        description: 'Collect and analyze data for clinical studies',
        icon: 'microscope',
        orderIndex: 3,
        isActive: true
      },
      {
        title: 'Home Based Care',
        description: 'Quick diagnostic support in emergency situations',
        icon: 'ambulance',
        orderIndex: 4,
        isActive: true
      }
    ]);

    // Create media resources
    console.log('📁 Creating media resources...');
    const media = await db.insert(mediaResources).values([
      {
        type: 'whitepaper',
        title: 'IoT in Healthcare: A Comprehensive Guide',
        description: 'Complete guide to implementing IoT solutions in healthcare',
        date: new Date('2024-01-15'),
        fileSize: '2.5 MB',
        category: 'Technology',
        featured: true,
        downloadUrl: '/resources/iot-healthcare-guide.pdf',
        thumbnail: '/images/resources/whitepaper-thumb.jpg',
        orderIndex: 1,
        isActive: true
      },
      {
        type: 'case-study',
        title: 'Hospital Network Implementation',
        description: 'Case study of IoT implementation in a major hospital network',
        date: new Date('2024-02-20'),
        fileSize: '1.8 MB',
        category: 'Healthcare',
        featured: false,
        downloadUrl: '/resources/hospital-case-study.pdf',
        thumbnail: '/images/resources/case-study-thumb.jpg',
        orderIndex: 2,
        isActive: true
      }
    ]);

    // Create press coverage
    console.log('📰 Creating press coverage...');
    const press = await db.insert(pressCoverage).values([
      {
        title: 'GONEP Revolutionizes Healthcare with IoT Diagnostics',
        publication: 'TechCrunch',
        date: new Date('2024-03-10'),
        excerpt: 'GONEP\'s innovative IoT diagnostic platform is transforming how healthcare providers monitor and diagnose patients.',
        link: 'https://techcrunch.com/gonep-iot-diagnostics',
        image: '/images/press/techcrunch-article.jpg',
        featured: true,
        orderIndex: 1,
        isActive: true
      },
      {
        title: 'The Future of Medical Diagnostics',
        publication: 'Healthcare Innovation',
        date: new Date('2024-02-28'),
        excerpt: 'How connected devices are changing the landscape of medical diagnostics.',
        link: 'https://healthcareinnovation.com/future-diagnostics',
        image: '/images/press/healthcare-innovation.jpg',
        featured: false,
        orderIndex: 2,
        isActive: true
      }
    ]);

    console.log('✅ Database seeding completed successfully!');
    console.log('📊 Summary:');
    console.log('  - Blog Categories: 4');
    console.log('  - Blog Authors: 3');
    console.log('  - Blog Posts: 3');
    console.log('  - Team Members: 4');
    console.log('  - Team Values: 4');
    console.log('  - Departments: 4');
    console.log('  - Job Openings: 2');
    console.log('  - Partners: 3');
    console.log('  - Contact Methods: 3');
    console.log('  - Impact Statistics: 4');
    console.log('  - FAQs: 3');
    console.log('  - Support Resources: 3');
    console.log('  - Product Features: 4');
    console.log('  - Technical Specs: 4');
    console.log('  - Use Cases: 4');
    console.log('  - Media Resources: 2');
    console.log('  - Press Coverage: 2');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Export the function for external use
