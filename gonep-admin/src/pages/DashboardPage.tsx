import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Alert,
  ListItemButton,
  Button,
} from '@mui/material';
import {
  People,
  Article,
  ContactMail,
  Email,
  PlayArrow,
  Business,
  TrendingUp,
  TrendingDown,
  Work,
  Refresh as RefreshIcon,
  Category,
  Settings,
  CalendarToday,
} from '@mui/icons-material';
import { blogAPI, contactAPI, newsletterAPI, demoAPI, partnersAPI, demoConfigAPI } from '../services/api';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalInquiries: 0,
    totalSubscribers: 0,
    totalDemoRequests: 0,
    totalPartners: 0,
    totalInterests: 0,
    totalDemoTypes: 0,
    availableDates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch data from all APIs
      const [postsRes, inquiriesRes, subscribersRes, demoRes, partnersRes, interestsRes, demoTypesRes, calendarRes] = await Promise.all([
        blogAPI.getPosts(),
        contactAPI.getInquiries(),
        newsletterAPI.getSubscribers(),
        demoAPI.getRequests(),
        partnersAPI.getPartners(),
        demoConfigAPI.getInterests(),
        demoConfigAPI.getDemoTypes(),
        demoConfigAPI.getAvailableDates(),
      ]);

      setStats({
        totalPosts: postsRes.success ? postsRes.data.posts?.length || 0 : 0,
        totalInquiries: inquiriesRes.success ? inquiriesRes.data.inquiries?.length || 0 : 0,
        totalSubscribers: subscribersRes.success ? subscribersRes.data.subscribers?.length || 0 : 0,
        totalDemoRequests: demoRes.success ? demoRes.data.requests?.length || 0 : 0,
        totalPartners: partnersRes.success ? partnersRes.data.partners?.length || 0 : 0,
        totalInterests: interestsRes.success ? interestsRes.data.length || 0 : 0,
        totalDemoTypes: demoTypesRes.success ? demoTypesRes.data.length || 0 : 0,
        availableDates: calendarRes.success ? calendarRes.data.filter((d: any) => d.isAvailable).length || 0 : 0,
      });
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError('');
    try {
      await fetchStats();
    } catch (err) {
      setError('Failed to refresh dashboard data');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    trend?: 'up' | 'down';
    trendValue?: string;
  }> = ({ title, value, icon, color, trend, trendValue }) => (
    <Card sx={{ height: '100%', mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {trend && trendValue && (
              <Box display="flex" alignItems="center" mt={1}>
                {trend === 'up' ? (
                  <TrendingUp color="success" fontSize="small" />
                ) : (
                  <TrendingDown color="error" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  color={trend === 'up' ? 'success.main' : 'error.main'}
                  ml={0.5}
                >
                  {trendValue}
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: color,
              borderRadius: '50%',
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Dashboard Overview
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Total Posts"
            value={stats.totalPosts}
            icon={<Article sx={{ color: 'white' }} />}
            color="#1976d2"
            trend="up"
            trendValue="+12%"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Contact Inquiries"
            value={stats.totalInquiries}
            icon={<ContactMail sx={{ color: 'white' }} />}
            color="#388e3c"
            trend="up"
            trendValue="+8%"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Newsletter Subscribers"
            value={stats.totalSubscribers}
            icon={<Email sx={{ color: 'white' }} />}
            color="#f57c00"
            trend="up"
            trendValue="+15%"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Demo Requests"
            value={stats.totalDemoRequests}
            icon={<PlayArrow sx={{ color: 'white' }} />}
            color="#7b1fa2"
            trend="down"
            trendValue="-3%"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Partners"
            value={stats.totalPartners}
            icon={<Business sx={{ color: 'white' }} />}
            color="#d32f2f"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Demo Interests"
            value={stats.totalInterests}
            icon={<Category sx={{ color: 'white' }} />}
            color="#388e3c"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Demo Types"
            value={stats.totalDemoTypes}
            icon={<Settings sx={{ color: 'white' }} />}
            color="#1976d2"
          />
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <StatCard
            title="Available Dates"
            value={stats.availableDates}
            icon={<CalendarToday sx={{ color: 'white' }} />}
            color="#ff9800"
          />
        </Box>
      </Box>

      {/* Content Sections */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Recent Activity */}
        <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Article color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="New blog post published"
                  secondary="The Future of IoT in Healthcare - 2 hours ago"
                />
                <Chip label="Published" color="success" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ContactMail color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="New contact inquiry"
                  secondary="John Doe from Acme Corp - 4 hours ago"
                />
                <Chip label="New" color="warning" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Newsletter subscription"
                  secondary="jane.smith@example.com - 6 hours ago"
                />
                <Chip label="Subscribed" color="info" size="small" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PlayArrow color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Demo request submitted"
                  secondary="Tech Solutions Inc - 8 hours ago"
                />
                <Chip label="Pending" color="default" size="small" />
              </ListItem>
            </List>
          </Paper>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Article />
                </ListItemIcon>
                <ListItemText primary="Create New Blog Post" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="Add Team Member" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Work />
                </ListItemIcon>
                <ListItemText primary="Post Job Opening" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Business />
                </ListItemIcon>
                <ListItemText primary="Add New Partner" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Manage Demo Configuration" />
              </ListItemButton>
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
