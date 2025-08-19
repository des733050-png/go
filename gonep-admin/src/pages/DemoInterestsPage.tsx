import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { demoConfigAPI } from '../services/api';
import { DemoInterest, CreateInterestData, UpdateInterestData } from '../types';

const DemoInterestsPage: React.FC = () => {
  const [interests, setInterests] = useState<DemoInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingInterest, setEditingInterest] = useState<DemoInterest | null>(null);
  const [formData, setFormData] = useState<CreateInterestData>({
    name: '',
    description: '',
    category: 'general'
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const categories = [
    'general',
    'diagnostics',
    'ai',
    'technical',
    'analytics',
    'support',
    'planning',
    'business'
  ];

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const response = await demoConfigAPI.getInterests();
      if (response.success) {
        setInterests(response.data);
      }
    } catch (error) {
      console.error('Error fetching interests:', error);
      showSnackbar('Failed to fetch interests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInterests();
    setRefreshing(false);
  };

  const handleOpenDialog = (interest?: DemoInterest) => {
    if (interest) {
      setEditingInterest(interest);
      setFormData({
        name: interest.name,
        description: interest.description || '',
        category: interest.category
      });
    } else {
      setEditingInterest(null);
      setFormData({
        name: '',
        description: '',
        category: 'general'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingInterest(null);
    setFormData({
      name: '',
      description: '',
      category: 'general'
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingInterest) {
        await demoConfigAPI.updateInterest(editingInterest.id, formData);
        showSnackbar('Interest updated successfully', 'success');
      } else {
        await demoConfigAPI.createInterest(formData);
        showSnackbar('Interest created successfully', 'success');
      }
      handleCloseDialog();
      fetchInterests();
    } catch (error) {
      console.error('Error saving interest:', error);
      showSnackbar('Failed to save interest', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this interest?')) {
      try {
        await demoConfigAPI.deleteInterest(id);
        showSnackbar('Interest deleted successfully', 'success');
        fetchInterests();
      } catch (error) {
        console.error('Error deleting interest:', error);
        showSnackbar('Failed to delete interest', 'error');
      }
    }
  };

  const handleToggleActive = async (interest: DemoInterest) => {
    try {
      await demoConfigAPI.updateInterest(interest.id, { isActive: !interest.isActive });
      showSnackbar('Interest status updated successfully', 'success');
      fetchInterests();
    } catch (error) {
      console.error('Error updating interest status:', error);
      showSnackbar('Failed to update interest status', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading interests...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Demo Interests Management
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{ mr: 2 }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Interest
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sort Order</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interests.map((interest) => (
              <TableRow key={interest.id}>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {interest.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {interest.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={interest.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={interest.isActive}
                        onChange={() => handleToggleActive(interest)}
                        color="primary"
                      />
                    }
                    label={interest.isActive ? 'Active' : 'Inactive'}
                  />
                </TableCell>
                <TableCell>{interest.sortOrder}</TableCell>
                <TableCell>
                  {new Date(interest.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(interest)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(interest.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingInterest ? 'Edit Interest' : 'Add New Interest'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Interest Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingInterest ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DemoInterestsPage;
