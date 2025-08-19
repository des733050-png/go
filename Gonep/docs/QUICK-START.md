# 🚀 Quick Start Guide

## Simplified Startup (Recommended)

### Option 1: Using Git Bash (Recommended)
```bash
# From the Gonep root directory
./start-all.sh
```

### Option 2: Using npm command directly
```bash
# From the Gonep root directory
npm run dev:all
```

### Option 3: Using Windows Batch file
```cmd
# From the Gonep root directory
start-all.bat
```

### Option 4: Using PowerShell
```powershell
# From the Gonep root directory
.\backend\start-all.ps1
```

## What This Does

The simplified startup will automatically start all three services:

- 🌐 **Frontend Website** - http://localhost:3000 (Vite dev server)
- 🔗 **Backend API** - http://localhost:4000/api (Express server)
- 🎛️ **Admin Panel** - http://localhost:3005 (Admin interface)

## Admin Panel Login

- **Email:** admin@gonep.com
- **Password:** admin123

## Stopping All Services

Press `Ctrl+C` in the terminal to stop all services at once.

## Manual Startup (if needed)

If you prefer to start services individually:

```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend API
cd backend && npm run dev

# Terminal 3: Admin Panel
cd backend && npm run admin
```

## Prerequisites

Make sure you have:
1. Node.js installed
2. All dependencies installed: `npm install` (in root and backend directories)
3. Database configured (see backend README for setup)
