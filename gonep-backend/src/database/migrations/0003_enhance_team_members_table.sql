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
