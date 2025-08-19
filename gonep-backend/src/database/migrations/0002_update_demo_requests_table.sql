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
