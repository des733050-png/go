const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkDatabase() {
  let connection;
  
  try {
    const config = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');

    // Check blog_categories
    console.log('\n📝 Blog Categories:');
    const [categories] = await connection.execute('SELECT * FROM blog_categories');
    console.log(categories);

    // Check blog_authors
    console.log('\n👤 Blog Authors:');
    const [authors] = await connection.execute('SELECT * FROM blog_authors');
    console.log(authors);

    // Check blog_posts
    console.log('\n📄 Blog Posts:');
    const [posts] = await connection.execute('SELECT id, title, slug FROM blog_posts');
    console.log(posts);

    // Check job_openings
    console.log('\n💼 Job Openings:');
    const [jobs] = await connection.execute('SELECT id, title, slug FROM job_openings');
    console.log(jobs);

  } catch (error) {
    console.error('❌ Error checking database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkDatabase();

