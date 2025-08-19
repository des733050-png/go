const fs = require('fs');
const path = require('path');

const envContent = `# Database Configuration
DATABASE_URL=mysql://root:@127.0.0.1:3306/gonep

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-for-gonep-backend-2024
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=your-super-secret-refresh-token-key-for-gonep-backend-2024
REFRESH_TOKEN_EXPIRES_IN=30d

# Server Configuration
PORT=8000
NODE_ENV=development

# Email Configuration (optional for now)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@gonep.com

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760

# Security
CORS_ORIGIN=http://localhost:8001
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
`;

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
} else {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully');
  console.log('📝 Please update the email configuration in .env if needed');
}

console.log('🔧 Environment variables set up complete!');
console.log('🚀 You can now restart the backend server');
