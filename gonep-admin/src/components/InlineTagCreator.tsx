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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface InlineTagCreatorProps {
  open: boolean;
  onClose: () => void;
  onTagsSelected: (tags: string[]) => void;
  existingTags?: string[];
  currentTags?: string[];
}

const InlineTagCreator: React.FC<InlineTagCreatorProps> = ({
  open,
  onClose,
  onTagsSelected,
  existingTags = [],
  currentTags = [],
}) => {
  const [newTag, setNewTag] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(currentTags);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    const tag = newTag.trim();
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (selectedTags.length === 0) {
      setError('At least one tag is required');
      return;
    }
    
    onTagsSelected(selectedTags);
    handleClose();
  };

  const handleClose = () => {
    setSelectedTags(currentTags);
    setNewTag('');
    setError('');
    setLoading(false);
    onClose();
  };

  const handleTagSelect = (event: any) => {
    const value = event.target.value;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Tags</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Existing Tags Selection */}
          <FormControl fullWidth>
            <InputLabel>Select from existing tags</InputLabel>
            <Select
              multiple
              value={selectedTags}
              onChange={handleTagSelect}
              input={<OutlinedInput label="Select from existing tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {existingTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Add New Tag */}
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              label="Add new tag"
              fullWidth
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter a new tag"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button
              onClick={handleAddTag}
              variant="outlined"
              disabled={!newTag.trim()}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
          </Box>

          {/* Selected Tags Display */}
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Selected Tags ({selectedTags.length}):
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedTags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={selectedTags.length === 0}
        >
          Save Tags
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InlineTagCreator;

