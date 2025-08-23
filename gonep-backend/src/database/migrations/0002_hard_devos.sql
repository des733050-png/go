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
--> statement-breakpoint
CREATE INDEX `active_idx` ON `demo_video_config` (`is_active`);--> statement-breakpoint
CREATE INDEX `sort_order_idx` ON `demo_video_config` (`sort_order`);--> statement-breakpoint
CREATE INDEX `video_type_idx` ON `demo_video_config` (`video_type`);