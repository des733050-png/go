import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Article,
  People,
  Work,
  ContactMail,
  Email,
  PlayArrow,
  Business,
  AccountCircle,
  Logout,
  Notifications,
  Settings,
  Category,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NavItem } from '../types';

const drawerWidth = 240;

// Navigation items
const navItems: NavItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'Dashboard',
  },
  {
    id: 'blog',
    title: 'Blog Management',
    path: '/blog',
    icon: 'Article',
  },
  {
    id: 'team',
    title: 'Team Management',
    path: '/team',
    icon: 'People',
  },
  {
    id: 'team-values',
    title: 'Team Values',
    path: '/team-values',
    icon: 'Category',
  },
  {
    id: 'careers',
    title: 'Careers',
    path: '/careers',
    icon: 'Work',
  },
  {
    id: 'contact',
    title: 'Contact Inquiries',
    path: '/contact',
    icon: 'ContactMail',
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    path: '/newsletter',
    icon: 'Email',
  },
  {
    id: 'demo',
    title: 'Demo Management',
    path: '/demo-management',
    icon: 'PlayArrow',
  },
  {
    id: 'demo-video',
    title: 'Demo Videos',
    path: '/demo-videos',
    icon: 'PlayArrow',
  },
  {
    id: 'partners',
    title: 'Partners',
    path: '/partners',
    icon: 'Business',
  },
];

// Icon mapping
const iconMap: { [key: string]: React.ComponentType } = {
  Dashboard,
  Article,
  People,
  Work,
  ContactMail,
  Email,
  PlayArrow,
  Business,
  Settings,
  Category,
  CalendarToday,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleProfileMenuClose();
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          GONEP Admin
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => {
          const IconComponent = iconMap[item.icon];
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <IconComponent />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {navItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled>
          <Typography variant="body2">
            {user?.firstName} {user?.lastName}
          </Typography>
        </MenuItem>
        <MenuItem disabled>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Layout;
