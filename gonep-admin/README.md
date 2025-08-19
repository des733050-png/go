# 🚀 GONEP Admin Dashboard

A modern, responsive React admin dashboard for managing the GONEP website backend. Built with TypeScript, Material-UI, and React Router.

## ✨ Features

- **🔐 Secure Authentication** - JWT-based authentication with protected routes
- **📊 Real-time Dashboard** - Live statistics and charts with Recharts
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **🎨 Modern UI** - Material-UI components with custom theming
- **📈 Data Visualization** - Interactive charts and graphs
- **🔄 Real-time API Integration** - Connected to GONEP backend API
- **📝 Modular Architecture** - Well-organized, maintainable code structure

## 🏗️ Architecture

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with sidebar navigation
├── contexts/           # React contexts for state management
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── LoginPage.tsx   # Login page
│   └── DashboardPage.tsx # Main dashboard
├── services/           # API services
│   └── api.ts         # Centralized API client
├── types/              # TypeScript type definitions
│   └── index.ts       # All type interfaces
└── App.tsx            # Main app component with routing
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- GONEP backend server running on `http://localhost:5000`

### Installation

1. **Clone and navigate to the admin directory:**
   ```bash
   cd gonep-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email:** `admin@gonep.com`
- **Password:** `password123`

## 📋 Available Pages

### 🔐 Authentication
- **Login Page** (`/login`) - Secure authentication with JWT

### 📊 Dashboard (`/dashboard`)
- **Overview Statistics** - Total posts, inquiries, subscribers, demo requests, partners
- **Interactive Charts** - Monthly activity line chart, blog categories pie chart
- **Recent Activity** - Latest actions and updates
- **Quick Actions** - Fast access to common tasks

### 📝 Content Management (Coming Soon)
- **Blog Management** (`/blog`) - Create, edit, and manage blog posts
- **Team Management** (`/team`) - Manage team members and values
- **Careers** (`/careers`) - Job postings and departments
- **Partners** (`/partners`) - Partner management

### 📧 Communication (Coming Soon)
- **Contact Inquiries** (`/contact`) - Manage contact form submissions
- **Newsletter** (`/newsletter`) - Subscriber management
- **Demo Requests** (`/demo`) - Demo request tracking

## 🔧 API Integration

The dashboard is fully integrated with the GONEP backend API:

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Blog Endpoints
- `GET /api/blog/posts` - Get all blog posts
- `POST /api/blog/posts` - Create new post
- `PUT /api/blog/posts/:id` - Update post
- `DELETE /api/blog/posts/:id` - Delete post
- `GET /api/blog/categories` - Get categories
- `GET /api/blog/authors` - Get authors

### Team Endpoints
- `GET /api/team` - Get team members
- `GET /api/team/values` - Get team values
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member

### Careers Endpoints
- `GET /api/careers/jobs` - Get job openings
- `GET /api/careers/departments` - Get departments
- `POST /api/careers/jobs` - Create job
- `PUT /api/careers/jobs/:id` - Update job
- `DELETE /api/careers/jobs/:id` - Delete job

### Contact Endpoints
- `GET /api/contact/inquiries` - Get contact inquiries
- `GET /api/contact/methods` - Get contact methods
- `PUT /api/contact/inquiries/:id` - Update inquiry status
- `DELETE /api/contact/inquiries/:id` - Delete inquiry

### Newsletter Endpoints
- `GET /api/newsletter/subscribers` - Get subscribers
- `PUT /api/newsletter/subscribers/:id` - Update subscriber
- `DELETE /api/newsletter/subscribers/:id` - Delete subscriber
- `GET /api/newsletter/export` - Export subscribers

### Demo Requests Endpoints
- `GET /api/demo/requests` - Get demo requests
- `PUT /api/demo/requests/:id` - Update request status
- `DELETE /api/demo/requests/:id` - Delete request

### Partners Endpoints
- `GET /api/partners` - Get partners
- `POST /api/partners` - Create partner
- `PUT /api/partners/:id` - Update partner
- `DELETE /api/partners/:id` - Delete partner

## 🎨 Customization

### Theme Configuration

The dashboard uses Material-UI theming. Customize the theme in `src/App.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    secondary: {
      main: '#dc004e', // Change secondary color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
```

### API Configuration

Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5000/api'; // Change to your backend URL
```

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- **Desktop** (1200px+) - Full sidebar navigation
- **Tablet** (768px - 1199px) - Collapsible sidebar
- **Mobile** (< 768px) - Hamburger menu with overlay

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Automatic redirect to login for unauthenticated users
- **Token Refresh** - Automatic token validation and refresh
- **Secure API Calls** - All API requests include authentication headers
- **Error Handling** - Graceful error handling with user-friendly messages

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=production
```

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Set environment variables in Netlify dashboard

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm test -- --coverage
```

## 📦 Dependencies

### Core Dependencies
- **React** (18.x) - UI library
- **TypeScript** (4.x) - Type safety
- **Material-UI** (5.x) - UI components
- **React Router** (6.x) - Routing
- **Axios** (1.x) - HTTP client
- **Recharts** (2.x) - Charts and graphs

### Development Dependencies
- **@types/react** - React TypeScript definitions
- **@types/react-dom** - React DOM TypeScript definitions
- **@types/node** - Node.js TypeScript definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## 🔄 Updates

### Version 1.0.0
- Initial release with dashboard and authentication
- Basic CRUD operations for all modules
- Responsive design implementation
- Real-time data visualization

### Planned Features
- Advanced analytics and reporting
- Bulk operations and data export
- User management and roles
- Advanced search and filtering
- Real-time notifications
- File upload and media management

---

**Built with ❤️ for GONEP Healthcare Solutions**
