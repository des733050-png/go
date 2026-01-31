-- =====================================================
-- GONEP COMPLETE DATABASE MIGRATION SCRIPT
-- =====================================================
-- This script creates all necessary tables for the GONEP application
-- Includes: Users, Blog System, Job System, Team Management, 
--          Demo System, Analytics, and more
-- =====================================================

-- Set proper character set and collation
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';


USE `gonephar_gonep`;

-- =====================================================
-- 1. USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `organization_type` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT 'user',
  `is_active` boolean DEFAULT true,
  `email_verified` boolean DEFAULT false,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_email_idx` (`email`),
  KEY `users_role_idx` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 2. BLOG CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `blog_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `post_count` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_categories_slug_unique` (`slug`),
  KEY `blog_categories_slug_idx` (`slug`),
  KEY `blog_categories_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 3. BLOG AUTHORS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `blog_authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `linkedin` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `expertise` json DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_authors_name_idx` (`name`),
  KEY `blog_authors_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 4. BLOG POSTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text NOT NULL,
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `featured` boolean DEFAULT false,
  `published` boolean DEFAULT false,
  `published_at` timestamp NULL DEFAULT NULL,
  `read_time` varchar(20) DEFAULT NULL,
  `views` int DEFAULT 0,
  `comments_count` int DEFAULT 0,
  `tags` json DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_description` text DEFAULT NULL,
  `seo_keywords` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `blog_posts_slug_unique` (`slug`),
  KEY `blog_posts_slug_idx` (`slug`),
  KEY `blog_posts_category_idx` (`category_id`),
  KEY `blog_posts_author_idx` (`author_id`),
  KEY `blog_posts_featured_idx` (`featured`),
  KEY `blog_posts_published_idx` (`published`),
  KEY `blog_posts_published_at_idx` (`published_at`),
  CONSTRAINT `blog_posts_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `blog_authors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `blog_posts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 5. BLOG COMMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `blog_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `author_name` varchar(255) NOT NULL,
  `author_email` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `is_approved` boolean DEFAULT false,
  `parent_id` int DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `blog_comments_post_idx` (`post_id`),
  KEY `blog_comments_user_idx` (`user_id`),
  KEY `blog_comments_parent_idx` (`parent_id`),
  CONSTRAINT `blog_comments_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `blog_comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 6. DEPARTMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `job_count` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `departments_name_idx` (`name`),
  KEY `departments_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 7. JOB OPENINGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `job_openings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `department_id` int DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `level` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `requirements` json DEFAULT NULL,
  `responsibilities` json DEFAULT NULL,
  `benefits` json DEFAULT NULL,
  `nice_to_have` json DEFAULT NULL,
  `salary_range` varchar(100) DEFAULT NULL,
  `experience` varchar(100) DEFAULT NULL,
  `education` text DEFAULT NULL,
  `team_info` text DEFAULT NULL,
  `growth_opportunities` text DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `is_featured` boolean DEFAULT false,
  `application_deadline` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `job_openings_slug_unique` (`slug`),
  KEY `job_openings_slug_idx` (`slug`),
  KEY `job_openings_department_idx` (`department_id`),
  KEY `job_openings_active_idx` (`is_active`),
  KEY `job_openings_featured_idx` (`is_featured`),
  CONSTRAINT `job_openings_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 8. JOB APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `job_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `resume_url` varchar(500) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `experience_years` int DEFAULT NULL,
  `current_company` varchar(255) DEFAULT NULL,
  `current_position` varchar(255) DEFAULT NULL,
  `expected_salary` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `job_applications_job_idx` (`job_id`),
  KEY `job_applications_email_idx` (`email`),
  KEY `job_applications_status_idx` (`status`),
  CONSTRAINT `job_applications_job_id_fkey` FOREIGN KEY (`job_id`) REFERENCES `job_openings` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 9. TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `team_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `expertise` json DEFAULT NULL,
  `years_experience` int DEFAULT NULL,
  `education` text DEFAULT NULL,
  `certifications` json DEFAULT NULL,
  `achievements` json DEFAULT NULL,
  `is_leadership` boolean DEFAULT false,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `linkedin_url` varchar(500) DEFAULT NULL,
  `twitter_url` varchar(500) DEFAULT NULL,
  `facebook_url` varchar(500) DEFAULT NULL,
  `instagram_url` varchar(500) DEFAULT NULL,
  `whatsapp_url` varchar(500) DEFAULT NULL,
  `portfolio_url` varchar(500) DEFAULT NULL,
  `github_url` varchar(500) DEFAULT NULL,
  `youtube_url` varchar(500) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `team_members_department_idx` (`department`),
  KEY `team_members_leadership_idx` (`is_leadership`),
  KEY `team_members_order_idx` (`order_index`),
  KEY `team_members_email_idx` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 10. TEAM VALUES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `team_values` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `team_values_order_idx` (`order_index`),
  KEY `team_values_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 11. CONTACT INQUIRIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `contact_inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `category` varchar(50) NOT NULL,
  `organization` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `attachments` json DEFAULT NULL,
  `status` varchar(50) DEFAULT 'new',
  `assigned_to` int DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `contact_inquiries_email_idx` (`email`),
  KEY `contact_inquiries_category_idx` (`category`),
  KEY `contact_inquiries_status_idx` (`status`),
  CONSTRAINT `contact_inquiries_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 12. CONTACT METHODS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `contact_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `contact` varchar(255) NOT NULL,
  `hours` varchar(100) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `contact_methods_type_idx` (`type`),
  KEY `contact_methods_order_idx` (`order_index`),
  KEY `contact_methods_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 13. MEDIA RESOURCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `media_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `file_size` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `featured` boolean DEFAULT false,
  `download_url` varchar(500) DEFAULT NULL,
  `thumbnail` varchar(500) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `media_resources_type_idx` (`type`),
  KEY `media_resources_category_idx` (`category`),
  KEY `media_resources_featured_idx` (`featured`),
  KEY `media_resources_order_idx` (`order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 14. PRESS COVERAGE TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `press_coverage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `publication` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `image` varchar(500) DEFAULT NULL,
  `featured` boolean DEFAULT false,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `press_coverage_publication_idx` (`publication`),
  KEY `press_coverage_featured_idx` (`featured`),
  KEY `press_coverage_order_idx` (`order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 15. FAQS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `faqs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(100) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `faqs_category_idx` (`category`),
  KEY `faqs_order_idx` (`order_index`),
  KEY `faqs_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 16. SUPPORT RESOURCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `support_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  `download_url` varchar(500) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `support_resources_type_idx` (`type`),
  KEY `support_resources_order_idx` (`order_index`),
  KEY `support_resources_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 17. SUPPORT TICKETS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `device_serial` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `status` varchar(50) DEFAULT 'open',
  `priority` varchar(20) DEFAULT 'medium',
  `assigned_to` int DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `support_tickets_email_idx` (`email`),
  KEY `support_tickets_category_idx` (`category`),
  KEY `support_tickets_status_idx` (`status`),
  KEY `support_tickets_priority_idx` (`priority`),
  CONSTRAINT `support_tickets_assigned_to_fkey` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 18. PRODUCT FEATURES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `product_features` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_features_order_idx` (`order_index`),
  KEY `product_features_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 19. TECHNICAL SPECIFICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `technical_specs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `technical_specs_order_idx` (`order_index`),
  KEY `technical_specs_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 20. USE CASES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `use_cases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `use_cases_order_idx` (`order_index`),
  KEY `use_cases_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 21. HEALTH TOOL RESULTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `health_tool_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tool_type` varchar(50) NOT NULL,
  `user_inputs` json DEFAULT NULL,
  `results` json DEFAULT NULL,
  `recommendations` json DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `health_tool_results_tool_type_idx` (`tool_type`),
  KEY `health_tool_results_session_idx` (`session_id`),
  KEY `health_tool_results_created_at_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 22. DEMO REQUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `demo_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `organization` varchar(255) NOT NULL,
  `title` varchar(100) NOT NULL,
  `organization_type` varchar(50) NOT NULL,
  `country` varchar(100) NOT NULL,
  `interests` json DEFAULT NULL,
  `message` text DEFAULT NULL,
  `demo_type` varchar(50) NOT NULL,
  `preferred_date` timestamp NULL DEFAULT NULL,
  `attendee_count` varchar(20) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `scheduled_at` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `demo_requests_email_idx` (`email`),
  KEY `demo_requests_status_idx` (`status`),
  KEY `demo_requests_demo_type_idx` (`demo_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 23. NEWSLETTER SUBSCRIBERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `newsletter_subscribers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `subscribed_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `newsletter_subscribers_email_unique` (`email`),
  KEY `newsletter_subscribers_email_idx` (`email`),
  KEY `newsletter_subscribers_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 24. PARTNERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `partners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `logo_url` varchar(500) DEFAULT NULL,
  `website_url` varchar(500) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `order_index` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `partners_category_idx` (`category`),
  KEY `partners_active_idx` (`is_active`),
  KEY `partners_order_idx` (`order_index`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 25. IMPACT STATISTICS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `impact_statistics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(50) NOT NULL,
  `label` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `order_index` int DEFAULT 0,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `impact_statistics_order_idx` (`order_index`),
  KEY `impact_statistics_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 26. PAGE CONTENT TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(100) NOT NULL,
  `section` varchar(100) NOT NULL,
  `content` json DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_content_page_idx` (`page`),
  KEY `page_content_section_idx` (`section`),
  KEY `page_content_active_idx` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 27. PAGE VIEWS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `page_views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page` varchar(255) NOT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `viewed_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_views_page_idx` (`page`),
  KEY `page_views_session_idx` (`session_id`),
  KEY `page_views_viewed_at_idx` (`viewed_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 28. FORM SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `form_submissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `form_type` varchar(50) NOT NULL,
  `data` json DEFAULT NULL,
  `submitted_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `form_submissions_form_type_idx` (`form_type`),
  KEY `form_submissions_submitted_at_idx` (`submitted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 29. ANALYTICS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `analytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `page_url` varchar(500) NOT NULL,
  `user_agent` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `referrer` varchar(500) DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  `event_type` varchar(50) DEFAULT NULL,
  `event_data` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `analytics_page_url_idx` (`page_url`),
  KEY `analytics_event_type_idx` (`event_type`),
  KEY `analytics_session_idx` (`session_id`),
  KEY `analytics_created_at_idx` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 30. FILE UPLOADS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `file_uploads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_size` int NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `uploaded_by` int DEFAULT NULL,
  `related_table` varchar(50) DEFAULT NULL,
  `related_id` int DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `file_uploads_uploaded_by_idx` (`uploaded_by`),
  KEY `file_uploads_related_idx` (`related_table`, `related_id`),
  CONSTRAINT `file_uploads_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 31. DEMO INTERESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `demo_interests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(100) DEFAULT 'general',
  `is_active` boolean DEFAULT true,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `demo_interests_name_idx` (`name`),
  KEY `demo_interests_category_idx` (`category`),
  KEY `demo_interests_active_idx` (`is_active`),
  KEY `demo_interests_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 32. DEMO TYPES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `demo_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `duration` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `max_attendees` int DEFAULT NULL,
  `is_active` boolean DEFAULT true,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `demo_types_name_idx` (`name`),
  KEY `demo_types_active_idx` (`is_active`),
  KEY `demo_types_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 33. CALENDAR AVAILABILITY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `calendar_availability` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `is_available` boolean DEFAULT true,
  `max_bookings` int DEFAULT 5,
  `current_bookings` int DEFAULT 0,
  `reason` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `calendar_availability_date_idx` (`date`),
  KEY `calendar_availability_available_idx` (`is_available`),
  KEY `calendar_availability_max_bookings_idx` (`max_bookings`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- 34. DEMO VIDEOS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS `demo_videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `video_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500) DEFAULT NULL,
  `duration` varchar(20) DEFAULT NULL,
  `category` varchar(100) DEFAULT 'demo',
  `placement` varchar(100) DEFAULT 'general',
  `is_active` boolean DEFAULT true,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `demo_videos_title_idx` (`title`),
  KEY `demo_videos_category_idx` (`category`),
  KEY `demo_videos_placement_idx` (`placement`),
  KEY `demo_videos_active_idx` (`is_active`),
  KEY `demo_videos_sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- MIGRATION COMPLETION
-- =====================================================
SELECT 'Migration completed successfully! All 34 tables have been created.' AS status;

-- Show all created tables
SHOW TABLES;

