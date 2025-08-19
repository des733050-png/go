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
  Typography,
  Switch,
  FormControlLabel,
  Alert,
  Snackbar
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { demoConfigAPI } from '../services/api';
import { DemoType, CreateDemoTypeData, UpdateDemoTypeData } from '../types';

const DemoTypesPage: React.FC = () => {
  const [demoTypes, setDemoTypes] = useState<DemoType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDemoType, setEditingDemoType] = useState<DemoType | null>(null);
  const [formData, setFormData] = useState<CreateDemoTypeData>({
    name: '',
    duration: '',
    description: '',
    maxAttendees: undefined
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchDemoTypes = async () => {
    try {
      setLoading(true);
      const response = await demoConfigAPI.getDemoTypes();
      if (response.success) {
        setDemoTypes(response.data);
      }
    } catch (error) {
      console.error('Error fetching demo types:', error);
      showSnackbar('Failed to fetch demo types', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDemoTypes();
    setRefreshing(false);
  };

  const handleOpenDialog = (demoType?: DemoType) => {
    if (demoType) {
      setEditingDemoType(demoType);
      setFormData({
        name: demoType.name,
        duration: demoType.duration,
        description: demoType.description || '',
        maxAttendees: demoType.maxAttendees
      });
    } else {
      setEditingDemoType(null);
      setFormData({
        name: '',
        duration: '',
        description: '',
        maxAttendees: undefined
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDemoType(null);
    setFormData({
      name: '',
      duration: '',
      description: '',
      maxAttendees: undefined
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingDemoType) {
        await demoConfigAPI.updateDemoType(editingDemoType.id, formData);
        showSnackbar('Demo type updated successfully', 'success');
      } else {
        await demoConfigAPI.createDemoType(formData);
        showSnackbar('Demo type created successfully', 'success');
      }
      handleCloseDialog();
      fetchDemoTypes();
    } catch (error) {
      console.error('Error saving demo type:', error);
      showSnackbar('Failed to save demo type', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this demo type?')) {
      try {
        await demoConfigAPI.deleteDemoType(id);
        showSnackbar('Demo type deleted successfully', 'success');
        fetchDemoTypes();
      } catch (error) {
        console.error('Error deleting demo type:', error);
        showSnackbar('Failed to delete demo type', 'error');
      }
    }
  };

  const handleToggleActive = async (demoType: DemoType) => {
    try {
      await demoConfigAPI.updateDemoType(demoType.id, { isActive: !demoType.isActive });
      showSnackbar('Demo type status updated successfully', 'success');
      fetchDemoTypes();
    } catch (error) {
      console.error('Error updating demo type status:', error);
      showSnackbar('Failed to update demo type status', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchDemoTypes();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading demo types...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Demo Types Management
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
            Add Demo Type
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Max Attendees</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sort Order</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoTypes.map((demoType) => (
              <TableRow key={demoType.id}>
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {demoType.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="primary">
                    {demoType.duration}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {demoType.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell>
                  {demoType.maxAttendees ? `${demoType.maxAttendees} people` : 'Unlimited'}
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={demoType.isActive}
                        onChange={() => handleToggleActive(demoType)}
                        color="primary"
                      />
                    }
                    label={demoType.isActive ? 'Active' : 'Inactive'}
                  />
                </TableCell>
                <TableCell>{demoType.sortOrder}</TableCell>
                <TableCell>
                  {new Date(demoType.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(demoType)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(demoType.id)}
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
          {editingDemoType ? 'Edit Demo Type' : 'Add New Demo Type'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Demo Type Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              margin="normal"
              required
              placeholder="e.g., 45 min, 2 hours"
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              placeholder="Describe what this demo type includes"
            />
            <TextField
              fullWidth
              label="Max Attendees"
              type="number"
              value={formData.maxAttendees || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                maxAttendees: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              margin="normal"
              placeholder="Leave empty for unlimited"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name.trim() || !formData.duration.trim()}
          >
            {editingDemoType ? 'Update' : 'Create'}
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

export default DemoTypesPage;
