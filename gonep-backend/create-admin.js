const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdminUser() {
  try {
    console.log('🔍 Starting admin user creation...');
    
    // Database connection
    const connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
    });

    console.log('🔗 Connected to database');
    
    // Check if admin user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@gonep.com']
    );

    if (existingUsers.length > 0) {
      console.log('⚠️ Admin user already exists');
      await connection.end();
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash('Admin@123', 12);
    
    // Create admin user
    const [result] = await connection.execute(
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
        'GONEP',
        'System Administrator',
        'technology',
        'United States',
        'admin',
        true,
        true
      ]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gonep.com');
    console.log('🔑 Password: Admin@123');
    console.log('🆔 User ID:', result.insertId);
    console.log('⚠️ Please change the password after first login!');

    await connection.end();
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();
