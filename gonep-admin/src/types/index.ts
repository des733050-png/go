// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  status: number;
  data: T;
  message?: string;
}

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  readTime: string;
  views: number;
  commentsCount: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  categoryId: number;
  authorName: string;
  authorImage: string;
  categoryName: string;
  categorySlug: string;
  tags: string[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogAuthor {
  id: number;
  name: string;
  bio: string;
  image: string;
  email: string;
  role: string;
  department: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Team Types
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  email: string;
  department: string;
  expertise: string[];
  yearsExperience: number;
  isLeadership: boolean;
  orderIndex: number;
  isActive: boolean;
  // Social Media Links
  linkedinUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  youtubeUrl?: string;
  // Additional Details
  phone?: string;
  location?: string;
  education?: string;
  certifications?: string[];
  achievements?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamValue {
  id: number;
  title: string;
  description: string;
  icon: string;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Careers Types
export interface Job {
  id: number;
  title: string;
  slug: string;
  departmentId: number;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[] | string;
  responsibilities: string[] | string;
  benefits: string[] | string;
  niceToHave: string[] | string;
  salaryRange: string;
  experience: string;
  education: string;
  teamInfo: string;
  growthOpportunities: string;
  isActive: boolean;
  isFeatured: boolean;
  applicationDeadline: string;
  createdAt: string;
  updatedAt: string;
  department?: {
    id: number;
    name: string;
    description: string;
  };
  departmentName?: string; // For backward compatibility
}

export interface Department {
  id: number;
  name: string;
  description: string;
  jobCount: number;
  totalJobs?: number;
  activeJobs?: number;
  inactiveJobs?: number;
  featuredJobs?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact Types
export interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  category: string;
  organization: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMethod {
  id: number;
  type: string;
  value: string;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

// Newsletter Types
export interface NewsletterSubscriber {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Demo Request Types
export interface DemoRequest {
  id: number;
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
  demoType: string;
  preferredDate?: string;
  attendeeCount?: string;
  status: string;
  scheduledAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Partners Types
export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  category: string;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalInquiries: number;
  totalSubscribers: number;
  totalDemoRequests: number;
  totalPartners: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: string;
  children?: NavItem[];
}

// Form Types
export interface BlogPostForm {
  title: string;
  content: string;
  excerpt: string;
  image: string;
  categoryId: number;
  authorId: number;
  published: boolean;
  featured: boolean;
  tags: string[];
}

export interface JobForm {
  title: string;
  slug: string;
  departmentId: number;
  location: string;
  type: string;
  level: string;
  description: string;
  requirements: string[] | string;
  responsibilities: string[] | string;
  benefits: string[] | string;
  niceToHave: string[] | string;
  salaryRange: string;
  experience: string;
  education: string;
  teamInfo: string;
  growthOpportunities: string;
  isActive: boolean;
  isFeatured: boolean;
  applicationDeadline: string;
}

// Demo Configuration Types
export interface DemoInterest {
  id: number;
  name: string;
  description?: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DemoType {
  id: number;
  name: string;
  duration: string;
  description?: string;
  maxAttendees?: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarAvailability {
  id: number;
  date: string;
  isAvailable: boolean;
  maxBookings: number;
  currentBookings: number;
  reason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInterestData {
  name: string;
  description?: string;
  category: string;
}

export interface UpdateInterestData {
  name?: string;
  description?: string;
  category?: string;
  isActive?: boolean;
}

export interface CreateDemoTypeData {
  name: string;
  duration: string;
  description?: string;
  maxAttendees?: number;
}

export interface UpdateDemoTypeData {
  name?: string;
  duration?: string;
  description?: string;
  maxAttendees?: number;
  isActive?: boolean;
}

export interface CalendarAvailabilityData {
  date: string;
  isAvailable: boolean;
  maxBookings: number;
  reason?: string;
}
