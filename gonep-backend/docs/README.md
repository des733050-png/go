# GONEP Backend API

A modern, scalable backend API for the GONEP healthcare technology website, built with Node.js, Express, TypeScript, and MySQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Blog Management**: Full CRUD operations for blog posts with comments and moderation
- **Team Management**: Team member profiles and leadership information
- **Careers**: Job openings and application management
- **Demo Requests**: Demo scheduling and management system
- **Contact Management**: Inquiry handling and customer support
- **Newsletter**: Subscription management
- **Partners**: Partner information and relationships
- **Analytics**: User interaction tracking and analytics dashboard
- **File Upload**: Secure file upload with Cloudinary integration
- **Email Service**: Automated email notifications and confirmations
- **Security**: Rate limiting, CORS, helmet, input validation
- **Database**: MySQL with Drizzle ORM for type-safe database operations

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Testing**: Jest + Supertest

## 📋 Prerequisites

- Node.js 18 or higher
- MySQL 8.0 or higher
- Redis (optional, for caching)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gonep-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=6000
   HOST=localhost

   # Database (MySQL)
   DATABASE_URL=mysql://username:password@localhost:3306/gonep_db

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   REFRESH_TOKEN_SECRET=your-refresh-token-secret-change-this-in-production
   REFRESH_TOKEN_EXPIRES_IN=30d

   # Email Service
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=noreply@gonep.com

   # File Upload
   UPLOAD_PATH=./uploads
   MAX_FILE_SIZE=10485760
   ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf

   # Cloudinary (for file storage)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Security
   CORS_ORIGIN=http://localhost:3000
   RATE_LIMIT_WINDOW=15m
   RATE_LIMIT_MAX=100

   # Redis (for caching and sessions)
   REDIS_URL=redis://localhost:6379
   ```

4. **Set up the database**
   ```bash
   # Create MySQL database
   mysql -u root -p
   CREATE DATABASE gonep_db;
   ```

5. **Run database migrations**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run db:seed
   ```

## 🏃‍♂️ Running the Application

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Testing
```bash
npm test
npm run test:watch
```

## 📚 API Documentation

### Base URL
```
http://localhost:6000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/auth/register` | Register a new user | Public |
| POST | `/auth/login` | Login user | Public |
| POST | `/auth/refresh` | Refresh access token | Public |
| POST | `/auth/logout` | Logout user | Private |
| GET | `/auth/me` | Get current user profile | Private |
| PUT | `/auth/me` | Update current user profile | Private |
| POST | `/auth/forgot-password` | Send password reset email | Public |
| POST | `/auth/reset-password` | Reset password with token | Public |

### Blog Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/blog/posts` | Get all blog posts | Public |
| GET | `/blog/posts/:slug` | Get single blog post | Public |
| GET | `/blog/categories` | Get all categories | Public |
| GET | `/blog/featured` | Get featured posts | Public |
| POST | `/blog/posts/:id/view` | Increment view count | Public |
| GET | `/blog/posts/:id/comments` | Get comments for post | Public |
| POST | `/blog/posts/:id/comments` | Add comment | Public |
| POST | `/blog/posts` | Create blog post | Private (Moderator+) |
| PUT | `/blog/posts/:id` | Update blog post | Private (Moderator+) |
| DELETE | `/blog/posts/:id` | Delete blog post | Private (Moderator+) |

### Demo Request Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/demo/request` | Submit demo request | Public |
| GET | `/demo/requests` | Get all demo requests | Private (Admin) |
| GET | `/demo/requests/:id` | Get single demo request | Private (Admin) |
| PUT | `/demo/requests/:id` | Update demo request | Private (Admin) |
| DELETE | `/demo/requests/:id` | Delete demo request | Private (Admin) |

### Team Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/team` | Get all team members | Public |
| GET | `/team/leadership` | Get leadership team | Public |

### Careers Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/careers/jobs` | Get all job openings | Public |
| GET | `/careers/jobs/:slug` | Get single job | Public |
| POST | `/careers/jobs/:id/apply` | Submit job application | Public |
| GET | `/careers/departments` | Get all departments | Public |

### Contact Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/contact/inquiry` | Submit contact inquiry | Public |
| GET | `/contact/inquiries` | Get all inquiries | Private (Admin) |
| GET | `/contact/inquiries/:id` | Get single inquiry | Private (Admin) |
| PUT | `/contact/inquiries/:id` | Update inquiry | Private (Admin) |

### Newsletter Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/newsletter/subscribe` | Subscribe to newsletter | Public |
| POST | `/newsletter/unsubscribe` | Unsubscribe from newsletter | Public |

### Partners Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/partners` | Get all partners | Public |

### Analytics Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/analytics/track` | Track user interaction | Public |
| GET | `/analytics/dashboard` | Get analytics dashboard | Private (Admin) |

### Upload Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/upload` | Upload file | Private |
| DELETE | `/upload/:id` | Delete file | Private |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **user**: Basic user access
- **moderator**: Can manage blog posts and comments
- **admin**: Full access to all features

## 📊 Database Schema

The application includes the following main tables:

- `users` - User accounts and profiles
- `blog_posts` - Blog articles and content
- `blog_comments` - Comments on blog posts
- `team_members` - Team member information
- `job_openings` - Available job positions
- `job_applications` - Job applications
- `demo_requests` - Demo scheduling requests
- `contact_inquiries` - Contact form submissions
- `newsletter_subscribers` - Newsletter subscriptions
- `partners` - Partner information
- `analytics` - User interaction tracking
- `file_uploads` - File upload records

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t gonep-backend .
   ```

2. **Run the container**
   ```bash
   docker run -p 6000:6000 --env-file .env gonep-backend
   ```

### Environment Variables for Production

Make sure to update the following for production:

- `NODE_ENV=production`
- `DATABASE_URL` - Production MySQL connection string
- `JWT_SECRET` - Strong, unique secret key
- `REFRESH_TOKEN_SECRET` - Strong, unique secret key
- `CORS_ORIGIN` - Your frontend domain
- `SMTP_*` - Production email service credentials
- `CLOUDINARY_*` - Cloudinary credentials for file storage

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description",
  "message": "User-friendly error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔧 Development

### Project Structure

```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── database/        # Database schema and migrations
├── middleware/      # Express middleware
├── routes/          # API routes
├── services/        # Business logic services
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── index.ts         # Application entry point
```

### Adding New Features

1. **Create database schema** in `src/database/schema/`
2. **Add TypeScript types** in `src/types/`
3. **Create controller** in `src/controllers/`
4. **Add routes** in `src/routes/`
5. **Add validation schemas** in `src/utils/validation.ts`
6. **Write tests** for new functionality

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use async/await for asynchronous operations
- Implement proper error handling
- Add JSDoc comments for public methods

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@gonep.com or create an issue in the repository.

## 🔗 Links

- [Frontend Repository](https://github.com/gonep/frontend)
- [API Documentation](https://docs.gonep.com/api)
- [GONEP Website](https://gonep.com)
