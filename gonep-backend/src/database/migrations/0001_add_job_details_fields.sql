-- Migration: Add missing fields to job_openings table
-- Date: 2025-01-16

ALTER TABLE `job_openings` 
ADD COLUMN `nice_to_have` JSON NULL AFTER `benefits`,
ADD COLUMN `experience` VARCHAR(100) NULL AFTER `salary_range`,
ADD COLUMN `education` TEXT NULL AFTER `experience`,
ADD COLUMN `team_info` TEXT NULL AFTER `education`,
ADD COLUMN `growth_opportunities` TEXT NULL AFTER `team_info`;

