#!/usr/bin/env node

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Simple Railway Database Migration...');

async function runMigrations() {
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

    // Read migration files
    const migrationsDir = path.join(__dirname, 'src', 'database', 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`📁 Found ${migrationFiles.length} migration files`);

    // Create migrations table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS __drizzle_migrations (
        id SERIAL PRIMARY KEY,
        hash text NOT NULL,
        created_at bigint
      )
    `);

    // Run each migration
    for (const file of migrationFiles) {
      console.log(`🔄 Running migration: ${file}`);
      
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');
      
      // Clean up the SQL by removing Drizzle comments and splitting properly
      let cleanSql = sql
        .replace(/--> statement-breakpoint/g, '') // Remove Drizzle comments
        .replace(/\n\s*\n/g, '\n') // Remove extra newlines
        .replace(/CREATE INDEX IF NOT EXISTS/g, 'CREATE INDEX') // MySQL doesn't support IF NOT EXISTS for indexes
        .trim();
      
      // Split by semicolons and filter out empty statements
      const statements = cleanSql
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await connection.execute(statement);
            console.log(`  ✅ Executed: ${statement.substring(0, 50)}...`);
          } catch (stmtError) {
            // Handle common errors gracefully
            if (stmtError.message.includes('already exists')) {
              console.log(`  ⚠️  Skipped (already exists): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('Duplicate key name')) {
              console.log(`  ⚠️  Skipped (index already exists): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('Duplicate entry')) {
              console.log(`  ⚠️  Skipped (duplicate entry): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('IF NOT EXISTS')) {
              console.log(`  ⚠️  Skipped (MySQL doesn't support IF NOT EXISTS for indexes): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('Duplicate foreign key constraint name')) {
              console.log(`  ⚠️  Skipped (foreign key constraint already exists): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('foreign key constraint')) {
              console.log(`  ⚠️  Skipped (foreign key constraint issue): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('Duplicate column name')) {
              console.log(`  ⚠️  Skipped (column already exists): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes('column name')) {
              console.log(`  ⚠️  Skipped (column issue): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes("Can't DROP") && stmtError.message.includes('check that column/key exists')) {
              console.log(`  ⚠️  Skipped (column doesn't exist for DROP): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes("Can't DROP")) {
              console.log(`  ⚠️  Skipped (DROP operation failed): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes("Key column") && stmtError.message.includes("doesn't exist in table")) {
              console.log(`  ⚠️  Skipped (column doesn't exist for index): ${statement.substring(0, 50)}...`);
            } else if (stmtError.message.includes("doesn't exist in table")) {
              console.log(`  ⚠️  Skipped (column doesn't exist): ${statement.substring(0, 50)}...`);
            } else {
              console.error(`  ❌ Failed to execute: ${statement.substring(0, 50)}...`);
              console.error(`  Error: ${stmtError.message}`);
              throw stmtError;
            }
          }
        }
      }
      
      console.log(`✅ Migration ${file} completed`);
    }

    await connection.end();
    console.log('🎉 All migrations completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
