# 📚 GONEP Admin Dashboard Documentation

## 🎯 Overview

The GONEP Admin Dashboard is a comprehensive React-based administration panel designed to manage all aspects of the GONEP website. It provides a modern, intuitive interface for content management, user administration, and analytics.

## 🏗️ Technical Architecture

### Frontend Stack
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Professional UI components
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Recharts** - Data visualization library

### State Management
- **React Context API** - Global state management
- **useReducer** - Complex state logic
- **Local Storage** - Persistent authentication

### API Integration
- **RESTful API** - Full integration with GONEP backend
- **JWT Authentication** - Secure token-based auth
- **Error Handling** - Comprehensive error management

## 🔐 Authentication System

### Login Flow
1. User enters credentials on `/login`
2. Credentials sent to `/api/auth/login`
3. JWT token stored in localStorage
4. User redirected to `/dashboard`
5. Token automatically included in all API requests

### Protected Routes
- All admin pages require authentication
- Automatic redirect to login if not authenticated
- Token validation on app startup

### Logout Process
1. Token removed from localStorage
2. User state cleared
3. Redirect to login page

## 📊 Dashboard Features

### Statistics Cards
- **Total Posts** - Number of blog posts
- **Contact Inquiries** - Contact form submissions
- **Newsletter Subscribers** - Email subscribers
- **Demo Requests** - Demo request submissions
- **Partners** - Partner organizations

### Data Visualization
- **Line Chart** - Monthly activity trends
- **Pie Chart** - Blog category distribution
- **Real-time Updates** - Live data from API

### Quick Actions
- Create new blog post
- Add team member
- Post job opening
- Add new partner

## 🗂️ File Structure

```
gonep-admin/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   └── Layout.tsx     # Main layout with navigation
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── pages/             # Page components
│   │   ├── LoginPage.tsx  # Login page
│   │   └── DashboardPage.tsx # Main dashboard
│   ├── services/          # API services
│   │   └── api.ts        # Centralized API client
│   ├── types/             # TypeScript definitions
│   │   └── index.ts      # All interfaces
│   ├── App.tsx           # Main app component
│   └── index.tsx         # App entry point
├── package.json          # Dependencies and scripts
├── README.md            # Project overview
└── DOCUMENTATION.md     # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
```

### API Configuration
Update API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Theme Customization
Modify theme in `src/App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your brand color
    },
    secondary: {
      main: '#dc004e',
    },
  },
});
```

## 📱 Responsive Design

### Breakpoints
- **Desktop** (1200px+) - Full sidebar navigation
- **Tablet** (768px - 1199px) - Collapsible sidebar
- **Mobile** (< 768px) - Hamburger menu

### Mobile Features
- Touch-friendly interface
- Swipe gestures support
- Optimized for small screens
- Fast loading times

## 🔄 API Integration

### Authentication Endpoints

#### Login
```typescript
POST /api/auth/login
{
  "email": "admin@gonep.com",
  "password": "password123"
}
```

#### Get Current User
```typescript
GET /api/auth/me
Authorization: Bearer <token>
```

### Blog Management

#### Get All Posts
```typescript
GET /api/blog/posts
```

#### Create Post
```typescript
POST /api/blog/posts
{
  "title": "Post Title",
  "content": "Post content...",
  "excerpt": "Brief excerpt",
  "categoryId": 1,
  "authorId": 1,
  "isPublished": true,
  "isFeatured": false
}
```

### Team Management

#### Get Team Members
```typescript
GET /api/team
```

#### Create Team Member
```typescript
POST /api/team
{
  "name": "John Doe",
  "role": "Software Engineer",
  "bio": "Team member bio...",
  "department": "Engineering",
  "isLeadership": false
}
```

### Contact Management

#### Get Inquiries
```typescript
GET /api/contact/inquiries
```

#### Update Inquiry Status
```typescript
PUT /api/contact/inquiries/:id
{
  "status": "resolved"
}
```

## 🎨 UI Components

### Material-UI Components Used
- **AppBar** - Top navigation bar
- **Drawer** - Sidebar navigation
- **Card** - Content containers
- **DataGrid** - Data tables
- **Charts** - Data visualization
- **Forms** - Input components
- **Dialogs** - Modal windows

### Custom Components
- **Layout** - Main layout wrapper
- **StatCard** - Statistics display
- **ProtectedRoute** - Route protection
- **LoadingSpinner** - Loading states

## 🔒 Security Features

### Authentication
- JWT token validation
- Automatic token refresh
- Secure token storage
- Session management

### Authorization
- Role-based access control
- Protected API endpoints
- Route-level security
- Admin-only features

### Data Protection
- HTTPS enforcement
- XSS prevention
- CSRF protection
- Input validation

## 📈 Performance Optimization

### Code Splitting
- Route-based code splitting
- Lazy loading of components
- Dynamic imports
- Bundle optimization

### Caching
- API response caching
- Static asset caching
- Browser caching
- Service worker support

### Loading States
- Skeleton screens
- Progress indicators
- Optimistic updates
- Error boundaries

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Test Coverage
```bash
npm test -- --coverage
```

### E2E Tests
```bash
npm run test:e2e
```

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Production Optimization
- Code minification
- Asset optimization
- Bundle splitting
- Performance monitoring

### Deployment Platforms
- **Netlify** - Static site hosting
- **Vercel** - React deployment
- **AWS S3** - Cloud hosting
- **Docker** - Container deployment

## 🔧 Development

### Development Server
```bash
npm start
```

### Code Quality
- ESLint configuration
- Prettier formatting
- TypeScript strict mode
- Git hooks

### Debugging
- React DevTools
- Redux DevTools
- Network monitoring
- Error tracking

## 📋 Roadmap

### Phase 1 (Current)
- ✅ Authentication system
- ✅ Dashboard overview
- ✅ Basic CRUD operations
- ✅ Responsive design

### Phase 2 (Next)
- 🔄 Advanced analytics
- 🔄 Bulk operations
- 🔄 File upload system
- 🔄 User management

### Phase 3 (Future)
- 📅 Real-time notifications
- 📅 Advanced reporting
- 📅 API documentation
- 📅 Performance monitoring

## 🆘 Troubleshooting

### Common Issues

#### CORS Errors
- Ensure backend CORS is configured
- Check API base URL
- Verify authentication headers

#### Authentication Issues
- Clear localStorage
- Check token expiration
- Verify API endpoints

#### Build Errors
- Clear node_modules
- Update dependencies
- Check TypeScript errors

### Debug Mode
Enable debug logging:

```typescript
localStorage.setItem('debug', 'true');
```

## 📞 Support

### Getting Help
1. Check the documentation
2. Review error logs
3. Test in different browsers
4. Contact development team

### Reporting Issues
- Use GitHub issues
- Include error details
- Provide reproduction steps
- Attach screenshots

---

**Last Updated:** December 2024
**Version:** 1.0.0
**Maintainer:** GONEP Development Team
