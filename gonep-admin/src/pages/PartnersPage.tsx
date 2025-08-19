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
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Language as LanguageIcon,
  Link as LinkIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { partnersAPI } from '../services/api';
import { Partner } from '../types';
import ImageUpload from '../components/ImageUpload';

const PartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: '',
    logoUrl: '',
    websiteUrl: '',
    description: '',
    category: '',
    isActive: true,
    orderIndex: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await partnersAPI.getPartners();
      if (response.success) {
        setPartners(response.data.partners || []);
      }
    } catch (err) {
      setError('Failed to load partners');
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

  const handleOpenDialog = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        logoUrl: partner.logoUrl,
        websiteUrl: partner.websiteUrl,
        description: partner.description,
        category: partner.category,
        isActive: partner.isActive,
        orderIndex: partner.orderIndex,
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        logoUrl: '',
        websiteUrl: '',
        description: '',
        category: '',
        isActive: true,
        orderIndex: 0,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPartner(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingPartner) {
        const response = await partnersAPI.updatePartner(editingPartner.id, formData);
        if (response.success) {
          setPartners(partners.map(p => p.id === editingPartner.id ? response.data : p));
        }
      } else {
        const response = await partnersAPI.createPartner(formData);
        if (response.success) {
          setPartners([...partners, response.data]);
        }
      }
      handleCloseDialog();
      fetchData(); // Refresh data
    } catch (err) {
      setError('Failed to save partner');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        const response = await partnersAPI.deletePartner(id);
        if (response.success) {
          setPartners(partners.filter(p => p.id !== id));
        }
      } catch (err) {
        setError('Failed to delete partner');
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
        <Typography variant="h4">Partners Management</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Partner
          </Button>
          <IconButton onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? <CircularProgress size={24} /> : <RefreshIcon />}
          </IconButton>
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
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <BusinessIcon color="primary" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Total Partners
                </Typography>
                <Typography variant="h4">
                  {partners.length}
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
                  Active Partners
                </Typography>
                <Typography variant="h4">
                  {partners.filter(p => p.isActive).length}
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
                  Inactive Partners
                </Typography>
                <Typography variant="h4">
                  {partners.filter(p => !p.isActive).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <LanguageIcon color="info" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Categories
                </Typography>
                <Typography variant="h4">
                  {new Set(partners.map(p => p.category)).size}
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
                <TableCell>Partner</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={partner.logoUrl} alt={partner.name}>
                          {partner.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{partner.name}</Typography>
                          <Typography variant="caption" color="text.secondary" noWrap>
                            {partner.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={partner.category} size="small" />
                    </TableCell>
                    <TableCell>
                      {partner.websiteUrl && (
                        <Tooltip title="Visit Website">
                          <IconButton
                            size="small"
                            onClick={() => window.open(partner.websiteUrl, '_blank')}
                          >
                            <LinkIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={partner.isActive ? 'Active' : 'Inactive'}
                        color={partner.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{partner.orderIndex}</TableCell>
                    <TableCell>
                      {new Date(partner.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Partner">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(partner)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Partner">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(partner.id)}
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
          count={partners.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPartner ? 'Edit Partner' : 'Add New Partner'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Partner Name"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Category"
                  fullWidth
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Order Index"
                  fullWidth
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: Number(e.target.value) })}
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
                  label="Active Partner"
                />
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <ImageUpload
                label="Partner Logo"
                value={formData.logoUrl || ''}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                helperText="Upload or enter URL for the partner's logo"
                maxSize={2}
                recommendedSize={{ width: 200, height: 200 }}
                previewContext="logo"
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Website URL"
                fullWidth
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPartner ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PartnersPage;
