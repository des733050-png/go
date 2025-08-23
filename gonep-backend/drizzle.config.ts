import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

// Build DATABASE_URL from individual components
const buildDatabaseUrl = () => {
  // First try to use DATABASE_URL if it exists
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Fallback to individual components
  const protocol = process.env.DB_PROTOCOL || 'mysql';
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || '3306';
  const database = process.env.DB_NAME;
  
  // Validate required environment variables
  if (!username || !password || !host || !database) {
    throw new Error('Missing required database environment variables. Please check your .env file.');
  }
  
  // Build connection string
  return `${protocol}://${username}:${password}@${host}:${port}/${database}`;
};

export default {
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  verbose: true,
  strict: true,
} satisfies Config;
