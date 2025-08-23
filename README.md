# GONEP Healthcare Platform

A comprehensive healthcare IoT platform with a modern web interface, admin dashboard, and robust backend API.

## 🏗️ Project Structure

```
Gonep Website/
├── gonep-backend/     # Backend API Server (Node.js/Express)
├── Gonep/            # Main Frontend Website (React/Vite)
└── gonep-admin/      # Admin Dashboard (React)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MySQL database (or Railway cloud database)

### 1. Backend Setup
```bash
cd gonep-backend
npm install
cp env.example .env
# Edit .env with your database credentials
npm run dev
```

### 2. Frontend Setup
```bash
cd Gonep
npm install
npm run dev
```

### 3. Admin Dashboard Setup
```bash
cd gonep-admin
npm install
npm start
```

## 📡 Services & Ports

| Service | URL | Port | Description |
|---------|-----|------|-------------|
| Backend API | http://localhost:8000 | 8000 | Express.js API server |
| Frontend | http://localhost:8001 | 8001 | Main website (React/Vite) |
| Admin Dashboard | http://localhost:8002 | 8002 | Admin panel (React) |

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL with Drizzle ORM
- **Authentication**: JWT with refresh tokens
- **File Upload**: Multer with Cloudinary integration
- **Email**: Nodemailer with Gmail SMTP

### Frontend (Main Website)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Routing**: React Router DOM
- **Animations**: Framer Motion

### Admin Dashboard
- **Framework**: React 18 with TypeScript
- **Build Tool**: Create React App
- **UI Library**: Material-UI (MUI)
- **Data Grid**: MUI X Data Grid
- **File Upload**: React Dropzone

## 📁 Key Features

### Backend API
- ✅ RESTful API with proper error handling
- ✅ JWT authentication with refresh tokens
- ✅ Role-based access control (User, Moderator, Admin)
- ✅ File upload with image optimization
- ✅ Email notifications
- ✅ Database migrations with Drizzle
- ✅ Rate limiting and security middleware
- ✅ CORS configuration for multiple origins

### Frontend Website
- ✅ Modern, responsive design
- ✅ SEO optimized pages
- ✅ Image optimization and lazy loading
- ✅ Newsletter subscription
- ✅ Contact forms
- ✅ Blog system
- ✅ Careers/job listings
- ✅ Team member profiles
- ✅ Demo request system

### Admin Dashboard
- ✅ Secure admin authentication
- ✅ Content management (blogs, team, careers)
- ✅ File management
- ✅ User management
- ✅ Analytics dashboard
- ✅ Newsletter management
- ✅ Demo request management

## 🔧 Development

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=8000
JWT_SECRET=your-secret-key
DATABASE_URL=mysql://user:pass@host:port/database
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Frontend
- API base URL is configured in `src/services/api.ts`
- Images are imported directly from `src/assets/`

### Database Setup
```bash
cd gonep-backend
npm run migrate    # Run database migrations
npm run seed       # Seed initial data
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/me` - Get current user

#### Content Management
- `GET /api/blog/posts` - Get blog posts
- `GET /api/team` - Get team members
- `GET /api/careers/jobs` - Get job openings
- `GET /api/video` - Get videos

#### Admin Only
- `POST /api/blog/posts` - Create blog post
- `PUT /api/blog/posts/:id` - Update blog post
- `DELETE /api/blog/posts/:id` - Delete blog post

## 🚀 Deployment

### Backend Deployment
- **Railway**: Automatic deployment from GitHub
- **Vercel**: Serverless deployment
- **Heroku**: Traditional deployment

### Frontend Deployment
- **Vercel**: Automatic deployment
- **Netlify**: Static site deployment
- **GitHub Pages**: Static hosting

### Environment Setup for Production
1. Set `NODE_ENV=production`
2. Configure production database
3. Set up email service credentials
4. Configure CORS origins
5. Set secure JWT secrets

## 📚 Documentation

- [Backend API Documentation](./gonep-backend/docs/)
- [Frontend Development Guide](./Gonep/docs/)
- [Deployment Guides](./gonep-backend/docs/)
- [Database Schema](./gonep-backend/src/database/schema/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation in the `docs/` folders
- Review the API endpoints
- Check the test files in `gonep-backend/tests/`

## 🔄 Recent Updates

- ✅ Fixed image import issues for production builds
- ✅ Added proper TypeScript configurations
- ✅ Implemented comprehensive error handling
- ✅ Added database connection resilience
- ✅ Created unified API service layer
- ✅ Organized project structure and documentation
# Revampweb
