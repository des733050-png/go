#!/usr/bin/env node

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const Table = require('cli-table3'); // npm install cli-table3

console.log('🚀 Starting Railway Database Migration with Table Report...');

// --- DATABASE CONFIG ---
function getDatabaseConfig() {
  require('dotenv').config();

  if (process.env.DATABASE_URL) {
    console.log('✅ Using DATABASE_URL for connection');
    console.log(
      '📊 Database URL:',
      process.env.DATABASE_URL.replace(/:[^:@]*@/, ':****@')
    );
    return process.env.DATABASE_URL;
  }

  const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_NAME'];
  const missingVars = requiredEnvVars.filter((v) => !process.env[v]);
  if (missingVars.length) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}.`
    );
  }

  console.log('✅ Using individual DB_* environment variables for connection');
  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    multipleStatements: true,
    charset: 'utf8mb4',
  };
}

// --- EXPORT TABLE STRUCTURE TO FILE ---
async function exportTableStructure(connection, tableName) {
  const [columns] = await connection.query(`SHOW COLUMNS FROM \`${tableName}\``);

  const table = new Table({
    head: ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'],
    style: { head: ['green'] },
  });

  columns.forEach((col) => {
    table.push([col.Field, col.Type, col.Null, col.Key, col.Default, col.Extra]);
  });

  const fileName = `${tableName}.txt`;
  const filePath = path.join(__dirname, 'table_reports', fileName);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  fs.writeFileSync(filePath, table.toString());
  console.log(`📄 Table structure exported: ${filePath}`);
}

// --- RUN MIGRATION ---
async function runMigrations() {
  let connection;
  try {
    const dbConfig = getDatabaseConfig();
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully');

    // Read SQL file
    const sqlFilePath = path.join(
      __dirname,
      'src',
      'database',
      'full',
      'complete-migration.sql'
    );

    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL file not found: ${sqlFilePath}`);
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    const sqlBlocks = sqlContent.split(/;[\r\n]+/).filter((b) => b.trim());
    console.log(`📖 Found ${sqlBlocks.length} SQL blocks.`);

    const createdTables = [];

    for (const block of sqlBlocks) {
      await connection.query(block);

      const match = block.match(/CREATE TABLE IF NOT EXISTS `(\w+)`/i);
      if (match) {
        const tableName = match[1];
        console.log(`✅ Table created: ${tableName}`);
        createdTables.push(tableName);
      }
    }

    console.log('🎉 Migration finished!');

    // Export structure of each created table
    for (const tableName of createdTables) {
      await exportTableStructure(connection, tableName);
    }
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// --- RUN ---
runMigrations()
  .then(() => {
    console.log('\n✅ Migration & table reports completed successfully!');
    process.exit(0);
  })
  .catch(() => {
    console.error('\n❌ Migration process ended with errors.');
    process.exit(1);
  });



