# Vercel Deployment Guide for GONEP Admin

## 🚀 Quick Fix for Build Failure

The build failure is caused by missing environment variables and hardcoded localhost URLs. Follow these steps to fix it:

### 1. Environment Variables Setup

In your Vercel project settings, add these environment variables:

```env
REACT_APP_API_URL=https://gonep-backend-production.up.railway.app/api
REACT_APP_ENVIRONMENT=production
```

**How to add environment variables in Vercel:**
1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Go to "Environment Variables" section
4. Add each variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://gonep-backend-production.up.railway.app/api`
   - **Environment**: Production, Preview, Development
5. Repeat for `REACT_APP_ENVIRONMENT` with value `production`

### 2. Code Changes Made

The following files have been updated to use environment variables:

#### `src/services/api.ts`
```typescript
// Before
const API_BASE_URL = 'http://localhost:8000/api';

// After
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

#### `src/components/ImageUpload.tsx`
```typescript
// Before
const imageUrl = `http://localhost:8000/api/uploads/${response.data.data.file.filename}`;

// After
const imageUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/uploads/${response.data.data.file.filename}`;
```

#### `package.json`
- Removed duplicate `@types/react-router-dom` from devDependencies

### 3. Backend URL Configuration

Make sure your backend is deployed and accessible. The default URL is:
- **Development**: `http://localhost:8000/api`
- **Production**: `https://gonep-backend-production.up.railway.app/api`

### 4. CORS Configuration

Ensure your backend has CORS configured to allow requests from your Vercel domain:

```typescript
// In your backend CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8002',
  'https://your-vercel-domain.vercel.app'
];
```

### 5. Redeploy

After adding the environment variables:
1. Go to your Vercel project
2. Click "Redeploy" or push a new commit
3. The build should now succeed

## 🔧 Troubleshooting

### Build Still Failing?

1. **Check Environment Variables**: Ensure they're added to all environments (Production, Preview, Development)
2. **Clear Cache**: In Vercel, go to Settings → General → Clear Build Cache
3. **Check Logs**: Look at the build logs for specific error messages

### API Connection Issues?

1. **Test Backend**: Verify your backend is running and accessible
2. **Check CORS**: Ensure your backend allows requests from your Vercel domain
3. **Network Tab**: Check browser developer tools for network errors

### Common Errors

#### "Module not found"
- Ensure all dependencies are properly installed
- Check for missing imports

#### "Environment variable not defined"
- Verify environment variables are set in Vercel
- Check variable names (must start with `REACT_APP_`)

#### "API connection failed"
- Verify backend URL is correct
- Check if backend is running and accessible
- Ensure CORS is properly configured

## 📝 Local Development

For local development, create a `.env` file in the `gonep-admin` directory:

```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

## 🎯 Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Backend deployed and accessible
- [ ] CORS configured for Vercel domain
- [ ] All dependencies properly installed
- [ ] Build succeeds locally (`npm run build`)
- [ ] Application functions correctly in production

## 🔗 Useful Links

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
