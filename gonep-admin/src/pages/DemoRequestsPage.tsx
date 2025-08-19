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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Button,
  Card,
  CardContent,
  Tooltip,
  Chip as MuiChip,
  TextareaAutosize,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  PlayArrow as PlayArrowIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { demoAPI } from '../services/api';
import { DemoRequest } from '../types';

const DemoRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingRequest, setEditingRequest] = useState<DemoRequest | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await demoAPI.getRequests();
      if (response.success) {
        setRequests(response.data.requests || []);
      }
    } catch (err) {
      setError('Failed to load demo requests');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await demoAPI.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to load stats');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError('');
    try {
      await Promise.all([fetchData(), fetchStats()]);
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpenDialog = (request: DemoRequest) => {
    setSelectedRequest(request);
    setEditingRequest({ ...request });
    setOpenDialog(true);
    setIsEditing(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRequest(null);
    setEditingRequest(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditingRequest(selectedRequest ? { ...selectedRequest } : null);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editingRequest) return;
    
    try {
      const response = await demoAPI.updateRequest(editingRequest.id, editingRequest);
      if (response.success) {
        setRequests(requests.map(r => r.id === editingRequest.id ? response.data : r));
        setSelectedRequest(response.data);
        setEditingRequest(response.data);
        setIsEditing(false);
        fetchStats(); // Refresh stats
      }
    } catch (err) {
      setError('Failed to update demo request');
    }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await demoAPI.updateRequestStatus(id, status);
      if (response.success) {
        setRequests(requests.map(r => r.id === id ? response.data : r));
        fetchStats(); // Refresh stats
      }
    } catch (err) {
      setError('Failed to update request status');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this demo request?')) {
      try {
        const response = await demoAPI.deleteRequest(id);
        if (response.success) {
          setRequests(requests.filter(r => r.id !== id));
          fetchStats(); // Refresh stats
          if (selectedRequest?.id === id) {
            handleCloseDialog();
          }
        }
      } catch (err) {
        setError('Failed to delete demo request');
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

  const filteredRequests = requests.filter(request => 
    statusFilter === 'all' || request.status.toLowerCase() === statusFilter.toLowerCase()
  );

  const handleFieldChange = (field: keyof DemoRequest, value: any) => {
    if (editingRequest) {
      setEditingRequest({ ...editingRequest, [field]: value });
    }
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
        <Typography variant="h4">Demo Requests</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="confirmed">Confirmed</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      {stats && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Requests
                </Typography>
                <Typography variant="h4">
                  {stats.total}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h4">
                  {stats.pending}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Confirmed
                </Typography>
                <Typography variant="h4">
                  {stats.confirmed}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="h4">
                  {stats.completed}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Virtual Demos
                </Typography>
                <Typography variant="h4">
                  {stats.virtual}
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  On-site Demos
                </Typography>
                <Typography variant="h4">
                  {stats.onsite}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contact</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Demo Type</TableCell>
                <TableCell>Interests</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">
                          {request.firstName} {request.lastName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {request.phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{request.organization}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {request.organizationType} • {request.country}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block">
                          {request.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{request.demoType}</Typography>
                        {request.preferredDate && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            Preferred: {new Date(request.preferredDate).toLocaleDateString()}
                          </Typography>
                        )}
                        {request.attendeeCount && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            {request.attendeeCount} attendees
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ maxWidth: 200 }}>
                        {Array.isArray(request.interests) && request.interests.slice(0, 2).map((interest, index) => (
                          <MuiChip
                            key={index}
                            label={interest}
                            size="small"
                            sx={{ m: 0.5 }}
                          />
                        ))}
                        {Array.isArray(request.interests) && request.interests.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{request.interests.length - 2} more
                          </Typography>
                        )}
                        {!Array.isArray(request.interests) && (
                          <Typography variant="caption" color="text.secondary">
                            No interests specified
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={request.status}
                          onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                          <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(request)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Request">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(request.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* View/Edit Request Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {isEditing ? 'Edit Demo Request' : 'Demo Request Details'}
          {!isEditing && (
            <Button
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ float: 'right' }}
            >
              Edit
            </Button>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedRequest && editingRequest && (
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Contact Information */}
              <Box>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="First Name"
                    fullWidth
                    value={isEditing ? editingRequest.firstName : selectedRequest.firstName}
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Last Name"
                    fullWidth
                    value={isEditing ? editingRequest.lastName : selectedRequest.lastName}
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    value={isEditing ? editingRequest.email : selectedRequest.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Phone"
                    fullWidth
                    value={isEditing ? editingRequest.phone : selectedRequest.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Box>
              </Box>

              {/* Organization Information */}
              <Box>
                <Typography variant="h6" gutterBottom>Organization Information</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Organization"
                    fullWidth
                    value={isEditing ? editingRequest.organization : selectedRequest.organization}
                    onChange={(e) => handleFieldChange('organization', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Title"
                    fullWidth
                    value={isEditing ? editingRequest.title : selectedRequest.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Organization Type"
                    fullWidth
                    value={isEditing ? editingRequest.organizationType : selectedRequest.organizationType}
                    onChange={(e) => handleFieldChange('organizationType', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Country"
                    fullWidth
                    value={isEditing ? editingRequest.country : selectedRequest.country}
                    onChange={(e) => handleFieldChange('country', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                </Box>
              </Box>

              {/* Demo Information */}
              <Box>
                <Typography variant="h6" gutterBottom>Demo Information</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Demo Type"
                    fullWidth
                    value={isEditing ? editingRequest.demoType : selectedRequest.demoType}
                    onChange={(e) => handleFieldChange('demoType', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Preferred Date"
                    fullWidth
                    type="date"
                    value={isEditing && editingRequest.preferredDate ? editingRequest.preferredDate.split('T')[0] : 
                           selectedRequest.preferredDate ? selectedRequest.preferredDate.split('T')[0] : ''}
                    onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <TextField
                    label="Attendee Count"
                    fullWidth
                    value={isEditing ? editingRequest.attendeeCount : selectedRequest.attendeeCount}
                    onChange={(e) => handleFieldChange('attendeeCount', e.target.value)}
                    InputProps={{ readOnly: !isEditing }}
                  />
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={isEditing ? editingRequest.status : selectedRequest.status}
                      onChange={(e) => handleFieldChange('status', e.target.value)}
                      disabled={!isEditing}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="cancelled">Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Areas of Interest */}
              <Box>
                <Typography variant="h6" gutterBottom>Areas of Interest</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedRequest.interests?.map((interest, index) => (
                    <MuiChip
                      key={index}
                      label={interest}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              {/* Additional Information */}
              <Box>
                <Typography variant="h6" gutterBottom>Additional Information</Typography>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={4}
                  value={isEditing ? editingRequest.message : selectedRequest.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Box>

              {/* Admin Notes */}
              <Box>
                <Typography variant="h6" gutterBottom>Admin Notes</Typography>
                <TextField
                  label="Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={isEditing ? editingRequest.notes : selectedRequest.notes}
                  onChange={(e) => handleFieldChange('notes', e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  placeholder="Add internal notes about this request..."
                />
              </Box>

              {/* Timestamps */}
              <Box>
                <Typography variant="h6" gutterBottom>Timestamps</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Created"
                    fullWidth
                    value={new Date(selectedRequest.createdAt).toLocaleString()}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Updated"
                    fullWidth
                    value={new Date(selectedRequest.updatedAt).toLocaleString()}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleCancelEdit} startIcon={<CancelIcon />}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} variant="contained" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleCloseDialog}>Close</Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DemoRequestsPage;
