# GONEP Backend API

A Node.js/Express backend API for the GONEP Healthcare platform, optimized for cPanel hosting.

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- MySQL database (via cPanel/phpMyAdmin)
- cPanel hosting account

### Installation
```bash
# Install dependencies
npm install

# Create environment file
cp env.example .env
# Edit .env with your cPanel database credentials
```

### Database Setup
```bash
# Test database connection
npm run test:connection

# Run all database migrations
npm run migrate:all
```

### Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
gonep-backend/
├── src/                    # Source code
│   ├── controllers/        # API controllers
│   ├── database/          # Database schema and migrations
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   └── services/          # Business logic services
├── migrations/            # Database migration scripts
│   ├── run-all-migrations.js
│   └── MIGRATION-GUIDE.md
├── tests/                 # Test files
│   ├── api/              # API tests
│   └── database/         # Database tests
├── uploads/              # File upload directory
└── package.json
```

## 🔧 Environment Configuration

Create a `.env` file with your cPanel database credentials:

```env
# Database Configuration (cPanel/phpMyAdmin)
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_cpanel_username
DB_PASSWORD=your_cpanel_password
DB_NAME=your_cpanel_database

# Server Configuration
NODE_ENV=production
PORT=8000

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

## 🗄️ Database Management

### Running Migrations
```bash
# Run all pending migrations
npm run migrate:all

# Test database connection
npm run test:connection
```

### Migration Files
The system includes migrations for:
- User management
- Blog system
- Team management
- Demo requests
- Newsletter subscriptions
- Contact inquiries
- Partner management
- Career management

## 🧪 Testing

### API Tests
```bash
# Test API endpoints
cd tests/api
node test-api.js
```

### Database Tests
```bash
# Test database functionality
cd tests/database
node check-db.js
```

## 🚀 Deployment

### cPanel Deployment
1. Upload your code to cPanel
2. Set up Node.js app in cPanel
3. Configure environment variables
4. Run database migrations
5. Start the application

### Environment Variables
Ensure all required environment variables are set in your cPanel Node.js app configuration.

## 📚 API Documentation

The API provides endpoints for:
- User authentication and management
- Blog post management
- Team member management
- Demo request handling
- Newsletter subscriptions
- Contact form processing
- File uploads
- Partner management

## 🛠️ Development

### Adding New Features
1. Create database migrations in `src/database/migrations/`
2. Add controllers in `src/controllers/`
3. Define routes in `src/routes/`
4. Add tests in `tests/` directory

### Database Changes
1. Create migration file
2. Update schema in `src/database/schema/`
3. Test with `npm run migrate:all`

## 📞 Support

For issues or questions:
1. Check the migration guide in `migrations/MIGRATION-GUIDE.md`
2. Review test files for examples
3. Check database connection with `npm run test:connection`

## 🔒 Security

- JWT-based authentication
- Input validation and sanitization
- Rate limiting
- CORS configuration
- Helmet security headers

## 📄 License

MIT License - see LICENSE file for details.
