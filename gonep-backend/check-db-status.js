#!/usr/bin/env node

const mysql = require('mysql2/promise');

console.log('🔍 Checking Railway Database Status...');

async function checkDatabaseStatus() {
  try {
    // Load environment variables
    require('dotenv').config();

    // Validate DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is required');
    }

    console.log('✅ Environment variables loaded');
    console.log('📊 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

    // Create database connection
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('✅ Database connected successfully');

    // Check if tables exist
    const [tables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
      ORDER BY table_name
    `);

    console.log(`\n📊 Database Status:`);
    console.log(`📁 Total tables found: ${tables.length}`);

    if (tables.length > 0) {
      console.log('\n📋 Existing tables:');
      tables.forEach((table, index) => {
        console.log(`  ${index + 1}. ${table.table_name}`);
      });
    } else {
      console.log('\n⚠️  No tables found - database is empty');
    }

    // Check for specific important tables
    const importantTables = [
      'users', 'blog_posts', 'blog_authors', 'blog_categories', 
      'team_members', 'demo_requests', 'contact_inquiries'
    ];

    console.log('\n🔍 Checking important tables:');
    for (const tableName of importantTables) {
      const exists = tables.some(t => t.table_name === tableName);
      console.log(`  ${exists ? '✅' : '❌'} ${tableName}`);
    }

    await connection.end();
    console.log('\n🎉 Database status check completed!');

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    process.exit(1);
  }
}

checkDatabaseStatus();
