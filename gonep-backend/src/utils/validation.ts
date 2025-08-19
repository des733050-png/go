import Joi from 'joi';
import { UserRole, JobApplicationStatus, DemoRequestStatus, ContactInquiryStatus, USER_ROLES, JOB_APPLICATION_STATUSES, DEMO_REQUEST_STATUSES, CONTACT_INQUIRY_STATUSES } from '../types';

export class ValidationUtils {
  // User validation schemas
  static userRegistration = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
      .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
        'string.min': 'Password must be at least 8 characters long'
      }),
    name: Joi.string().min(2).max(200).optional(), // For frontend compatibility
    firstName: Joi.string().min(2).max(100).optional(), // For API compatibility
    lastName: Joi.string().min(2).max(100).optional(), // For API compatibility
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    organization: Joi.string().max(255).optional(),
    title: Joi.string().max(100).optional(),
    organizationType: Joi.string().max(50).optional(),
    country: Joi.string().max(100).optional(),
  });

  static userLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  static userUpdate = Joi.object({
    firstName: Joi.string().min(2).max(100).optional(),
    lastName: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    organization: Joi.string().max(255).optional(),
    title: Joi.string().max(100).optional(),
    organizationType: Joi.string().max(50).optional(),
    country: Joi.string().max(100).optional(),
  });

  // Blog post validation schemas
  static blogPostCreate = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    excerpt: Joi.string().max(500).optional(),
    content: Joi.string().min(50).required(),
    authorId: Joi.string().uuid().required(),
    authorName: Joi.string().min(2).max(255).required(),
    authorBio: Joi.string().max(1000).optional(),
    authorImage: Joi.string().uri().optional(),
    category: Joi.string().min(2).max(100).required(),
    image: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    published: Joi.boolean().optional(),
    readTime: Joi.string().max(20).optional(),
    tags: Joi.array().items(Joi.string().max(50)).max(10).optional(),
    metaTitle: Joi.string().max(255).optional(),
    metaDescription: Joi.string().max(500).optional(),
    seoKeywords: Joi.array().items(Joi.string().max(50)).max(10).optional(),
  });

  static blogPostUpdate = Joi.object({
    title: Joi.string().min(5).max(255).optional(),
    excerpt: Joi.string().max(500).optional(),
    content: Joi.string().min(50).optional(),
    authorName: Joi.string().min(2).max(255).optional(),
    authorBio: Joi.string().max(1000).optional(),
    authorImage: Joi.string().uri().optional(),
    category: Joi.string().min(2).max(100).optional(),
    image: Joi.string().uri().optional(),
    featured: Joi.boolean().optional(),
    published: Joi.boolean().optional(),
    readTime: Joi.string().max(20).optional(),
    tags: Joi.array().items(Joi.string().max(50)).max(10).optional(),
    metaTitle: Joi.string().max(255).optional(),
    metaDescription: Joi.string().max(500).optional(),
    seoKeywords: Joi.array().items(Joi.string().max(50)).max(10).optional(),
  });

  // Blog comment validation schemas
  static blogCommentCreate = Joi.object({
    postId: Joi.string().uuid().required(),
    userId: Joi.string().uuid().optional(),
    authorName: Joi.string().min(2).max(255).required(),
    authorEmail: Joi.string().email().required(),
    content: Joi.string().min(10).max(2000).required(),
    parentId: Joi.string().uuid().optional(),
  });

  // Demo request validation schemas
  static demoRequestCreate = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
    organization: Joi.string().min(2).max(255).required(),
    title: Joi.string().min(2).max(100).required(),
    organizationType: Joi.string().valid('healthcare', 'technology', 'education', 'government', 'other').required(),
    country: Joi.string().min(2).max(100).required(),
    interests: Joi.array().items(Joi.string().max(100)).min(1).max(4).required(),
    message: Joi.string().max(1000).optional(),
    demoType: Joi.string().valid('virtual', 'onsite').required(),
    preferredDate: Joi.date().min('now').optional(),
    attendeeCount: Joi.string().max(20).optional(),
  });

  static demoRequestUpdate = Joi.object({
    status: Joi.string().valid(...DEMO_REQUEST_STATUSES).required(),
    scheduledAt: Joi.date().optional(),
    notes: Joi.string().max(1000).optional(),
  });

  // Job application validation schemas
  static jobApplicationCreate = Joi.object({
    jobId: Joi.string().uuid().required(),
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    resumeUrl: Joi.string().uri().optional(),
    coverLetter: Joi.string().max(6000).optional(),
    experienceYears: Joi.number().integer().min(0).max(50).optional(),
    currentCompany: Joi.string().max(255).optional(),
    currentPosition: Joi.string().max(255).optional(),
    expectedSalary: Joi.string().max(100).optional(),
  });

  static jobApplicationUpdate = Joi.object({
    status: Joi.string().valid(...JOB_APPLICATION_STATUSES).required(),
    notes: Joi.string().max(1000).optional(),
  });

  // Contact inquiry validation schemas
  static contactInquiryCreate = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    category: Joi.string().valid('product', 'partnership', 'investment', 'media', 'careers', 'support', 'other').required(),
    organization: Joi.string().max(255).optional(),
    message: Joi.string().min(10).max(2000).required(),
    attachmentUrl: Joi.string().uri().optional(),
  });

  static contactInquiryUpdate = Joi.object({
    status: Joi.string().valid(...CONTACT_INQUIRY_STATUSES).required(),
    assignedTo: Joi.string().uuid().optional(),
    notes: Joi.string().max(1000).optional(),
  });

  // Newsletter subscription validation schemas
  static newsletterSubscription = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(2).max(100).optional(),
    lastName: Joi.string().min(2).max(100).optional(),
    source: Joi.string().max(100).optional(),
  });

  // Pagination validation schemas
  static pagination = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sortBy: Joi.string().optional(),
    sortOrder: Joi.string().valid('asc', 'desc').default('desc'),
  });

  // File upload validation schemas
  static fileUpload = Joi.object({
    file: Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().required(),
      size: Joi.number().max(10485760).required(), // 10MB max
    }).required(),
  });

  // Analytics validation schemas
  static analyticsEvent = Joi.object({
    pageUrl: Joi.string().uri().required(),
    userAgent: Joi.string().optional(),
    ipAddress: Joi.string().ip().optional(),
    country: Joi.string().max(100).optional(),
    city: Joi.string().max(100).optional(),
    referrer: Joi.string().uri().optional(),
    sessionId: Joi.string().max(255).optional(),
    eventType: Joi.string().max(50).required(),
    eventData: Joi.object().optional(),
  });

  // UUID validation
  static uuid = Joi.string().uuid().required();

  // Email validation
  static email = Joi.string().email().required();

  // Password validation
  static password = Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'string.min': 'Password must be at least 8 characters long'
    });

  /**
   * Validate data against a schema
   */
  static validate<T>(schema: Joi.Schema, data: any): T {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
    }

    return value;
  }

  /**
   * Validate partial data against a schema
   */
  static validatePartial<T>(schema: Joi.Schema, data: any): Partial<T> {
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (error) {
      throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
    }

    return value;
  }

  /**
   * Sanitize HTML content
   */
  static sanitizeHtml(html: string): string {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  /**
   * Validate and sanitize search query
   */
  static validateSearchQuery(query: string): string {
    if (!query || typeof query !== 'string') {
      throw new Error('Search query must be a non-empty string');
    }

    const sanitized = query.trim().replace(/[<>]/g, '');
    
    if (sanitized.length < 2) {
      throw new Error('Search query must be at least 2 characters long');
    }

    if (sanitized.length > 100) {
      throw new Error('Search query must be less than 100 characters');
    }

    return sanitized;
  }
}
