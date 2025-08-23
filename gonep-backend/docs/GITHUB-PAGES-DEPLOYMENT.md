# 🌐 GitHub Pages Deployment Guide

This guide will help you deploy your GONEP frontend and admin panel to GitHub Pages, while keeping the backend API on Railway.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Admin Panel   │    │   Backend API   │
│   (GitHub Pages)│    │   (GitHub Pages)│    │   (Railway)     │
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

## 📋 Prerequisites

- GitHub account
- Railway account (for backend API and database)
- Cloudinary account (for image uploads)
- Gmail account (for email functionality)

## 🎯 Step 1: Prepare Your Repository

### 1.1 Repository Structure
Your repository should be structured like this:
```
gonep-backend/
├── Gonep/                 # Frontend (React + Vite)
├── gonep-admin/          # Admin Panel (React + MUI)
├── src/                  # Backend API (Node.js + Express)
├── .github/workflows/    # GitHub Actions workflows
└── ...
```

### 1.2 Enable GitHub Pages
1. Go to your GitHub repository
2. Click "Settings" → "Pages"
3. Under "Source", select "GitHub Actions"
4. This will allow the workflows to deploy automatically

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
FRONTEND_URL=https://your-username.github.io/gonep-backend
ADMIN_URL=https://your-username.github.io/gonep-backend/admin

# API Base URL (Railway will provide this)
API_BASE_URL=https://your-api-domain.railway.app
```

### 3.3 Deploy
1. Railway will automatically build and deploy your app
2. Wait for deployment to complete
3. Copy your API URL (e.g., `https://gonep-api-production.up.railway.app`)

## 🌐 Step 4: Configure GitHub Secrets

### 4.1 Add Repository Secrets
1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add these secrets:

```bash
VITE_API_BASE_URL=https://your-api-domain.railway.app
REACT_APP_API_BASE_URL=https://your-api-domain.railway.app
```

### 4.2 Update Repository Settings
1. Go to "Settings" → "Pages"
2. Make sure "GitHub Actions" is selected as the source
3. Your URLs will be:
   - Frontend: `https://your-username.github.io/gonep-backend`
   - Admin: `https://your-username.github.io/gonep-backend/admin`

## 🚀 Step 5: Deploy to GitHub Pages

### 5.1 Automatic Deployment
The GitHub Actions workflows will automatically deploy when you push to the main branch:

1. Push your code to the main branch
2. Go to "Actions" tab in your repository
3. Watch the deployment progress
4. Once complete, your sites will be available at:
   - Frontend: `https://your-username.github.io/gonep-backend`
   - Admin: `https://your-username.github.io/gonep-backend/admin`

### 5.2 Manual Deployment (Alternative)
If you prefer manual deployment:

```bash
# Deploy frontend
cd Gonep
npm run deploy

# Deploy admin panel
cd gonep-admin
npm run deploy
```

## 🔄 Step 6: Update API Configuration

### 6.1 Update CORS Origins
Go back to Railway and update the environment variables:

```bash
FRONTEND_URL=https://your-username.github.io
ADMIN_URL=https://your-username.github.io
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

## 🧪 Step 9: Test Your Deployment

### 9.1 Test API Health
```bash
curl https://your-api-domain.railway.app/health
```

### 9.2 Test Frontend
1. Visit: `https://your-username.github.io/gonep-backend`
2. Test all functionality
3. Check API calls in browser dev tools

### 9.3 Test Admin Panel
1. Visit: `https://your-username.github.io/gonep-backend/admin`
2. Test login functionality
3. Test all admin features

## 🔒 Step 10: Security Considerations

### 10.1 Update JWT Secret
Generate a strong JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 10.2 Enable HTTPS
- GitHub Pages provides HTTPS automatically
- Railway provides HTTPS automatically

### 10.3 Set Up Monitoring
- Railway provides basic monitoring
- Consider setting up uptime monitoring (e.g., UptimeRobot)

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check that frontend URLs are correctly set in API environment variables
   - Ensure URLs include `https://` protocol
   - GitHub Pages URLs are case-sensitive

2. **Build Failures**
   - Check GitHub Actions logs
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors

3. **404 Errors on GitHub Pages**
   - This is normal for React Router - GitHub Pages doesn't support client-side routing by default
   - The Vite config includes a base path for GitHub Pages
   - Consider using HashRouter instead of BrowserRouter

4. **Environment Variables**
   - Double-check GitHub secrets are set correctly
   - Ensure no typos in variable names

### GitHub Pages Limitations

1. **No Server-Side Rendering**
   - GitHub Pages only serves static files
   - All API calls must go to your Railway backend

2. **Client-Side Routing**
   - BrowserRouter may not work properly
   - Consider using HashRouter for better compatibility

3. **Build Size**
   - GitHub Pages has bandwidth limits
   - Optimize your build size

## 💰 Cost Comparison

### GitHub Pages + Railway (This Guide)
- **GitHub Pages**: Free (unlimited)
- **Railway**: Free ($5 credit monthly)
- **Total**: Free to start

### Vercel + Railway (Previous Guide)
- **Vercel**: Free (2 projects, 100GB bandwidth)
- **Railway**: Free ($5 credit monthly)
- **Total**: Free to start

## 🎉 Congratulations!

Your GONEP application is now deployed using GitHub Pages!

### Your URLs:
- **Frontend**: https://your-username.github.io/gonep-backend
- **Admin Panel**: https://your-username.github.io/gonep-backend/admin
- **API**: https://your-api-domain.railway.app

### Next Steps:
1. Set up custom domains (optional)
2. Configure monitoring and alerts
3. Set up automated backups
4. Plan for scaling as your user base grows

---

**Need Help?** Check the troubleshooting section or reach out to the development team.
