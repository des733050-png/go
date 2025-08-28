"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = __importDefault(require("./routes/auth"));
const blog_1 = __importDefault(require("./routes/blog"));
const team_1 = __importDefault(require("./routes/team"));
const careers_1 = __importDefault(require("./routes/careers"));
const demo_1 = __importDefault(require("./routes/demo"));
const demoConfig_1 = __importDefault(require("./routes/demoConfig"));
const contact_1 = __importDefault(require("./routes/contact"));
const newsletter_1 = __importDefault(require("./routes/newsletter"));
const partners_1 = __importDefault(require("./routes/partners"));
const analytics_1 = __importDefault(require("./routes/analytics"));
const upload_1 = __importDefault(require("./routes/upload"));
const video_1 = __importDefault(require("./routes/video"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
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
                "https://tiktok.com"
            ],
            objectSrc: ["'none'"],
            baseUri: ["'self'"],
            formAction: ["'self'"],
            frameAncestors: ["'none'"],
            upgradeInsecureRequests: []
        },
    },
}));
const allowedOrigins = [
    config_1.config.FRONTEND_URL,
    config_1.config.ADMIN_URL,
    'http://localhost:8001',
    'http://localhost:8002',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'http://localhost:4173',
    'https://gonepharm-pearl.vercel.app',
    'https://gonepadmin.vercel.app',
    'https://gonepbackend.vercel.app',
    'https://*.vercel.app'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        if (origin.includes('vercel.app')) {
            return callback(null, true);
        }
        if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Cache-Control', 'Pragma'],
    optionsSuccessStatus: 200
}));
app.use('/api', (req, res, next) => {
    res.set({
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
    });
    next();
});
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: config_1.config.RATE_LIMIT_MAX,
    message: {
        success: false,
        error: 'Too many requests',
        message: 'Please try again later'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use((0, compression_1.default)());
app.use('/api/uploads', express_1.default.static(config_1.config.UPLOAD_PATH));
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'GONEP API is running',
        timestamp: new Date().toISOString(),
        environment: config_1.config.NODE_ENV,
        version: '1.0.0',
        endpoints: {
            health: '/health',
            api: '/api',
            test: '/test'
        }
    });
});
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
app.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Server is working!',
        timestamp: new Date().toISOString(),
        environment: config_1.config.NODE_ENV,
        env: {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
            JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET'
        }
    });
});
if (config_1.config.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else {
    app.use((0, morgan_1.default)('combined'));
}
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'GONEP API is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config_1.config.NODE_ENV,
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
        environment: config_1.config.NODE_ENV,
        version: '1.0.0',
        deployment: 'Vercel Serverless'
    });
});
app.get('/api/health/db', async (req, res) => {
    const startTime = Date.now();
    try {
        const { testConnection } = await Promise.resolve().then(() => __importStar(require('./config/database')));
        const isConnected = await testConnection();
        const responseTime = Date.now() - startTime;
        res.json({
            success: true,
            message: 'Database health check',
            database: isConnected ? 'connected' : 'disconnected',
            responseTime: `${responseTime}ms`,
            timestamp: new Date().toISOString(),
            environment: config_1.config.NODE_ENV,
            deployment: 'Vercel Serverless',
            status: isConnected ? 'healthy' : 'unhealthy'
        });
    }
    catch (error) {
        const responseTime = Date.now() - startTime;
        res.status(500).json({
            success: false,
            message: 'Database health check failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            responseTime: `${responseTime}ms`,
            timestamp: new Date().toISOString(),
            environment: config_1.config.NODE_ENV,
            deployment: 'Vercel Serverless',
            status: 'error'
        });
    }
});
app.get('/api/test/connection', async (req, res) => {
    const startTime = Date.now();
    try {
        const { testConnection } = await Promise.resolve().then(() => __importStar(require('./config/database')));
        const dbConnected = await testConnection();
        const dbTime = Date.now() - startTime;
        res.json({
            success: true,
            message: 'Connection test completed',
            database: {
                connected: dbConnected,
                responseTime: `${dbTime}ms`
            },
            totalTime: `${Date.now() - startTime}ms`,
            timestamp: new Date().toISOString(),
            environment: config_1.config.NODE_ENV
        });
    }
    catch (error) {
        const totalTime = Date.now() - startTime;
        res.status(500).json({
            success: false,
            message: 'Connection test failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            totalTime: `${totalTime}ms`,
            timestamp: new Date().toISOString(),
            environment: config_1.config.NODE_ENV
        });
    }
});
app.use('/api/auth', auth_1.default);
app.use('/api/blog', blog_1.default);
app.use('/api/team', team_1.default);
app.use('/api/careers', careers_1.default);
app.use('/api/demo', demo_1.default);
app.use('/api/demo/config', demoConfig_1.default);
app.use('/api/contact', contact_1.default);
app.use('/api/newsletter', newsletter_1.default);
app.use('/api/partners', partners_1.default);
app.use('/api/analytics', analytics_1.default);
app.use('/api/upload', upload_1.default);
app.use('/api/video', video_1.default);
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
app.use(errorHandler_1.securityErrorHandler);
app.use('*', errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map