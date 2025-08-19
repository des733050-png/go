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
  Snackbar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  Category,
  Settings,
  CalendarToday,
  PlayArrow,
  Dashboard
} from '@mui/icons-material';
import { demoConfigAPI, demoAPI } from '../services/api';
import { 
  DemoInterest, 
  CreateInterestData, 
  UpdateInterestData,
  DemoType,
  CreateDemoTypeData,
  UpdateDemoTypeData,
  CalendarAvailability,
  CalendarAvailabilityData,
  DemoRequest
} from '../types';

const DemoManagementPage: React.FC = () => {
  // State for all demo data
  const [interests, setInterests] = useState<DemoInterest[]>([]);
  const [demoTypes, setDemoTypes] = useState<DemoType[]>([]);
  const [calendarData, setCalendarData] = useState<CalendarAvailability[]>([]);
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Dialog states
  const [openInterestDialog, setOpenInterestDialog] = useState(false);
  const [openDemoTypeDialog, setOpenDemoTypeDialog] = useState(false);
  const [openCalendarDialog, setOpenCalendarDialog] = useState(false);
  
  // Editing states
  const [editingInterest, setEditingInterest] = useState<DemoInterest | null>(null);
  const [editingDemoType, setEditingDemoType] = useState<DemoType | null>(null);
  const [editingDate, setEditingDate] = useState<CalendarAvailability | null>(null);
  
  // Form data
  const [interestFormData, setInterestFormData] = useState<CreateInterestData>({
    name: '',
    description: '',
    category: 'general'
  });
  
  const [demoTypeFormData, setDemoTypeFormData] = useState<CreateDemoTypeData>({
    name: '',
    duration: '',
    description: '',
    maxAttendees: undefined
  });
  
  const [calendarFormData, setCalendarFormData] = useState<CalendarAvailabilityData>({
    date: '',
    isAvailable: true,
    maxBookings: 5,
    reason: ''
  });
  
  // Snackbar
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const categories = [
    'general', 'diagnostics', 'ai', 'technical', 'analytics', 'support', 'planning', 'business'
  ];

  // Fetch all demo data
  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [interestsRes, demoTypesRes, calendarRes, requestsRes] = await Promise.all([
        demoConfigAPI.getInterests(),
        demoConfigAPI.getDemoTypes(),
        demoConfigAPI.getAvailableDates(),
        demoAPI.getRequests()
      ]);

      if (interestsRes.success) setInterests(interestsRes.data);
      if (demoTypesRes.success) setDemoTypes(demoTypesRes.data);
      if (calendarRes.success) setCalendarData(calendarRes.data);
      if (requestsRes.success) setDemoRequests(requestsRes.data.requests || []);
    } catch (error) {
      console.error('Error fetching demo data:', error);
      showSnackbar('Failed to fetch demo data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };

  // Interest management
  const handleOpenInterestDialog = (interest?: DemoInterest) => {
    if (interest) {
      setEditingInterest(interest);
      setInterestFormData({
        name: interest.name,
        description: interest.description || '',
        category: interest.category
      });
    } else {
      setEditingInterest(null);
      setInterestFormData({ name: '', description: '', category: 'general' });
    }
    setOpenInterestDialog(true);
  };

  const handleInterestSubmit = async () => {
    try {
      if (editingInterest) {
        await demoConfigAPI.updateInterest(editingInterest.id, interestFormData);
        showSnackbar('Interest updated successfully', 'success');
      } else {
        await demoConfigAPI.createInterest(interestFormData);
        showSnackbar('Interest created successfully', 'success');
      }
      setOpenInterestDialog(false);
      fetchAllData();
    } catch (error) {
      showSnackbar('Failed to save interest', 'error');
    }
  };

  const handleDeleteInterest = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this interest?')) {
      try {
        await demoConfigAPI.deleteInterest(id);
        showSnackbar('Interest deleted successfully', 'success');
        fetchAllData();
      } catch (error) {
        showSnackbar('Failed to delete interest', 'error');
      }
    }
  };

  // Demo type management
  const handleOpenDemoTypeDialog = (demoType?: DemoType) => {
    if (demoType) {
      setEditingDemoType(demoType);
      setDemoTypeFormData({
        name: demoType.name,
        duration: demoType.duration,
        description: demoType.description || '',
        maxAttendees: demoType.maxAttendees
      });
    } else {
      setEditingDemoType(null);
      setDemoTypeFormData({ name: '', duration: '', description: '', maxAttendees: undefined });
    }
    setOpenDemoTypeDialog(true);
  };

  const handleDemoTypeSubmit = async () => {
    try {
      if (editingDemoType) {
        await demoConfigAPI.updateDemoType(editingDemoType.id, demoTypeFormData);
        showSnackbar('Demo type updated successfully', 'success');
      } else {
        await demoConfigAPI.createDemoType(demoTypeFormData);
        showSnackbar('Demo type created successfully', 'success');
      }
      setOpenDemoTypeDialog(false);
      fetchAllData();
    } catch (error) {
      showSnackbar('Failed to save demo type', 'error');
    }
  };

  const handleDeleteDemoType = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this demo type?')) {
      try {
        await demoConfigAPI.deleteDemoType(id);
        showSnackbar('Demo type deleted successfully', 'success');
        fetchAllData();
      } catch (error) {
        showSnackbar('Failed to delete demo type', 'error');
      }
    }
  };

  // Calendar management
  const handleOpenCalendarDialog = (dateData?: CalendarAvailability) => {
    if (dateData) {
      setEditingDate(dateData);
      setCalendarFormData({
        date: dateData.date,
        isAvailable: dateData.isAvailable,
        maxBookings: dateData.maxBookings,
        reason: dateData.reason || ''
      });
    } else {
      setEditingDate(null);
      setCalendarFormData({ date: '', isAvailable: true, maxBookings: 5, reason: '' });
    }
    setOpenCalendarDialog(true);
  };

  const handleCalendarSubmit = async () => {
    try {
      await demoConfigAPI.setCalendarAvailability(calendarFormData);
      showSnackbar(
        editingDate ? 'Date availability updated successfully' : 'Date availability set successfully',
        'success'
      );
      setOpenCalendarDialog(false);
      fetchAllData();
    } catch (error) {
      showSnackbar('Failed to save calendar availability', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading demo management data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Demo Management
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Refreshing...' : 'Refresh All'}
        </Button>
      </Box>

      {/* Overview Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  Total Interests
                </Typography>
                <Typography variant="h4">{interests.length}</Typography>
              </Box>
              <Category sx={{ fontSize: 40, color: 'primary.main' }} />
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  Demo Types
                </Typography>
                <Typography variant="h4">{demoTypes.length}</Typography>
              </Box>
              <Settings sx={{ fontSize: 40, color: 'secondary.main' }} />
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  Available Dates
                </Typography>
                <Typography variant="h4">{calendarData.filter(d => d.isAvailable).length}</Typography>
              </Box>
              <CalendarToday sx={{ fontSize: 40, color: 'success.main' }} />
            </Box>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography color="textSecondary" gutterBottom variant="h6">
                  Demo Requests
                </Typography>
                <Typography variant="h4">{demoRequests.length}</Typography>
              </Box>
              <PlayArrow sx={{ fontSize: 40, color: 'warning.main' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Accordion Sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* Demo Interests Section */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <Category color="primary" />
              <Typography variant="h6">Demo Interests</Typography>
              <Chip label={interests.length} size="small" color="primary" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenInterestDialog()}
              >
                Add Interest
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {interests.map((interest) => (
                    <TableRow key={interest.id}>
                      <TableCell>{interest.name}</TableCell>
                      <TableCell>{interest.description || 'No description'}</TableCell>
                      <TableCell>
                        <Chip label={interest.category} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={interest.isActive ? 'Active' : 'Inactive'} 
                          color={interest.isActive ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleOpenInterestDialog(interest)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteInterest(interest.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Demo Types Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <Settings color="secondary" />
              <Typography variant="h6">Demo Types</Typography>
              <Chip label={demoTypes.length} size="small" color="secondary" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDemoTypeDialog()}
              >
                Add Demo Type
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Max Attendees</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demoTypes.map((demoType) => (
                    <TableRow key={demoType.id}>
                      <TableCell>{demoType.name}</TableCell>
                      <TableCell>{demoType.duration}</TableCell>
                      <TableCell>{demoType.description || 'No description'}</TableCell>
                      <TableCell>{demoType.maxAttendees ? `${demoType.maxAttendees} people` : 'Unlimited'}</TableCell>
                      <TableCell>
                        <Chip 
                          label={demoType.isActive ? 'Active' : 'Inactive'} 
                          color={demoType.isActive ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleOpenDemoTypeDialog(demoType)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteDemoType(demoType.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Calendar Management Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <CalendarToday color="success" />
              <Typography variant="h6">Calendar Management</Typography>
              <Chip label={calendarData.length} size="small" color="success" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenCalendarDialog()}
              >
                Set Date Availability
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Max Bookings</TableCell>
                    <TableCell>Current Bookings</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendarData.map((dateData) => (
                    <TableRow key={dateData.id}>
                      <TableCell>
                        {new Date(dateData.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={dateData.isAvailable ? 'Available' : 'Unavailable'} 
                          color={dateData.isAvailable ? 'success' : 'error'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{dateData.maxBookings} slots</TableCell>
                      <TableCell>{dateData.currentBookings} booked</TableCell>
                      <TableCell>{dateData.reason || 'No reason'}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleOpenCalendarDialog(dateData)}>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Demo Requests Section */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <PlayArrow color="warning" />
              <Typography variant="h6">Demo Requests</Typography>
              <Chip label={demoRequests.length} size="small" color="warning" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Organization</TableCell>
                    <TableCell>Demo Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demoRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{`${request.firstName} ${request.lastName}`}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.organization}</TableCell>
                      <TableCell>{request.demoType}</TableCell>
                      <TableCell>
                        <Chip 
                          label={request.status || 'Pending'} 
                          color={request.status === 'approved' ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(request.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Interest Dialog */}
      <Dialog open={openInterestDialog} onClose={() => setOpenInterestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingInterest ? 'Edit Interest' : 'Add New Interest'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Interest Name"
              value={interestFormData.name}
              onChange={(e) => setInterestFormData({ ...interestFormData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              value={interestFormData.description}
              onChange={(e) => setInterestFormData({ ...interestFormData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                value={interestFormData.category}
                onChange={(e) => setInterestFormData({ ...interestFormData, category: e.target.value })}
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
          <Button onClick={() => setOpenInterestDialog(false)}>Cancel</Button>
          <Button onClick={handleInterestSubmit} variant="contained" disabled={!interestFormData.name.trim()}>
            {editingInterest ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Demo Type Dialog */}
      <Dialog open={openDemoTypeDialog} onClose={() => setOpenDemoTypeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingDemoType ? 'Edit Demo Type' : 'Add New Demo Type'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Demo Type Name"
              value={demoTypeFormData.name}
              onChange={(e) => setDemoTypeFormData({ ...demoTypeFormData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Duration"
              value={demoTypeFormData.duration}
              onChange={(e) => setDemoTypeFormData({ ...demoTypeFormData, duration: e.target.value })}
              margin="normal"
              required
              placeholder="e.g., 45 min, 2 hours"
            />
            <TextField
              fullWidth
              label="Description"
              value={demoTypeFormData.description}
              onChange={(e) => setDemoTypeFormData({ ...demoTypeFormData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Max Attendees"
              type="number"
              value={demoTypeFormData.maxAttendees || ''}
              onChange={(e) => setDemoTypeFormData({ 
                ...demoTypeFormData, 
                maxAttendees: e.target.value ? parseInt(e.target.value) : undefined 
              })}
              margin="normal"
              placeholder="Leave empty for unlimited"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDemoTypeDialog(false)}>Cancel</Button>
          <Button onClick={handleDemoTypeSubmit} variant="contained" disabled={!demoTypeFormData.name.trim() || !demoTypeFormData.duration.trim()}>
            {editingDemoType ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Calendar Dialog */}
      <Dialog open={openCalendarDialog} onClose={() => setOpenCalendarDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingDate ? 'Edit Date Availability' : 'Set Date Availability'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={calendarFormData.date}
              onChange={(e) => setCalendarFormData({ ...calendarFormData, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={calendarFormData.isAvailable}
                  onChange={(e) => setCalendarFormData({ ...calendarFormData, isAvailable: e.target.checked })}
                  color="primary"
                />
              }
              label="Date is available for bookings"
              sx={{ mt: 2, mb: 2 }}
            />
            <TextField
              fullWidth
              label="Maximum Bookings"
              type="number"
              value={calendarFormData.maxBookings}
              onChange={(e) => setCalendarFormData({ ...calendarFormData, maxBookings: parseInt(e.target.value) })}
              margin="normal"
              disabled={!calendarFormData.isAvailable}
              inputProps={{ min: 1 }}
            />
            <TextField
              fullWidth
              label="Reason (optional)"
              value={calendarFormData.reason}
              onChange={(e) => setCalendarFormData({ ...calendarFormData, reason: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              placeholder="Reason for unavailability or special notes"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCalendarDialog(false)}>Cancel</Button>
          <Button onClick={handleCalendarSubmit} variant="contained" disabled={!calendarFormData.date}>
            {editingDate ? 'Update' : 'Set'}
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

export default DemoManagementPage;
