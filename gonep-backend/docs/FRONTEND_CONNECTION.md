# Frontend Connection Guide

This guide explains how to connect your frontend application to the GONEP backend API.

## 🚀 Quick Start

### 1. Backend Setup
First, ensure your backend is running:

```bash
# Install dependencies
npm install

# Set up your environment variables
cp .env.example .env
# Edit .env with your actual database credentials

# Start the development server
npm run dev
```

The backend will be available at `http://localhost:6000`

### 2. Test Frontend
Open `test-frontend/index.html` in your browser to test the API endpoints.

## 🔧 API Configuration

### Base URL
```javascript
const API_BASE_URL = 'http://localhost:6000/api';
```

### Authentication
The API uses JWT (JSON Web Tokens) for authentication.

```javascript
// Include token in requests
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Blog
- `GET /api/blog/posts` - Get all blog posts
- `GET /api/blog/posts/:slug` - Get post by slug
- `GET /api/blog/categories` - Get post categories
- `GET /api/blog/featured` - Get featured posts
- `POST /api/blog/posts` - Create new post (Admin)
- `PUT /api/blog/posts/:id` - Update post (Admin)
- `DELETE /api/blog/posts/:id` - Delete post (Admin)

### Demo Requests
- `POST /api/demo/request` - Submit demo request
- `GET /api/demo/requests` - Get all requests (Admin)
- `GET /api/demo/requests/:id` - Get request details (Admin)
- `PUT /api/demo/requests/:id` - Update request (Admin)

### Contact
- `POST /api/contact/submit` - Submit contact form
- `GET /api/contact/inquiries` - Get all inquiries (Admin)
- `GET /api/contact/inquiries/:id` - Get inquiry details (Admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter

### Team
- `GET /api/team/members` - Get all team members
- `GET /api/team/leadership` - Get leadership team

### Careers
- `GET /api/careers/jobs` - Get all job openings
- `GET /api/careers/jobs/:slug` - Get job by slug
- `POST /api/careers/apply` - Submit job application
- `GET /api/careers/departments` - Get departments

### Partners
- `GET /api/partners` - Get all partners

### Analytics
- `POST /api/analytics/track` - Track user interaction
- `GET /api/analytics/dashboard` - Get analytics data (Admin)

### File Upload
- `POST /api/upload` - Upload file (Authenticated)
- `DELETE /api/upload/:id` - Delete file (Authenticated)

## 🔐 Authentication Flow

### 1. User Registration
```javascript
const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData)
  });
  
  return response.json();
};

// Usage
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
};

const result = await registerUser(userData);
```

### 2. User Login
```javascript
const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  });
  
  const result = await response.json();
  
  if (result.success) {
    // Store token
    localStorage.setItem('authToken', result.data.token);
  }
  
  return result;
};

// Usage
const credentials = {
  email: 'john@example.com',
  password: 'password123'
};

const result = await loginUser(credentials);
```

### 3. Authenticated Requests
```javascript
const makeAuthenticatedRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers
    }
  });
  
  return response.json();
};

// Usage
const userProfile = await makeAuthenticatedRequest('/auth/profile');
```

## 📝 Example Integration

### React Component Example
```jsx
import React, { useState, useEffect } from 'react';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blog/posts`);
      const result = await response.json();
      
      if (result.success) {
        setPosts(result.data.posts);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Blog Posts</h2>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
```

### Vue.js Component Example
```vue
<template>
  <div>
    <h2>Blog Posts</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      loading: true,
      error: null
    };
  },
  async mounted() {
    await this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch(`${API_BASE_URL}/blog/posts`);
        const result = await response.json();
        
        if (result.success) {
          this.posts = result.data.posts;
        } else {
          this.error = result.message;
        }
      } catch (err) {
        this.error = 'Failed to fetch posts';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

## 🛠️ Error Handling

### Global Error Handler
```javascript
const handleApiError = (error) => {
  if (error.status === 401) {
    // Unauthorized - redirect to login
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  } else if (error.status === 403) {
    // Forbidden - show access denied message
    alert('Access denied');
  } else if (error.status >= 500) {
    // Server error
    alert('Server error. Please try again later.');
  } else {
    // Other errors
    alert(error.message || 'An error occurred');
  }
};
```

### Request Wrapper
```javascript
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw {
        status: response.status,
        message: result.message || 'Request failed'
      };
    }
    
    return result;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
```

## 🔒 Security Considerations

### 1. Token Storage
- Store tokens securely (localStorage for development, httpOnly cookies for production)
- Implement token refresh logic
- Clear tokens on logout

### 2. Input Validation
- Always validate user input on the frontend
- Sanitize data before sending to API
- Use HTTPS in production

### 3. Error Messages
- Don't expose sensitive information in error messages
- Log errors for debugging
- Show user-friendly error messages

## 📱 Environment Configuration

### Development
```javascript
const config = {
  API_BASE_URL: 'http://localhost:6000/api',
  ENVIRONMENT: 'development'
};
```

### Production
```javascript
const config = {
  API_BASE_URL: 'https://api.gonep.com/api',
  ENVIRONMENT: 'production'
};
```

## 🧪 Testing

### Unit Tests
```javascript
import { jest } from '@jest/globals';

describe('API Integration', () => {
  test('should fetch blog posts', async () => {
    const response = await fetch(`${API_BASE_URL}/blog/posts`);
    const result = await response.json();
    
    expect(response.ok).toBe(true);
    expect(result.success).toBe(true);
    expect(Array.isArray(result.data.posts)).toBe(true);
  });
});
```

### Integration Tests
```javascript
describe('Authentication Flow', () => {
  test('should register and login user', async () => {
    // Register user
    const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    expect(registerResponse.ok).toBe(true);
    
    // Login user
    const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    
    const loginResult = await loginResponse.json();
    expect(loginResponse.ok).toBe(true);
    expect(loginResult.data.token).toBeDefined();
  });
});
```

## 📚 Additional Resources

- [API Documentation](./README.md)
- [Database Schema](./src/database/schema/)
- [Error Handling](./src/middleware/errorHandler.ts)
- [Validation Schemas](./src/utils/validation.ts)

## 🆘 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify the backend is running
3. Check your environment variables
4. Review the API documentation
5. Test with the provided test frontend

For additional help, please refer to the main README or create an issue in the repository.
