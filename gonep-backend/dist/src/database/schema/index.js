"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoVideosRelations = exports.calendarAvailabilityRelations = exports.demoTypesRelations = exports.demoInterestsRelations = exports.demoVideos = exports.calendarAvailability = exports.demoTypes = exports.demoInterests = exports.supportTicketsRelations = exports.jobApplicationsRelations = exports.jobOpeningsRelations = exports.departmentsRelations = exports.blogCommentsRelations = exports.blogPostsRelations = exports.blogAuthorsRelations = exports.blogCategoriesRelations = exports.usersRelations = exports.fileUploads = exports.analytics = exports.formSubmissions = exports.pageViews = exports.pageContent = exports.impactStatistics = exports.partners = exports.newsletterSubscribers = exports.demoRequests = exports.healthToolResults = exports.useCases = exports.technicalSpecs = exports.productFeatures = exports.supportTickets = exports.supportResources = exports.faqs = exports.pressCoverage = exports.mediaResources = exports.contactMethods = exports.contactInquiries = exports.teamValues = exports.teamMembers = exports.jobApplications = exports.jobOpenings = exports.departments = exports.blogComments = exports.blogPosts = exports.blogAuthors = exports.blogCategories = exports.users = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.users = (0, mysql_core_1.mysqlTable)('users', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    passwordHash: (0, mysql_core_1.varchar)('password_hash', { length: 255 }).notNull(),
    firstName: (0, mysql_core_1.varchar)('first_name', { length: 100 }).notNull(),
    lastName: (0, mysql_core_1.varchar)('last_name', { length: 100 }).notNull(),
    phone: (0, mysql_core_1.varchar)('phone', { length: 50 }),
    organization: (0, mysql_core_1.varchar)('organization', { length: 255 }),
    title: (0, mysql_core_1.varchar)('title', { length: 100 }),
    organizationType: (0, mysql_core_1.varchar)('organization_type', { length: 50 }),
    country: (0, mysql_core_1.varchar)('country', { length: 100 }),
    role: (0, mysql_core_1.varchar)('role', { length: 20 }).default('user'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    emailVerified: (0, mysql_core_1.boolean)('email_verified').default(false),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    roleIdx: (0, mysql_core_1.index)('role_idx').on(table.role),
}));
exports.blogCategories = (0, mysql_core_1.mysqlTable)('blog_categories', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    slug: (0, mysql_core_1.varchar)('slug', { length: 100 }).notNull().unique(),
    description: (0, mysql_core_1.text)('description'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    slugIdx: (0, mysql_core_1.index)('slug_idx').on(table.slug),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.blogAuthors = (0, mysql_core_1.mysqlTable)('blog_authors', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    bio: (0, mysql_core_1.text)('bio'),
    image: (0, mysql_core_1.varchar)('image', { length: 500 }),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }),
    role: (0, mysql_core_1.varchar)('role', { length: 100 }),
    department: (0, mysql_core_1.varchar)('department', { length: 100 }),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    nameIdx: (0, mysql_core_1.index)('name_idx').on(table.name),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.blogPosts = (0, mysql_core_1.mysqlTable)('blog_posts', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    slug: (0, mysql_core_1.varchar)('slug', { length: 255 }).notNull().unique(),
    excerpt: (0, mysql_core_1.text)('excerpt'),
    content: (0, mysql_core_1.text)('content').notNull(),
    image: (0, mysql_core_1.varchar)('image', { length: 500 }),
    authorId: (0, mysql_core_1.int)('author_id').references(() => exports.blogAuthors.id),
    categoryId: (0, mysql_core_1.int)('category_id').references(() => exports.blogCategories.id),
    featured: (0, mysql_core_1.boolean)('featured').default(false),
    published: (0, mysql_core_1.boolean)('published').default(false),
    publishedAt: (0, mysql_core_1.timestamp)('published_at'),
    readTime: (0, mysql_core_1.varchar)('read_time', { length: 20 }),
    views: (0, mysql_core_1.int)('views').default(0),
    commentsCount: (0, mysql_core_1.int)('comments_count').default(0),
    tags: (0, mysql_core_1.json)('tags').$type(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    slugIdx: (0, mysql_core_1.index)('slug_idx').on(table.slug),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.categoryId),
    authorIdx: (0, mysql_core_1.index)('author_idx').on(table.authorId),
    featuredIdx: (0, mysql_core_1.index)('featured_idx').on(table.featured),
    publishedIdx: (0, mysql_core_1.index)('published_idx').on(table.published),
    publishedAtIdx: (0, mysql_core_1.index)('published_at_idx').on(table.publishedAt),
}));
exports.blogComments = (0, mysql_core_1.mysqlTable)('blog_comments', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    postId: (0, mysql_core_1.int)('post_id').references(() => exports.blogPosts.id, { onDelete: 'cascade' }),
    userId: (0, mysql_core_1.int)('user_id').references(() => exports.users.id),
    authorName: (0, mysql_core_1.varchar)('author_name', { length: 255 }).notNull(),
    authorEmail: (0, mysql_core_1.varchar)('author_email', { length: 255 }).notNull(),
    content: (0, mysql_core_1.text)('content').notNull(),
    isApproved: (0, mysql_core_1.boolean)('is_approved').default(false),
    parentId: (0, mysql_core_1.int)('parent_id'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    postIdx: (0, mysql_core_1.index)('post_idx').on(table.postId),
    userIdx: (0, mysql_core_1.index)('user_idx').on(table.userId),
    parentIdx: (0, mysql_core_1.index)('parent_idx').on(table.parentId),
}));
exports.departments = (0, mysql_core_1.mysqlTable)('departments', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 100 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    jobCount: (0, mysql_core_1.int)('job_count').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    nameIdx: (0, mysql_core_1.index)('name_idx').on(table.name),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.jobOpenings = (0, mysql_core_1.mysqlTable)('job_openings', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    slug: (0, mysql_core_1.varchar)('slug', { length: 255 }).notNull().unique(),
    departmentId: (0, mysql_core_1.int)('department_id').references(() => exports.departments.id),
    location: (0, mysql_core_1.varchar)('location', { length: 255 }).notNull(),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).notNull(),
    level: (0, mysql_core_1.varchar)('level', { length: 50 }).notNull(),
    description: (0, mysql_core_1.text)('description').notNull(),
    requirements: (0, mysql_core_1.json)('requirements').$type(),
    responsibilities: (0, mysql_core_1.json)('responsibilities').$type(),
    benefits: (0, mysql_core_1.json)('benefits').$type(),
    niceToHave: (0, mysql_core_1.json)('nice_to_have').$type(),
    salaryRange: (0, mysql_core_1.varchar)('salary_range', { length: 100 }),
    experience: (0, mysql_core_1.varchar)('experience', { length: 100 }),
    education: (0, mysql_core_1.text)('education'),
    teamInfo: (0, mysql_core_1.text)('team_info'),
    growthOpportunities: (0, mysql_core_1.text)('growth_opportunities'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    isFeatured: (0, mysql_core_1.boolean)('is_featured').default(false),
    applicationDeadline: (0, mysql_core_1.timestamp)('application_deadline'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    slugIdx: (0, mysql_core_1.index)('slug_idx').on(table.slug),
    departmentIdx: (0, mysql_core_1.index)('department_idx').on(table.departmentId),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
    featuredIdx: (0, mysql_core_1.index)('featured_idx').on(table.isFeatured),
}));
exports.jobApplications = (0, mysql_core_1.mysqlTable)('job_applications', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    jobId: (0, mysql_core_1.int)('job_id').references(() => exports.jobOpenings.id),
    firstName: (0, mysql_core_1.varchar)('first_name', { length: 100 }).notNull(),
    lastName: (0, mysql_core_1.varchar)('last_name', { length: 100 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    phone: (0, mysql_core_1.varchar)('phone', { length: 50 }),
    resumeUrl: (0, mysql_core_1.varchar)('resume_url', { length: 500 }),
    coverLetter: (0, mysql_core_1.text)('cover_letter'),
    experienceYears: (0, mysql_core_1.int)('experience_years'),
    currentCompany: (0, mysql_core_1.varchar)('current_company', { length: 255 }),
    currentPosition: (0, mysql_core_1.varchar)('current_position', { length: 255 }),
    expectedSalary: (0, mysql_core_1.varchar)('expected_salary', { length: 100 }),
    status: (0, mysql_core_1.varchar)('status', { length: 50 }).default('pending'),
    notes: (0, mysql_core_1.text)('notes'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    jobIdx: (0, mysql_core_1.index)('job_idx').on(table.jobId),
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    statusIdx: (0, mysql_core_1.index)('status_idx').on(table.status),
}));
exports.teamMembers = (0, mysql_core_1.mysqlTable)('team_members', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    role: (0, mysql_core_1.varchar)('role', { length: 255 }).notNull(),
    bio: (0, mysql_core_1.text)('bio'),
    image: (0, mysql_core_1.varchar)('image', { length: 500 }),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }),
    phone: (0, mysql_core_1.varchar)('phone', { length: 50 }),
    department: (0, mysql_core_1.varchar)('department', { length: 100 }),
    location: (0, mysql_core_1.varchar)('location', { length: 255 }),
    expertise: (0, mysql_core_1.json)('expertise').$type(),
    yearsExperience: (0, mysql_core_1.int)('years_experience'),
    education: (0, mysql_core_1.text)('education'),
    certifications: (0, mysql_core_1.json)('certifications').$type(),
    achievements: (0, mysql_core_1.json)('achievements').$type(),
    isLeadership: (0, mysql_core_1.boolean)('is_leadership').default(false),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    linkedinUrl: (0, mysql_core_1.varchar)('linkedin_url', { length: 500 }),
    twitterUrl: (0, mysql_core_1.varchar)('twitter_url', { length: 500 }),
    facebookUrl: (0, mysql_core_1.varchar)('facebook_url', { length: 500 }),
    instagramUrl: (0, mysql_core_1.varchar)('instagram_url', { length: 500 }),
    whatsappUrl: (0, mysql_core_1.varchar)('whatsapp_url', { length: 500 }),
    portfolioUrl: (0, mysql_core_1.varchar)('portfolio_url', { length: 500 }),
    githubUrl: (0, mysql_core_1.varchar)('github_url', { length: 500 }),
    youtubeUrl: (0, mysql_core_1.varchar)('youtube_url', { length: 500 }),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    departmentIdx: (0, mysql_core_1.index)('department_idx').on(table.department),
    leadershipIdx: (0, mysql_core_1.index)('leadership_idx').on(table.isLeadership),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
}));
exports.teamValues = (0, mysql_core_1.mysqlTable)('team_values', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    icon: (0, mysql_core_1.varchar)('icon', { length: 100 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.contactInquiries = (0, mysql_core_1.mysqlTable)('contact_inquiries', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    category: (0, mysql_core_1.varchar)('category', { length: 50 }).notNull(),
    organization: (0, mysql_core_1.varchar)('organization', { length: 255 }),
    message: (0, mysql_core_1.text)('message').notNull(),
    attachments: (0, mysql_core_1.json)('attachments').$type(),
    status: (0, mysql_core_1.varchar)('status', { length: 50 }).default('new'),
    assignedTo: (0, mysql_core_1.int)('assigned_to').references(() => exports.users.id),
    notes: (0, mysql_core_1.text)('notes'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    statusIdx: (0, mysql_core_1.index)('status_idx').on(table.status),
}));
exports.contactMethods = (0, mysql_core_1.mysqlTable)('contact_methods', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).notNull(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    contact: (0, mysql_core_1.varchar)('contact', { length: 255 }).notNull(),
    hours: (0, mysql_core_1.varchar)('hours', { length: 100 }),
    color: (0, mysql_core_1.varchar)('color', { length: 20 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    typeIdx: (0, mysql_core_1.index)('type_idx').on(table.type),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.mediaResources = (0, mysql_core_1.mysqlTable)('media_resources', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).notNull(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    date: (0, mysql_core_1.timestamp)('date'),
    fileSize: (0, mysql_core_1.varchar)('file_size', { length: 50 }),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }),
    featured: (0, mysql_core_1.boolean)('featured').default(false),
    downloadUrl: (0, mysql_core_1.varchar)('download_url', { length: 500 }),
    thumbnail: (0, mysql_core_1.varchar)('thumbnail', { length: 500 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    typeIdx: (0, mysql_core_1.index)('type_idx').on(table.type),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    featuredIdx: (0, mysql_core_1.index)('featured_idx').on(table.featured),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
}));
exports.pressCoverage = (0, mysql_core_1.mysqlTable)('press_coverage', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    publication: (0, mysql_core_1.varchar)('publication', { length: 255 }).notNull(),
    date: (0, mysql_core_1.timestamp)('date'),
    excerpt: (0, mysql_core_1.text)('excerpt'),
    link: (0, mysql_core_1.varchar)('link', { length: 500 }),
    image: (0, mysql_core_1.varchar)('image', { length: 500 }),
    featured: (0, mysql_core_1.boolean)('featured').default(false),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    publicationIdx: (0, mysql_core_1.index)('publication_idx').on(table.publication),
    featuredIdx: (0, mysql_core_1.index)('featured_idx').on(table.featured),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
}));
exports.faqs = (0, mysql_core_1.mysqlTable)('faqs', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }).notNull(),
    question: (0, mysql_core_1.text)('question').notNull(),
    answer: (0, mysql_core_1.text)('answer').notNull(),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.supportResources = (0, mysql_core_1.mysqlTable)('support_resources', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    type: (0, mysql_core_1.varchar)('type', { length: 50 }).notNull(),
    downloadUrl: (0, mysql_core_1.varchar)('download_url', { length: 500 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    typeIdx: (0, mysql_core_1.index)('type_idx').on(table.type),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.supportTickets = (0, mysql_core_1.mysqlTable)('support_tickets', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }).notNull(),
    deviceSerial: (0, mysql_core_1.varchar)('device_serial', { length: 100 }),
    description: (0, mysql_core_1.text)('description').notNull(),
    status: (0, mysql_core_1.varchar)('status', { length: 50 }).default('open'),
    priority: (0, mysql_core_1.varchar)('priority', { length: 20 }).default('medium'),
    assignedTo: (0, mysql_core_1.int)('assigned_to').references(() => exports.users.id),
    notes: (0, mysql_core_1.text)('notes'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    statusIdx: (0, mysql_core_1.index)('status_idx').on(table.status),
    priorityIdx: (0, mysql_core_1.index)('priority_idx').on(table.priority),
}));
exports.productFeatures = (0, mysql_core_1.mysqlTable)('product_features', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    icon: (0, mysql_core_1.varchar)('icon', { length: 100 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.technicalSpecs = (0, mysql_core_1.mysqlTable)('technical_specs', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    icon: (0, mysql_core_1.varchar)('icon', { length: 100 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.useCases = (0, mysql_core_1.mysqlTable)('use_cases', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    icon: (0, mysql_core_1.varchar)('icon', { length: 100 }),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.healthToolResults = (0, mysql_core_1.mysqlTable)('health_tool_results', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    toolType: (0, mysql_core_1.varchar)('tool_type', { length: 50 }).notNull(),
    userInputs: (0, mysql_core_1.json)('user_inputs'),
    results: (0, mysql_core_1.json)('results'),
    recommendations: (0, mysql_core_1.json)('recommendations'),
    sessionId: (0, mysql_core_1.varchar)('session_id', { length: 255 }),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
}, (table) => ({
    toolTypeIdx: (0, mysql_core_1.index)('tool_type_idx').on(table.toolType),
    sessionIdx: (0, mysql_core_1.index)('session_idx').on(table.sessionId),
    createdAtIdx: (0, mysql_core_1.index)('created_at_idx').on(table.createdAt),
}));
exports.demoRequests = (0, mysql_core_1.mysqlTable)('demo_requests', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    firstName: (0, mysql_core_1.varchar)('first_name', { length: 100 }).notNull(),
    lastName: (0, mysql_core_1.varchar)('last_name', { length: 100 }).notNull(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull(),
    phone: (0, mysql_core_1.varchar)('phone', { length: 50 }).notNull(),
    organization: (0, mysql_core_1.varchar)('organization', { length: 255 }).notNull(),
    title: (0, mysql_core_1.varchar)('title', { length: 100 }).notNull(),
    organizationType: (0, mysql_core_1.varchar)('organization_type', { length: 50 }).notNull(),
    country: (0, mysql_core_1.varchar)('country', { length: 100 }).notNull(),
    interests: (0, mysql_core_1.json)('interests').$type(),
    message: (0, mysql_core_1.text)('message'),
    demoType: (0, mysql_core_1.varchar)('demo_type', { length: 50 }).notNull(),
    preferredDate: (0, mysql_core_1.timestamp)('preferred_date'),
    attendeeCount: (0, mysql_core_1.varchar)('attendee_count', { length: 20 }),
    status: (0, mysql_core_1.varchar)('status', { length: 50 }).default('pending'),
    scheduledAt: (0, mysql_core_1.timestamp)('scheduled_at'),
    notes: (0, mysql_core_1.text)('notes'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    statusIdx: (0, mysql_core_1.index)('status_idx').on(table.status),
    demoTypeIdx: (0, mysql_core_1.index)('demo_type_idx').on(table.demoType),
}));
exports.newsletterSubscribers = (0, mysql_core_1.mysqlTable)('newsletter_subscribers', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    email: (0, mysql_core_1.varchar)('email', { length: 255 }).notNull().unique(),
    firstName: (0, mysql_core_1.varchar)('first_name', { length: 100 }),
    lastName: (0, mysql_core_1.varchar)('last_name', { length: 100 }),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    subscribedAt: (0, mysql_core_1.timestamp)('subscribed_at').defaultNow(),
    unsubscribedAt: (0, mysql_core_1.timestamp)('unsubscribed_at'),
    source: (0, mysql_core_1.varchar)('source', { length: 100 }),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
}, (table) => ({
    emailIdx: (0, mysql_core_1.index)('email_idx').on(table.email),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.partners = (0, mysql_core_1.mysqlTable)('partners', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    logoUrl: (0, mysql_core_1.varchar)('logo_url', { length: 500 }),
    websiteUrl: (0, mysql_core_1.varchar)('website_url', { length: 500 }),
    description: (0, mysql_core_1.text)('description'),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
}));
exports.impactStatistics = (0, mysql_core_1.mysqlTable)('impact_statistics', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    number: (0, mysql_core_1.varchar)('number', { length: 50 }).notNull(),
    label: (0, mysql_core_1.varchar)('label', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    orderIndex: (0, mysql_core_1.int)('order_index').default(0),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    orderIdx: (0, mysql_core_1.index)('order_idx').on(table.orderIndex),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.pageContent = (0, mysql_core_1.mysqlTable)('page_content', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    page: (0, mysql_core_1.varchar)('page', { length: 100 }).notNull(),
    section: (0, mysql_core_1.varchar)('section', { length: 100 }).notNull(),
    content: (0, mysql_core_1.json)('content'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    pageIdx: (0, mysql_core_1.index)('page_idx').on(table.page),
    sectionIdx: (0, mysql_core_1.index)('section_idx').on(table.section),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
}));
exports.pageViews = (0, mysql_core_1.mysqlTable)('page_views', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    page: (0, mysql_core_1.varchar)('page', { length: 255 }).notNull(),
    sessionId: (0, mysql_core_1.varchar)('session_id', { length: 255 }),
    userAgent: (0, mysql_core_1.text)('user_agent'),
    ipAddress: (0, mysql_core_1.varchar)('ip_address', { length: 45 }),
    viewedAt: (0, mysql_core_1.timestamp)('viewed_at').defaultNow(),
}, (table) => ({
    pageIdx: (0, mysql_core_1.index)('page_idx').on(table.page),
    sessionIdx: (0, mysql_core_1.index)('session_idx').on(table.sessionId),
    viewedAtIdx: (0, mysql_core_1.index)('viewed_at_idx').on(table.viewedAt),
}));
exports.formSubmissions = (0, mysql_core_1.mysqlTable)('form_submissions', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    formType: (0, mysql_core_1.varchar)('form_type', { length: 50 }).notNull(),
    data: (0, mysql_core_1.json)('data'),
    submittedAt: (0, mysql_core_1.timestamp)('submitted_at').defaultNow(),
}, (table) => ({
    formTypeIdx: (0, mysql_core_1.index)('form_type_idx').on(table.formType),
    submittedAtIdx: (0, mysql_core_1.index)('submitted_at_idx').on(table.submittedAt),
}));
exports.analytics = (0, mysql_core_1.mysqlTable)('analytics', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    pageUrl: (0, mysql_core_1.varchar)('page_url', { length: 500 }).notNull(),
    userAgent: (0, mysql_core_1.text)('user_agent'),
    ipAddress: (0, mysql_core_1.varchar)('ip_address', { length: 45 }),
    country: (0, mysql_core_1.varchar)('country', { length: 100 }),
    city: (0, mysql_core_1.varchar)('city', { length: 100 }),
    referrer: (0, mysql_core_1.varchar)('referrer', { length: 500 }),
    sessionId: (0, mysql_core_1.varchar)('session_id', { length: 255 }),
    eventType: (0, mysql_core_1.varchar)('event_type', { length: 50 }),
    eventData: (0, mysql_core_1.json)('event_data'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
}, (table) => ({
    pageUrlIdx: (0, mysql_core_1.index)('page_url_idx').on(table.pageUrl),
    eventTypeIdx: (0, mysql_core_1.index)('event_type_idx').on(table.eventType),
    sessionIdx: (0, mysql_core_1.index)('session_idx').on(table.sessionId),
    createdAtIdx: (0, mysql_core_1.index)('created_at_idx').on(table.createdAt),
}));
exports.fileUploads = (0, mysql_core_1.mysqlTable)('file_uploads', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    filename: (0, mysql_core_1.varchar)('filename', { length: 255 }).notNull(),
    originalFilename: (0, mysql_core_1.varchar)('original_filename', { length: 255 }).notNull(),
    filePath: (0, mysql_core_1.varchar)('file_path', { length: 500 }).notNull(),
    fileSize: (0, mysql_core_1.int)('file_size').notNull(),
    mimeType: (0, mysql_core_1.varchar)('mime_type', { length: 100 }).notNull(),
    uploadedBy: (0, mysql_core_1.int)('uploaded_by').references(() => exports.users.id),
    relatedTable: (0, mysql_core_1.varchar)('related_table', { length: 50 }),
    relatedId: (0, mysql_core_1.int)('related_id'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
}, (table) => ({
    uploadedByIdx: (0, mysql_core_1.index)('uploaded_by_idx').on(table.uploadedBy),
    relatedIdx: (0, mysql_core_1.index)('related_idx').on(table.relatedTable, table.relatedId),
}));
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    blogComments: many(exports.blogComments),
    jobApplications: many(exports.jobApplications),
    contactInquiries: many(exports.contactInquiries),
    supportTickets: many(exports.supportTickets),
    fileUploads: many(exports.fileUploads),
}));
exports.blogCategoriesRelations = (0, drizzle_orm_1.relations)(exports.blogCategories, ({ many }) => ({
    posts: many(exports.blogPosts),
}));
exports.blogAuthorsRelations = (0, drizzle_orm_1.relations)(exports.blogAuthors, ({ many }) => ({
    posts: many(exports.blogPosts),
}));
exports.blogPostsRelations = (0, drizzle_orm_1.relations)(exports.blogPosts, ({ one, many }) => ({
    author: one(exports.blogAuthors, {
        fields: [exports.blogPosts.authorId],
        references: [exports.blogAuthors.id],
    }),
    category: one(exports.blogCategories, {
        fields: [exports.blogPosts.categoryId],
        references: [exports.blogCategories.id],
    }),
    comments: many(exports.blogComments),
}));
exports.blogCommentsRelations = (0, drizzle_orm_1.relations)(exports.blogComments, ({ one, many }) => ({
    post: one(exports.blogPosts, {
        fields: [exports.blogComments.postId],
        references: [exports.blogPosts.id],
    }),
    user: one(exports.users, {
        fields: [exports.blogComments.userId],
        references: [exports.users.id],
    }),
    parent: one(exports.blogComments, {
        fields: [exports.blogComments.parentId],
        references: [exports.blogComments.id],
    }),
    replies: many(exports.blogComments),
}));
exports.departmentsRelations = (0, drizzle_orm_1.relations)(exports.departments, ({ many }) => ({
    jobs: many(exports.jobOpenings),
}));
exports.jobOpeningsRelations = (0, drizzle_orm_1.relations)(exports.jobOpenings, ({ one, many }) => ({
    department: one(exports.departments, {
        fields: [exports.jobOpenings.departmentId],
        references: [exports.departments.id],
    }),
    applications: many(exports.jobApplications),
}));
exports.jobApplicationsRelations = (0, drizzle_orm_1.relations)(exports.jobApplications, ({ one }) => ({
    job: one(exports.jobOpenings, {
        fields: [exports.jobApplications.jobId],
        references: [exports.jobOpenings.id],
    }),
}));
exports.supportTicketsRelations = (0, drizzle_orm_1.relations)(exports.supportTickets, ({ one }) => ({
    assignedTo: one(exports.users, {
        fields: [exports.supportTickets.assignedTo],
        references: [exports.users.id],
    }),
}));
exports.demoInterests = (0, mysql_core_1.mysqlTable)('demo_interests', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }).default('general'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    sortOrder: (0, mysql_core_1.int)('sort_order').default(0),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    nameIdx: (0, mysql_core_1.index)('name_idx').on(table.name),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
    sortOrderIdx: (0, mysql_core_1.index)('sort_order_idx').on(table.sortOrder),
}));
exports.demoTypes = (0, mysql_core_1.mysqlTable)('demo_types', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    name: (0, mysql_core_1.varchar)('name', { length: 255 }).notNull(),
    duration: (0, mysql_core_1.varchar)('duration', { length: 100 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    maxAttendees: (0, mysql_core_1.int)('max_attendees'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    sortOrder: (0, mysql_core_1.int)('sort_order').default(0),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    nameIdx: (0, mysql_core_1.index)('name_idx').on(table.name),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
    sortOrderIdx: (0, mysql_core_1.index)('sort_order_idx').on(table.sortOrder),
}));
exports.calendarAvailability = (0, mysql_core_1.mysqlTable)('calendar_availability', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    date: (0, mysql_core_1.varchar)('date', { length: 10 }).notNull(),
    isAvailable: (0, mysql_core_1.boolean)('is_available').default(true),
    maxBookings: (0, mysql_core_1.int)('max_bookings').default(5),
    currentBookings: (0, mysql_core_1.int)('current_bookings').default(0),
    reason: (0, mysql_core_1.text)('reason'),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    dateIdx: (0, mysql_core_1.index)('date_idx').on(table.date),
    availableIdx: (0, mysql_core_1.index)('available_idx').on(table.isAvailable),
    maxBookingsIdx: (0, mysql_core_1.index)('max_bookings_idx').on(table.maxBookings),
}));
exports.demoVideos = (0, mysql_core_1.mysqlTable)('demo_videos', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    title: (0, mysql_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, mysql_core_1.text)('description'),
    videoUrl: (0, mysql_core_1.varchar)('video_url', { length: 500 }).notNull(),
    thumbnailUrl: (0, mysql_core_1.varchar)('thumbnail_url', { length: 500 }),
    duration: (0, mysql_core_1.varchar)('duration', { length: 20 }),
    category: (0, mysql_core_1.varchar)('category', { length: 100 }).default('demo'),
    placement: (0, mysql_core_1.varchar)('placement', { length: 100 }).default('general'),
    isActive: (0, mysql_core_1.boolean)('is_active').default(true),
    sortOrder: (0, mysql_core_1.int)('sort_order').default(0),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, mysql_core_1.timestamp)('updated_at').defaultNow().onUpdateNow(),
}, (table) => ({
    titleIdx: (0, mysql_core_1.index)('title_idx').on(table.title),
    categoryIdx: (0, mysql_core_1.index)('category_idx').on(table.category),
    placementIdx: (0, mysql_core_1.index)('placement_idx').on(table.placement),
    activeIdx: (0, mysql_core_1.index)('active_idx').on(table.isActive),
    sortOrderIdx: (0, mysql_core_1.index)('sort_order_idx').on(table.sortOrder),
}));
exports.demoInterestsRelations = (0, drizzle_orm_1.relations)(exports.demoInterests, ({ many }) => ({}));
exports.demoTypesRelations = (0, drizzle_orm_1.relations)(exports.demoTypes, ({ many }) => ({}));
exports.calendarAvailabilityRelations = (0, drizzle_orm_1.relations)(exports.calendarAvailability, ({ many }) => ({}));
exports.demoVideosRelations = (0, drizzle_orm_1.relations)(exports.demoVideos, ({ many }) => ({}));
//# sourceMappingURL=index.js.map