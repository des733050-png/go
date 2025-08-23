#!/usr/bin/env node

/**
 * Complete Database Migration Script
 * This script ensures all database tables are created by running migrations in the correct order
 */

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
  charset: 'utf8mb4'
};

// Migration files in order
const migrationFiles = [
  '0000_conscious_hiroim.sql',
  '0001_superb_talkback.sql',
  '0001_add_job_details_fields.sql',
  '0002_hard_devos.sql',
  '0002_update_demo_requests_table.sql',
  '0003_busy_thunderbolt.sql',
  '0003_enhance_team_members_table.sql',
  '0004_create_demo_config_tables.sql',
  '0005_create_demo_videos_table.sql',
  '0005_add_placement_to_demo_videos.sql'
];

class DatabaseMigrator {
  constructor() {
    this.connection = null;
    this.migrationsPath = path.join(__dirname, 'src', 'database', 'migrations');
  }

  async connect() {
    try {
      console.log('🔌 Connecting to database...');
      this.connection = await mysql.createConnection(dbConfig);
      console.log('✅ Database connected successfully');
    } catch (error) {
      console.error('❌ Failed to connect to database:', error.message);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      console.log('🔌 Database connection closed');
    }
  }

  async checkDatabaseExists() {
    try {
      console.log('🔍 Checking database connection...');
      console.log(`   Host: ${dbConfig.host}`);
      console.log(`   Port: ${dbConfig.port}`);
      console.log(`   User: ${dbConfig.user}`);
      console.log(`   Database: ${dbConfig.database}`);
      
      // Connect without specifying database
      const tempConfig = { ...dbConfig };
      delete tempConfig.database;
      
      console.log('🔌 Testing connection to MySQL server...');
      const tempConnection = await mysql.createConnection(tempConfig);
      console.log('✅ Successfully connected to MySQL server');
      
      // Check if database exists
      console.log(`🔍 Checking if database '${dbConfig.database}' exists...`);
      const [rows] = await tempConnection.execute(
        'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
        [dbConfig.database]
      );
      
      await tempConnection.end();
      
      if (rows.length === 0) {
        console.log(`📁 Database '${dbConfig.database}' does not exist. Creating...`);
        await this.createDatabase();
      } else {
        console.log(`✅ Database '${dbConfig.database}' exists`);
      }
    } catch (error) {
      console.error('❌ Error checking database:', error.message);
      console.error('\n🔧 Troubleshooting tips for cPanel/phpMyAdmin:');
      console.error('   1. Check your .env file has correct credentials');
      console.error('   2. Verify database username and password in cPanel');
      console.error('   3. Ensure database exists in phpMyAdmin');
      console.error('   4. Check if your hosting allows external connections');
      console.error('   5. Try using your cPanel domain instead of localhost');
      console.error('\n📝 Example .env configuration:');
      console.error('   DB_HOST=yourdomain.com');
      console.error('   DB_PORT=3306');
      console.error('   DB_USERNAME=yourusername_admin');
      console.error('   DB_PASSWORD=your_password');
      console.error('   DB_NAME=yourusername_gonep');
      throw error;
    }
  }

  async createDatabase() {
    try {
      const tempConfig = { ...dbConfig };
      delete tempConfig.database;
      const tempConnection = await mysql.createConnection(tempConfig);
      
      await tempConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      console.log(`✅ Database '${dbConfig.database}' created successfully`);
      
      await tempConnection.end();
    } catch (error) {
      console.error('❌ Error creating database:', error.message);
      throw error;
    }
  }

  async createMigrationsTable() {
    try {
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS \`migrations\` (
          \`id\` int(11) NOT NULL AUTO_INCREMENT,
          \`filename\` varchar(255) NOT NULL,
          \`executed_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
          \`status\` enum('success','failed') NOT NULL DEFAULT 'success',
          \`error_message\` text,
          PRIMARY KEY (\`id\`),
          UNIQUE KEY \`filename\` (\`filename\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `;
      
      await this.connection.execute(createTableSQL);
      console.log('✅ Migrations table created/verified');
    } catch (error) {
      console.error('❌ Error creating migrations table:', error.message);
      throw error;
    }
  }

  async getExecutedMigrations() {
    try {
      const [rows] = await this.connection.execute('SELECT filename FROM migrations WHERE status = "success"');
      return rows.map(row => row.filename);
    } catch (error) {
      console.error('❌ Error getting executed migrations:', error.message);
      return [];
    }
  }

  async markMigrationAsExecuted(filename, status = 'success', errorMessage = null) {
    try {
      if (status === 'success') {
        await this.connection.execute(
          'INSERT INTO migrations (filename, status) VALUES (?, ?) ON DUPLICATE KEY UPDATE executed_at = CURRENT_TIMESTAMP, status = ?',
          [filename, status, status]
        );
      } else {
        await this.connection.execute(
          'INSERT INTO migrations (filename, status, error_message) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE executed_at = CURRENT_TIMESTAMP, status = ?, error_message = ?',
          [filename, status, errorMessage, status, errorMessage]
        );
      }
    } catch (error) {
      console.error(`❌ Error marking migration ${filename}:`, error.message);
    }
  }

  async runMigration(filename) {
    try {
      console.log(`\n🔄 Running migration: ${filename}`);
      
      const filePath = path.join(this.migrationsPath, filename);
      const sqlContent = await fs.readFile(filePath, 'utf8');
      
      // Split SQL statements and execute them
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
      
      for (const statement of statements) {
        if (statement.trim()) {
          await this.connection.execute(statement);
        }
      }
      
      await this.markMigrationAsExecuted(filename, 'success');
      console.log(`✅ Migration ${filename} completed successfully`);
      return true;
      
    } catch (error) {
      console.error(`❌ Migration ${filename} failed:`, error.message);
      await this.markMigrationAsExecuted(filename, 'failed', error.message);
      return false;
    }
  }

  async testConnection() {
    try {
      console.log('🧪 Testing database connection...');
      console.log('📋 Current configuration:');
      console.log(`   Host: ${dbConfig.host}`);
      console.log(`   Port: ${dbConfig.port}`);
      console.log(`   User: ${dbConfig.user}`);
      console.log(`   Database: ${dbConfig.database}`);
      
      // Test connection without database
      const tempConfig = { ...dbConfig };
      delete tempConfig.database;
      
      const tempConnection = await mysql.createConnection(tempConfig);
      console.log('✅ Successfully connected to MySQL server');
      
      // Test if we can access the specific database
      try {
        await tempConnection.execute(`USE \`${dbConfig.database}\``);
        console.log(`✅ Successfully connected to database '${dbConfig.database}'`);
      } catch (dbError) {
        console.log(`⚠️  Database '${dbConfig.database}' doesn't exist or access denied`);
        console.log(`   Error: ${dbError.message}`);
      }
      
      await tempConnection.end();
      return true;
      
    } catch (error) {
      console.error('❌ Connection test failed:', error.message);
      return false;
    }
  }

  async runAllMigrations() {
    try {
      console.log('🚀 Starting database migration process...\n');
      
      // Check and create database if needed
      await this.checkDatabaseExists();
      
      // Connect to the specific database
      await this.connect();
      
      // Create migrations tracking table
      await this.createMigrationsTable();
      
      // Get already executed migrations
      const executedMigrations = await this.getExecutedMigrations();
      console.log(`📋 Found ${executedMigrations.length} previously executed migrations`);
      
      // Filter out already executed migrations
      const pendingMigrations = migrationFiles.filter(file => !executedMigrations.includes(file));
      
      if (pendingMigrations.length === 0) {
        console.log('✅ All migrations are already up to date!');
        return;
      }
      
      console.log(`📝 Found ${pendingMigrations.length} pending migrations:`);
      pendingMigrations.forEach(file => console.log(`   - ${file}`));
      
      // Run pending migrations
      let successCount = 0;
      let failureCount = 0;
      
      for (const migration of pendingMigrations) {
        const success = await this.runMigration(migration);
        if (success) {
          successCount++;
        } else {
          failureCount++;
        }
      }
      
      // Summary
      console.log('\n📊 Migration Summary:');
      console.log(`   ✅ Successful: ${successCount}`);
      console.log(`   ❌ Failed: ${failureCount}`);
      console.log(`   📁 Total: ${pendingMigrations.length}`);
      
      if (failureCount > 0) {
        console.log('\n⚠️  Some migrations failed. Check the logs above for details.');
        process.exit(1);
      } else {
        console.log('\n🎉 All migrations completed successfully!');
      }
      
    } catch (error) {
      console.error('\n💥 Migration process failed:', error.message);
      process.exit(1);
    } finally {
      await this.disconnect();
    }
  }

  async verifyTables() {
    try {
      console.log('\n🔍 Verifying created tables...');
      
      const [tables] = await this.connection.execute(
        'SHOW TABLES'
      );
      
      const tableNames = tables.map(row => Object.values(row)[0]);
      
      console.log(`📋 Found ${tableNames.length} tables:`);
      tableNames.forEach(table => console.log(`   - ${table}`));
      
      // Check for key tables
      const keyTables = [
        'users', 'blog_posts', 'blog_categories', 'blog_authors',
        'team_members', 'demo_requests', 'newsletter_subscribers',
        'partners', 'careers', 'contact_inquiries'
      ];
      
      console.log('\n🔑 Key tables status:');
      keyTables.forEach(table => {
        const exists = tableNames.includes(table);
        console.log(`   ${exists ? '✅' : '❌'} ${table}`);
      });
      
    } catch (error) {
      console.error('❌ Error verifying tables:', error.message);
    }
  }
}

// Main execution
async function main() {
  const migrator = new DatabaseMigrator();
  
  try {
    await migrator.runAllMigrations();
    
    // Reconnect to verify tables
    await migrator.connect();
    await migrator.verifyTables();
    
  } catch (error) {
    console.error('💥 Migration script failed:', error.message);
    process.exit(1);
  } finally {
    await migrator.disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });
}

module.exports = DatabaseMigrator;
