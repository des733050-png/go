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
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Refresh as RefreshIcon,
  CalendarToday as CalendarIcon 
} from '@mui/icons-material';
import { demoConfigAPI } from '../services/api';
import { CalendarAvailability, CalendarAvailabilityData } from '../types';

const CalendarManagementPage: React.FC = () => {
  const [calendarData, setCalendarData] = useState<CalendarAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDate, setEditingDate] = useState<CalendarAvailability | null>(null);
  const [formData, setFormData] = useState<CalendarAvailabilityData>({
    date: '',
    isAvailable: true,
    maxBookings: 5,
    reason: ''
  });
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      if (dateRange.start && dateRange.end) {
        const response = await demoConfigAPI.getCalendarRange(dateRange.start, dateRange.end);
        if (response.success) {
          setCalendarData(response.data);
        }
      } else {
        const response = await demoConfigAPI.getAvailableDates();
        if (response.success) {
          setCalendarData(response.data);
        }
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      showSnackbar('Failed to fetch calendar data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCalendarData();
    setRefreshing(false);
  };

  const handleDateRangeChange = () => {
    fetchCalendarData();
  };

  const handleOpenDialog = (dateData?: CalendarAvailability) => {
    if (dateData) {
      setEditingDate(dateData);
      setFormData({
        date: dateData.date,
        isAvailable: dateData.isAvailable,
        maxBookings: dateData.maxBookings,
        reason: dateData.reason || ''
      });
    } else {
      setEditingDate(null);
      setFormData({
        date: '',
        isAvailable: true,
        maxBookings: 5,
        reason: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDate(null);
    setFormData({
      date: '',
      isAvailable: true,
      maxBookings: 5,
      reason: ''
    });
  };

  const handleSubmit = async () => {
    try {
      await demoConfigAPI.setCalendarAvailability(formData);
      showSnackbar(
        editingDate ? 'Date availability updated successfully' : 'Date availability set successfully',
        'success'
      );
      handleCloseDialog();
      fetchCalendarData();
    } catch (error) {
      console.error('Error saving calendar availability:', error);
      showSnackbar('Failed to save calendar availability', 'error');
    }
  };

  const handleToggleAvailability = async (dateData: CalendarAvailability) => {
    try {
      await demoConfigAPI.setCalendarAvailability({
        date: dateData.date,
        isAvailable: !dateData.isAvailable,
        maxBookings: dateData.maxBookings,
        reason: dateData.reason
      });
      showSnackbar('Date availability updated successfully', 'success');
      fetchCalendarData();
    } catch (error) {
      console.error('Error updating date availability:', error);
      showSnackbar('Failed to update date availability', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const getStatusColor = (isAvailable: boolean) => {
    return isAvailable ? 'success' : 'error';
  };

  const getStatusText = (isAvailable: boolean) => {
    return isAvailable ? 'Available' : 'Unavailable';
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading calendar data...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Calendar Management
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
            Set Date Availability
          </Button>
        </Box>
      </Box>

      {/* Date Range Selector */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" mb={2}>
          Select Date Range
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'center' }}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="outlined"
            startIcon={<CalendarIcon />}
            onClick={handleDateRangeChange}
            fullWidth
          >
            Load Range
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
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
                  <Typography variant="body1" fontWeight="medium">
                    {new Date(dateData.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(dateData.isAvailable)}
                    color={getStatusColor(dateData.isAvailable)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {dateData.maxBookings} slots
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {dateData.currentBookings} booked
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {dateData.reason || 'No reason specified'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(dateData)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={dateData.isAvailable}
                        onChange={() => handleToggleAvailability(dateData)}
                        color="primary"
                        size="small"
                      />
                    }
                    label=""
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDate ? 'Edit Date Availability' : 'Set Date Availability'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
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
              value={formData.maxBookings}
              onChange={(e) => setFormData({ ...formData, maxBookings: parseInt(e.target.value) })}
              margin="normal"
              disabled={!formData.isAvailable}
              inputProps={{ min: 1 }}
            />
            <TextField
              fullWidth
              label="Reason (optional)"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              margin="normal"
              multiline
              rows={3}
              placeholder="Reason for unavailability or special notes"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.date}
          >
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

export default CalendarManagementPage;
