# 🚀 Railway Database Setup Guide

This guide will help you connect your GONEP application to Railway's MySQL database.

## 📋 Prerequisites

- Railway account
- Node.js and npm installed
- Your project cloned locally

## 🔧 Step 1: Create .env File

Create a `.env` file in your project root with the following content:

```bash
# Server Configuration
NODE_ENV=production
PORT=8000

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# Database Configuration (Railway MySQL)
DATABASE_URL=mysql://root:vLTmDoaXxCOjEaKknVkGZzEgDNjONHwR@shinkansen.proxy.rlwy.net:37587/railway
DB_HOST=shinkansen.proxy.rlwy.net
DB_PORT=37587
DB_USERNAME=root
DB_PASSWORD=vLTmDoaXxCOjEaKknVkGZzEgDNjONHwR
DB_NAME=railway

# Email Configuration (Gmail SMTP)
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

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URLs for CORS
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_URL=https://your-admin-domain.vercel.app

# API Base URL
API_BASE_URL=https://your-api-domain.railway.app
```

## 🗄️ Step 2: Install Dependencies

```bash
npm install
```

## 🔄 Step 3: Run Database Migrations

### Option A: Using the Railway Migration Script (Recommended)
```bash
npm run migrate:railway
```

### Option B: Manual Migration
```bash
npm run migrate
```

## 🌱 Step 4: Seed the Database (Optional)

```bash
npm run seed
```

## 🧪 Step 5: Test Database Connection

```bash
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 GONEP API Server running on port 8000
```

## 🔒 Security Notes

### ✅ What's Been Secured

1. **No Hardcoded Secrets**: All sensitive information is now in environment variables
2. **Environment Validation**: The app will fail to start if required variables are missing
3. **Database URL Protection**: Connection strings are not logged in plain text
4. **JWT Secret**: Must be provided via environment variable

### 🔐 Required Environment Variables

The following variables are **required** and will cause the app to fail if missing:

- `JWT_SECRET` - For JWT token signing
- `DATABASE_URL` - Railway MySQL connection string
- `SMTP_HOST` - Email server host
- `SMTP_USER` - Email username
- `SMTP_PASS` - Email password
- `SMTP_FROM` - From email address

## 🚨 Troubleshooting

### Database Connection Issues

1. **Check Railway Database Status**:
   - Go to Railway dashboard
   - Verify your MySQL service is running
   - Check the connection details

2. **Verify Environment Variables**:
   ```bash
   # Check if .env file exists
   ls -la .env
   
   # Test database connection
   npm run migrate:railway
   ```

3. **Common Issues**:
   - **Port blocked**: Make sure port 37587 is accessible
   - **Wrong credentials**: Double-check username/password
   - **Database doesn't exist**: Railway creates the database automatically

### Migration Issues

1. **Reset Migrations**:
   ```bash
   # Clear migration cache
   rm -rf src/database/migrations/meta/*
   
   # Regenerate migrations
   npm run generate
   npm run migrate
   ```

2. **Check Migration Status**:
   ```bash
   # View migration history
   npx drizzle-kit studio
   ```

## 📊 Database Schema

Your Railway database will contain the following tables:

- `users` - User accounts and authentication
- `blog_categories` - Blog post categories
- `blog_authors` - Blog post authors
- `blog_posts` - Blog posts content
- `blog_comments` - Blog post comments
- `team_members` - Team member information
- `careers_jobs` - Job postings
- `demo_requests` - Demo request submissions
- `contact_inquiries` - Contact form submissions
- `newsletter_subscribers` - Newsletter subscriptions
- `partners` - Partner information
- `demo_videos` - Demo video content
- `demo_configs` - Demo configuration settings

## 🚀 Next Steps

After successful database setup:

1. **Deploy to Railway**:
   - Connect your GitHub repository to Railway
   - Set environment variables in Railway dashboard
   - Deploy your application

2. **Set up GitHub Pages**:
   - Follow the GitHub Pages deployment guide
   - Configure frontend and admin panel

3. **Configure Email**:
   - Set up Gmail SMTP credentials
   - Test email functionality

4. **Set up Cloudinary**:
   - Create Cloudinary account
   - Configure image upload functionality

## 🎉 Success!

Your GONEP application is now connected to Railway's MySQL database with proper security practices!

### Your Database URL:
```
mysql://root:vLTmDoaXxCOjEaKknVkGZzEgDNjONHwR@shinkansen.proxy.rlwy.net:37587/railway
```

### Next Steps:
1. Deploy your backend API to Railway
2. Deploy frontend to GitHub Pages or Vercel
3. Configure production environment variables
4. Set up monitoring and backups

---

**Need Help?** Check the troubleshooting section or reach out to the development team.
