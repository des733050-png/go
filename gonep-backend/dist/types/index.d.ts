import { InferModel } from 'drizzle-orm';
import { users, blogPosts, blogComments, teamMembers, jobOpenings, jobApplications, demoRequests, contactInquiries, newsletterSubscribers, partners, analytics, fileUploads } from '../database/schema';
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;
export type BlogPost = InferModel<typeof blogPosts>;
export type NewBlogPost = InferModel<typeof blogPosts, 'insert'>;
export type BlogComment = InferModel<typeof blogComments>;
export type NewBlogComment = InferModel<typeof blogComments, 'insert'>;
export type TeamMember = InferModel<typeof teamMembers>;
export type NewTeamMember = InferModel<typeof teamMembers, 'insert'>;
export type JobOpening = InferModel<typeof jobOpenings>;
export type NewJobOpening = InferModel<typeof jobOpenings, 'insert'>;
export type JobApplication = InferModel<typeof jobApplications>;
export type NewJobApplication = InferModel<typeof jobApplications, 'insert'>;
export type DemoRequest = InferModel<typeof demoRequests>;
export type NewDemoRequest = InferModel<typeof demoRequests, 'insert'>;
export type ContactInquiry = InferModel<typeof contactInquiries>;
export type NewContactInquiry = InferModel<typeof contactInquiries, 'insert'>;
export type NewsletterSubscriber = InferModel<typeof newsletterSubscribers>;
export type NewNewsletterSubscriber = InferModel<typeof newsletterSubscribers, 'insert'>;
export type Partner = InferModel<typeof partners>;
export type NewPartner = InferModel<typeof partners, 'insert'>;
export type Analytics = InferModel<typeof analytics>;
export type NewAnalytics = InferModel<typeof analytics, 'insert'>;
export type FileUpload = InferModel<typeof fileUploads>;
export type NewFileUpload = InferModel<typeof fileUploads, 'insert'>;
export interface UserRegistration {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    organization?: string;
    title?: string;
    organizationType?: string;
    country?: string;
}
export interface UserLogin {
    email: string;
    password: string;
}
export interface AuthResponse {
    user: Omit<User, 'passwordHash'>;
    accessToken: string;
    refreshToken: string;
}
export interface BlogPostCreate {
    title: string;
    excerpt?: string;
    content: string;
    authorId: string;
    authorName: string;
    authorBio?: string;
    authorImage?: string;
    category: string;
    image?: string;
    featured?: boolean;
    published?: boolean;
    readTime?: string;
    tags?: string[];
    metaTitle?: string;
    metaDescription?: string;
    seoKeywords?: string[];
}
export interface BlogPostUpdate extends Partial<BlogPostCreate> {
    id: string;
}
export interface BlogCommentCreate {
    postId: string;
    userId?: string;
    authorName: string;
    authorEmail: string;
    content: string;
    parentId?: string;
}
export interface DemoRequestCreate {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    title: string;
    organizationType: string;
    country: string;
    interests: string[];
    message?: string;
    demoType: 'virtual' | 'onsite';
    preferredDate?: Date;
    attendeeCount?: string;
}
export interface JobApplicationCreate {
    jobId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    resumeUrl?: string;
    coverLetter?: string;
    experienceYears?: number;
    currentCompany?: string;
    currentPosition?: string;
    expectedSalary?: string;
}
export interface ContactInquiryCreate {
    name: string;
    email: string;
    category: string;
    organization?: string;
    message: string;
    attachmentUrl?: string;
}
export interface NewsletterSubscription {
    email: string;
    firstName?: string;
    lastName?: string;
    source?: string;
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface BlogPostFilters {
    category?: string;
    authorId?: string;
    featured?: boolean;
    published?: boolean;
    tags?: string[];
    search?: string;
}
export interface JobOpeningFilters {
    department?: string;
    location?: string;
    type?: string;
    level?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    search?: string;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface ErrorResponse {
    success: false;
    error: string;
    message?: string;
    details?: any;
}
export interface FileUploadResponse {
    id: string;
    filename: string;
    originalFilename: string;
    url: string;
    fileSize: number;
    mimeType: string;
}
export interface AnalyticsEvent {
    pageUrl: string;
    userAgent?: string;
    ipAddress?: string;
    country?: string;
    city?: string;
    referrer?: string;
    sessionId?: string;
    eventType: string;
    eventData?: any;
}
export interface EmailTemplate {
    subject: string;
    html: string;
    text: string;
}
export interface EmailData {
    to: string;
    from?: string;
    subject: string;
    html: string;
    text?: string;
    attachments?: Array<{
        filename: string;
        content: Buffer;
        contentType: string;
    }>;
}
export interface JWTPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
export interface AuthenticatedRequest extends Request {
    user?: Omit<User, 'passwordHash'>;
}
export type JobApplicationStatus = 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
export type DemoRequestStatus = 'pending' | 'scheduled' | 'completed' | 'cancelled';
export type ContactInquiryStatus = 'new' | 'in_progress' | 'resolved' | 'closed';
export type UserRole = 'user' | 'admin' | 'moderator';
export declare const JOB_APPLICATION_STATUSES: JobApplicationStatus[];
export declare const DEMO_REQUEST_STATUSES: DemoRequestStatus[];
export declare const CONTACT_INQUIRY_STATUSES: ContactInquiryStatus[];
export declare const USER_ROLES: UserRole[];
//# sourceMappingURL=index.d.ts.map