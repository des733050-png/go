const mysql = require('mysql2/promise');
require('dotenv').config();

async function createBlogTables() {
  let connection;
  
  try {
    // Build connection config
    const config = {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    console.log('🔌 Connecting to database...');
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');

    // Create blog_categories table
    console.log('📝 Creating blog_categories table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`blog_categories\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`name\` varchar(100) NOT NULL,
        \`slug\` varchar(100) NOT NULL,
        \`description\` text,
        \`post_count\` int DEFAULT 0,
        \`is_active\` boolean DEFAULT true,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`blog_categories_slug_unique\` (\`slug\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ blog_categories table created');

    // Create blog_authors table
    console.log('👤 Creating blog_authors table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`blog_authors\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`name\` varchar(255) NOT NULL,
        \`bio\` text,
        \`image\` varchar(500),
        \`linkedin\` varchar(500),
        \`twitter\` varchar(500),
        \`email\` varchar(255),
        \`role\` varchar(100),
        \`department\` varchar(100),
        \`expertise\` json,
        \`is_active\` boolean DEFAULT true,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ blog_authors table created');

    // Create blog_posts table
    console.log('📄 Creating blog_posts table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`blog_posts\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`title\` varchar(255) NOT NULL,
        \`slug\` varchar(255) NOT NULL,
        \`excerpt\` text,
        \`content\` text NOT NULL,
        \`author_id\` int,
        \`category_id\` int,
        \`image\` varchar(500),
        \`featured\` boolean DEFAULT false,
        \`published\` boolean DEFAULT false,
        \`published_at\` timestamp NULL,
        \`read_time\` varchar(20),
        \`views\` int DEFAULT 0,
        \`comments_count\` int DEFAULT 0,
        \`tags\` json,
        \`meta_title\` varchar(255),
        \`meta_description\` text,
        \`seo_keywords\` json,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`blog_posts_slug_unique\` (\`slug\`),
        KEY \`blog_posts_category_idx\` (\`category_id\`),
        KEY \`blog_posts_author_idx\` (\`author_id\`),
        KEY \`blog_posts_featured_idx\` (\`featured\`),
        KEY \`blog_posts_published_idx\` (\`published\`),
        KEY \`blog_posts_published_at_idx\` (\`published_at\`),
        CONSTRAINT \`blog_posts_author_id_fkey\` FOREIGN KEY (\`author_id\`) REFERENCES \`blog_authors\` (\`id\`) ON DELETE SET NULL,
        CONSTRAINT \`blog_posts_category_id_fkey\` FOREIGN KEY (\`category_id\`) REFERENCES \`blog_categories\` (\`id\`) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ blog_posts table created');

    // Create blog_comments table
    console.log('💬 Creating blog_comments table...');
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS \`blog_comments\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`post_id\` int,
        \`user_id\` int,
        \`author_name\` varchar(255) NOT NULL,
        \`author_email\` varchar(255) NOT NULL,
        \`content\` text NOT NULL,
        \`is_approved\` boolean DEFAULT false,
        \`parent_id\` int,
        \`created_at\` timestamp DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`),
        KEY \`blog_comments_post_idx\` (\`post_id\`),
        KEY \`blog_comments_user_idx\` (\`user_id\`),
        KEY \`blog_comments_parent_idx\` (\`parent_id\`),
        CONSTRAINT \`blog_comments_post_id_fkey\` FOREIGN KEY (\`post_id\`) REFERENCES \`blog_posts\` (\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ blog_comments table created');

    console.log('🎉 All blog tables created successfully!');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the function
createBlogTables()
  .then(() => {
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  });

