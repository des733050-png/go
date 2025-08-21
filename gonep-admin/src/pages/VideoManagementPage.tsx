import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Tooltip,
  Fab,
  DialogContentText,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
  Schedule as ScheduleIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { videoAPI } from '../services/api';

interface DemoVideo {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  category: string;
  placement: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  category: string;
  placement: string;
  isActive: boolean;
  sortOrder: number;
}

const VideoManagementPage: React.FC = () => {
  const [videos, setVideos] = useState<DemoVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<DemoVideo | null>(null);
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
    category: 'demo',
    placement: 'homepage-hero',
    isActive: true,
    sortOrder: 0,
  });

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await videoAPI.getAllVideosAdmin();
      if (response.success) {
        setVideos(response.data.videos);
      } else {
        setError('Failed to load videos');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load videos');
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      duration: '',
      category: 'demo',
      placement: 'homepage-hero',
      isActive: true,
      sortOrder: 0,
    });
    setEditingVideo(null);
  };

  const handleOpenDialog = (video?: DemoVideo) => {
    if (video) {
      setEditingVideo(video);
      setFormData({
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl || '',
        duration: video.duration || '',
        category: video.category,
        placement: video.placement,
        isActive: video.isActive,
        sortOrder: video.sortOrder,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.videoUrl) {
      setError('Title and video URL are required');
      return;
    }

    try {
      if (editingVideo) {
        const response = await videoAPI.updateVideo(editingVideo.id, formData);
        if (response.success) {
          fetchVideos();
          handleCloseDialog();
        } else {
          setError('Failed to update video');
        }
      } else {
        const response = await videoAPI.createVideo(formData);
        if (response.success) {
          fetchVideos();
          handleCloseDialog();
        } else {
          setError('Failed to create video');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error saving video:', err);
    }
  };

  const handleDelete = async (videoId: number) => {
    if (!window.confirm('Are you sure you want to delete this video?')) {
      return;
    }

    try {
      const response = await videoAPI.deleteVideo(videoId);
      if (response.success) {
        fetchVideos();
      } else {
        setError('Failed to delete video');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error deleting video:', err);
    }
  };

  const handleToggleActive = async (video: DemoVideo) => {
    try {
      const response = await videoAPI.updateVideo(video.id, {
        ...video,
        isActive: !video.isActive,
      });
      if (response.success) {
        fetchVideos();
      } else {
        setError('Failed to update video status');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Error updating video status:', err);
    }
  };

  const getVideoEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      const videoId = url.includes('youtu.be/') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    // Vimeo
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    // Dailymotion
    if (url.includes('dailymotion.com/video/')) {
      const videoId = url.split('dailymotion.com/video/')[1]?.split('?')[0];
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId}` : url;
    }
    // Facebook
    if (url.includes('facebook.com/') && url.includes('/videos/')) {
      return url.replace('facebook.com', 'facebook.com/plugins/video.php');
    }
    // Instagram
    if (url.includes('instagram.com/p/') && url.includes('/')) {
      const postId = url.split('instagram.com/p/')[1]?.split('/')[0];
      return postId ? `https://www.instagram.com/p/${postId}/embed/` : url;
    }
    // TikTok
    if (url.includes('tiktok.com/@') && url.includes('/video/')) {
      return url.replace('tiktok.com', 'tiktok.com/embed');
    }
    // Direct video file
    if (url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)) {
      return url;
    }
    // For any other URL, return as is (will be handled by iframe)
    return url;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Demo Video Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage demo videos for the website
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchVideos}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Video
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : videos.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No demo videos found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mt: 2 }}
            >
              Add Your First Video
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {videos.map((video) => (
            <Box key={video.id} sx={{ flex: '1 1 350px', minWidth: '350px', maxWidth: '400px' }}>
              <Card sx={{ height: '100%', opacity: video.isActive ? 1 : 0.6 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" component="h3" gutterBottom>
                        {video.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={video.isActive ? 'Active' : 'Inactive'}
                          color={video.isActive ? 'success' : 'default'}
                          size="small"
                        />
                        <Chip
                          label={video.category}
                          variant="outlined"
                          size="small"
                        />
                        <Chip
                          label={video.placement}
                          variant="outlined"
                          color="primary"
                          size="small"
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title={video.isActive ? 'Deactivate' : 'Activate'}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleActive(video)}
                        >
                          {video.isActive ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(video)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(video.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  {video.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {video.description}
                    </Typography>
                  )}

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <PlayIcon fontSize="small" />
                      Video URL:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        value={video.videoUrl}
                        size="small"
                        fullWidth
                        InputProps={{ readOnly: true }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => window.open(video.videoUrl, '_blank')}
                      >
                        <OpenInNewIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    {video.duration && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ScheduleIcon fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          {video.duration}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CategoryIcon fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        Sort: {video.sortOrder}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Created: {new Date(video.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Updated: {new Date(video.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Add/Edit Video Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingVideo ? 'Edit Demo Video' : 'Add New Demo Video'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              {editingVideo 
                ? 'Update the demo video information below.'
                : 'Add a new demo video to showcase your product.'
              }
            </DialogContentText>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  fullWidth
                  label="Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <MenuItem value="demo">Demo</MenuItem>
                    <MenuItem value="tutorial">Tutorial</MenuItem>
                    <MenuItem value="presentation">Presentation</MenuItem>
                    <MenuItem value="testimonial">Testimonial</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <FormControl fullWidth>
                  <InputLabel>Placement</InputLabel>
                  <Select
                    value={formData.placement}
                    label="Placement"
                    onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  >
                    <MenuItem value="homepage-hero">Homepage Hero Section</MenuItem>
                    <MenuItem value="clinic-hero">Clinic at Hand Hero Section</MenuItem>
                    <MenuItem value="about-who-we-are">About - Who We Are Page</MenuItem>
                    <MenuItem value="about-history">About - History Page</MenuItem>
                    <MenuItem value="about-meet-team">About - Meet the Team Page</MenuItem>
                    <MenuItem value="general">Careers Page (General)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 100%' }}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  multiline
                  rows={3}
                />
              </Box>
              <Box sx={{ flex: '1 1 100%' }}>
                <TextField
                  fullWidth
                  label="Video URL *"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  required
                  helperText="Supports any video platform URL (YouTube, Vimeo, Dailymotion, Facebook, Instagram, TikTok) or direct video files (.mp4, .webm, .ogg, .mov, .avi, .mkv)"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  fullWidth
                  label="Thumbnail URL"
                  value={formData.thumbnailUrl}
                  onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                  helperText="Custom thumbnail URL (optional)"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 15:30"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  fullWidth
                  label="Sort Order"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px', display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                  }
                  label="Active"
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingVideo ? 'Update Video' : 'Create Video'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default VideoManagementPage;
