-- GONEP Database Migration Package
-- Generated on: 2025-08-28T21:12:16.357Z
-- Total migrations: 10
-- 
-- This file contains all migrations in the correct order for MySQL/phpMyAdmin
-- Execute this file in your MySQL database to create all tables
-- 
-- IMPORTANT: Ensure you have a backup of your database before running migrations
-- 

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;

-- Migration 1: 0000_conscious_hiroim.sql
-- ================================================
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

CREATE TABLE `form_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`form_type` varchar(50) NOT NULL,
	`data` json,
	`submitted_at` timestamp DEFAULT (now()),
	CONSTRAINT `form_submissions_id` PRIMARY KEY(`id`)
);

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

CREATE TABLE `page_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page` varchar(255) NOT NULL,
	`session_id` varchar(255),
	`user_agent` text,
	`ip_address` varchar(45),
	`viewed_at` timestamp DEFAULT (now()),
	CONSTRAINT `page_views_id` PRIMARY KEY(`id`)
);

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

CREATE INDEX `page_url_idx` ON `analytics` (`page_url`);

CREATE INDEX `event_type_idx` ON `analytics` (`event_type`);

CREATE INDEX `session_idx` ON `analytics` (`session_id`);

CREATE INDEX `created_at_idx` ON `analytics` (`created_at`);

CREATE INDEX `email_idx` ON `blog_authors` (`email`);

CREATE INDEX `active_idx` ON `blog_authors` (`is_active`);

CREATE INDEX `slug_idx` ON `blog_categories` (`slug`);

CREATE INDEX `active_idx` ON `blog_categories` (`is_active`);

CREATE INDEX `post_idx` ON `blog_comments` (`post_id`);

CREATE INDEX `user_idx` ON `blog_comments` (`user_id`);

CREATE INDEX `parent_idx` ON `blog_comments` (`parent_id`);

CREATE INDEX `slug_idx` ON `blog_posts` (`slug`);

CREATE INDEX `category_idx` ON `blog_posts` (`category_id`);

CREATE INDEX `author_idx` ON `blog_posts` (`author_id`);

CREATE INDEX `featured_idx` ON `blog_posts` (`featured`);

CREATE INDEX `published_idx` ON `blog_posts` (`published`);

CREATE INDEX `email_idx` ON `contact_inquiries` (`email`);

CREATE INDEX `category_idx` ON `contact_inquiries` (`category`);

CREATE INDEX `status_idx` ON `contact_inquiries` (`status`);

CREATE INDEX `type_idx` ON `contact_methods` (`type`);

CREATE INDEX `order_idx` ON `contact_methods` (`order_index`);

CREATE INDEX `active_idx` ON `contact_methods` (`is_active`);

CREATE INDEX `email_idx` ON `demo_requests` (`email`);

CREATE INDEX `status_idx` ON `demo_requests` (`status`);

CREATE INDEX `demo_type_idx` ON `demo_requests` (`demo_type`);

CREATE INDEX `name_idx` ON `departments` (`name`);

CREATE INDEX `active_idx` ON `departments` (`is_active`);

CREATE INDEX `category_idx` ON `faqs` (`category`);

CREATE INDEX `order_idx` ON `faqs` (`order_index`);

CREATE INDEX `active_idx` ON `faqs` (`is_active`);

CREATE INDEX `uploaded_by_idx` ON `file_uploads` (`uploaded_by`);

CREATE INDEX `related_idx` ON `file_uploads` (`related_table`,`related_id`);

CREATE INDEX `form_type_idx` ON `form_submissions` (`form_type`);

CREATE INDEX `submitted_at_idx` ON `form_submissions` (`submitted_at`);

CREATE INDEX `tool_type_idx` ON `health_tool_results` (`tool_type`);

CREATE INDEX `session_idx` ON `health_tool_results` (`session_id`);

CREATE INDEX `created_at_idx` ON `health_tool_results` (`created_at`);

CREATE INDEX `order_idx` ON `impact_statistics` (`order_index`);

CREATE INDEX `active_idx` ON `impact_statistics` (`is_active`);

CREATE INDEX `job_idx` ON `job_applications` (`job_id`);

CREATE INDEX `email_idx` ON `job_applications` (`email`);

CREATE INDEX `status_idx` ON `job_applications` (`status`);

CREATE INDEX `slug_idx` ON `job_openings` (`slug`);

CREATE INDEX `department_idx` ON `job_openings` (`department_id`);

CREATE INDEX `active_idx` ON `job_openings` (`is_active`);

CREATE INDEX `featured_idx` ON `job_openings` (`is_featured`);

CREATE INDEX `type_idx` ON `media_resources` (`type`);

CREATE INDEX `category_idx` ON `media_resources` (`category`);

CREATE INDEX `featured_idx` ON `media_resources` (`featured`);

CREATE INDEX `order_idx` ON `media_resources` (`order_index`);

CREATE INDEX `email_idx` ON `newsletter_subscribers` (`email`);

CREATE INDEX `active_idx` ON `newsletter_subscribers` (`is_active`);

CREATE INDEX `page_idx` ON `page_content` (`page`);

CREATE INDEX `section_idx` ON `page_content` (`section`);

CREATE INDEX `active_idx` ON `page_content` (`is_active`);

CREATE INDEX `page_idx` ON `page_views` (`page`);

CREATE INDEX `session_idx` ON `page_views` (`session_id`);

CREATE INDEX `viewed_at_idx` ON `page_views` (`viewed_at`);

CREATE INDEX `category_idx` ON `partners` (`category`);

CREATE INDEX `active_idx` ON `partners` (`is_active`);

CREATE INDEX `order_idx` ON `partners` (`order_index`);

CREATE INDEX `publication_idx` ON `press_coverage` (`publication`);

CREATE INDEX `featured_idx` ON `press_coverage` (`featured`);

CREATE INDEX `order_idx` ON `press_coverage` (`order_index`);

CREATE INDEX `order_idx` ON `product_features` (`order_index`);

CREATE INDEX `active_idx` ON `product_features` (`is_active`);

CREATE INDEX `type_idx` ON `support_resources` (`type`);

CREATE INDEX `order_idx` ON `support_resources` (`order_index`);

CREATE INDEX `active_idx` ON `support_resources` (`is_active`);

CREATE INDEX `email_idx` ON `support_tickets` (`email`);

CREATE INDEX `category_idx` ON `support_tickets` (`category`);

CREATE INDEX `status_idx` ON `support_tickets` (`status`);

CREATE INDEX `priority_idx` ON `support_tickets` (`priority`);

CREATE INDEX `department_idx` ON `team_members` (`department`);

CREATE INDEX `leadership_idx` ON `team_members` (`is_leadership`);

CREATE INDEX `order_idx` ON `team_members` (`order_index`);

CREATE INDEX `order_idx` ON `team_values` (`order_index`);

CREATE INDEX `active_idx` ON `team_values` (`is_active`);

CREATE INDEX `order_idx` ON `technical_specs` (`order_index`);

CREATE INDEX `active_idx` ON `technical_specs` (`is_active`);

CREATE INDEX `order_idx` ON `use_cases` (`order_index`);

CREATE INDEX `active_idx` ON `use_cases` (`is_active`);

CREATE INDEX `email_idx` ON `users` (`email`);

CREATE INDEX `role_idx` ON `users` (`role`);

ALTER TABLE `blog_comments` ADD CONSTRAINT `blog_comments_post_id_blog_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `blog_posts`(`id`) ON DELETE cascade ON UPDATE no action;

ALTER TABLE `blog_comments` ADD CONSTRAINT `blog_comments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_author_id_blog_authors_id_fk` FOREIGN KEY (`author_id`) REFERENCES `blog_authors`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `blog_posts` ADD CONSTRAINT `blog_posts_category_id_blog_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `contact_inquiries` ADD CONSTRAINT `contact_inquiries_assigned_to_users_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `file_uploads` ADD CONSTRAINT `file_uploads_uploaded_by_users_id_fk` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_job_id_job_openings_id_fk` FOREIGN KEY (`job_id`) REFERENCES `job_openings`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `job_openings` ADD CONSTRAINT `job_openings_department_id_departments_id_fk` FOREIGN KEY (`department_id`) REFERENCES `departments`(`id`) ON DELETE no action ON UPDATE no action;

ALTER TABLE `support_tickets` ADD CONSTRAINT `support_tickets_assigned_to_users_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;

-- Migration 2: 0001_add_job_details_fields.sql
-- ================================================
-- Migration: Add missing fields to job_openings table
-- Date: 2025-01-16

ALTER TABLE `job_openings` 
ADD COLUMN `nice_to_have` JSON NULL AFTER `benefits`,
ADD COLUMN `experience` VARCHAR(100) NULL AFTER `salary_range`,
ADD COLUMN `education` TEXT NULL AFTER `experience`,
ADD COLUMN `team_info` TEXT NULL AFTER `education`,
ADD COLUMN `growth_opportunities` TEXT NULL AFTER `team_info`;

-- Migration 3: 0001_superb_talkback.sql
-- ================================================
CREATE TABLE `calendar_availability` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`is_available` boolean DEFAULT true,
	`max_bookings` int DEFAULT 5,
	`current_bookings` int DEFAULT 0,
	`reason` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calendar_availability_id` PRIMARY KEY(`id`)
);

CREATE TABLE `demo_interests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`category` varchar(100) DEFAULT 'general',
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demo_interests_id` PRIMARY KEY(`id`)
);

CREATE TABLE `demo_types` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`duration` varchar(100) NOT NULL,
	`description` text,
	`max_attendees` int,
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demo_types_id` PRIMARY KEY(`id`)
);

DROP INDEX `email_idx` ON `blog_authors`;

ALTER TABLE `job_openings` ADD `nice_to_have` json;

ALTER TABLE `job_openings` ADD `experience` varchar(100);

ALTER TABLE `job_openings` ADD `education` text;

ALTER TABLE `job_openings` ADD `team_info` text;

ALTER TABLE `job_openings` ADD `growth_opportunities` text;

ALTER TABLE `team_members` ADD `phone` varchar(50);

ALTER TABLE `team_members` ADD `location` varchar(255);

ALTER TABLE `team_members` ADD `education` text;

ALTER TABLE `team_members` ADD `certifications` json;

ALTER TABLE `team_members` ADD `achievements` json;

ALTER TABLE `team_members` ADD `facebook_url` varchar(500);

ALTER TABLE `team_members` ADD `instagram_url` varchar(500);

ALTER TABLE `team_members` ADD `whatsapp_url` varchar(500);

ALTER TABLE `team_members` ADD `portfolio_url` varchar(500);

ALTER TABLE `team_members` ADD `github_url` varchar(500);

ALTER TABLE `team_members` ADD `youtube_url` varchar(500);

CREATE INDEX `date_idx` ON `calendar_availability` (`date`);

CREATE INDEX `available_idx` ON `calendar_availability` (`is_available`);

CREATE INDEX `max_bookings_idx` ON `calendar_availability` (`max_bookings`);

CREATE INDEX `name_idx` ON `demo_interests` (`name`);

CREATE INDEX `category_idx` ON `demo_interests` (`category`);

CREATE INDEX `active_idx` ON `demo_interests` (`is_active`);

CREATE INDEX `sort_order_idx` ON `demo_interests` (`sort_order`);

CREATE INDEX `name_idx` ON `demo_types` (`name`);

CREATE INDEX `active_idx` ON `demo_types` (`is_active`);

CREATE INDEX `sort_order_idx` ON `demo_types` (`sort_order`);

CREATE INDEX `name_idx` ON `blog_authors` (`name`);

CREATE INDEX `published_at_idx` ON `blog_posts` (`published_at`);

CREATE INDEX `email_idx` ON `team_members` (`email`);

ALTER TABLE `blog_authors` DROP COLUMN `linkedin`;

ALTER TABLE `blog_authors` DROP COLUMN `twitter`;

ALTER TABLE `blog_authors` DROP COLUMN `expertise`;

ALTER TABLE `blog_categories` DROP COLUMN `post_count`;

ALTER TABLE `blog_posts` DROP COLUMN `meta_title`;

ALTER TABLE `blog_posts` DROP COLUMN `meta_description`;

ALTER TABLE `blog_posts` DROP COLUMN `seo_keywords`;

-- Migration 4: 0002_hard_devos.sql
-- ================================================
CREATE TABLE `demo_video_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL DEFAULT 'Demo Video',
	`description` text,
	`video_url` varchar(500) NOT NULL,
	`video_type` varchar(20) NOT NULL DEFAULT 'youtube',
	`thumbnail_url` varchar(500),
	`duration` varchar(20),
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demo_video_config_id` PRIMARY KEY(`id`)
);

CREATE INDEX `active_idx` ON `demo_video_config` (`is_active`);

CREATE INDEX `sort_order_idx` ON `demo_video_config` (`sort_order`);

CREATE INDEX `video_type_idx` ON `demo_video_config` (`video_type`);

-- Migration 5: 0002_update_demo_requests_table.sql
-- ================================================
-- Migration: Update demo_requests table with all necessary fields
-- This migration ensures the demo_requests table has all the fields needed for the complete demo request form

-- Add missing columns if they don't exist
ALTER TABLE demo_requests 
ADD COLUMN IF NOT EXISTS phone VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS organization VARCHAR(255) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS title VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS organization_type VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS country VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS interests JSON,
ADD COLUMN IF NOT EXISTS message TEXT,
ADD COLUMN IF NOT EXISTS demo_type VARCHAR(50) NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS preferred_date TIMESTAMP NULL,
ADD COLUMN IF NOT EXISTS attendee_count VARCHAR(20) NULL,
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP NULL;

-- Update existing records to have default values for new required fields
UPDATE demo_requests 
SET interests = '[]' 
WHERE interests IS NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_demo_requests_interests ON demo_requests((CAST(interests AS CHAR(1000))));
CREATE INDEX IF NOT EXISTS idx_demo_requests_preferred_date ON demo_requests(preferred_date);
CREATE INDEX IF NOT EXISTS idx_demo_requests_attendee_count ON demo_requests(attendee_count);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_demo_type ON demo_requests(demo_type);

-- Migration 6: 0003_busy_thunderbolt.sql
-- ================================================
CREATE TABLE `demo_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`video_url` varchar(500) NOT NULL,
	`thumbnail_url` varchar(500),
	`duration` varchar(20),
	`category` varchar(100) DEFAULT 'demo',
	`is_active` boolean DEFAULT true,
	`sort_order` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demo_videos_id` PRIMARY KEY(`id`)
);

DROP TABLE `demo_video_config`;

CREATE INDEX `title_idx` ON `demo_videos` (`title`);

CREATE INDEX `category_idx` ON `demo_videos` (`category`);

CREATE INDEX `active_idx` ON `demo_videos` (`is_active`);

CREATE INDEX `sort_order_idx` ON `demo_videos` (`sort_order`);

-- Migration 7: 0003_enhance_team_members_table.sql
-- ================================================
-- Migration: Enhance team_members table with comprehensive social media links and additional fields
-- This migration adds new social media platforms and additional team member details

-- Add new social media and additional fields
ALTER TABLE team_members
ADD COLUMN phone VARCHAR(50) NULL,
ADD COLUMN location VARCHAR(255) NULL,
ADD COLUMN education TEXT NULL,
ADD COLUMN certifications JSON NULL,
ADD COLUMN achievements JSON NULL,
ADD COLUMN facebook_url VARCHAR(500) NULL,
ADD COLUMN instagram_url VARCHAR(500) NULL,
ADD COLUMN whatsapp_url VARCHAR(500) NULL,
ADD COLUMN portfolio_url VARCHAR(500) NULL,
ADD COLUMN github_url VARCHAR(500) NULL,
ADD COLUMN youtube_url VARCHAR(500) NULL;

-- Add indexes for better performance (MariaDB compatible)
CREATE INDEX idx_team_members_email ON team_members(email);
CREATE INDEX idx_team_members_phone ON team_members(phone);
CREATE INDEX idx_team_members_location ON team_members(location);

-- Update existing records to have default values for new JSON fields
UPDATE team_members 
SET certifications = '[]', achievements = '[]'
WHERE certifications IS NULL OR achievements IS NULL;

-- Migration 8: 0004_create_demo_config_tables.sql
-- ================================================
-- Migration: Create Demo Configuration Tables
-- Date: 2025-01-15
-- Description: Creates tables for managing demo interests, types, and calendar availability

-- Create demo_interests table
CREATE TABLE IF NOT EXISTS demo_interests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) DEFAULT 'general',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create demo_types table
CREATE TABLE IF NOT EXISTS demo_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  duration VARCHAR(100) NOT NULL,
  description TEXT,
  max_attendees INT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create calendar_availability table
CREATE TABLE IF NOT EXISTS calendar_availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(10) NOT NULL, -- YYYY-MM-DD format
  is_available BOOLEAN DEFAULT TRUE,
  max_bookings INT DEFAULT 5,
  current_bookings INT DEFAULT 0,
  reason TEXT, -- Reason for unavailability or special notes
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for demo_interests (after table creation)
CREATE INDEX IF NOT EXISTS name_idx ON demo_interests(name);
CREATE INDEX IF NOT EXISTS category_idx ON demo_interests(category);
CREATE INDEX IF NOT EXISTS active_idx ON demo_interests(is_active);
CREATE INDEX IF NOT EXISTS sort_order_idx ON demo_interests(sort_order);

-- Create indexes for demo_types (after table creation)
CREATE INDEX IF NOT EXISTS name_idx ON demo_types(name);
CREATE INDEX IF NOT EXISTS active_idx ON demo_types(is_active);
CREATE INDEX IF NOT EXISTS sort_order_idx ON demo_types(sort_order);

-- Create indexes for calendar_availability (after table creation)
CREATE INDEX IF NOT EXISTS date_idx ON calendar_availability(date);
CREATE INDEX IF NOT EXISTS available_idx ON calendar_availability(is_available);
CREATE INDEX IF NOT EXISTS max_bookings_idx ON calendar_availability(max_bookings);

-- Insert default demo interests
INSERT INTO demo_interests (name, description, category, sort_order) VALUES
('Blood glucose testing', 'Capabilities for blood glucose monitoring and analysis', 'diagnostics', 1),
('Blood pressure monitoring', 'Blood pressure measurement and tracking features', 'diagnostics', 2),
('Urine analysis capabilities', 'Urine testing and analysis functionality', 'diagnostics', 3),
('AI diagnostic features', 'Artificial intelligence-powered diagnostic tools', 'ai', 4),
('Offline functionality', 'System operation without internet connection', 'technical', 5),
('Data analytics & reporting', 'Advanced analytics and reporting capabilities', 'analytics', 6),
('Training & support programs', 'Training and support services for users', 'support', 7),
('Implementation planning', 'Strategic planning for system implementation', 'planning', 8),
('Pricing & financing options', 'Cost information and financing solutions', 'business', 9);

-- Insert default demo types
INSERT INTO demo_types (name, duration, description, max_attendees, sort_order) VALUES
('Virtual Demo', '45 min', 'Online presentation with live Q&A', 10, 1),
('On-site Demo', '2 hours', 'In-person demonstration at your facility', 15, 2);

-- Insert sample calendar availability for next 30 days
INSERT INTO calendar_availability (date, is_available, max_bookings, reason) VALUES
(DATE_ADD(CURDATE(), INTERVAL 1 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 2 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 3 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 4 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 5 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 6 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 7 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 8 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 9 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 10 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 11 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 12 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 13 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 14 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 15 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 16 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 17 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 18 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 19 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 20 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 21 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 22 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 23 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 24 DAY), FALSE, 0, 'Weekend - No demos available'),
(DATE_ADD(CURDATE(), INTERVAL 25 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 26 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 27 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 28 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 29 DAY), TRUE, 5, NULL),
(DATE_ADD(CURDATE(), INTERVAL 30 DAY), TRUE, 5, NULL);

-- Migration 9: 0005_add_placement_to_demo_videos.sql
-- ================================================
-- Add placement field to demo_videos table
ALTER TABLE demo_videos ADD COLUMN placement VARCHAR(100) DEFAULT 'general' AFTER category;
CREATE INDEX placement_idx ON demo_videos(placement);

-- Migration 10: 0005_create_demo_videos_table.sql
-- ================================================
-- Create demo_videos table
CREATE TABLE `demo_videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `video_url` varchar(500) NOT NULL,
  `thumbnail_url` varchar(500),
  `duration` varchar(20),
  `category` varchar(100) DEFAULT 'demo',
  `is_active` boolean DEFAULT true,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `title_idx` (`title`),
  KEY `category_idx` (`category`),
  KEY `active_idx` (`is_active`),
  KEY `sort_order_idx` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Finalize migration
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;

-- Migration completed successfully!
