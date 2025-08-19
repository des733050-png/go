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
