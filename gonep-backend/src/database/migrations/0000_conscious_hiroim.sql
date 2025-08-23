CREATE TABLE `analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page_url` varchar(500) NOT NULL,
	`user_agent` text,
	`ip_address` varchar(45),
	`country` varchar(100),
	`city` varchar(100),
	`referrer` varchar(500),
	`session_id` varchar(255),
	`event_type` varchar(50),
	`event_data` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_authors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`bio` text,
	`image` varchar(500),
	`linkedin` varchar(500),
	`twitter` varchar(500),
	`email` varchar(255),
	`role` varchar(100),
	`department` varchar(100),
	`expertise` json,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_authors_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`post_count` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `blog_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`post_id` int,
	`user_id` int,
	`author_name` varchar(255) NOT NULL,
	`author_email` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`is_approved` boolean DEFAULT false,
	`parent_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`author_id` int,
	`category_id` int,
	`image` varchar(500),
	`featured` boolean DEFAULT false,
	`published` boolean DEFAULT false,
	`published_at` timestamp,
	`read_time` varchar(20),
	`views` int DEFAULT 0,
	`comments_count` int DEFAULT 0,
	`tags` json,
	`meta_title` varchar(255),
	`meta_description` text,
	`seo_keywords` json,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`category` varchar(50) NOT NULL,
	`organization` varchar(255),
	`message` text NOT NULL,
	`attachments` json,
	`status` varchar(50) DEFAULT 'new',
	`assigned_to` int,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_methods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`contact` varchar(255) NOT NULL,
	`hours` varchar(100),
	`color` varchar(20),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_methods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `demo_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`organization` varchar(255) NOT NULL,
	`title` varchar(100) NOT NULL,
	`organization_type` varchar(50) NOT NULL,
	`country` varchar(100) NOT NULL,
	`interests` json,
	`message` text,
	`demo_type` varchar(50) NOT NULL,
	`preferred_date` timestamp,
	`attendee_count` varchar(20),
	`status` varchar(50) DEFAULT 'pending',
	`scheduled_at` timestamp,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demo_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `departments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`job_count` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `departments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(100) NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `file_uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`filename` varchar(255) NOT NULL,
	`original_filename` varchar(255) NOT NULL,
	`file_path` varchar(500) NOT NULL,
	`file_size` int NOT NULL,
	`mime_type` varchar(100) NOT NULL,
	`uploaded_by` int,
	`related_table` varchar(50),
	`related_id` int,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `file_uploads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `form_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`form_type` varchar(50) NOT NULL,
	`data` json,
	`submitted_at` timestamp DEFAULT (now()),
	CONSTRAINT `form_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `health_tool_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tool_type` varchar(50) NOT NULL,
	`user_inputs` json,
	`results` json,
	`recommendations` json,
	`session_id` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `health_tool_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `impact_statistics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`number` varchar(50) NOT NULL,
	`label` varchar(255) NOT NULL,
	`description` text,
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `impact_statistics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`job_id` int,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`resume_url` varchar(500),
	`cover_letter` text,
	`experience_years` int,
	`current_company` varchar(255),
	`current_position` varchar(255),
	`expected_salary` varchar(100),
	`status` varchar(50) DEFAULT 'pending',
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_openings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`department_id` int,
	`location` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`level` varchar(50) NOT NULL,
	`description` text NOT NULL,
	`requirements` json,
	`responsibilities` json,
	`benefits` json,
	`salary_range` varchar(100),
	`is_active` boolean DEFAULT true,
	`is_featured` boolean DEFAULT false,
	`application_deadline` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `job_openings_id` PRIMARY KEY(`id`),
	CONSTRAINT `job_openings_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `media_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` varchar(50) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`date` timestamp,
	`file_size` varchar(50),
	`category` varchar(100),
	`featured` boolean DEFAULT false,
	`download_url` varchar(500),
	`thumbnail` varchar(500),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `media_resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`first_name` varchar(100),
	`last_name` varchar(100),
	`is_active` boolean DEFAULT true,
	`subscribed_at` timestamp DEFAULT (now()),
	`unsubscribed_at` timestamp,
	`source` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `page_content` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(100) NOT NULL,
	`section` varchar(100) NOT NULL,
	`content` json,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_content_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(255) NOT NULL,
	`session_id` varchar(255),
	`user_agent` text,
	`ip_address` varchar(45),
	`viewed_at` timestamp DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`logo_url` varchar(500),
	`website_url` varchar(500),
	`description` text,
	`category` varchar(100),
	`is_active` boolean DEFAULT true,
	`order_index` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `press_coverage` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`publication` varchar(255) NOT NULL,
	`date` timestamp,
	`excerpt` text,
	`link` varchar(500),
	`image` varchar(500),
	`featured` boolean DEFAULT false,
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `press_coverage_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_features` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_features_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `support_resources` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`type` varchar(50) NOT NULL,
	`download_url` varchar(500),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `support_resources_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `support_tickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`device_serial` varchar(100),
	`description` text NOT NULL,
	`status` varchar(50) DEFAULT 'open',
	`priority` varchar(20) DEFAULT 'medium',
	`assigned_to` int,
	`notes` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `support_tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_members` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`role` varchar(255) NOT NULL,
	`bio` text,
	`image` varchar(500),
	`linkedin_url` varchar(500),
	`twitter_url` varchar(500),
	`email` varchar(255),
	`department` varchar(100),
	`expertise` json,
	`years_experience` int,
	`is_leadership` boolean DEFAULT false,
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `team_members_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_values` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `team_values_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `technical_specs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `technical_specs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `use_cases` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(100),
	`order_index` int DEFAULT 0,
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `use_cases_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`phone` varchar(50),
	`organization` varchar(255),
	`title` varchar(100),
	`organization_type` varchar(50),
	`country` varchar(100),
	`role` varchar(20) DEFAULT 'user',
	`is_active` boolean DEFAULT true,
	`email_verified` boolean DEFAULT false,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `page_url_idx` ON `analytics` (`page_url`);--> statement-breakpoint
CREATE INDEX `event_type_idx` ON `analytics` (`event_type`);--> statement-breakpoint
CREATE INDEX `session_idx` ON `analytics` (`session_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `analytics` (`created_at`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `blog_authors` (`email`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `blog_authors` (`is_active`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `blog_categories` (`slug`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `blog_categories` (`is_active`);--> statement-breakpoint
CREATE INDEX `post_idx` ON `blog_comments` (`post_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `blog_comments` (`user_id`);--> statement-breakpoint
CREATE INDEX `parent_idx` ON `blog_comments` (`parent_id`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `blog_posts` (`category_id`);--> statement-breakpoint
CREATE INDEX `author_idx` ON `blog_posts` (`author_id`);--> statement-breakpoint
CREATE INDEX `featured_idx` ON `blog_posts` (`featured`);--> statement-breakpoint
CREATE INDEX `published_idx` ON `blog_posts` (`published`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `contact_inquiries` (`email`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `contact_inquiries` (`category`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `contact_inquiries` (`status`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `contact_methods` (`type`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `contact_methods` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `contact_methods` (`is_active`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `demo_requests` (`email`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `demo_requests` (`status`);--> statement-breakpoint
CREATE INDEX `demo_type_idx` ON `demo_requests` (`demo_type`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `departments` (`name`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `departments` (`is_active`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `faqs` (`category`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `faqs` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `faqs` (`is_active`);--> statement-breakpoint
CREATE INDEX `uploaded_by_idx` ON `file_uploads` (`uploaded_by`);--> statement-breakpoint
CREATE INDEX `related_idx` ON `file_uploads` (`related_table`,`related_id`);--> statement-breakpoint
CREATE INDEX `form_type_idx` ON `form_submissions` (`form_type`);--> statement-breakpoint
CREATE INDEX `submitted_at_idx` ON `form_submissions` (`submitted_at`);--> statement-breakpoint
CREATE INDEX `tool_type_idx` ON `health_tool_results` (`tool_type`);--> statement-breakpoint
CREATE INDEX `session_idx` ON `health_tool_results` (`session_id`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `health_tool_results` (`created_at`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `impact_statistics` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `impact_statistics` (`is_active`);--> statement-breakpoint
CREATE INDEX `job_idx` ON `job_applications` (`job_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `job_applications` (`email`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `job_applications` (`status`);--> statement-breakpoint
CREATE INDEX `slug_idx` ON `job_openings` (`slug`);--> statement-breakpoint
CREATE INDEX `department_idx` ON `job_openings` (`department_id`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `job_openings` (`is_active`);--> statement-breakpoint
CREATE INDEX `featured_idx` ON `job_openings` (`is_featured`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `media_resources` (`type`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `media_resources` (`category`);--> statement-breakpoint
CREATE INDEX `featured_idx` ON `media_resources` (`featured`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `media_resources` (`order_index`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `newsletter_subscribers` (`email`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `newsletter_subscribers` (`is_active`);--> statement-breakpoint
CREATE INDEX `page_idx` ON `page_content` (`page`);--> statement-breakpoint
CREATE INDEX `section_idx` ON `page_content` (`section`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `page_content` (`is_active`);--> statement-breakpoint
CREATE INDEX `page_idx` ON `page_views` (`page`);--> statement-breakpoint
CREATE INDEX `session_idx` ON `page_views` (`session_id`);--> statement-breakpoint
CREATE INDEX `viewed_at_idx` ON `page_views` (`viewed_at`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `partners` (`category`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `partners` (`is_active`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `partners` (`order_index`);--> statement-breakpoint
CREATE INDEX `publication_idx` ON `press_coverage` (`publication`);--> statement-breakpoint
CREATE INDEX `featured_idx` ON `press_coverage` (`featured`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `press_coverage` (`order_index`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `product_features` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `product_features` (`is_active`);--> statement-breakpoint
CREATE INDEX `type_idx` ON `support_resources` (`type`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `support_resources` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `support_resources` (`is_active`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `support_tickets` (`email`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `support_tickets` (`category`);--> statement-breakpoint
CREATE INDEX `status_idx` ON `support_tickets` (`status`);--> statement-breakpoint
CREATE INDEX `priority_idx` ON `support_tickets` (`priority`);--> statement-breakpoint
CREATE INDEX `department_idx` ON `team_members` (`department`);--> statement-breakpoint
CREATE INDEX `leadership_idx` ON `team_members` (`is_leadership`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `team_members` (`order_index`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `team_values` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `team_values` (`is_active`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `technical_specs` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `technical_specs` (`is_active`);--> statement-breakpoint
CREATE INDEX `order_idx` ON `use_cases` (`order_index`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `use_cases` (`is_active`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `role_idx` ON `users` (`role`);--> statement-breakpoint
ALTER TABLE `blog_comments` ADD CONSTRAINT `blog_comments_post_id_blog_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `blog_posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_comments` ADD CONSTRAINT `blog_comments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_author_id_blog_authors_id_fk` FOREIGN KEY (`author_id`) REFERENCES `blog_authors`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_category_id_blog_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contact_inquiries` ADD CONSTRAINT `contact_inquiries_assigned_to_users_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `file_uploads` ADD CONSTRAINT `file_uploads_uploaded_by_users_id_fk` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_job_id_job_openings_id_fk` FOREIGN KEY (`job_id`) REFERENCES `job_openings`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `job_openings` ADD CONSTRAINT `job_openings_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `support_tickets` ADD CONSTRAINT `support_tickets_assigned_to_users_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;