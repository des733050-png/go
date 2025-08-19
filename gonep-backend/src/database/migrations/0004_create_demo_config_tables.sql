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
