# 🚀 GONEP Full-Stack Deployment Guide

This guide will help you deploy your GONEP application to production with separate hosting for frontend, admin panel, and backend API.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Railway account (free tier available)
- Cloudinary account (for image uploads)
- Gmail account (for email functionality)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin Panel   │    │   Backend API   │
│   (Vercel)      │    │   (Vercel)      │    │   (Railway)     │
│                 │    │                 │    │                 │
│   React + Vite  │    │   React + MUI   │    │   Node.js +     │
│   + Tailwind    │    │                 │    │   Express +     │
│                 │    │                 │    │   MySQL         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   MySQL Database│
                    │   (Railway)     │
                    └─────────────────┘
```

## 🎯 Step 1: Prepare Your Code

### 1.1 Update API Configuration

The backend has been configured for production deployment. Key changes:
- CORS configuration for production domains
- Environment variable support
- Health check endpoints
- Railway deployment configuration

### 1.2 Update Frontend API URLs

You'll need to update the API base URLs in your frontend applications once you have your Railway API URL.

## 🗄️ Step 2: Set Up Database (Railway MySQL)

### 2.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### 2.2 Add MySQL Database
1. Click "New Service" → "Database" → "MySQL"
2. Wait for the database to be created
3. Copy the connection details from the "Connect" tab

### 2.3 Run Database Migrations
1. Clone your repository locally
2. Install dependencies: `npm install`
3. Set up environment variables (see env.example)
4. Run migrations: `npm run migrate`
5. Seed the database: `npm run seed`

## 🔧 Step 3: Deploy Backend API (Railway)

### 3.1 Connect GitHub Repository
1. In Railway, click "New Service" → "GitHub Repo"
2. Select your repository
3. Railway will automatically detect it's a Node.js app

### 3.2 Configure Environment Variables
Add these environment variables in Railway:

```bash
NODE_ENV=production
PORT=8000
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Database (from Railway MySQL service)
DATABASE_URL=mysql://username:password@host:port/database_name

# Email (Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@gonep.com

# File Upload
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760

# Rate Limiting
RATE_LIMIT_MAX=100

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URLs (update after deploying frontend)
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_URL=https://your-admin-domain.vercel.app

# API Base URL (Railway will provide this)
API_BASE_URL=https://your-api-domain.railway.app
```

### 3.3 Deploy
1. Railway will automatically build and deploy your app
2. Wait for deployment to complete
3. Copy your API URL (e.g., `https://gonep-api-production.up.railway.app`)

## 🌐 Step 4: Deploy Frontend (Vercel)

### 4.1 Deploy Main Frontend
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `Gonep`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4.2 Configure Environment Variables
Add these environment variables in Vercel:

```bash
VITE_API_BASE_URL=https://your-api-domain.railway.app
VITE_APP_NAME=GONEP
VITE_APP_VERSION=1.0.0
```

### 4.3 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your frontend URL (e.g., `https://gonep-frontend.vercel.app`)

## 🔐 Step 5: Deploy Admin Panel (Vercel)

### 5.1 Deploy Admin Panel
1. In Vercel, click "New Project"
2. Import the same repository
3. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `gonep-admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 5.2 Configure Environment Variables
Add these environment variables in Vercel:

```bash
REACT_APP_API_BASE_URL=https://your-api-domain.railway.app
REACT_APP_ADMIN_EMAIL=admin@gonep.com
REACT_APP_APP_NAME=GONEP Admin
```

### 5.3 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your admin URL (e.g., `https://gonep-admin.vercel.app`)

## 🔄 Step 6: Update API Configuration

### 6.1 Update CORS Origins
Go back to Railway and update the environment variables:

```bash
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_URL=https://your-admin-domain.vercel.app
```

### 6.2 Redeploy API
Railway will automatically redeploy when you update environment variables.

## 📧 Step 7: Configure Email (Gmail)

### 7.1 Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Enable 2-factor authentication

### 7.2 Generate App Password
1. Go to Security → App passwords
2. Generate a new app password for "Mail"
3. Use this password in your SMTP_PASS environment variable

## ☁️ Step 8: Configure Cloudinary (Optional)

### 8.1 Create Cloudinary Account
1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Get your credentials from the dashboard

### 8.2 Update Environment Variables
Add your Cloudinary credentials to Railway:

```bash
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🧪 Step 8: Test Your Deployment

### 8.1 Test API Health
```bash
curl https://your-api-domain.railway.app/health
```

### 8.2 Test Frontend
1. Visit your frontend URL
2. Test all functionality
3. Check API calls in browser dev tools

### 8.3 Test Admin Panel
1. Visit your admin URL
2. Test login functionality
3. Test all admin features

## 🔒 Step 9: Security Considerations

### 9.1 Update JWT Secret
Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 9.2 Enable HTTPS
- Vercel provides HTTPS automatically
- Railway provides HTTPS automatically

### 9.3 Set Up Monitoring
- Railway provides basic monitoring
- Consider setting up uptime monitoring (e.g., UptimeRobot)

## 📊 Step 10: Performance Optimization

### 10.1 Enable Caching
- Vercel provides automatic caching
- Consider implementing Redis for session storage

### 10.2 Database Optimization
- Monitor database performance in Railway
- Consider adding database indexes

### 10.3 CDN Configuration
- Vercel provides global CDN
- Configure Cloudinary CDN for images

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check that frontend URLs are correctly set in API environment variables
   - Ensure URLs include `https://` protocol

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check Railway MySQL service is running

3. **Build Failures**
   - Check build logs in Vercel/Railway
   - Ensure all dependencies are in package.json

4. **Environment Variables**
   - Double-check all environment variables are set
   - Ensure no typos in variable names

### Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

## 💰 Cost Estimation

### Free Tier (Recommended for starting)
- **Vercel**: Free (2 projects, 100GB bandwidth)
- **Railway**: Free ($5 credit monthly)
- **Cloudinary**: Free (25GB storage, 25GB bandwidth)

### Paid Tier (For production)
- **Vercel**: $20/month (Pro plan)
- **Railway**: $5-20/month (depending on usage)
- **Cloudinary**: $89/month (Advanced plan)

## 🎉 Congratulations!

Your GONEP application is now deployed and ready for production use!

### Your URLs:
- **Frontend**: https://your-frontend-domain.vercel.app
- **Admin Panel**: https://your-admin-domain.vercel.app
- **API**: https://your-api-domain.railway.app

### Next Steps:
1. Set up custom domains (optional)
2. Configure monitoring and alerts
3. Set up automated backups
4. Plan for scaling as your user base grows

---

**Need Help?** Check the troubleshooting section or reach out to the development team.
