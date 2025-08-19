import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import { careersAPI } from '../services/api';

interface InlineDepartmentCreatorProps {
  open: boolean;
  onClose: () => void;
  onDepartmentCreated: (department: any) => void;
}

const InlineDepartmentCreator: React.FC<InlineDepartmentCreatorProps> = ({
  open,
  onClose,
  onDepartmentCreated,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Department name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await careersAPI.createDepartment({
        name: name.trim(),
        description: description.trim(),
      });

      if (response.success) {
        onDepartmentCreated(response.data);
        handleClose();
      } else {
        setError('Failed to create department');
      }
    } catch (err) {
      setError('Failed to create department');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Department</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Department Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Engineering, Medical, Sales"
            autoFocus
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the department's role and responsibilities"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !name.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {loading ? 'Creating...' : 'Create Department'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InlineDepartmentCreator;
