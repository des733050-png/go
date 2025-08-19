#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Railway Database Migration...');

try {
  // Load environment variables
  require('dotenv').config();

  // Validate DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  console.log('✅ Environment variables loaded');
  console.log('📊 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

  // Run Drizzle migrations
  console.log('🔄 Running database migrations...');
  execSync('npx drizzle-kit push', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  console.log('✅ Migrations completed successfully');

  // Run seed script if it exists
  try {
    console.log('🌱 Running database seed...');
    execSync('npm run seed', { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log('✅ Database seeded successfully');
  } catch (seedError) {
    console.log('⚠️  Seed script not found or failed, continuing...');
  }

  console.log('🎉 Railway database setup completed!');

} catch (error) {
  console.error('❌ Migration failed:', error.message);
  process.exit(1);
}
