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
--> statement-breakpoint
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
--> statement-breakpoint
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
--> statement-breakpoint
DROP INDEX `email_idx` ON `blog_authors`;--> statement-breakpoint
ALTER TABLE `job_openings` ADD `nice_to_have` json;--> statement-breakpoint
ALTER TABLE `job_openings` ADD `experience` varchar(100);--> statement-breakpoint
ALTER TABLE `job_openings` ADD `education` text;--> statement-breakpoint
ALTER TABLE `job_openings` ADD `team_info` text;--> statement-breakpoint
ALTER TABLE `job_openings` ADD `growth_opportunities` text;--> statement-breakpoint
ALTER TABLE `team_members` ADD `phone` varchar(50);--> statement-breakpoint
ALTER TABLE `team_members` ADD `location` varchar(255);--> statement-breakpoint
ALTER TABLE `team_members` ADD `education` text;--> statement-breakpoint
ALTER TABLE `team_members` ADD `certifications` json;--> statement-breakpoint
ALTER TABLE `team_members` ADD `achievements` json;--> statement-breakpoint
ALTER TABLE `team_members` ADD `facebook_url` varchar(500);--> statement-breakpoint
ALTER TABLE `team_members` ADD `instagram_url` varchar(500);--> statement-breakpoint
ALTER TABLE `team_members` ADD `whatsapp_url` varchar(500);--> statement-breakpoint
ALTER TABLE `team_members` ADD `portfolio_url` varchar(500);--> statement-breakpoint
ALTER TABLE `team_members` ADD `github_url` varchar(500);--> statement-breakpoint
ALTER TABLE `team_members` ADD `youtube_url` varchar(500);--> statement-breakpoint
CREATE INDEX `date_idx` ON `calendar_availability` (`date`);--> statement-breakpoint
CREATE INDEX `available_idx` ON `calendar_availability` (`is_available`);--> statement-breakpoint
CREATE INDEX `max_bookings_idx` ON `calendar_availability` (`max_bookings`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `demo_interests` (`name`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `demo_interests` (`category`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `demo_interests` (`is_active`);--> statement-breakpoint
CREATE INDEX `sort_order_idx` ON `demo_interests` (`sort_order`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `demo_types` (`name`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `demo_types` (`is_active`);--> statement-breakpoint
CREATE INDEX `sort_order_idx` ON `demo_types` (`sort_order`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `blog_authors` (`name`);--> statement-breakpoint
CREATE INDEX `published_at_idx` ON `blog_posts` (`published_at`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `team_members` (`email`);--> statement-breakpoint
ALTER TABLE `blog_authors` DROP COLUMN `linkedin`;--> statement-breakpoint
ALTER TABLE `blog_authors` DROP COLUMN `twitter`;--> statement-breakpoint
ALTER TABLE `blog_authors` DROP COLUMN `expertise`;--> statement-breakpoint
ALTER TABLE `blog_categories` DROP COLUMN `post_count`;--> statement-breakpoint
ALTER TABLE `blog_posts` DROP COLUMN `meta_title`;--> statement-breakpoint
ALTER TABLE `blog_posts` DROP COLUMN `meta_description`;--> statement-breakpoint
ALTER TABLE `blog_posts` DROP COLUMN `seo_keywords`;