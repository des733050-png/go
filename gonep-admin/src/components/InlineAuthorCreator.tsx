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
import { blogAPI } from '../services/api';
import ImageUpload from './ImageUpload';

interface InlineAuthorCreatorProps {
  open: boolean;
  onClose: () => void;
  onAuthorCreated: (author: any) => void;
}

const InlineAuthorCreator: React.FC<InlineAuthorCreatorProps> = ({
  open,
  onClose,
  onAuthorCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    role: '',
    department: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Author name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await blogAPI.createAuthor({
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        email: formData.email.trim(),
        role: formData.role.trim(),
        department: formData.department.trim(),
        image: formData.image.trim(),
      });

      if (response.success) {
        onAuthorCreated(response.data);
        handleClose();
      } else {
        setError(response.message || 'Failed to create author');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create author');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', bio: '', email: '', role: '', department: '', image: '' });
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Author</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Author Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
              autoFocus
              placeholder="e.g., Dr. Sarah Johnson"
            />
            
            <TextField
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              fullWidth
              multiline
              rows={3}
              placeholder="Brief biography of the author"
            />
            
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              fullWidth
              type="email"
              placeholder="author@example.com"
            />
            
            <TextField
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              fullWidth
              placeholder="e.g., Data Scientist, Product Manager"
            />
            
            <TextField
              label="Department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              fullWidth
              placeholder="e.g., Engineering, Product, Design"
            />
            
            <ImageUpload
              label="Author Image"
              value={formData.image || ''}
              onChange={(url) => setFormData({ ...formData, image: url })}
              helperText="Upload or enter URL for the author's profile image"
              maxSize={3}
              recommendedSize={{ width: 300, height: 300 }}
              previewContext="profile"
            />
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !formData.name.trim()}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Creating...' : 'Create Author'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InlineAuthorCreator;
