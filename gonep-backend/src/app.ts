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
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:", "http://localhost:*"],
        fontSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https:", "http://localhost:*"],
        frameSrc: [
          "'self'",
          "https://www.youtube.com",
          "https://youtube.com",
          "https://www.youtube-nocookie.com",
          "https://player.vimeo.com",
          "https://vimeo.com",
          "https://www.dailymotion.com",
          "https://dailymotion.com",
          "https://www.facebook.com",
          "https://facebook.com",
          "https://www.instagram.com",
          "https://instagram.com",
          "https://www.tiktok.com",
          "https://tiktok.com",
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// CORS configuration
if (config.NODE_ENV === 'development') {
  // In development, allow all origins for convenience
  app.use(cors({ origin: true, credentials: true }));
  console.log('⚡ CORS: Development mode - all origins allowed');
} else {
  // Production - allow only .env + pre-defined origins
  const allowedOrigins = [
    config.FRONTEND_URL,
    config.ADMIN_URL,
    'http://localhost:8001',
    'http://localhost:8002',
    'http://localhost:8000',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:4173',
    'https://gonepharm.com/',
    'https://gonepadmin.vercel.app',
    'https://gonepbackend.vercel.app',
    'http://169.254.83.107:8001/',
    'http://10.34.204.2:8001',
    'https://*.vercel.app',
  ].filter(Boolean); // remove undefined if FRONTEND_URL or ADMIN_URL not set

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like curl, Postman, mobile apps)
        if (!origin) return callback(null, true);

        // Allow any localhost or Vercel domains for dev flexibility
        if (
          origin.includes('localhost') ||
          origin.includes('127.0.0.1') ||
          origin.includes('vercel.app')
        ) {
          return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        console.warn('CORS blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Cache-Control',
        'Pragma',
      ],
      optionsSuccessStatus: 200,
    })
  );

  console.log(`⚡ CORS: Production mode - allowed origins: ${allowedOrigins.join(', ')}`);
}

// Disable caching for API endpoints
app.use('/api', (req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    'Surrogate-Control': 'no-store',
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
    message: 'Please try again later',
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

// Routes and health endpoints
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API is running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    endpoints: { health: '/health', api: '/api', test: '/test' },
  });
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
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
      JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET',
    },
  });
});

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health endpoints
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GONEP API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: '1.0.0',
    deployment: 'Vercel Serverless',
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
    deployment: 'Vercel Serverless',
  });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  const startTime = Date.now();
  try {
    const { testConnection } = await import('./config/database');
    const isConnected = await testConnection();
    const responseTime = Date.now() - startTime;

    res.json({
      success: true,
      message: 'Database health check',
      database: isConnected ? 'connected' : 'disconnected',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      deployment: 'Vercel Serverless',
      status: isConnected ? 'healthy' : 'unhealthy',
    });
  } catch (error) {
    const responseTime = Date.now() - startTime;
    res.status(500).json({
      success: false,
      message: 'Database health check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      responseTime: `${responseTime}ms`,
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
      deployment: 'Vercel Serverless',
      status: 'error',
    });
  }
});

// Test DB connection endpoint
app.get('/api/test/connection', async (req, res) => {
  const startTime = Date.now();
  try {
    const { testConnection } = await import('./config/database');
    const dbConnected = await testConnection();
    const dbTime = Date.now() - startTime;

    res.json({
      success: true,
      message: 'Connection test completed',
      database: { connected: dbConnected, responseTime: `${dbTime}ms` },
      totalTime: `${Date.now() - startTime}ms`,
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    res.status(500).json({
      success: false,
      message: 'Connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      totalTime: `${totalTime}ms`,
      timestamp: new Date().toISOString(),
      environment: config.NODE_ENV,
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
    baseUrl: 'http://localhost:8000/api',
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
      video: '/api/video',
    },
    documentation: 'https://docs.gonep.com/api',
  });
});

// Error handlers
app.use(securityErrorHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);

export default app;
