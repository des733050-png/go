import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
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
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { teamAPI } from '../services/api';
import { TeamValue } from '../types';
import IconSelector from '../components/IconSelector';

const TeamValuesPage: React.FC = () => {
  const [values, setValues] = useState<TeamValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingValue, setEditingValue] = useState<TeamValue | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamValue>>({
    title: '',
    description: '',
    icon: '',
    orderIndex: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getValues();
      if (response.success) {
        setValues(response.data.values || []);
      } else {
        setError(response.message || 'Failed to load team values');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load team values');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError('');
    try {
      await fetchData();
    } catch (err: any) {
      setError(err.message || 'Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpenDialog = (value?: TeamValue) => {
    try {
      console.log('Opening dialog with value:', value);
      if (value) {
        setEditingValue(value);
        setFormData({
          title: value.title || '',
          description: value.description || '',
          icon: value.icon || '',
          orderIndex: value.orderIndex || 0,
          isActive: value.isActive !== undefined ? value.isActive : true,
        });
      } else {
        setEditingValue(null);
        setFormData({
          title: '',
          description: '',
          icon: '',
          orderIndex: 0,
          isActive: true,
        });
      }
      setOpenDialog(true);
    } catch (error) {
      console.error('Error opening dialog:', error);
      setError('Failed to open edit dialog');
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingValue(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingValue) {
        const response = await teamAPI.updateValue(editingValue.id, formData);
        if (response.success) {
          setValues(values.map(v => v.id === editingValue.id ? response.data : v));
          handleCloseDialog();
        } else {
          setError(response.message || 'Failed to update team value');
        }
      } else {
        const response = await teamAPI.createValue(formData);
        if (response.success) {
          setValues([...values, response.data]);
          handleCloseDialog();
        } else {
          setError(response.message || 'Failed to create team value');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save team value');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team value?')) {
      try {
        const response = await teamAPI.deleteValue(id);
        if (response.success) {
          setValues(values.filter(v => v.id !== id));
        } else {
          setError(response.message || 'Failed to delete team value');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to delete team value');
      }
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
        <Typography variant="h4">Team Values Management</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Team Value
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((value) => (
                  <TableRow key={value.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{value.title}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                        {value.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={value.icon || 'No icon'} 
                        size="small" 
                        variant="outlined"
                        color={value.icon ? "primary" : "default"}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{value.orderIndex}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={value.isActive ? 'Active' : 'Inactive'}
                        color={value.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(value.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(value)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(value.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={values.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingValue ? 'Edit Team Value' : 'Add New Team Value'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            
            <Box>
              <IconSelector
                value={formData.icon || ''}
                onChange={(value) => setFormData({ ...formData, icon: value })}
                label="Icon"
              />
              {formData.icon && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Selected icon: {formData.icon}
                </Typography>
              )}
            </Box>
            
            <TextField
              label="Order Index"
              fullWidth
              type="number"
              value={formData.orderIndex}
              onChange={(e) => setFormData({ ...formData, orderIndex: Number(e.target.value) })}
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingValue ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamValuesPage;
