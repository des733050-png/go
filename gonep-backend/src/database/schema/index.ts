import { mysqlTable, varchar, text, timestamp, boolean, int, json, index } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

// Users Table
export const users = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  organization: varchar('organization', { length: 255 }),
  title: varchar('title', { length: 100 }),
  organizationType: varchar('organization_type', { length: 50 }),
  country: varchar('country', { length: 100 }),
  role: varchar('role', { length: 20 }).default('user'),
  isActive: boolean('is_active').default(true),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  roleIdx: index('role_idx').on(table.role),
}));

// Blog Categories Table
export const blogCategories = mysqlTable('blog_categories', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  slugIdx: index('slug_idx').on(table.slug),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Blog Authors Table
export const blogAuthors = mysqlTable('blog_authors', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  bio: text('bio'),
  image: varchar('image', { length: 500 }),
  email: varchar('email', { length: 255 }),
  role: varchar('role', { length: 100 }),
  department: varchar('department', { length: 100 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  nameIdx: index('name_idx').on(table.name),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Blog Posts Table
export const blogPosts = mysqlTable('blog_posts', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  image: varchar('image', { length: 500 }),
  authorId: int('author_id').references(() => blogAuthors.id),
  categoryId: int('category_id').references(() => blogCategories.id),
  featured: boolean('featured').default(false),
  published: boolean('published').default(false),
  publishedAt: timestamp('published_at'),
  readTime: varchar('read_time', { length: 20 }),
  views: int('views').default(0),
  commentsCount: int('comments_count').default(0),
  tags: json('tags').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  slugIdx: index('slug_idx').on(table.slug),
  categoryIdx: index('category_idx').on(table.categoryId),
  authorIdx: index('author_idx').on(table.authorId),
  featuredIdx: index('featured_idx').on(table.featured),
  publishedIdx: index('published_idx').on(table.published),
  publishedAtIdx: index('published_at_idx').on(table.publishedAt),
}));

// Blog Comments Table
export const blogComments = mysqlTable('blog_comments', {
  id: int('id').primaryKey().autoincrement(),
  postId: int('post_id').references(() => blogPosts.id, { onDelete: 'cascade' }),
  userId: int('user_id').references(() => users.id),
  authorName: varchar('author_name', { length: 255 }).notNull(),
  authorEmail: varchar('author_email', { length: 255 }).notNull(),
  content: text('content').notNull(),
  isApproved: boolean('is_approved').default(false),
  parentId: int('parent_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  postIdx: index('post_idx').on(table.postId),
  userIdx: index('user_idx').on(table.userId),
  parentIdx: index('parent_idx').on(table.parentId),
}));

// Departments Table
export const departments = mysqlTable('departments', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  jobCount: int('job_count').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  nameIdx: index('name_idx').on(table.name),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Job Openings Table
export const jobOpenings = mysqlTable('job_openings', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  departmentId: int('department_id').references(() => departments.id),
  location: varchar('location', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  level: varchar('level', { length: 50 }).notNull(),
  description: text('description').notNull(),
  requirements: json('requirements').$type<string[]>(),
  responsibilities: json('responsibilities').$type<string[]>(),
  benefits: json('benefits').$type<string[]>(),
  niceToHave: json('nice_to_have').$type<string[]>(),
  salaryRange: varchar('salary_range', { length: 100 }),
  experience: varchar('experience', { length: 100 }),
  education: text('education'),
  teamInfo: text('team_info'),
  growthOpportunities: text('growth_opportunities'),
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  applicationDeadline: timestamp('application_deadline'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  slugIdx: index('slug_idx').on(table.slug),
  departmentIdx: index('department_idx').on(table.departmentId),
  activeIdx: index('active_idx').on(table.isActive),
  featuredIdx: index('featured_idx').on(table.isFeatured),
}));

// Job Applications Table
export const jobApplications = mysqlTable('job_applications', {
  id: int('id').primaryKey().autoincrement(),
  jobId: int('job_id').references(() => jobOpenings.id),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  resumeUrl: varchar('resume_url', { length: 500 }),
  coverLetter: text('cover_letter'),
  experienceYears: int('experience_years'),
  currentCompany: varchar('current_company', { length: 255 }),
  currentPosition: varchar('current_position', { length: 255 }),
  expectedSalary: varchar('expected_salary', { length: 100 }),
  status: varchar('status', { length: 50 }).default('pending'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  jobIdx: index('job_idx').on(table.jobId),
  emailIdx: index('email_idx').on(table.email),
  statusIdx: index('status_idx').on(table.status),
}));

// Team Members Table
export const teamMembers = mysqlTable('team_members', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  bio: text('bio'),
  image: varchar('image', { length: 500 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  department: varchar('department', { length: 100 }),
  location: varchar('location', { length: 255 }),
  expertise: json('expertise').$type<string[]>(),
  yearsExperience: int('years_experience'),
  education: text('education'),
  certifications: json('certifications').$type<string[]>(),
  achievements: json('achievements').$type<string[]>(),
  isLeadership: boolean('is_leadership').default(false),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  // Social Media Links
  linkedinUrl: varchar('linkedin_url', { length: 500 }),
  twitterUrl: varchar('twitter_url', { length: 500 }),
  facebookUrl: varchar('facebook_url', { length: 500 }),
  instagramUrl: varchar('instagram_url', { length: 500 }),
  whatsappUrl: varchar('whatsapp_url', { length: 500 }),
  portfolioUrl: varchar('portfolio_url', { length: 500 }),
  githubUrl: varchar('github_url', { length: 500 }),
  youtubeUrl: varchar('youtube_url', { length: 500 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  departmentIdx: index('department_idx').on(table.department),
  leadershipIdx: index('leadership_idx').on(table.isLeadership),
  orderIdx: index('order_idx').on(table.orderIndex),
  emailIdx: index('email_idx').on(table.email),
}));

// Team Values Table
export const teamValues = mysqlTable('team_values', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Contact Inquiries Table
export const contactInquiries = mysqlTable('contact_inquiries', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  organization: varchar('organization', { length: 255 }),
  message: text('message').notNull(),
  attachments: json('attachments').$type<string[]>(),
  status: varchar('status', { length: 50 }).default('new'),
  assignedTo: int('assigned_to').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  categoryIdx: index('category_idx').on(table.category),
  statusIdx: index('status_idx').on(table.status),
}));

// Contact Methods Table
export const contactMethods = mysqlTable('contact_methods', {
  id: int('id').primaryKey().autoincrement(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  contact: varchar('contact', { length: 255 }).notNull(),
  hours: varchar('hours', { length: 100 }),
  color: varchar('color', { length: 20 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  typeIdx: index('type_idx').on(table.type),
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Media Resources Table
export const mediaResources = mysqlTable('media_resources', {
  id: int('id').primaryKey().autoincrement(),
  type: varchar('type', { length: 50 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  date: timestamp('date'),
  fileSize: varchar('file_size', { length: 50 }),
  category: varchar('category', { length: 100 }),
  featured: boolean('featured').default(false),
  downloadUrl: varchar('download_url', { length: 500 }),
  thumbnail: varchar('thumbnail', { length: 500 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  typeIdx: index('type_idx').on(table.type),
  categoryIdx: index('category_idx').on(table.category),
  featuredIdx: index('featured_idx').on(table.featured),
  orderIdx: index('order_idx').on(table.orderIndex),
}));

// Press Coverage Table
export const pressCoverage = mysqlTable('press_coverage', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  publication: varchar('publication', { length: 255 }).notNull(),
  date: timestamp('date'),
  excerpt: text('excerpt'),
  link: varchar('link', { length: 500 }),
  image: varchar('image', { length: 500 }),
  featured: boolean('featured').default(false),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  publicationIdx: index('publication_idx').on(table.publication),
  featuredIdx: index('featured_idx').on(table.featured),
  orderIdx: index('order_idx').on(table.orderIndex),
}));

// FAQs Table
export const faqs = mysqlTable('faqs', {
  id: int('id').primaryKey().autoincrement(),
  category: varchar('category', { length: 100 }).notNull(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Support Resources Table
export const supportResources = mysqlTable('support_resources', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(),
  downloadUrl: varchar('download_url', { length: 500 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  typeIdx: index('type_idx').on(table.type),
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Support Tickets Table
export const supportTickets = mysqlTable('support_tickets', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  deviceSerial: varchar('device_serial', { length: 100 }),
  description: text('description').notNull(),
  status: varchar('status', { length: 50 }).default('open'),
  priority: varchar('priority', { length: 20 }).default('medium'),
  assignedTo: int('assigned_to').references(() => users.id),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  categoryIdx: index('category_idx').on(table.category),
  statusIdx: index('status_idx').on(table.status),
  priorityIdx: index('priority_idx').on(table.priority),
}));

// Product Features Table
export const productFeatures = mysqlTable('product_features', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Technical Specifications Table
export const technicalSpecs = mysqlTable('technical_specs', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Use Cases Table
export const useCases = mysqlTable('use_cases', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  icon: varchar('icon', { length: 100 }),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Health Tool Results Table
export const healthToolResults = mysqlTable('health_tool_results', {
  id: int('id').primaryKey().autoincrement(),
  toolType: varchar('tool_type', { length: 50 }).notNull(),
  userInputs: json('user_inputs'),
  results: json('results'),
  recommendations: json('recommendations'),
  sessionId: varchar('session_id', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  toolTypeIdx: index('tool_type_idx').on(table.toolType),
  sessionIdx: index('session_idx').on(table.sessionId),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
}));

// Demo Requests Table
export const demoRequests = mysqlTable('demo_requests', {
  id: int('id').primaryKey().autoincrement(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  organization: varchar('organization', { length: 255 }).notNull(),
  title: varchar('title', { length: 100 }).notNull(),
  organizationType: varchar('organization_type', { length: 50 }).notNull(),
  country: varchar('country', { length: 100 }).notNull(),
  interests: json('interests').$type<string[]>(),
  message: text('message'),
  demoType: varchar('demo_type', { length: 50 }).notNull(),
  preferredDate: timestamp('preferred_date'),
  attendeeCount: varchar('attendee_count', { length: 20 }),
  status: varchar('status', { length: 50 }).default('pending'),
  scheduledAt: timestamp('scheduled_at'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  statusIdx: index('status_idx').on(table.status),
  demoTypeIdx: index('demo_type_idx').on(table.demoType),
}));

// Newsletter Subscribers Table
export const newsletterSubscribers = mysqlTable('newsletter_subscribers', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  isActive: boolean('is_active').default(true),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
  unsubscribedAt: timestamp('unsubscribed_at'),
  source: varchar('source', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Partners Table
export const partners = mysqlTable('partners', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  logoUrl: varchar('logo_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  isActive: boolean('is_active').default(true),
  orderIndex: int('order_index').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  categoryIdx: index('category_idx').on(table.category),
  activeIdx: index('active_idx').on(table.isActive),
  orderIdx: index('order_idx').on(table.orderIndex),
}));

// Impact Statistics Table
export const impactStatistics = mysqlTable('impact_statistics', {
  id: int('id').primaryKey().autoincrement(),
  number: varchar('number', { length: 50 }).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  description: text('description'),
  orderIndex: int('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  orderIdx: index('order_idx').on(table.orderIndex),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Page Content Table
export const pageContent = mysqlTable('page_content', {
  id: int('id').primaryKey().autoincrement(),
  page: varchar('page', { length: 100 }).notNull(),
  section: varchar('section', { length: 100 }).notNull(),
  content: json('content'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  pageIdx: index('page_idx').on(table.page),
  sectionIdx: index('section_idx').on(table.section),
  activeIdx: index('active_idx').on(table.isActive),
}));

// Page Views Table
export const pageViews = mysqlTable('page_views', {
  id: int('id').primaryKey().autoincrement(),
  page: varchar('page', { length: 255 }).notNull(),
  sessionId: varchar('session_id', { length: 255 }),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  viewedAt: timestamp('viewed_at').defaultNow(),
}, (table) => ({
  pageIdx: index('page_idx').on(table.page),
  sessionIdx: index('session_idx').on(table.sessionId),
  viewedAtIdx: index('viewed_at_idx').on(table.viewedAt),
}));

// Form Submissions Table
export const formSubmissions = mysqlTable('form_submissions', {
  id: int('id').primaryKey().autoincrement(),
  formType: varchar('form_type', { length: 50 }).notNull(),
  data: json('data'),
  submittedAt: timestamp('submitted_at').defaultNow(),
}, (table) => ({
  formTypeIdx: index('form_type_idx').on(table.formType),
  submittedAtIdx: index('submitted_at_idx').on(table.submittedAt),
}));

// Analytics Table
export const analytics = mysqlTable('analytics', {
  id: int('id').primaryKey().autoincrement(),
  pageUrl: varchar('page_url', { length: 500 }).notNull(),
  userAgent: text('user_agent'),
  ipAddress: varchar('ip_address', { length: 45 }),
  country: varchar('country', { length: 100 }),
  city: varchar('city', { length: 100 }),
  referrer: varchar('referrer', { length: 500 }),
  sessionId: varchar('session_id', { length: 255 }),
  eventType: varchar('event_type', { length: 50 }),
  eventData: json('event_data'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  pageUrlIdx: index('page_url_idx').on(table.pageUrl),
  eventTypeIdx: index('event_type_idx').on(table.eventType),
  sessionIdx: index('session_idx').on(table.sessionId),
  createdAtIdx: index('created_at_idx').on(table.createdAt),
}));

// File Uploads Table
export const fileUploads = mysqlTable('file_uploads', {
  id: int('id').primaryKey().autoincrement(),
  filename: varchar('filename', { length: 255 }).notNull(),
  originalFilename: varchar('original_filename', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 500 }).notNull(),
  fileSize: int('file_size').notNull(),
  mimeType: varchar('mime_type', { length: 100 }).notNull(),
  uploadedBy: int('uploaded_by').references(() => users.id),
  relatedTable: varchar('related_table', { length: 50 }),
  relatedId: int('related_id'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  uploadedByIdx: index('uploaded_by_idx').on(table.uploadedBy),
  relatedIdx: index('related_idx').on(table.relatedTable, table.relatedId),
}));

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogComments: many(blogComments),
  jobApplications: many(jobApplications),
  contactInquiries: many(contactInquiries),
  supportTickets: many(supportTickets),
  fileUploads: many(fileUploads),
}));

export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogAuthorsRelations = relations(blogAuthors, ({ many }) => ({
  posts: many(blogPosts),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(blogAuthors, {
    fields: [blogPosts.authorId],
    references: [blogAuthors.id],
  }),
  category: one(blogCategories, {
    fields: [blogPosts.categoryId],
    references: [blogCategories.id],
  }),
  comments: many(blogComments),
}));

export const blogCommentsRelations = relations(blogComments, ({ one, many }) => ({
  post: one(blogPosts, {
    fields: [blogComments.postId],
    references: [blogPosts.id],
  }),
  user: one(users, {
    fields: [blogComments.userId],
    references: [users.id],
  }),
  parent: one(blogComments, {
    fields: [blogComments.parentId],
    references: [blogComments.id],
  }),
  replies: many(blogComments),
}));

export const departmentsRelations = relations(departments, ({ many }) => ({
  jobs: many(jobOpenings),
}));

export const jobOpeningsRelations = relations(jobOpenings, ({ one, many }) => ({
  department: one(departments, {
    fields: [jobOpenings.departmentId],
    references: [departments.id],
  }),
  applications: many(jobApplications),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobOpenings, {
    fields: [jobApplications.jobId],
    references: [jobOpenings.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one }) => ({
  assignedTo: one(users, {
    fields: [supportTickets.assignedTo],
    references: [users.id],
  }),
}));

// Demo Configuration Tables

// Demo Interests Table
export const demoInterests = mysqlTable('demo_interests', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).default('general'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  nameIdx: index('name_idx').on(table.name),
  categoryIdx: index('category_idx').on(table.category),
  activeIdx: index('active_idx').on(table.isActive),
  sortOrderIdx: index('sort_order_idx').on(table.sortOrder),
}));

// Demo Types Table
export const demoTypes = mysqlTable('demo_types', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  duration: varchar('duration', { length: 100 }).notNull(),
  description: text('description'),
  maxAttendees: int('max_attendees'),
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  nameIdx: index('name_idx').on(table.name),
  activeIdx: index('active_idx').on(table.isActive),
  sortOrderIdx: index('sort_order_idx').on(table.sortOrder),
}));

// Calendar Availability Table
export const calendarAvailability = mysqlTable('calendar_availability', {
  id: int('id').primaryKey().autoincrement(),
  date: varchar('date', { length: 10 }).notNull(), // YYYY-MM-DD format
  isAvailable: boolean('is_available').default(true),
  maxBookings: int('max_bookings').default(5),
  currentBookings: int('current_bookings').default(0),
  reason: text('reason'), // Reason for unavailability or special notes
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  dateIdx: index('date_idx').on(table.date),
  availableIdx: index('available_idx').on(table.isAvailable),
  maxBookingsIdx: index('max_bookings_idx').on(table.maxBookings),
}));

// Demo Videos Table
export const demoVideos = mysqlTable('demo_videos', {
  id: int('id').primaryKey().autoincrement(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  videoUrl: varchar('video_url', { length: 500 }).notNull(),
  thumbnailUrl: varchar('thumbnail_url', { length: 500 }),
  duration: varchar('duration', { length: 20 }), // e.g., "15:30"
  category: varchar('category', { length: 100 }).default('demo'),
  placement: varchar('placement', { length: 100 }).default('general'), // e.g., 'homepage-hero', 'about-section', 'clinic-hero'
  isActive: boolean('is_active').default(true),
  sortOrder: int('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
  titleIdx: index('title_idx').on(table.title),
  categoryIdx: index('category_idx').on(table.category),
  placementIdx: index('placement_idx').on(table.placement),
  activeIdx: index('active_idx').on(table.isActive),
  sortOrderIdx: index('sort_order_idx').on(table.sortOrder),
}));

// Demo Configuration Relations
export const demoInterestsRelations = relations(demoInterests, ({ many }) => ({
  // Can be referenced by demo requests
}));

export const demoTypesRelations = relations(demoTypes, ({ many }) => ({
  // Can be referenced by demo requests
}));

export const calendarAvailabilityRelations = relations(calendarAvailability, ({ many }) => ({
  // Can be referenced by demo requests
}));

export const demoVideosRelations = relations(demoVideos, ({ many }) => ({
  // Can be referenced by demo requests
}));
