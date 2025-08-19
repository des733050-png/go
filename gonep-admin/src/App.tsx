import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BlogManagementPage from './pages/BlogManagementPage';
import TeamManagementPage from './pages/TeamManagementPage';
import TeamValuesPage from './pages/TeamValuesPage';
import ContactInquiriesPage from './pages/ContactInquiriesPage';
import NewsletterPage from './pages/NewsletterPage';
import DemoRequestsPage from './pages/DemoRequestsPage';
import DemoManagementPage from './pages/DemoManagementPage';
import VideoManagementPage from './pages/VideoManagementPage';
import PartnersPage from './pages/PartnersPage';
import CareersPage from './pages/CareersPage';
import DepartmentManagementPage from './pages/DepartmentManagementPage';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/blog"
        element={
          <ProtectedRoute>
            <BlogManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team"
        element={
          <ProtectedRoute>
            <TeamManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/team-values"
        element={
          <ProtectedRoute>
            <TeamValuesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/careers"
        element={
          <ProtectedRoute>
            <CareersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/departments"
        element={
          <ProtectedRoute>
            <DepartmentManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactInquiriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/newsletter"
        element={
          <ProtectedRoute>
            <NewsletterPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo"
        element={
          <ProtectedRoute>
            <DemoRequestsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-management"
        element={
          <ProtectedRoute>
            <DemoManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/demo-videos"
        element={
          <ProtectedRoute>
            <VideoManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/partners"
        element={
          <ProtectedRoute>
            <PartnersPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
