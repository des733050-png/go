#!/usr/bin/env node

/**
 * Check Users and Create Admin
 * Checks existing users and creates admin if needed
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function checkAndCreateAdmin() {
  try {
    console.log('🔍 Checking database users...');
    
    // Database connection
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
    });

    console.log('🔗 Connected to database');
    
    // Check existing users
    const [users] = await connection.execute(
      'SELECT id, email, first_name, last_name, role FROM users'
    );

    console.log(`📊 Found ${users.length} users in database:`);
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.first_name} ${user.last_name}) - Role: ${user.role}`);
    });

    // Check if admin exists
    const [adminUsers] = await connection.execute(
      'SELECT id, email, first_name, last_name, role FROM users WHERE email = ?',
      ['admin@gonep.com']
    );

    if (adminUsers.length > 0) {
      console.log('\n⚠️ Admin user already exists:');
      console.log(`   Email: ${adminUsers[0].email}`);
      console.log(`   Name: ${adminUsers[0].first_name} ${adminUsers[0].last_name}`);
      console.log(`   Role: ${adminUsers[0].role}`);
      
      // Update admin password to known value
      console.log('\n🔧 Updating admin password...');
      const newPasswordHash = await bcrypt.hash('password123', 12);
      
      await connection.execute(
        'UPDATE users SET password_hash = ? WHERE email = ?',
        [newPasswordHash, 'admin@gonep.com']
      );
      
      console.log('✅ Admin password updated to: password123');
    } else {
      console.log('\n👤 Creating new admin user...');
      
      // Create admin user
      const passwordHash = await bcrypt.hash('password123', 12);
      
      await connection.execute(
        `INSERT INTO users (
          email, 
          password_hash, 
          first_name, 
          last_name, 
          phone,
          organization,
          title,
          organization_type,
          country,
          role, 
          is_active, 
          email_verified
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          'admin@gonep.com',
          passwordHash,
          'Admin',
          'User',
          '+1234567890',
          'GONEP Healthcare',
          'System Administrator',
          'Healthcare',
          'United States',
          'admin',
          true,
          true
        ]
      );
      
      console.log('✅ Admin user created successfully!');
    }

    console.log('\n🎉 Admin credentials:');
    console.log('   Email: admin@gonep.com');
    console.log('   Password: password123');
    console.log('   Role: admin');

    await connection.end();
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

checkAndCreateAdmin();
