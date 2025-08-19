const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    // Database connection
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'gonep'
    });

    console.log('🔗 Connected to database');

    // Hash password
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 12);

    // Check if admin user already exists
    const [existingUsers] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      ['admin@gonep.com']
    );

    if (existingUsers.length > 0) {
      console.log('✅ Admin user already exists');
      await connection.end();
      return;
    }

    // Create admin user
    const [result] = await connection.execute(
      `INSERT INTO users (
        email, 
        password_hash, 
        first_name, 
        last_name, 
        role, 
        is_active, 
        email_verified,
        organization,
        title
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'admin@gonep.com',
        hashedPassword,
        'Admin',
        'User',
        'admin',
        true,
        true,
        'GONEP',
        'System Administrator'
      ]
    );

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@gonep.com');
    console.log('🔑 Password: password123');
    console.log('🆔 User ID:', result.insertId);

    await connection.end();
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
