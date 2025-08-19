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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  Work as WorkIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { careersAPI } from '../services/api';
import { Job, Department, JobForm } from '../types';
import InlineDepartmentCreator from '../components/InlineDepartmentCreator';

const CareersPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [departmentCreatorOpen, setDepartmentCreatorOpen] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState<JobForm>({
    title: '',
    slug: '',
    departmentId: 0,
    location: '',
    type: '',
    level: '',
    description: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    niceToHave: [],
    salaryRange: '',
    experience: '',
    education: '',
    teamInfo: '',
    growthOpportunities: '',
    isActive: true,
    isFeatured: false,
    applicationDeadline: '',
  });

  // Helper function to format array fields for display
  const formatArrayField = (field: string[] | string | undefined): string => {
    if (Array.isArray(field)) {
      return field.length > 0 ? field.join(' • ') : 'Not specified';
    }
    if (typeof field === 'string') {
      return field || 'Not specified';
    }
    return 'Not specified';
  };

  // Helper function to truncate long text
  const truncateText = (text: string, maxLength: number = 100): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Helper function to format date for input field
  const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Helper function to clean array data
  const cleanArrayData = (data: any): string[] => {
    if (Array.isArray(data)) {
      return data
        .filter(item => item && typeof item === 'string' && item.trim() !== '')
        .map(item => {
          // Handle case where item might be a JSON string
          try {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) {
              return parsed
                .filter(subItem => subItem && typeof subItem === 'string' && subItem.trim() !== '')
                .map(subItem => subItem.trim());
            }
          } catch {
            // If parsing fails, treat as regular string
          }
          return item.trim();
        })
        .flat() // Flatten nested arrays
        .filter(item => item && typeof item === 'string' && item.trim() !== '');
    }
    if (typeof data === 'string') {
      // Handle case where the string might be a JSON string
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed
            .filter(item => item && typeof item === 'string' && item.trim() !== '')
            .map(item => item.trim());
        }
      } catch {
        // If parsing fails, treat as regular string
      }
      return data
        .split('\n')
        .filter(item => item && item.trim() !== '')
        .map(item => item.trim());
    }
    return [];
  };

  // Helper function to clear success message after delay
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  // Helper function to clear error message
  const clearError = () => {
    setError('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [jobsRes, departmentsRes] = await Promise.all([
        careersAPI.getJobsAdmin(),
        careersAPI.getDepartmentStats(), // Use stats endpoint to get job counts
      ]);

      if (jobsRes.success) {
        setJobs(jobsRes.data.jobs || []);
      }
      if (departmentsRes.success) {
        setDepartments(departmentsRes.data.departments || []);
      }
    } catch (err) {
      setError('Failed to load careers data');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        slug: job.slug,
        departmentId: job.departmentId,
        location: job.location,
        type: job.type,
        level: job.level,
        description: job.description,
        requirements: cleanArrayData(job.requirements),
        responsibilities: cleanArrayData(job.responsibilities),
        benefits: cleanArrayData(job.benefits),
        niceToHave: cleanArrayData(job.niceToHave),
        salaryRange: job.salaryRange,
        experience: job.experience,
        education: job.education,
        teamInfo: job.teamInfo,
        growthOpportunities: job.growthOpportunities,
        isActive: job.isActive,
        isFeatured: job.isFeatured,
        applicationDeadline: job.applicationDeadline,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        slug: '',
        departmentId: 0,
        location: '',
        type: '',
        level: '',
        description: '',
        requirements: [],
        responsibilities: [],
        benefits: [],
        niceToHave: [],
        salaryRange: '',
        experience: '',
        education: '',
        teamInfo: '',
        growthOpportunities: '',
        isActive: true,
        isFeatured: false,
        applicationDeadline: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingJob(null);
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.title.trim()) {
        setError('Job title is required');
        return;
      }
      if (!formData.departmentId) {
        setError('Department is required');
        return;
      }
      if (!formData.description.trim()) {
        setError('Job description is required');
        return;
      }

      // Clean and validate array fields
      const cleanedFormData = {
        ...formData,
        title: formData.title.trim(),
        slug: formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        description: formData.description.trim(),
        requirements: cleanArrayData(formData.requirements),
        responsibilities: cleanArrayData(formData.responsibilities),
        benefits: cleanArrayData(formData.benefits),
        niceToHave: cleanArrayData(formData.niceToHave),
        experience: formData.experience?.trim() || '',
        education: formData.education?.trim() || '',
        teamInfo: formData.teamInfo?.trim() || '',
        growthOpportunities: formData.growthOpportunities?.trim() || '',
        salaryRange: formData.salaryRange?.trim() || '',
        applicationDeadline: formData.applicationDeadline || '',
      };

      console.log('Submitting form data:', cleanedFormData);

      if (editingJob) {
        console.log('Updating job with ID:', editingJob.id);
        const response = await careersAPI.updateJob(editingJob.id, cleanedFormData);
        console.log('Update response:', response);
        if (response.success) {
          // Update local state immediately
          setJobs(jobs.map(j => j.id === editingJob.id ? response.data : j));
          console.log('Job updated successfully in local state');
          
          // Force refresh data from backend to ensure consistency
          await fetchData();
          console.log('Data refresh completed');
          
                      // Show success message
            setError(''); // Clear any previous errors
            setSuccess('Job updated successfully!');
            clearSuccessMessage(); // Auto-clear after 3 seconds
        } else {
          console.error('Failed to update job:', response);
          setError('Failed to update job: ' + (response.message || 'Unknown error'));
          return;
        }
      } else {
        console.log('Creating new job');
        const response = await careersAPI.createJob(cleanedFormData);
        console.log('Create response:', response);
        if (response.success) {
          setJobs([...jobs, response.data]);
          console.log('Job created successfully in local state');
          
          // Force refresh data from backend
                      await fetchData();
            console.log('Data refresh completed');
            setSuccess('Job created successfully!');
            clearSuccessMessage(); // Auto-clear after 3 seconds
        } else {
          console.error('Failed to create job:', response);
          setError('Failed to create job: ' + (response.message || 'Unknown error'));
          return;
        }
      }
      
      console.log('Closing dialog');
      handleCloseDialog();
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError('Failed to save job: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      try {
        const response = await careersAPI.deleteJob(id);
        if (response.success) {
          setJobs(jobs.filter(j => j.id !== id));
        }
      } catch (err) {
        setError('Failed to delete job');
      }
    }
  };

  const handleToggleStatus = async (id: number, newStatus: boolean) => {
    try {
      const response = await careersAPI.updateJob(id, { isActive: newStatus });
      if (response.success) {
        setJobs(jobs.map(j => j.id === id ? { ...j, isActive: newStatus } : j));
      }
    } catch (err) {
      setError('Failed to update job status');
    }
  };

  const handleDepartmentCreated = (newDepartment: any) => {
    // Add the new department to the list and select it
    setDepartments([...departments, newDepartment]);
    setFormData({ ...formData, departmentId: newDepartment.id });
    setDepartmentCreatorOpen(false);
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
        <Typography variant="h4">Careers Management</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<BusinessIcon />}
            onClick={() => window.location.href = '/departments'}
          >
            Manage Departments
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Post New Job
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={() => fetchData()}
            disabled={loading || refreshing}
          >
            {loading || refreshing ? <CircularProgress size={20} /> : 'Refresh Data'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <WorkIcon color="primary" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Total Jobs
                </Typography>
                <Typography variant="h4">
                  {jobs.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <WorkIcon color="success" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Active Jobs
                </Typography>
                <Typography variant="h4">
                  {jobs.filter(j => j.isActive).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <WorkIcon color="warning" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Inactive Jobs
                </Typography>
                <Typography variant="h4">
                  {jobs.filter(j => !j.isActive).length}
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
                  Departments
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
              <LocationIcon color="warning" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Locations
                </Typography>
                <Typography variant="h4">
                  {new Set(jobs.map(j => j.location)).size}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Filter Controls */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
            />
          }
          label="Show Inactive Jobs"
        />
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Salary Range</TableCell>
                <TableCell>Featured</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                          {(showInactive ? jobs : jobs.filter(j => j.isActive))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{job.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {job.slug || 'No slug'}
                        </Typography>
                        {job.description && (
                          <Tooltip title={job.description}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              {truncateText(job.description, 80)}
                            </Typography>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{job.department?.name || 'Unknown'}</Typography>
                        {job.requirements && (
                          <Tooltip title={formatArrayField(job.requirements)}>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                              {truncateText(formatArrayField(job.requirements), 60)}
                            </Typography>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationIcon fontSize="small" color="action" />
                        {job.location}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={job.type} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={job.level || 'Not specified'} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <MoneyIcon fontSize="small" color="action" />
                        {job.salaryRange || 'Not specified'}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={job.isFeatured ? 'Featured' : 'Standard'} 
                        size="small" 
                        color={job.isFeatured ? 'primary' : 'default'}
                        variant={job.isFeatured ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={job.isActive ? 'Active' : 'Inactive'}
                        color={job.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Edit Job">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog(job)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={job.isActive ? "Deactivate Job" : "Activate Job"}>
                          <IconButton
                            size="small"
                            color={job.isActive ? "warning" : "success"}
                            onClick={() => handleToggleStatus(job.id, !job.isActive)}
                          >
                            {job.isActive ? "🚫" : "✅"}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Job">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(job.id)}
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
          count={showInactive ? jobs.length : jobs.filter(j => j.isActive).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Help Text */}
            <Box sx={{ 
              p: 2, 
              bgcolor: 'info.50', 
              border: '1px solid', 
              borderColor: 'info.200', 
              borderRadius: 1,
              mb: 2
            }}>
              <Typography variant="body2" color="info.700">
                <strong>💡 Formatting Tips:</strong> For requirements, responsibilities, benefits, and nice-to-have fields:
              </Typography>
              <Typography variant="body2" color="info.600" sx={{ mt: 1 }}>
                • Enter each item on a new line
              </Typography>
              <Typography variant="body2" color="info.600">
                • You can use bullet points (•) or dashes (-) for visual appeal
              </Typography>
              <Typography variant="body2" color="info.600">
                • Empty lines will be automatically removed
              </Typography>
            </Box>

            {/* Debug Info */}
            {process.env.NODE_ENV === 'development' && (
              <Box sx={{ 
                p: 2, 
                bgcolor: 'warning.50', 
                border: '1px solid', 
                borderColor: 'warning.200', 
                borderRadius: 1,
                mb: 2
              }}>
                <Typography variant="body2" color="warning.700">
                  <strong>🐛 Debug Info:</strong> 
                </Typography>
                <Typography variant="body2" color="warning.600" sx={{ mt: 1 }}>
                  Jobs in state: {jobs.length} | 
                  Last update: {new Date().toLocaleTimeString()} |
                  <Button 
                    size="small" 
                    onClick={() => fetchData()} 
                    sx={{ ml: 1 }}
                  >
                    Refresh Data
                  </Button>
                </Typography>
                <Typography variant="body2" color="warning.600" sx={{ mt: 1 }}>
                  <strong>💡 Note:</strong> After updating a job, the public careers page may need to be refreshed to see changes.
                </Typography>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Job Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Slug"
                  fullWidth
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., senior-iot-engineer"
                  helperText="URL-friendly version of the job title"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: Number(e.target.value) })}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Tooltip title="Create new department">
                    <IconButton
                      onClick={() => setDepartmentCreatorOpen(true)}
                      size="large"
                      sx={{ mb: 0.5 }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Job Type"
                  fullWidth
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  placeholder="e.g., Full-time, Part-time, Contract"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Job Level"
                  fullWidth
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  placeholder="e.g., Entry, Mid, Senior, Lead"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Salary"
                  fullWidth
                  value={formData.salaryRange}
                  onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                  placeholder="e.g., $50,000 - $70,000"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Active Job"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                  }
                  label="Featured Job"
                />
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Job Description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the role, company culture, and what makes this position exciting..."
                helperText="Use paragraphs to describe the role, company culture, and what makes this position exciting"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Requirements"
                fullWidth
                multiline
                rows={4}
                value={Array.isArray(formData.requirements) ? formData.requirements.join('\n') : formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: cleanArrayData(e.target.value) })}
                placeholder="5+ years of experience in IoT development&#10;Strong Python/JavaScript skills&#10;Healthcare domain knowledge preferred&#10;Bachelor's degree in Computer Science or related field"
                helperText="Enter each requirement on a new line. You can use bullet points (•) or dashes (-) for better formatting"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Responsibilities"
                fullWidth
                multiline
                rows={4}
                value={Array.isArray(formData.responsibilities) ? formData.responsibilities.join('\n') : formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: cleanArrayData(e.target.value) })}
                placeholder="Design and implement IoT architectures&#10;Develop sensor integration solutions&#10;Optimize system performance and reliability&#10;Collaborate with cross-functional teams"
                helperText="Enter each responsibility on a new line. Use bullet points or dashes for better readability"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Benefits"
                fullWidth
                multiline
                rows={3}
                value={Array.isArray(formData.benefits) ? formData.benefits.join('\n') : formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: cleanArrayData(e.target.value) })}
                placeholder="Competitive salary and equity&#10;Comprehensive health insurance&#10;Flexible work hours and remote options&#10;Professional development budget"
                helperText="List the benefits and perks of working at your company"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Nice to Have"
                fullWidth
                multiline
                rows={3}
                value={Array.isArray(formData.niceToHave) ? formData.niceToHave.join('\n') : formData.niceToHave}
                onChange={(e) => setFormData({ ...formData, niceToHave: cleanArrayData(e.target.value) })}
                placeholder="Machine learning experience&#10;AWS/Azure certifications&#10;Agile methodology experience&#10;Open source contributions"
                helperText="Skills and experiences that would be a plus but aren't required"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Experience"
                fullWidth
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 5+ years in IoT development, 3+ years in healthcare technology"
                helperText="Describe the experience level and type of experience needed"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Education"
                fullWidth
                multiline
                rows={2}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="Bachelor's degree in Computer Science, Engineering, or related field. Master's degree preferred."
                helperText="Specify education requirements and preferences"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Team Info"
                fullWidth
                multiline
                rows={3}
                value={formData.teamInfo}
                onChange={(e) => setFormData({ ...formData, teamInfo: e.target.value })}
                placeholder="Join our growing IoT team of 8 engineers. We work closely with product managers, designers, and healthcare professionals to build innovative solutions."
                helperText="Describe the team structure, size, and collaboration style"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Growth Opportunities"
                fullWidth
                multiline
                rows={3}
                value={formData.growthOpportunities}
                onChange={(e) => setFormData({ ...formData, growthOpportunities: e.target.value })}
                placeholder="• Lead technical projects and mentor junior engineers&#10;• Explore emerging IoT technologies&#10;• Contribute to company-wide technical decisions&#10;• Potential for team leadership roles"
                helperText="Describe career advancement opportunities and learning paths"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Application Deadline"
                fullWidth
                type="date"
                value={formatDateForInput(formData.applicationDeadline)}
                onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingJob ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Department Creator Dialog */}
      <InlineDepartmentCreator
        open={departmentCreatorOpen}
        onClose={() => setDepartmentCreatorOpen(false)}
        onDepartmentCreated={handleDepartmentCreated}
      />
    </Box>
  );
};

export default CareersPage;
