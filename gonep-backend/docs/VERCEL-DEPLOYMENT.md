# Vercel Deployment Guide for GONEP Backend

## ✅ What's Been Done

Your Express.js backend has been successfully converted to work with Vercel's serverless architecture:

1. **✅ Serverless Structure**: 
   - `src/app.ts` - Express app configuration (no server startup)
   - `src/index.ts` - Local development server startup
   - `api/index.ts` - Vercel serverless entry point

2. **✅ Dependencies**: 
   - Added `serverless-http` for serverless compatibility
   - Updated build scripts

3. **✅ Configuration**:
   - `vercel.json` - Vercel deployment configuration
   - Updated `package.json` build scripts

## 🚀 Deploy to Vercel

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Or for production:
```bash
vercel --prod
```

## 🔧 Environment Variables

Set these in your Vercel dashboard (Settings → Environment Variables):

### Required Variables:
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-change-this-in-production
DATABASE_URL=your-mysql-database-url
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
FRONTEND_URL=https://gonep.vercel.app
ADMIN_URL=https://gonep-admin.vercel.app
```

### Optional Variables:
```
PORT=8000
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_EXPIRES_IN=30d
RATE_LIMIT_MAX=100
UPLOAD_PATH=uploads
MAX_FILE_SIZE=10485760
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## 📁 Project Structure

```
gonep-backend/
├── api/
│   └── index.ts          # Vercel serverless entry point
├── src/
│   ├── app.ts            # Express app configuration
│   ├── index.ts          # Local development server
│   ├── config/           # Configuration files
│   ├── controllers/      # API controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── database/         # Database schema and migrations
│   ├── services/         # Business logic services
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🔄 Local Development

### Start local server:
```bash
npm run dev
```

### Build for production:
```bash
npm run build
```

### Test API locally:
```bash
curl http://localhost:8000/health
curl http://localhost:8000/api
```

## 🌐 API Endpoints

Your API will be available at:
- **Health Check**: `https://your-vercel-domain.vercel.app/health`
- **API Docs**: `https://your-vercel-domain.vercel.app/api`
- **Auth**: `https://your-vercel-domain.vercel.app/api/auth`
- **Blog**: `https://your-vercel-domain.vercel.app/api/blog`
- **Team**: `https://your-vercel-domain.vercel.app/api/team`
- **Careers**: `https://your-vercel-domain.vercel.app/api/careers`
- **Demo**: `https://your-vercel-domain.vercel.app/api/demo`
- **Contact**: `https://your-vercel-domain.vercel.app/api/contact`
- **Newsletter**: `https://your-vercel-domain.vercel.app/api/newsletter`
- **Partners**: `https://your-vercel-domain.vercel.app/api/partners`
- **Analytics**: `https://your-vercel-domain.vercel.app/api/analytics`
- **Upload**: `https://your-vercel-domain.vercel.app/api/upload`
- **Video**: `https://your-vercel-domain.vercel.app/api/video`

## ⚠️ Important Notes

1. **Database**: Make sure your MySQL database is accessible from Vercel's servers
2. **File Uploads**: Vercel has a 4.5MB payload limit. For larger files, consider using Cloudinary or S3
3. **Cold Starts**: Serverless functions may have cold start delays
4. **Environment Variables**: Set all required environment variables in Vercel dashboard
5. **CORS**: Update CORS origins to include your Vercel domain

## 🔍 Troubleshooting

### Build Errors:
- Check that all TypeScript errors are resolved
- Ensure all dependencies are installed
- Verify `vercel.json` configuration

### Runtime Errors:
- Check environment variables are set correctly
- Verify database connection
- Check CORS configuration

### Performance Issues:
- Consider using Vercel's Edge Functions for better performance
- Optimize database queries
- Use connection pooling for database connections

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints locally first
4. Check database connectivity
