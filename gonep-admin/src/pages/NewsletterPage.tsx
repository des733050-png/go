import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { newsletterAPI } from '../services/api';
import { NewsletterSubscriber } from '../types';

const NewsletterPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<NewsletterSubscriber | null>(null);
  const [formData, setFormData] = useState<Partial<NewsletterSubscriber>>({
    email: '',
    firstName: '',
    lastName: '',
    isActive: true,
  });
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await newsletterAPI.getSubscribers();
      if (response.success) {
        setSubscribers(response.data.subscribers || []);
      }
    } catch (err) {
      setError('Failed to load newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (subscriber?: NewsletterSubscriber) => {
    if (subscriber) {
      setEditingSubscriber(subscriber);
      setFormData({
        email: subscriber.email,
        firstName: subscriber.firstName,
        lastName: subscriber.lastName,
        isActive: subscriber.isActive,
      });
    } else {
      setEditingSubscriber(null);
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        isActive: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSubscriber(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingSubscriber) {
        const response = await newsletterAPI.updateSubscriber(editingSubscriber.id, formData);
        if (response.success) {
          setSubscribers(subscribers.map(s => s.id === editingSubscriber.id ? response.data : s));
        }
      }
      handleCloseDialog();
      fetchData(); // Refresh data
    } catch (err) {
      setError('Failed to update subscriber');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        const response = await newsletterAPI.deleteSubscriber(id);
        if (response.success) {
          setSubscribers(subscribers.filter(s => s.id !== id));
        }
      } catch (err) {
        setError('Failed to delete subscriber');
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await newsletterAPI.exportSubscribers();
      if (response.success) {
        // Create and download CSV file
        const csvContent = "data:text/csv;charset=utf-8," 
          + "Email,First Name,Last Name,Status,Created Date\n"
          + subscribers.map(s => 
              `${s.email},${s.firstName},${s.lastName},${s.isActive ? 'Active' : 'Inactive'},${new Date(s.createdAt).toLocaleDateString()}`
            ).join("\n");
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "newsletter_subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      setError('Failed to export subscribers');
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Newsletter Subscribers</Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchData}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Subscriber
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filter Options */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Typography variant="subtitle1">Filter:</Typography>
        <Button
          variant={activeFilter === 'all' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setActiveFilter('all')}
        >
          All ({subscribers.length})
        </Button>
        <Button
          variant={activeFilter === 'active' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setActiveFilter('active')}
        >
          Active ({subscribers.filter(s => s.isActive).length})
        </Button>
        <Button
          variant={activeFilter === 'inactive' ? 'contained' : 'outlined'}
          size="small"
          onClick={() => setActiveFilter('inactive')}
        >
          Inactive ({subscribers.filter(s => !s.isActive).length})
        </Button>
      </Box>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="body2">
          <strong>Unsubscribe Management:</strong> Use the toggle switches to enable/disable subscribers. 
          Inactive subscribers will not receive bulk emails when the bulk email messaging feature is enabled.
        </Typography>
      </Alert>

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Subscribers
              </Typography>
              <Typography variant="h4">
                {subscribers.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Subscribers
              </Typography>
              <Typography variant="h4">
                {subscribers.filter(s => s.isActive).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Inactive Subscribers
              </Typography>
              <Typography variant="h4">
                {subscribers.filter(s => !s.isActive).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                This Month
              </Typography>
              <Typography variant="h4">
                {subscribers.filter(s => {
                  const created = new Date(s.createdAt);
                  const now = new Date();
                  return created.getMonth() === now.getMonth() && 
                         created.getFullYear() === now.getFullYear();
                }).length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subscriber</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Subscribed Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscribers
                .filter(subscriber => {
                  if (activeFilter === 'all') return true;
                  if (activeFilter === 'active') return subscriber.isActive;
                  if (activeFilter === 'inactive') return !subscriber.isActive;
                  return true;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <PersonIcon color="action" />
                        <Box>
                          <Typography variant="subtitle2">
                            {subscriber.firstName} {subscriber.lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {subscriber.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>
                      <Chip
                        icon={subscriber.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                        label={subscriber.isActive ? 'Active' : 'Inactive'}
                        color={subscriber.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Tooltip title="Edit Subscriber">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(subscriber)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={subscriber.isActive ? "Disable Subscriber" : "Enable Subscriber"}>
                          <Switch
                            checked={subscriber.isActive}
                            onChange={async (e) => {
                              try {
                                const response = await newsletterAPI.updateSubscriber(subscriber.id, {
                                  ...subscriber,
                                  isActive: e.target.checked
                                });
                                if (response.success) {
                                  setSubscribers(subscribers.map(s => 
                                    s.id === subscriber.id ? { ...s, isActive: e.target.checked } : s
                                  ));
                                }
                              } catch (err) {
                                setError('Failed to update subscriber status');
                              }
                            }}
                            size="small"
                          />
                        </Tooltip>
                        <Tooltip title="Delete Subscriber">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(subscriber.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={subscribers.filter(subscriber => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'active') return subscriber.isActive;
            if (activeFilter === 'inactive') return !subscriber.isActive;
            return true;
          }).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Edit Subscriber Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSubscriber ? 'Edit Subscriber' : 'Add New Subscriber'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Email"
              fullWidth
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              fullWidth
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active Subscriber"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSubscriber ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewsletterPage;
