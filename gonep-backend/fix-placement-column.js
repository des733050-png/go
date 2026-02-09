
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Simple Railway Database Migration...');

function getDatabaseConfig() {
  // Load environment variables
  require('dotenv').config();

  let connectionConfig;

  if (process.env.DATABASE_URL) {
    // Use DATABASE_URL if available
    console.log('✅ Using DATABASE_URL for connection');
    console.log('📊 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@'));
    connectionConfig = process.env.DATABASE_URL;
  } else {
    // Fallback to individual environment variables
    const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_NAME'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    // DB_PASSWORD is optional (can be empty for local MySQL)
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please provide either DATABASE_URL or individual DB_* variables.`);
    }

    console.log('✅ Using individual DB_* environment variables for connection');
    console.log('📊 Database Host:', process.env.DB_HOST);
    console.log('📊 Database Port:', process.env.DB_PORT);
    console.log('📊 Database Name:', process.env.DB_NAME);
    console.log('📊 Database User:', process.env.DB_USERNAME);

    connectionConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '', // Allow empty password
      database: process.env.DB_NAME,
      connectTimeout: 30000,
      acquireTimeout: 30000,
      timeout: 30000,
      multipleStatements: true,
      charset: 'utf8mb4',
      ssl: false // Disable SSL for cPanel connections
    };
  }

  return connectionConfig;
}

async function fixPlacementColumn() {
  let connection;
  
  try {
    console.log('🚀 Starting Placement Column Fix...');
    console.log('✅ Environment variables loaded');

    // Get database configuration with fallback
    const dbConfig = getDatabaseConfig();

    // Create database connection
    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully');

    // Get database name from config
    let databaseName;
    if (typeof dbConfig === 'string') {
      // Extract database name from DATABASE_URL
      const dbMatch = dbConfig.match(/mysql:\/\/[^\/]+\/([^?]+)/);
      databaseName = dbMatch ? dbMatch[1] : 'railway';
    } else {
      databaseName = dbConfig.database;
    }

    // Check if demo_videos table exists
    console.log('📊 Checking demo_videos table...');
    const [tables] = await connection.execute(
      "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'demo_videos'",
      [databaseName]
    );

    if (tables.length === 0) {
      console.log('⚠️  demo_videos table does not exist. Creating it...');
      
      // Create the table with placement column
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS \`demo_videos\` (
          \`id\` int NOT NULL AUTO_INCREMENT,
          \`title\` varchar(255) NOT NULL,
          \`description\` text,
          \`video_url\` varchar(500) NOT NULL,
          \`thumbnail_url\` varchar(500),
          \`duration\` varchar(20),
          \`category\` varchar(100) DEFAULT 'demo',
          \`placement\` varchar(100) DEFAULT 'general',
          \`is_active\` boolean DEFAULT true,
          \`sort_order\` int DEFAULT 0,
          \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
          \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`),
          KEY \`title_idx\` (\`title\`),
          KEY \`category_idx\` (\`category\`),
          KEY \`placement_idx\` (\`placement\`),
          KEY \`active_idx\` (\`is_active\`),
          KEY \`sort_order_idx\` (\`sort_order\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
      console.log('✅ demo_videos table created with placement column');
    } else {
      // Check if placement column exists
      console.log('📊 Checking for placement column...');
      const [columns] = await connection.execute(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'demo_videos' AND COLUMN_NAME = 'placement'",
        [databaseName]
      );

      if (columns.length === 0) {
        console.log('⚠️  placement column does not exist. Adding it...');
        
        // Add the placement column
        await connection.execute(`
          ALTER TABLE \`demo_videos\` 
          ADD COLUMN \`placement\` varchar(100) DEFAULT 'general' AFTER \`category\`
        `);
        
        // Create index for placement column
        await connection.execute(`
          CREATE INDEX \`placement_idx\` ON \`demo_videos\` (\`placement\`)
        `);
        
        console.log('✅ placement column added successfully');
      } else {
        console.log('✅ placement column already exists');
      }
    }

    // Verify the column exists
    const [verifyColumns] = await connection.execute(
      "SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_DEFAULT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'demo_videos' AND COLUMN_NAME = 'placement'",
      [databaseName]
    );

    if (verifyColumns.length > 0) {
      const col = verifyColumns[0];
      console.log('\n✅ Verification successful:');
      console.log(`   Column: ${col.COLUMN_NAME}`);
      console.log(`   Type: ${col.COLUMN_TYPE}`);
      console.log(`   Default: ${col.COLUMN_DEFAULT}`);
    }

    console.log('\n🎉 Fix completed successfully!');
    console.log('   The placement column is now available in the demo_videos table.');

  } catch (error) {
    console.error('❌ Error fixing placement column:', error.message);
    
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.error('⚠️  Column already exists');
    } else if (error.code === 'ER_DUP_KEYNAME') {
      console.error('⚠️  Index already exists');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('⚠️  Could not connect to database');
      console.error('   Please check:');
      console.error('   1. Database server is running');
      console.error('   2. DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME are correct');
      console.error('   3. DATABASE_URL is properly formatted (mysql://user:pass@host:port/db)');
      console.error('   4. Network connectivity to database server');
    }
    
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the fix
fixPlacementColumn()
  .then(() => {
    console.log('\n✅ Fix completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Fix failed:', error);
    process.exit(1);
  });

