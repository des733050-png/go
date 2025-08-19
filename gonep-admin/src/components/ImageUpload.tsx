import React, { useState, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { uploadAPI } from '../services/api';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  required?: boolean;
  maxSize?: number; // in MB
  allowedTypes?: string[];
  recommendedSize?: {
    width: number;
    height: number;
  };
  previewContext?: 'blog' | 'profile' | 'logo' | 'banner' | 'thumbnail';
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = 'Image',
  helperText,
  required = false,
  maxSize = 5, // 5MB default
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  recommendedSize,
  previewContext = 'blog',
}) => {
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (url: string) => {
    setError('');
    onChange(url);
    setPreviewUrl(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setError(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Get image dimensions for preview
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      uploadFile(file);
    };
    img.onerror = () => {
      setError('Invalid image file');
    };
    img.src = URL.createObjectURL(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError('');

    try {
      console.log('Starting file upload:', file.name, file.size, file.type);
      const response = await uploadAPI.uploadFile(file);
      console.log('Upload response:', response.data);

      if (response.data.success) {
        const imageUrl = `${process.env.REACT_APP_API_URL}/uploads/${response.data.data.file.filename}`;
        console.log('Generated image URL:', imageUrl);
        setPreviewUrl(imageUrl);
        setImageLoadError(false);
        setShowUploadDialog(false);
        setShowPreviewDialog(true);
      } else {
        setError(response.data.message || 'Upload failed');
      }
    } catch (err: any) {
      console.error('Upload error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const input = fileInputRef.current;
      if (input) {
        input.files = files;
        handleFileSelect({ target: { files } } as any);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const clearImage = () => {
    onChange('');
    setPreviewUrl('');
    setError('');
  };

  const getSizeText = () => {
    if (recommendedSize) {
      return `${recommendedSize.width}x${recommendedSize.height}px`;
    }
    return 'Any size';
  };

  const getPreviewStyles = (): React.CSSProperties => {
    switch (previewContext) {
      case 'blog':
        return { width: '100%', height: '200px', objectFit: 'cover' as const };
      case 'profile':
        return { width: '120px', height: '120px', objectFit: 'cover' as const, borderRadius: '50%' };
      case 'logo':
        return { width: '150px', height: '80px', objectFit: 'contain' as const };
      case 'banner':
        return { width: '100%', height: '150px', objectFit: 'cover' as const };
      case 'thumbnail':
        return { width: '100px', height: '100px', objectFit: 'cover' as const };
      default:
        return { width: '100%', height: '200px', objectFit: 'cover' as const };
    }
  };

  return (
    <Box>
      {/* Mode Toggle */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Button
          variant={uploadMode === 'url' ? 'contained' : 'outlined'}
          size="small"
          startIcon={<LinkIcon />}
          onClick={() => setUploadMode('url')}
        >
          URL
        </Button>
        <Button
          variant={uploadMode === 'upload' ? 'contained' : 'outlined'}
          size="small"
          startIcon={<UploadIcon />}
          onClick={() => setUploadMode('upload')}
        >
          Upload
        </Button>
      </Box>

      {/* URL Mode */}
      {uploadMode === 'url' && (
        <TextField
          label={label}
          fullWidth
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          helperText={helperText || `Enter image URL (${getSizeText()})`}
          required={required}
          error={!!error}
        />
      )}

      {/* Upload Mode */}
      {uploadMode === 'upload' && (
        <Box>
          <Paper
            sx={{
              p: 3,
              border: '2px dashed',
              borderColor: 'grey.300',
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover',
              },
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={allowedTypes.join(',')}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            
            {previewUrl ? (
              <Box>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'contain',
                  }}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPreviewDialog(true);
                    }}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadClick();
                    }}
                  >
                    Change Image
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box>
                <UploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Click to upload or drag and drop
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
                </Typography>
                {recommendedSize && (
                  <Typography variant="body2" color="text.secondary">
                    Recommended: {getSizeText()}
                  </Typography>
                )}
                {imageDimensions && (
                  <Typography variant="body2" color="text.secondary">
                    Image size: {imageDimensions.width} × {imageDimensions.height}px
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

            {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onClose={() => setShowUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Paper
              sx={{
                p: 3,
                border: '2px dashed',
                borderColor: 'grey.300',
                textAlign: 'center',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover',
                },
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={allowedTypes.join(',')}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              
              {uploading ? (
                <Box>
                  <CircularProgress size={48} sx={{ mb: 2 }} />
                  <Typography>Uploading...</Typography>
                </Box>
              ) : (
                <Box>
                  <UploadIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Click to select or drag and drop
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} up to {maxSize}MB
                  </Typography>
                  {recommendedSize && (
                    <Typography variant="body2" color="text.secondary">
                      Recommended: {getSizeText()}
                    </Typography>
                  )}
                  {imageDimensions && (
                    <Typography variant="body2" color="text.secondary">
                      Image size: {imageDimensions.width} × {imageDimensions.height}px
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUploadDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={showPreviewDialog} onClose={() => setShowPreviewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Image Preview - How it will look</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {previewUrl && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Preview in {previewContext} context:
                </Typography>
                                 <Box sx={{ 
                   border: '1px solid #ddd', 
                   borderRadius: 1, 
                   p: 2, 
                   mb: 2,
                   backgroundColor: '#f5f5f5',
                   minHeight: '200px',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center'
                 }}>
                   {imageLoadError ? (
                     <Box sx={{ textAlign: 'center' }}>
                       <Typography color="error" variant="body2">
                         Failed to load image preview
                       </Typography>
                       <Typography variant="caption" color="text.secondary">
                         URL: {previewUrl}
                       </Typography>
                     </Box>
                   ) : (
                     <img
                       src={previewUrl}
                       alt="Preview"
                       style={getPreviewStyles()}
                       onLoad={() => console.log('Image loaded successfully:', previewUrl)}
                       onError={(e) => {
                         console.error('Image failed to load:', previewUrl);
                         console.error('Image error:', e);
                         setImageLoadError(true);
                       }}
                     />
                   )}
                 </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Original image: {imageDimensions?.width} × {imageDimensions?.height}px
                </Typography>
                
                {recommendedSize && (
                  <Typography variant="body2" color="text.secondary">
                    Recommended size: {recommendedSize.width} × {recommendedSize.height}px
                  </Typography>
                )}
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    The image will be automatically resized and cropped to fit the {previewContext} area while maintaining quality.
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreviewDialog(false)}>Close</Button>
          <Button 
            variant="contained" 
            onClick={() => {
              setShowPreviewDialog(false);
              onChange(previewUrl);
            }}
          >
            Use This Image
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUpload;
