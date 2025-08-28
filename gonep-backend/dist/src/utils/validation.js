"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationUtils = void 0;
const joi_1 = __importDefault(require("joi"));
const types_1 = require("../types");
class ValidationUtils {
    static validate(schema, data) {
        const { error, value } = schema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (error) {
            throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
        }
        return value;
    }
    static validatePartial(schema, data) {
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
    static sanitizeHtml(html) {
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
    }
    static validateSearchQuery(query) {
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
exports.ValidationUtils = ValidationUtils;
ValidationUtils.userRegistration = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
        .messages({
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
        'string.min': 'Password must be at least 8 characters long'
    }),
    name: joi_1.default.string().min(2).max(200).optional(),
    firstName: joi_1.default.string().min(2).max(100).optional(),
    lastName: joi_1.default.string().min(2).max(100).optional(),
    phone: joi_1.default.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    organization: joi_1.default.string().max(255).optional(),
    title: joi_1.default.string().max(100).optional(),
    organizationType: joi_1.default.string().max(50).optional(),
    country: joi_1.default.string().max(100).optional(),
});
ValidationUtils.userLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
ValidationUtils.userUpdate = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(100).optional(),
    lastName: joi_1.default.string().min(2).max(100).optional(),
    phone: joi_1.default.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    organization: joi_1.default.string().max(255).optional(),
    title: joi_1.default.string().max(100).optional(),
    organizationType: joi_1.default.string().max(50).optional(),
    country: joi_1.default.string().max(100).optional(),
});
ValidationUtils.blogPostCreate = joi_1.default.object({
    title: joi_1.default.string().min(5).max(255).required(),
    excerpt: joi_1.default.string().max(500).optional(),
    content: joi_1.default.string().min(50).required(),
    authorId: joi_1.default.string().uuid().required(),
    authorName: joi_1.default.string().min(2).max(255).required(),
    authorBio: joi_1.default.string().max(1000).optional(),
    authorImage: joi_1.default.string().uri().optional(),
    category: joi_1.default.string().min(2).max(100).required(),
    image: joi_1.default.string().uri().optional(),
    featured: joi_1.default.boolean().optional(),
    published: joi_1.default.boolean().optional(),
    readTime: joi_1.default.string().max(20).optional(),
    tags: joi_1.default.array().items(joi_1.default.string().max(50)).max(10).optional(),
    metaTitle: joi_1.default.string().max(255).optional(),
    metaDescription: joi_1.default.string().max(500).optional(),
    seoKeywords: joi_1.default.array().items(joi_1.default.string().max(50)).max(10).optional(),
});
ValidationUtils.blogPostUpdate = joi_1.default.object({
    title: joi_1.default.string().min(5).max(255).optional(),
    excerpt: joi_1.default.string().max(500).optional(),
    content: joi_1.default.string().min(50).optional(),
    authorName: joi_1.default.string().min(2).max(255).optional(),
    authorBio: joi_1.default.string().max(1000).optional(),
    authorImage: joi_1.default.string().uri().optional(),
    category: joi_1.default.string().min(2).max(100).optional(),
    image: joi_1.default.string().uri().optional(),
    featured: joi_1.default.boolean().optional(),
    published: joi_1.default.boolean().optional(),
    readTime: joi_1.default.string().max(20).optional(),
    tags: joi_1.default.array().items(joi_1.default.string().max(50)).max(10).optional(),
    metaTitle: joi_1.default.string().max(255).optional(),
    metaDescription: joi_1.default.string().max(500).optional(),
    seoKeywords: joi_1.default.array().items(joi_1.default.string().max(50)).max(10).optional(),
});
ValidationUtils.blogCommentCreate = joi_1.default.object({
    postId: joi_1.default.string().uuid().required(),
    userId: joi_1.default.string().uuid().optional(),
    authorName: joi_1.default.string().min(2).max(255).required(),
    authorEmail: joi_1.default.string().email().required(),
    content: joi_1.default.string().min(10).max(2000).required(),
    parentId: joi_1.default.string().uuid().optional(),
});
ValidationUtils.demoRequestCreate = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(100).required(),
    lastName: joi_1.default.string().min(2).max(100).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
    organization: joi_1.default.string().min(2).max(255).required(),
    title: joi_1.default.string().min(2).max(100).required(),
    organizationType: joi_1.default.string().valid('healthcare', 'technology', 'education', 'government', 'other').required(),
    country: joi_1.default.string().min(2).max(100).required(),
    interests: joi_1.default.array().items(joi_1.default.string().max(100)).min(1).max(4).required(),
    message: joi_1.default.string().max(1000).optional(),
    demoType: joi_1.default.string().valid('virtual', 'onsite').required(),
    preferredDate: joi_1.default.date().min('now').optional(),
    attendeeCount: joi_1.default.string().max(20).optional(),
});
ValidationUtils.demoRequestUpdate = joi_1.default.object({
    status: joi_1.default.string().valid(...types_1.DEMO_REQUEST_STATUSES).required(),
    scheduledAt: joi_1.default.date().optional(),
    notes: joi_1.default.string().max(1000).optional(),
});
ValidationUtils.jobApplicationCreate = joi_1.default.object({
    jobId: joi_1.default.string().uuid().required(),
    firstName: joi_1.default.string().min(2).max(100).required(),
    lastName: joi_1.default.string().min(2).max(100).required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional(),
    resumeUrl: joi_1.default.string().uri().optional(),
    coverLetter: joi_1.default.string().max(6000).optional(),
    experienceYears: joi_1.default.number().integer().min(0).max(50).optional(),
    currentCompany: joi_1.default.string().max(255).optional(),
    currentPosition: joi_1.default.string().max(255).optional(),
    expectedSalary: joi_1.default.string().max(100).optional(),
});
ValidationUtils.jobApplicationUpdate = joi_1.default.object({
    status: joi_1.default.string().valid(...types_1.JOB_APPLICATION_STATUSES).required(),
    notes: joi_1.default.string().max(1000).optional(),
});
ValidationUtils.contactInquiryCreate = joi_1.default.object({
    name: joi_1.default.string().min(2).max(255).required(),
    email: joi_1.default.string().email().required(),
    category: joi_1.default.string().valid('product', 'partnership', 'investment', 'media', 'careers', 'support', 'other').required(),
    organization: joi_1.default.string().max(255).optional(),
    message: joi_1.default.string().min(10).max(2000).required(),
    attachmentUrl: joi_1.default.string().uri().optional(),
});
ValidationUtils.contactInquiryUpdate = joi_1.default.object({
    status: joi_1.default.string().valid(...types_1.CONTACT_INQUIRY_STATUSES).required(),
    assignedTo: joi_1.default.string().uuid().optional(),
    notes: joi_1.default.string().max(1000).optional(),
});
ValidationUtils.newsletterSubscription = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    firstName: joi_1.default.string().min(2).max(100).optional(),
    lastName: joi_1.default.string().min(2).max(100).optional(),
    source: joi_1.default.string().max(100).optional(),
});
ValidationUtils.pagination = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    limit: joi_1.default.number().integer().min(1).max(100).default(10),
    sortBy: joi_1.default.string().optional(),
    sortOrder: joi_1.default.string().valid('asc', 'desc').default('desc'),
});
ValidationUtils.fileUpload = joi_1.default.object({
    file: joi_1.default.object({
        fieldname: joi_1.default.string().required(),
        originalname: joi_1.default.string().required(),
        encoding: joi_1.default.string().required(),
        mimetype: joi_1.default.string().required(),
        size: joi_1.default.number().max(10485760).required(),
    }).required(),
});
ValidationUtils.analyticsEvent = joi_1.default.object({
    pageUrl: joi_1.default.string().uri().required(),
    userAgent: joi_1.default.string().optional(),
    ipAddress: joi_1.default.string().ip().optional(),
    country: joi_1.default.string().max(100).optional(),
    city: joi_1.default.string().max(100).optional(),
    referrer: joi_1.default.string().uri().optional(),
    sessionId: joi_1.default.string().max(255).optional(),
    eventType: joi_1.default.string().max(50).required(),
    eventData: joi_1.default.object().optional(),
});
ValidationUtils.uuid = joi_1.default.string().uuid().required();
ValidationUtils.email = joi_1.default.string().email().required();
ValidationUtils.password = joi_1.default.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required()
    .messages({
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
    'string.min': 'Password must be at least 8 characters long'
});
//# sourceMappingURL=validation.js.map