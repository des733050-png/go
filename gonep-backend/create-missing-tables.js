import mysql from 'mysql2/promise';

async function createMissingTables() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'gonep'
    });

    console.log('✅ Connected to MySQL database');

    // Create demo_requests table
    const createDemoRequestsTable = `
      CREATE TABLE IF NOT EXISTS demo_requests (
        id int AUTO_INCREMENT NOT NULL,
        first_name varchar(100) NOT NULL,
        last_name varchar(100) NOT NULL,
        email varchar(255) NOT NULL,
        phone varchar(50) NOT NULL,
        organization varchar(255) NOT NULL,
        title varchar(100) NOT NULL,
        organization_type varchar(50) NOT NULL,
        country varchar(100) NOT NULL,
        interests json,
        message text,
        demo_type varchar(50) NOT NULL,
        preferred_date timestamp NULL,
        attendee_count varchar(20),
        status varchar(50) DEFAULT 'pending',
        scheduled_at timestamp NULL,
        notes text,
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX email_idx (email),
        INDEX status_idx (status),
        INDEX demo_type_idx (demo_type)
      )
    `;

    // Create newsletter_subscribers table
    const createNewsletterSubscribersTable = `
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id int AUTO_INCREMENT NOT NULL,
        email varchar(255) NOT NULL,
        first_name varchar(100),
        last_name varchar(100),
        is_active boolean DEFAULT true,
        subscribed_at timestamp DEFAULT CURRENT_TIMESTAMP,
        unsubscribed_at timestamp NULL,
        source varchar(100),
        created_at timestamp DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY email_unique (email),
        INDEX email_idx (email),
        INDEX active_idx (is_active)
      )
    `;

    console.log('📝 Creating demo_requests table...');
    await connection.execute(createDemoRequestsTable);
    console.log('✅ demo_requests table created successfully');

    console.log('📝 Creating newsletter_subscribers table...');
    await connection.execute(createNewsletterSubscribersTable);
    console.log('✅ newsletter_subscribers table created successfully');

    // Check all tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('\n📊 All tables in database:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });

    await connection.end();
    console.log('\n🎉 All missing tables created successfully!');

  } catch (error) {
    console.error('❌ Error creating tables:', error.message);
  }
}

createMissingTables();
