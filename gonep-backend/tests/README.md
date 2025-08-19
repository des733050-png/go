# GONEP Backend Tests

This directory contains test files for the GONEP backend API server.

## 📁 Test Files

### API Tests
- `test-api.js` - General API endpoint tests
- `test-demo-apis.js` - Demo request API tests
- `test-upload.js` - File upload functionality tests
- `test-auth.js` - Authentication endpoint tests

### Utility Tests
- `simple-test.js` - Basic server connectivity test
- `test-image.jpg` - Test image for upload functionality

## 🧪 Running Tests

### Individual Test Files
```bash
# Test API endpoints
node tests/test-api.js

# Test demo APIs
node tests/test-demo-apis.js

# Test file upload
node tests/test-upload.js

# Test authentication
node tests/test-auth.js

# Simple connectivity test
node tests/simple-test.js
```

### Prerequisites
1. Ensure the backend server is running on port 8000
2. Database should be connected and accessible
3. Environment variables should be properly configured

## 📋 Test Coverage

### Authentication Tests
- User registration
- User login
- Token refresh
- Password reset

### API Endpoint Tests
- Health check endpoints
- Blog post endpoints
- Team member endpoints
- Career job endpoints

### File Upload Tests
- Image upload functionality
- File type validation
- File size limits
- Upload directory structure

### Demo Request Tests
- Demo request submission
- Demo configuration retrieval
- Demo types and interests

## 🔧 Test Configuration

### Environment Setup
Tests use the same environment variables as the main application. Ensure your `.env` file is properly configured.

### Test Data
- Test images are included in the `tests/` directory
- Sample data is generated during test execution
- Tests clean up after themselves when possible

## 📊 Test Results

### Expected Output
Successful tests should output:
```
✅ Test passed: [Test Name]
```

Failed tests will show:
```
❌ Test failed: [Test Name]
Error: [Error details]
```

### Common Issues
1. **Server not running** - Ensure backend is started on port 8000
2. **Database connection** - Check database credentials and connectivity
3. **File permissions** - Ensure upload directory is writable
4. **Environment variables** - Verify all required env vars are set

## 🚀 Adding New Tests

### Test File Structure
```javascript
const axios = require('axios');

async function testEndpoint() {
  try {
    const response = await axios.get('http://localhost:8000/api/endpoint');
    console.log('✅ Test passed: Endpoint test');
  } catch (error) {
    console.log('❌ Test failed: Endpoint test');
    console.error(error.message);
  }
}

// Run the test
testEndpoint();
```

### Best Practices
1. Use descriptive test names
2. Include error handling
3. Clean up test data when possible
4. Test both success and failure scenarios
5. Use appropriate HTTP methods and status codes

## 📞 Support

For test-related issues:
1. Check that the backend server is running
2. Verify database connectivity
3. Review environment variable configuration
4. Check file permissions for upload tests
