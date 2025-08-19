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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { contactAPI } from '../services/api';
import { ContactInquiry } from '../types';

const ContactInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await contactAPI.getInquiries();
      if (response.success) {
        setInquiries(response.data.inquiries || []);
      }
    } catch (err) {
      setError('Failed to load contact inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setError('');
    try {
      await fetchData();
    } catch (err) {
      setError('Failed to refresh data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleOpenDialog = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInquiry(null);
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await contactAPI.updateInquiryStatus(id, status);
      if (response.success) {
        setInquiries(inquiries.map(i => i.id === id ? response.data : i));
      }
    } catch (err) {
      setError('Failed to update inquiry status');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const response = await contactAPI.deleteInquiry(id);
        if (response.success) {
          setInquiries(inquiries.filter(i => i.id !== id));
        }
      } catch (err) {
        setError('Failed to delete inquiry');
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'warning';
      case 'in_progress':
        return 'info';
      case 'resolved':
        return 'success';
      case 'closed':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => 
    statusFilter === 'all' || inquiry.status.toLowerCase() === statusFilter.toLowerCase()
  );

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
        <Typography variant="h4">Contact Inquiries</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Inquiries
              </Typography>
              <Typography variant="h4">
                {inquiries.length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                New Inquiries
              </Typography>
              <Typography variant="h4">
                {inquiries.filter(i => i.status.toLowerCase() === 'new').length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4">
                {inquiries.filter(i => i.status.toLowerCase() === 'in_progress').length}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Resolved
              </Typography>
              <Typography variant="h4">
                {inquiries.filter(i => i.status.toLowerCase() === 'resolved').length}
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
                <TableCell>Contact</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredInquiries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{inquiry.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {inquiry.email}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{inquiry.organization}</TableCell>
                    <TableCell>{inquiry.category}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={inquiry.status}
                          onChange={(e) => handleStatusUpdate(inquiry.id, e.target.value)}
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="new">New</MenuItem>
                          <MenuItem value="in_progress">In Progress</MenuItem>
                          <MenuItem value="resolved">Resolved</MenuItem>
                          <MenuItem value="closed">Closed</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(inquiry)}
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(inquiry.id)}
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
          count={filteredInquiries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* View Inquiry Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Contact Inquiry Details</DialogTitle>
        <DialogContent>
          {selectedInquiry && (
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={selectedInquiry.name}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Email"
                    fullWidth
                    value={selectedInquiry.email}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Organization"
                    fullWidth
                    value={selectedInquiry.organization}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Category"
                    fullWidth
                    value={selectedInquiry.category}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Status"
                    fullWidth
                    value={selectedInquiry.status}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                  <TextField
                    label="Created"
                    fullWidth
                    value={new Date(selectedInquiry.createdAt).toLocaleString()}
                    InputProps={{ readOnly: true }}
                  />
                </Box>
              </Box>
              <Box sx={{ width: '100%' }}>
                <TextField
                  label="Message"
                  fullWidth
                  multiline
                  rows={6}
                  value={selectedInquiry.message}
                  InputProps={{ readOnly: true }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactInquiriesPage;
