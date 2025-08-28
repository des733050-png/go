"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.testConnection = exports.db = exports.createDatabaseConnection = void 0;
const mysql2_1 = require("drizzle-orm/mysql2");
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const buildDatabaseUrl = () => {
    if (process.env.DATABASE_URL) {
        return process.env.DATABASE_URL;
    }
    const protocol = process.env.DB_PROTOCOL || 'mysql';
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const host = process.env.DB_HOST;
    const port = process.env.DB_PORT || '3306';
    const database = process.env.DB_NAME;
    if (!username || !password || !host || !database) {
        throw new Error('Missing required database environment variables. Please check your .env file.');
    }
    return `${protocol}://${username}:${password}@${host}:${port}/${database}`;
};
const databaseUrl = buildDatabaseUrl();
const createDatabaseConnection = async () => {
    try {
        const connection = await promise_1.default.createConnection({
            uri: databaseUrl,
        });
        return (0, mysql2_1.drizzle)(connection);
    }
    catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};
exports.createDatabaseConnection = createDatabaseConnection;
const connection = promise_1.default.createPool({
    uri: databaseUrl,
    waitForConnections: true,
    connectionLimit: process.env.NODE_ENV === 'production' ? 5 : 10,
    queueLimit: 0,
    ...(process.env.NODE_ENV === 'production' && {
        idleTimeout: 60000,
        multipleStatements: true,
        charset: 'utf8mb4'
    })
});
exports.db = (0, mysql2_1.drizzle)(connection);
const testConnection = async () => {
    try {
        await connection.execute('SELECT 1');
        console.log('✅ Database connected successfully');
        return true;
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        if (process.env.NODE_ENV === 'production') {
            console.error('Database connection failed in production, but continuing...');
            return false;
        }
        throw error;
    }
};
exports.testConnection = testConnection;
const closeDatabaseConnection = async () => {
    try {
        await connection.end();
        console.log('Database connection pool closed');
    }
    catch (error) {
        console.error('Error closing database connection:', error);
    }
};
exports.closeDatabaseConnection = closeDatabaseConnection;
//# sourceMappingURL=database.js.map