# GONEP Backend API

A robust Node.js/Express API server for the GONEP healthcare platform with TypeScript, MySQL, and comprehensive authentication.

## 🚀 Quick Start

```bash
npm install
cp env.example .env
# Edit .env with your database credentials
npm run dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Send password reset email
- `POST /api/auth/reset-password` - Reset password with token

### Blog Management
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/:slug` - Get blog post by slug
- `POST /api/blog/posts` - Create blog post (Admin)
- `PUT /api/blog/posts/:id` - Update blog post (Admin)
- `DELETE /api/blog/posts/:id` - Delete blog post (Admin)
- `GET /api/blog/categories` - Get blog categories
- `GET /api/blog/authors` - Get blog authors

### Team Management
- `GET /api/team` - Get all team members
- `GET /api/team/:id` - Get team member by ID
- `POST /api/team` - Create team member (Admin)
- `PUT /api/team/:id` - Update team member (Admin)
- `DELETE /api/team/:id` - Delete team member (Admin)
- `GET /api/team/values` - Get team values

### Careers
- `GET /api/careers/jobs` - Get all job openings
- `GET /api/careers/jobs/:id` - Get job by ID
- `POST /api/careers/jobs` - Create job opening (Admin)
- `PUT /api/careers/jobs/:id` - Update job opening (Admin)
- `DELETE /api/careers/jobs/:id` - Delete job opening (Admin)
- `POST /api/careers/jobs/:id/apply` - Submit job application
- `GET /api/careers/departments` - Get departments

### Demo Management
- `POST /api/demo/request` - Submit demo request
- `GET /api/demo/config` - Get demo configuration
- `GET /api/demo/types` - Get demo types
- `GET /api/demo/interests` - Get demo interests

### Video Management
- `GET /api/video` - Get all videos
- `GET /api/video/:id` - Get video by ID
- `GET /api/video/placement/:placement` - Get videos by placement
- `POST /api/video` - Create video (Admin)
- `PUT /api/video/:id` - Update video (Admin)
- `DELETE /api/video/:id` - Delete video (Admin)

### Contact & Newsletter
- `POST /api/contact` - Submit contact form
- `GET /api/contact/methods` - Get contact methods
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### File Upload
- `POST /api/upload` - Upload file (Authenticated)
- `DELETE /api/upload/:id` - Delete file (Authenticated)

### Analytics
- `POST /api/analytics/pageview` - Track page view
- `POST /api/analytics/event` - Track custom event

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: MySQL with Drizzle ORM
- **Authentication**: JWT with refresh tokens
- **File Upload**: Multer with Cloudinary
- **Email**: Nodemailer with Gmail SMTP
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate limiting

## 📁 Project Structure

```
src/
├── config/           # Configuration files
│   ├── database.ts   # Database connection
│   └── index.ts      # Environment config
├── controllers/      # Route controllers
├── database/         # Database schema and migrations
│   ├── migrations/   # Drizzle migrations
│   └── schema/       # Database schema
├── middleware/       # Express middleware
├── routes/           # API routes
├── services/         # Business logic services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── index.ts          # Server entry point
```

## 🔧 Development

### Environment Variables

Create a `.env` file based on `env.example`:

```env
# Server Configuration
NODE_ENV=development
PORT=8000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-refresh-token-secret
REFRESH_TOKEN_EXPIRES_IN=30d

# Database Configuration
DATABASE_URL=mysql://user:password@host:port/database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=gonep_db

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@gonep.com

# File Upload Configuration
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760

# Rate Limiting
RATE_LIMIT_MAX=100

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URLs for CORS
FRONTEND_URL=http://localhost:8001
ADMIN_URL=http://localhost:8002
CORS_ORIGIN=http://localhost:8001

# API Base URL
API_BASE_URL=http://localhost:8000
```

### Database Setup

```bash
# Run migrations
npm run migrate

# Seed initial data
npm run seed

# Check database status
npm run db:status
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run seed         # Seed database
npm run studio       # Open Drizzle Studio
npm run test         # Run tests
```

## 🔐 Authentication & Authorization

### JWT Tokens
- **Access Token**: Short-lived (7 days) for API access
- **Refresh Token**: Long-lived (30 days) for token renewal

### User Roles
- **User**: Basic access to public endpoints
- **Moderator**: Can manage content (blogs, team)
- **Admin**: Full access to all endpoints

### Protected Routes
Use the `authenticateToken` middleware for protected routes:
```typescript
router.get('/protected', authenticateToken, (req, res) => {
  // Access user info via req.user
});
```

## 📊 Database Schema

### Core Tables
- `users` - User accounts and profiles
- `blog_posts` - Blog articles
- `blog_categories` - Blog categories
- `blog_authors` - Blog authors
- `team_members` - Team member profiles
- `job_openings` - Career opportunities
- `demo_requests` - Demo requests
- `demo_videos` - Video content
- `newsletter_subscribers` - Newsletter subscriptions
- `contact_inquiries` - Contact form submissions

## 🚀 Deployment

### Railway Deployment
1. Connect GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push to main branch

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Set environment variables in Vercel dashboard

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production database credentials
- Configure production email service
- Set secure JWT secrets
- Update CORS origins for production domains

## 🧪 Testing

Test files are located in the `tests/` directory:

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/auth.test.js
```

## 📚 API Documentation

- **Health Check**: `GET /health`
- **API Info**: `GET /`
- **Database Health**: `GET /api/health/db`

## 🔒 Security Features

- JWT authentication with refresh tokens
- Role-based access control
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation with Joi
- SQL injection protection with Drizzle ORM
- File upload security with type checking

## 🆘 Troubleshooting

### Database Connection Issues
1. Check database credentials in `.env`
2. Ensure database server is running
3. Verify network connectivity
4. Check firewall settings

### JWT Issues
1. Verify JWT_SECRET is set
2. Check token expiration times
3. Ensure proper token format

### File Upload Issues
1. Check upload directory permissions
2. Verify file size limits
3. Ensure Cloudinary credentials are set

## 📞 Support

For issues and questions:
1. Check the logs in the console
2. Review the test files in `tests/`
3. Check the database connection status
4. Verify environment variables are set correctly
