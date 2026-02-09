#!/usr/bin/env node

/**
 * Run Consolidated Migration Script
 * Executes the consolidated_migration.sql file using environment variables
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'env') });

async function runConsolidatedMigration() {
  let connection;
  
  try {
    // Parse DATABASE_URL if provided, otherwise use individual env vars
    let config = {};
    
    if (process.env.DATABASE_URL) {
      try {
        // Parse DATABASE_URL format: mysql://user:password@host:port/database
        const dbUrl = process.env.DATABASE_URL.replace(/^mysql:\/\//, 'http://');
        const url = new URL(dbUrl);
        
        // Check if hostname is valid (not empty)
        if (url.hostname && url.hostname !== '' && url.hostname !== ':') {
          config = {
            host: url.hostname,
            port: parseInt(url.port) || 3306,
            user: url.username || 'root',
            password: url.password || '',
            database: url.pathname.replace('/', '') || 'railway',
            multipleStatements: true, // Allow multiple SQL statements
          };
        } else {
          throw new Error('Invalid hostname in DATABASE_URL');
        }
      } catch (error) {
        console.log('⚠️  DATABASE_URL parsing failed, using individual env vars');
        console.log(`   Error: ${error.message}`);
        config = {
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT) || 3306,
          user: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || '',
          database: process.env.DB_NAME || 'gonep',
          multipleStatements: true,
        };
      }
    } else {
      config = {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'gonep',
        multipleStatements: true,
      };
    }

    console.log('🔌 Connecting to database...');
    console.log(`   Host: ${config.host}`);
    console.log(`   Port: ${config.port}`);
    console.log(`   Database: ${config.database}`);
    console.log(`   User: ${config.user}`);
    
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');

    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'migration-packages', 'consolidated_migration.sql');
    
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL file not found: ${sqlFilePath}`);
    }

    console.log(`📖 Reading SQL file: ${sqlFilePath}`);
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('🚀 Executing migration...');
    console.log('   This may take a few minutes...');
    
    const startTime = Date.now();
    
    // Execute the SQL file
    await connection.query(sql);
    
    const duration = Date.now() - startTime;
    
    console.log(`✅ Migration completed successfully in ${duration}ms`);
    console.log('🎉 All tables and migrations have been applied!');

  } catch (error) {
    console.error('❌ Error running migration:', error.message);
    
    if (error.code === 'ER_DUP_FIELDNAME') {
      console.error('⚠️  Column already exists - migration may have been partially run');
    } else if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.error('⚠️  Table already exists - migration may have been partially run');
    } else if (error.code === 'ER_DUP_KEYNAME') {
      console.error('⚠️  Index already exists - migration may have been partially run');
    }
    
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the migration
runConsolidatedMigration()
  .then(() => {
    console.log('\n✅ Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Database setup failed:', error);
    process.exit(1);
  });

