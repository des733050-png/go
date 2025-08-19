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
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  Language as LanguageIcon,
  WhatsApp as WhatsAppIcon,
  YouTube as YouTubeIcon,
} from '@mui/icons-material';
import { teamAPI } from '../services/api';
import { TeamMember } from '../types';
import ImageUpload from '../components/ImageUpload';

const TeamManagementPage: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    bio: '',
    image: '',
    email: '',
    phone: '',
    department: '',
    location: '',
    expertise: [],
    yearsExperience: 0,
    education: '',
    certifications: [],
    achievements: [],
    isLeadership: false,
    orderIndex: 0,
    isActive: true,
    // Social Media Links
    linkedinUrl: '',
    twitterUrl: '',
    facebookUrl: '',
    instagramUrl: '',
    whatsappUrl: '',
    portfolioUrl: '',
    githubUrl: '',
    youtubeUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await teamAPI.getMembers();
      if (response.success) {
        setMembers(response.data.members || []);
      } else {
        setError(response.message || 'Failed to load team data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load team data');
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

  const handleOpenDialog = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        bio: member.bio,
        image: member.image,
        email: member.email,
        phone: member.phone,
        department: member.department,
        location: member.location,
        expertise: member.expertise,
        yearsExperience: member.yearsExperience,
        education: member.education,
        certifications: member.certifications,
        achievements: member.achievements,
        isLeadership: member.isLeadership,
        orderIndex: member.orderIndex,
        isActive: member.isActive,
        // Social Media Links
        linkedinUrl: member.linkedinUrl,
        twitterUrl: member.twitterUrl,
        facebookUrl: member.facebookUrl,
        instagramUrl: member.instagramUrl,
        whatsappUrl: member.whatsappUrl,
        portfolioUrl: member.portfolioUrl,
        githubUrl: member.githubUrl,
        youtubeUrl: member.youtubeUrl,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        role: '',
        bio: '',
        image: '',
        email: '',
        phone: '',
        department: '',
        location: '',
        expertise: [],
        yearsExperience: 0,
        education: '',
        certifications: [],
        achievements: [],
        isLeadership: false,
        orderIndex: 0,
        isActive: true,
        // Social Media Links
        linkedinUrl: '',
        twitterUrl: '',
        facebookUrl: '',
        instagramUrl: '',
        whatsappUrl: '',
        portfolioUrl: '',
        githubUrl: '',
        youtubeUrl: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMember(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingMember) {
        const response = await teamAPI.updateMember(editingMember.id, formData);
        if (response.success) {
          setMembers(members.map(m => m.id === editingMember.id ? response.data : m));
          handleCloseDialog();
        } else {
          setError(response.message || 'Failed to update team member');
        }
      } else {
        const response = await teamAPI.createMember(formData);
        if (response.success) {
          setMembers([...members, response.data]);
          handleCloseDialog();
        } else {
          setError(response.message || 'Failed to create team member');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save team member');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        const response = await teamAPI.deleteMember(id);
        if (response.success) {
          setMembers(members.filter(m => m.id !== id));
        } else {
          setError(response.message || 'Failed to delete team member');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to delete team member');
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
        <Typography variant="h4">Team Management</Typography>
        <Box display="flex" gap={2} alignItems="center">
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Team Member
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Social Media</TableCell>
                <TableCell>Leadership</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar src={member.image} alt={member.name}>
                          {member.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2">{member.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.email}
                          </Typography>
                          {member.phone && (
                            <Typography variant="caption" color="text.secondary" display="block">
                              {member.phone}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{member.role}</Typography>
                        {member.location && (
                          <Typography variant="caption" color="text.secondary">
                            📍 {member.location}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{member.yearsExperience} years</Typography>
                        {member.education && (
                          <Typography variant="caption" color="text.secondary">
                            {member.education}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {member.email}
                        </Typography>
                        {member.phone && (
                          <Typography variant="caption" color="text.secondary" display="block">
                            📞 {member.phone}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={0.5} flexWrap="wrap">
                        {member.linkedinUrl && (
                          <Tooltip title="LinkedIn">
                            <IconButton size="small" href={member.linkedinUrl} target="_blank" color="primary">
                              <LinkedInIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.twitterUrl && (
                          <Tooltip title="Twitter">
                            <IconButton size="small" href={member.twitterUrl} target="_blank" color="info">
                              <TwitterIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.facebookUrl && (
                          <Tooltip title="Facebook">
                            <IconButton size="small" href={member.facebookUrl} target="_blank" color="primary">
                              <FacebookIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.instagramUrl && (
                          <Tooltip title="Instagram">
                            <IconButton size="small" href={member.instagramUrl} target="_blank" sx={{ color: '#E4405F' }}>
                              <InstagramIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.githubUrl && (
                          <Tooltip title="GitHub">
                            <IconButton size="small" href={member.githubUrl} target="_blank" sx={{ color: '#333' }}>
                              <GitHubIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.portfolioUrl && (
                          <Tooltip title="Portfolio">
                            <IconButton size="small" href={member.portfolioUrl} target="_blank" color="secondary">
                              <LanguageIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.whatsappUrl && (
                          <Tooltip title="WhatsApp">
                            <IconButton size="small" href={member.whatsappUrl} target="_blank" sx={{ color: '#25D366' }}>
                              <WhatsAppIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {member.youtubeUrl && (
                          <Tooltip title="YouTube">
                            <IconButton size="small" href={member.youtubeUrl} target="_blank" sx={{ color: '#FF0000' }}>
                              <YouTubeIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.isLeadership ? 'Leadership' : 'Member'}
                        color={member.isLeadership ? 'primary' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={member.isActive ? 'Active' : 'Inactive'}
                        color={member.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(member.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(member)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(member.id)}
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
          count={members.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Basic Information */}
            <Box>
              <Typography variant="h6" gutterBottom>Basic Information</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Name"
                  fullWidth
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <TextField
                  label="Role"
                  fullWidth
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <TextField
                  label="Department"
                  fullWidth
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
                <TextField
                  label="Location"
                  fullWidth
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <TextField
                  label="Years of Experience"
                  fullWidth
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                />
                <TextField
                  label="Order Index"
                  fullWidth
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: Number(e.target.value) })}
                />
              </Box>
            </Box>

            {/* Bio and Image */}
            <Box>
              <Typography variant="h6" gutterBottom>Bio & Image</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
                <ImageUpload
                  label="Profile Image"
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  helperText="Upload or enter URL for the team member's profile image"
                  maxSize={3}
                  recommendedSize={{ width: 400, height: 400 }}
                  previewContext="profile"
                />
              </Box>
            </Box>

            {/* Education and Achievements */}
            <Box>
              <Typography variant="h6" gutterBottom>Education & Achievements</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="Education"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                />
                <TextField
                  label="Expertise (comma-separated)"
                  fullWidth
                  value={formData.expertise?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    expertise: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                />
                <TextField
                  label="Certifications (comma-separated)"
                  fullWidth
                  value={formData.certifications?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    certifications: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                />
                <TextField
                  label="Achievements (comma-separated)"
                  fullWidth
                  value={formData.achievements?.join(', ') || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    achievements: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                  })}
                />
              </Box>
            </Box>

            {/* Social Media Links */}
            <Box>
              <Typography variant="h6" gutterBottom>Social Media Links</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  label="LinkedIn URL"
                  fullWidth
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                />
                <TextField
                  label="Twitter URL"
                  fullWidth
                  value={formData.twitterUrl}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                />
                <TextField
                  label="Facebook URL"
                  fullWidth
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                />
                <TextField
                  label="Instagram URL"
                  fullWidth
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                />
                <TextField
                  label="WhatsApp URL"
                  fullWidth
                  value={formData.whatsappUrl}
                  onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                />
                <TextField
                  label="Portfolio URL"
                  fullWidth
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                />
                <TextField
                  label="GitHub URL"
                  fullWidth
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                />
                <TextField
                  label="YouTube URL"
                  fullWidth
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                />
              </Box>
            </Box>

            {/* Settings */}
            <Box>
              <Typography variant="h6" gutterBottom>Settings</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isLeadership}
                      onChange={(e) => setFormData({ ...formData, isLeadership: e.target.checked })}
                    />
                  }
                  label="Leadership Role"
                />
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMember ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamManagementPage;

