#!/usr/bin/env node

/**
 * Direct Admin User Creation Script (fixed for snake_case DB columns)
 */

const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function getDatabaseConnection() {
  let connectionConfig;

  if (process.env.DATABASE_URL) {
    connectionConfig = process.env.DATABASE_URL;
    console.log('✅ Using DATABASE_URL for connection');
  } else {
    connectionConfig = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME,
      multipleStatements: true,
      charset: 'utf8mb4',
      ssl: false
    };
    console.log('✅ Using DB_* environment variables for connection');
  }

  const connection = await mysql.createConnection(connectionConfig);
  console.log('📊 Database connected successfully');
  return connection;
}

async function createAdminUser() {
  const connection = await getDatabaseConnection();

  const email = 'admin@gonep.com';
  const password = 'password123';
  const first_name = 'Admin';
  const last_name = 'User';
  const phone = '+1234567890';
  const organization = 'GONEP Healthcare';
  const title = 'System Administrator';
  const organization_type = 'Healthcare';
  const country = 'United States';
  const role = 'admin';

  // Hash the password
  const password_hash = await bcrypt.hash(password, 10);

  try {
    // Check if admin user already exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      console.log(`⚠️  Admin user with email "${email}" already exists`);
      return;
    }

    // Insert admin user
    const [result] = await connection.execute(
      `INSERT INTO users 
      (first_name, last_name, email, password_hash, phone, organization, title, organization_type, country, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [first_name, last_name, email, password_hash, phone, organization, title, organization_type, country, role]
    );

    console.log(`🎉 Admin user created successfully!`);
    console.log(`👤 Name: ${first_name} ${last_name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🏷️ Role: ${role}`);
    console.log(`🆔 User ID: ${result.insertId}`);
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
  } finally {
    await connection.end();
    console.log('📴 Database connection closed');
  }
}

// Run the script
createAdminUser().catch(console.error);
