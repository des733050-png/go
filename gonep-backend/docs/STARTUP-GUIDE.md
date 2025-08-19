# 🚀 GONEP Multi-Server Startup Guide

This guide will help you run all three GONEP servers concurrently on ports 8000+ to avoid conflicts with other services.

## 📋 Server Configuration

| Server | Port | URL | Description |
|--------|------|-----|-------------|
| **Backend API** | 8000 | `http://localhost:8000` | Main API server with database |
| **Frontend** | 8001 | `http://localhost:8001` | Main GONEP website (Vite/React) |
| **Admin Dashboard** | 8002 | `http://localhost:8002` | Admin panel (React/Material-UI) |

## 🛠️ Prerequisites

1. **Node.js** (v18 or higher)
2. **MySQL** database running
3. **Environment variables** configured

## 🚀 Quick Start (All Servers)

### Option 1: One Command (Recommended)
```bash
npm run dev:all
```

This will start all three servers concurrently:
- Backend API on port 8000
- Frontend on port 8001  
- Admin Dashboard on port 8002

### Option 2: Individual Servers

#### Start Backend API Only
```bash
npm run dev:backend
# Runs on http://localhost:8000
```

#### Start Frontend Only
```bash
npm run dev:frontend
# Runs on http://localhost:8001
```

#### Start Admin Dashboard Only
```bash
npm run dev:admin
# Runs on http://localhost:8002
```

## 📦 Installation

### First Time Setup
```bash
# Install all dependencies for all projects
npm run install:all
```

### Manual Installation
```bash
# Backend dependencies
npm install

# Frontend dependencies
cd Gonep && npm install

# Admin dashboard dependencies
cd gonep-admin && npm install
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=mysql://username:password@localhost:3306/gonep_db

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Server
PORT=8000
NODE_ENV=development
```

### Database Setup
```bash
# Generate migrations
npm run generate

# Run migrations
npm run migrate

# Seed database (optional)
npm run seed
```

## 🌐 Access URLs

Once all servers are running:

### Main Website
- **URL**: `http://localhost:8001`
- **Description**: Main GONEP healthcare website
- **Features**: Homepage, blog, team, careers, contact forms

### Admin Dashboard
- **URL**: `http://localhost:8002`
- **Description**: Admin panel for content management
- **Login**: `admin@gonep.com` / `password123`
- **Features**: Dashboard, blog management, team management, etc.

### API Documentation
- **URL**: `http://localhost:8000/api`
- **Description**: API endpoints documentation
- **Health Check**: `http://localhost:8000/health`

## 🔍 Troubleshooting

### Port Already in Use
If you get "port already in use" errors:

1. **Check what's using the port**:
   ```bash
   # Windows
   netstat -ano | findstr :8000
   
   # Kill the process
   taskkill /PID <process_id> /F
   ```

2. **Use different ports**:
   - Backend: Change `PORT=8000` to `PORT=8003` in `.env`
   - Frontend: Change port in `Gonep/vite.config.ts`
   - Admin: Change port in `gonep-admin/package.json`

### Database Connection Issues
```bash
# Check database connection
npm run test:db

# Reset database
npm run migrate
npm run seed
```

### CORS Issues
The backend is configured to allow requests from:
- `http://localhost:8001` (Frontend)
- `http://localhost:8002` (Admin Dashboard)

### Common Errors

#### "Module not found"
```bash
# Reinstall dependencies
npm run install:all
```

#### "Database connection failed"
1. Check MySQL is running
2. Verify DATABASE_URL in `.env`
3. Ensure database exists

#### "JWT_SECRET not set"
Add JWT_SECRET to your `.env` file:
```env
JWT_SECRET=your-super-secret-jwt-key
```

## 📱 Development Workflow

### 1. Start Development
```bash
npm run dev:all
```

### 2. Access Applications
- **Frontend**: `http://localhost:8001`
- **Admin**: `http://localhost:8002`
- **API**: `http://localhost:8000`

### 3. Make Changes
- Frontend code: `Gonep/src/`
- Admin code: `gonep-admin/src/`
- Backend code: `src/`

### 4. Hot Reload
All servers support hot reload - changes will automatically refresh.

## 🚀 Production Deployment

### Build for Production
```bash
# Backend
npm run build

# Frontend
cd Gonep && npm run build

# Admin Dashboard
cd gonep-admin && npm run build
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=8000
DATABASE_URL=mysql://prod_user:prod_pass@prod_host:3306/gonep_prod
JWT_SECRET=production-jwt-secret
```

## 📊 Monitoring

### Health Checks
- **Backend**: `http://localhost:8000/health`
- **Frontend**: `http://localhost:8001`
- **Admin**: `http://localhost:8002`

### Logs
All servers log to the console. Check for:
- Database connection status
- API request logs
- Error messages

## 🔐 Security Notes

1. **Never commit `.env` files**
2. **Use strong JWT secrets**
3. **Enable HTTPS in production**
4. **Regular security updates**

## 📞 Support

If you encounter issues:

1. Check this guide
2. Review console logs
3. Verify all dependencies are installed
4. Ensure database is running
5. Check port availability

---

**Happy Coding! 🎉**

*GONEP Development Team*
