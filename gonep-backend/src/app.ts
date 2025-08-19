import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler, notFoundHandler, securityErrorHandler } from './middleware/errorHandler';

// Import routes
import authRoutes from './routes/auth';
import blogRoutes from './routes/blog';
import teamRoutes from './routes/team';
import careersRoutes from './routes/careers';
import demoRoutes from './routes/demo';
import demoConfigRoutes from './routes/demoConfig';
import contactRoutes from './routes/contact';
import newsletterRoutes from './routes/newsletter';
import partnersRoutes from './routes/partners';
import analyticsRoutes from './routes/analytics';
import uploadRoutes from './routes/upload';
import videoRoutes from './routes/video';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http://localhost:*"],
    },
  },
}));

// CORS configuration for production
const allowedOrigins = [
  config.FRONTEND_URL,
  config.ADMIN_URL,
  'http://localhost:8001',
  'http://localhost:8002',
  'http://localhost:3000',
  'http://localhost:3001',
  'https://gonepharm-pearl.vercel.app',
  'https://gonepadmin.vercel.app',
  'https://gonepbackend.vercel.app',
  'https://*.vercel.app',
  'https://*.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all Vercel domains
    if (origin.includes('vercel.app')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cache-Control', 'Pragma'],
  optionsSuccessStatus: 200
}));

// Disable caching for API endpoints
app.use('/api', (req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.RATE_LIMIT_MAX,
  message: {
    success: false,
    error: 'Too many requests',
    message: 'Please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Serve uploaded files
app.use('/api/uploads', express.static(config.UPLOAD_PATH));

// Serve index.html for root route - with error handling
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API is running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      test: '/test'
    }
  });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // No content
});

// Simple test endpoint for debugging
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is working!',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET'
    }
  });
});

// Logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoints
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    deployment: 'Vercel Serverless'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    deployment: 'Vercel Serverless'
  });
});

// Database health check endpoint
app.get('/api/health/db', async (req, res) => {
  try {
    const { testConnection } = await import('./config/database');
    const isConnected = await testConnection();
    res.json({
      success: true,
      message: 'Database health check',
      database: isConnected ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      deployment: 'Vercel Serverless'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      deployment: 'Vercel Serverless'
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/demo/config', demoConfigRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/partners', partnersRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/video', videoRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API Documentation',
    version: '1.0.0',
    deployment: 'Vercel Serverless',
    baseUrl: 'https://gonepbackend.vercel.app',
    endpoints: {
      health: '/health',
      apiHealth: '/api/health',
      dbHealth: '/api/health/db',
      auth: '/api/auth',
      blog: '/api/blog',
      team: '/api/team',
      careers: '/api/careers',
      demo: '/api/demo',
      contact: '/api/contact',
      newsletter: '/api/newsletter',
      partners: '/api/partners',
      analytics: '/api/analytics',
      upload: '/api/upload',
      video: '/api/video'
    },
    documentation: 'https://docs.gonep.com/api'
  });
});

// Security error handling
app.use(securityErrorHandler);

// 404 handler for unmatched routes
app.use('*', notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

export default app;
