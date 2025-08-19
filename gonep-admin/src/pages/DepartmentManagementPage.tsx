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
  Alert,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { careersAPI } from '../services/api';
import { Department } from '../types';

const DepartmentManagementPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await careersAPI.getDepartmentStats(); // Use stats endpoint to get job counts
      if (response.success) {
        setDepartments(response.data.departments || []);
      } else {
        setError('Failed to load departments');
      }
    } catch (err) {
      setError('Failed to load departments');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (department?: Department) => {
    setError('');
    setSubmitSuccess('');
    
    if (department) {
      setEditingDepartment(department);
      setFormData({
        name: department.name,
        description: department.description || '',
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        name: '',
        description: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDepartment(null);
    setError('');
    setSubmitSuccess('');
    setSubmitting(false);
    setFormData({
      name: '',
      description: '',
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError('');
      setSubmitSuccess('');
      
      if (editingDepartment) {
        const response = await careersAPI.updateDepartment(editingDepartment.id, formData);
        if (response.success) {
          setDepartments(departments.map(d => d.id === editingDepartment.id ? response.data : d));
          setSubmitSuccess('Department updated successfully!');
          setTimeout(() => {
            handleCloseDialog();
            setSubmitSuccess('');
          }, 1000);
        } else {
          setError('Failed to update department');
        }
      } else {
        const response = await careersAPI.createDepartment(formData);
        if (response.success) {
          setDepartments([response.data, ...departments]);
          setSubmitSuccess('Department created successfully!');
          setTimeout(() => {
            handleCloseDialog();
            setSubmitSuccess('');
          }, 1000);
        } else {
          setError('Failed to create department');
        }
      }
    } catch (err) {
      setError('Failed to save department');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      try {
        const response = await careersAPI.deleteDepartment(id);
        if (response.success) {
          setDepartments(departments.filter(d => d.id !== id));
        } else {
          setError('Failed to delete department');
        }
      } catch (err) {
        setError('Failed to delete department');
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Department Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchDepartments}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Department
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="primary" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Total Departments
                </Typography>
                <Typography variant="h4">
                  {departments.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="success" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Active Departments
                </Typography>
                <Typography variant="h4">
                  {departments.filter(d => d.isActive).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="info" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Total Jobs
                </Typography>
                <Typography variant="h4">
                  {departments.reduce((sum, dept) => sum + (dept.totalJobs || dept.jobCount || 0), 0)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="warning" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Active Jobs
                </Typography>
                <Typography variant="h4">
                  {departments.reduce((sum, dept) => sum + (dept.activeJobs || 0), 0)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Department Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Total Jobs</TableCell>
                <TableCell>Active Jobs</TableCell>
                <TableCell>Inactive Jobs</TableCell>
                <TableCell>Featured Jobs</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((department) => (
                  <TableRow key={department.id}>
                    <TableCell>
                      <Typography variant="subtitle2">{department.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {department.description || 'No description'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={department.totalJobs || department.jobCount || 0} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={department.activeJobs || 0} 
                        size="small" 
                        color="success"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={department.inactiveJobs || 0} 
                        size="small" 
                        color="warning"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={department.featuredJobs || 0} 
                        size="small" 
                        color="info"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={department.isActive ? 'Active' : 'Inactive'}
                        color={department.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(department.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(department)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(department.id)}
                            disabled={department.jobCount > 0}
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
          count={departments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDepartment ? 'Edit Department' : 'Create New Department'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {submitSuccess}
            </Alert>
          )}
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Department Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Engineering, Medical, Sales"
              autoFocus
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the department's role and responsibilities"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={submitting || !formData.name.trim()}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            {submitting ? 'Saving...' : (editingDepartment ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentManagementPage;
