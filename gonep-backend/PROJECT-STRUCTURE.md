# GONEP Backend - Clean Project Structure

This document shows the cleaned and organized project structure optimized for cPanel hosting.

## 📁 Project Structure

```
gonep-backend/
├── 📁 src/                          # Source code
│   ├── 📁 controllers/              # API controllers
│   ├── 📁 database/                 # Database schema and migrations
│   │   ├── 📁 migrations/           # Drizzle migration files
│   │   └── 📁 schema/               # Database schema definitions
│   ├── 📁 middleware/               # Express middleware
│   ├── 📁 routes/                   # API route definitions
│   ├── 📁 services/                 # Business logic services
│   ├── 📁 types/                    # TypeScript type definitions
│   ├── 📁 utils/                    # Utility functions
│   └── 📄 index.ts                  # Main application entry point
│
├── 📁 migrations/                   # Database migration scripts
│   ├── 📄 run-all-migrations.js     # Main migration runner
│   ├── 📄 MIGRATION-GUIDE.md       # Migration documentation
│   └── 📄 README.md                 # Migration folder info
│
├── 📁 tests/                        # Test files
│   ├── 📁 api/                      # API endpoint tests
│   │   ├── 📄 README.md             # API tests documentation
│   │   ├── 📄 test-api.js           # General API testing
│   │   ├── 📄 test-auth.js          # Authentication tests
│   │   ├── 📄 test-connection.js    # Connection testing
│   │   ├── 📄 test-demo-apis.js     # Demo API tests
│   │   ├── 📄 test-demo-system.js   # Demo system tests
│   │   ├── 📄 test-upload.js        # File upload tests
│   │   ├── 📄 test-video-route.js   # Video route tests
│   │   ├── 📄 test-video-upload.js  # Video upload tests
│   │   ├── 📄 simple-test.js        # Simple test utilities
│   │   └── 📄 test-image.jpg        # Test image file
│   │
│   ├── 📁 database/                 # Database test utilities
│   │   ├── 📄 README.md             # Database tests documentation
│   │   ├── 📄 check-db.js           # Database connection check
│   │   ├── 📄 check-db-status.js    # Database status check
│   │   ├── 📄 check-users.js        # User account check
│   │   ├── 📄 create-admin.js       # Admin user creation
│   │   ├── 📄 create-blog-tables.js # Blog tables creation
│   │   └── 📄 create-missing-tables.js # Missing tables creation
│   │
│   └── 📄 README.md                 # Tests overview
│
├── 📁 uploads/                      # File upload directory
├── 📁 node_modules/                 # Dependencies (auto-generated)
├── 📁 dist/                         # Built files (auto-generated)
│
├── 📄 package.json                  # Project configuration and scripts
├── 📄 package-lock.json            # Dependency lock file
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 drizzle.config.ts            # Database ORM configuration
├── 📄 env.example                  # Environment variables template
├── 📄 README.md                    # Main project documentation
├── 📄 PROJECT-STRUCTURE.md          # This file
└── 📄 .gitignore                   # Git ignore rules
```

## 🗑️ Removed Files

The following files were removed as they're not needed for cPanel hosting:

- `vercel.json` - Vercel deployment config
- `railway.json` - Railway deployment config  
- `Procfile` - Heroku deployment config
- `.vercel/` - Vercel deployment files
- `docs/` - Old deployment documentation
- `migrate-*.js` - Old migration scripts
- `simple-server.js` - Development server
- `setup-env.js` - Environment setup
- `main` - Empty file
- `test-frontend/` - Frontend test files

## 🚀 Key Scripts

### Database Management
```bash
npm run migrate:all        # Run all database migrations
npm run test:connection    # Test database connection
```

### Development
```bash
npm run dev               # Start development server
npm run build             # Build for production
npm start                 # Start production server
```

### Testing
```bash
# API tests
cd tests/api
node test-api.js

# Database tests  
cd tests/database
node check-db.js
```

## 🔧 For cPanel Hosting

1. **Upload** the cleaned project to cPanel
2. **Install dependencies** with `npm install`
3. **Create `.env`** file with your database credentials
4. **Run migrations** with `npm run migrate:all`
5. **Start the app** with `npm start`

## 📋 Environment Variables

Required in your `.env` file:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_cpanel_username
DB_PASSWORD=your_cpanel_password
DB_NAME=your_cpanel_database
```

## ✅ Benefits of Clean Structure

- **Focused**: Only essential files for cPanel hosting
- **Organized**: Clear separation of concerns
- **Maintainable**: Easy to find and modify files
- **Efficient**: No unnecessary deployment configs
- **Professional**: Clean, production-ready structure
