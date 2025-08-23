import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
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

const databaseUrl = buildDatabaseUrl();

// Create connection function
export const createDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      uri: databaseUrl,
    });
    return drizzle(connection);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// Create MySQL connection pool for better performance
// Configure for serverless environment
const connection = mysql.createPool({
  uri: databaseUrl,
  waitForConnections: true,
  connectionLimit: process.env.NODE_ENV === 'production' ? 2 : 10, // Very low limit for serverless
  queueLimit: 0,
  // Serverless-specific settings
  ...(process.env.NODE_ENV === 'production' && {
    // For serverless, we want to close connections quickly
    idleTimeout: 15000, // 15 seconds - reduced for faster cleanup
    acquireTimeout: 10000, // 10 seconds to acquire connection
    timeout: 10000, // 10 seconds query timeout
  })
});

// Initialize Drizzle with the connection pool
export const db = drizzle(connection);

// Test database connection with better error handling
export const testConnection = async () => {
  try {
    await connection.execute('SELECT 1');
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    
    // In production, don't throw the error to prevent the app from crashing
    if (process.env.NODE_ENV === 'production') {
      console.error('Database connection failed in production, but continuing...');
      return false;
    }
    
    throw error;
  }
};

// Graceful shutdown for connection pool
export const closeDatabaseConnection = async () => {
  try {
    await connection.end();
    console.log('Database connection pool closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
  }
};


