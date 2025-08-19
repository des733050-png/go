-- Add placement field to demo_videos table
ALTER TABLE demo_videos ADD COLUMN placement VARCHAR(100) DEFAULT 'general' AFTER category;
CREATE INDEX placement_idx ON demo_videos(placement);
