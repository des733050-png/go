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

interface InlineCategoryCreatorProps {
  open: boolean;
  onClose: () => void;
  onCategoryCreated: (category: any) => void;
}

const InlineCategoryCreator: React.FC<InlineCategoryCreatorProps> = ({
  open,
  onClose,
  onCategoryCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await blogAPI.createCategory({
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        description: formData.description.trim(),
      });

      if (response.success) {
        onCategoryCreated(response.data);
        handleClose();
      } else {
        setError(response.message || 'Failed to create category');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', slug: '', description: '' });
    setError('');
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Category</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Category Name"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              fullWidth
              required
              autoFocus
              placeholder="e.g., Technology, Health, News"
            />
            
            <TextField
              label="Slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              fullWidth
              required
              helperText="URL-friendly version (auto-generated)"
              placeholder="e.g., technology, health, news"
            />
            
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
              placeholder="Brief description of this category (optional)"
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
            {loading ? 'Creating...' : 'Create Category'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default InlineCategoryCreator;
