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
--> statement-breakpoint
DROP TABLE `demo_video_config`;--> statement-breakpoint
CREATE INDEX `title_idx` ON `demo_videos` (`title`);--> statement-breakpoint
CREATE INDEX `category_idx` ON `demo_videos` (`category`);--> statement-breakpoint
CREATE INDEX `active_idx` ON `demo_videos` (`is_active`);--> statement-breakpoint
CREATE INDEX `sort_order_idx` ON `demo_videos` (`sort_order`);