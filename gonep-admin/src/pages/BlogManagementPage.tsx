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
  FormControlLabel,
  Switch,
  Alert,
  CircularProgress,
  Tooltip,
  Autocomplete,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Article as ArticleIcon,
  PublishedWithChanges as PublishedIcon,
  Drafts as DraftIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { blogAPI } from '../services/api';
import { BlogPost } from '../types';
import InlineCategoryCreator from '../components/InlineCategoryCreator';
import InlineAuthorCreator from '../components/InlineAuthorCreator';
import InlineTagCreator from '../components/InlineTagCreator';
import ImageUpload from '../components/ImageUpload';

const BlogManagementPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    authorId: 1,
    categoryId: 1,
    isPublished: false,
    isFeatured: false,
    tags: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string>('');
  const [categoryCreatorOpen, setCategoryCreatorOpen] = useState(false);
  const [authorCreatorOpen, setAuthorCreatorOpen] = useState(false);
  const [tagCreatorOpen, setTagCreatorOpen] = useState(false);
  const [refreshingAuthors, setRefreshingAuthors] = useState(false);
  const [refreshingCategories, setRefreshingCategories] = useState(false);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  // Debug state changes
  useEffect(() => {
    console.log('📊 State updated:', {
      authors: authors.length,
      categories: categories.length,
      posts: posts.length
    });
  }, [authors, categories, posts]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Starting to fetch blog data...');
      
      // Try to fetch all data with individual error handling
      const results = await Promise.allSettled([
        blogAPI.getPosts(),
        blogAPI.getAuthors(),
        blogAPI.getCategories()
      ]);
      
      // Handle posts
      if (results[0].status === 'fulfilled' && results[0].value?.success) {
        setPosts(results[0].value.data.posts || []);
        console.log('✅ Posts loaded:', results[0].value.data.posts?.length || 0);
      } else {
        console.error('❌ Posts failed to load:', results[0]);
      }
      
      // Handle authors
      if (results[1].status === 'fulfilled' && results[1].value?.success) {
        setAuthors(results[1].value.data.authors || []);
        console.log('✅ Authors loaded:', results[1].value.data.authors?.length || 0);
      } else {
        console.error('❌ Authors failed to load:', results[1]);
        setError('Failed to load authors');
      }
      setLoadingAuthors(false);
      
      // Handle categories
      if (results[2].status === 'fulfilled' && results[2].value?.success) {
        setCategories(results[2].value.data.categories || []);
        console.log('✅ Categories loaded:', results[2].value.data.categories || []);
      } else {
        console.error('❌ Categories failed to load:', results[2]);
        setError('Failed to load categories');
      }
      setLoadingCategories(false);
      
    } catch (err: any) {
      console.error('❌ Blog API error:', err);
      setError('Failed to load blog data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (post?: BlogPost) => {
    setError('');
    setSubmitSuccess('');
    
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image || '',
        authorId: post.authorId,
        categoryId: post.categoryId,
        isPublished: post.isPublished,
        isFeatured: post.isFeatured,
        tags: post.tags || [],
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        image: '',
        authorId: 1,
        categoryId: 1,
        isPublished: false,
        isFeatured: false,
        tags: [],
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPost(null);
    setError('');
    setSubmitSuccess('');
    setSubmitting(false);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      image: '',
      authorId: 1,
      categoryId: 1,
      isPublished: false,
      isFeatured: false,
      tags: [],
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setError('');
      setSubmitSuccess('');
      
      const postData = {
        title: formData.title || '',
        content: formData.content || '',
        excerpt: formData.excerpt || '',
        image: formData.image || '',
        categoryId: formData.categoryId || 1,
        authorId: formData.authorId || 1,
        published: formData.isPublished || false,
        featured: formData.isFeatured || false,
        tags: formData.tags || [],
      };

      if (editingPost) {
        const response = await blogAPI.updatePost(editingPost.id, postData);
        if (response.success) {
          setPosts(posts.map(p => p.id === editingPost.id ? response.data : p));
          setSubmitSuccess('Post updated successfully!');
          setTimeout(() => {
            handleCloseDialog();
            setSubmitSuccess('');
          }, 1000);
        } else {
          setError('Failed to update blog post');
        }
      } else {
        const response = await blogAPI.createPost(postData);
        if (response.success) {
          setPosts([response.data, ...posts]);
          setSubmitSuccess('Post created successfully!');
          setTimeout(() => {
            handleCloseDialog();
            setSubmitSuccess('');
          }, 1000);
        } else {
          setError('Failed to create blog post');
        }
      }
    } catch (err) {
      setError('Failed to save blog post');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await blogAPI.deletePost(id);
        if (response.success) {
          setPosts(posts.filter(p => p.id !== id));
        }
      } catch (err) {
        setError('Failed to delete blog post');
      }
    }
  };

  const handleCategoryCreated = (newCategory: any) => {
    // Add the new category to the list and select it
    setCategories([...categories, newCategory]);
    setFormData({ ...formData, categoryId: newCategory.id });
    setCategoryCreatorOpen(false);
    setLoadingCategories(false);
  };

  const handleAuthorCreated = (newAuthor: any) => {
    // Add the new author to the list and select it
    setAuthors([...authors, newAuthor]);
    setFormData({ ...formData, authorId: newAuthor.id });
    setAuthorCreatorOpen(false);
    setLoadingAuthors(false);
  };

  const handleTagsSelected = (tags: string[]) => {
    setFormData({ ...formData, tags });
    setTagCreatorOpen(false);
  };

  const refreshAuthors = async () => {
    setRefreshingAuthors(true);
    setLoadingAuthors(true);
    try {
      const response = await blogAPI.getAuthors();
      if (response.success) {
        setAuthors(response.data.authors || []);
        console.log('✅ Authors refreshed:', response.data.authors?.length || 0);
      }
    } catch (err) {
      console.error('❌ Failed to refresh authors:', err);
    } finally {
      setRefreshingAuthors(false);
      setLoadingAuthors(false);
    }
  };

  const refreshCategories = async () => {
    setRefreshingCategories(true);
    setLoadingCategories(true);
    try {
      const response = await blogAPI.getCategories();
      if (response.success) {
        setCategories(response.data.categories || []);
        console.log('✅ Categories refreshed:', response.data.categories?.length || 0);
      }
    } catch (err) {
      console.error('❌ Failed to refresh categories:', err);
    } finally {
      setRefreshingCategories(false);
      setLoadingCategories(false);
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
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Blog Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add New Post
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <ArticleIcon color="primary" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Total Posts
                </Typography>
                <Typography variant="h4">
                  {posts.length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <PublishedIcon color="success" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Published
                </Typography>
                <Typography variant="h4">
                  {posts.filter(p => p.isPublished).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <DraftIcon color="warning" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  Drafts
                </Typography>
                <Typography variant="h4">
                  {posts.filter(p => !p.isPublished).length}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={{ flex: '1 1 200px', minWidth: '200px' }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <ArticleIcon color="info" />
              <Box>
                <Typography color="textSecondary" variant="body2">
                  This Month
                </Typography>
                <Typography variant="h4">
                  {posts.filter(p => {
                    const createdAt = new Date(p.createdAt);
                    const now = new Date();
                    return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
                  }).length}
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
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Published Date</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2">{post.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {post.slug}
                        </Typography>
                      </Box>
                    </TableCell>
                                         <TableCell>{post.authorName}</TableCell>
                    <TableCell>
                      <Chip
                        icon={post.isPublished ? <PublishedIcon /> : <DraftIcon />}
                        label={post.isPublished ? 'Published' : 'Draft'}
                        color={post.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                                         <TableCell>
                       <Box display="flex" gap={0.5} flexWrap="wrap">
                         <Chip label={post.categoryName} size="small" variant="outlined" />
                       </Box>
                     </TableCell>
                     <TableCell>
                       <Box display="flex" gap={0.5} flexWrap="wrap">
                         {post.tags && Array.isArray(post.tags) && post.tags.length > 0 ? (
                           post.tags.map((tag, index) => (
                             <Chip key={index} label={tag} size="small" variant="outlined" color="primary" />
                           ))
                         ) : (
                           <Chip label="No tags" size="small" variant="outlined" color="default" />
                         )}
                       </Box>
                     </TableCell>
                     <TableCell>
                       {post.isPublished ? new Date(post.updatedAt).toLocaleDateString() : '-'}
                     </TableCell>
                    <TableCell>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View">
                          <IconButton size="small" color="primary">
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleOpenDialog(post)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(post.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {submitSuccess}
            </Alert>
          )}
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <TextField
                  label="Slug"
                  fullWidth
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                <ImageUpload
                  label="Blog Post Image"
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  helperText="Upload or enter URL for the blog post image"
                  maxSize={5}
                  recommendedSize={{ width: 1200, height: 630 }}
                  previewContext="blog"
                />
              </Box>
                             <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                 <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                   <FormControl fullWidth>
                     <InputLabel>Author</InputLabel>
                     <Select
                       value={formData.authorId || ''}
                       label="Author"
                       onChange={(e) => setFormData({ ...formData, authorId: Number(e.target.value) })}
                       disabled={loadingAuthors}
                     >
                       {loadingAuthors ? (
                         <MenuItem disabled>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                             <CircularProgress size={16} />
                             Loading authors...
                           </Box>
                         </MenuItem>
                       ) : authors.length === 0 ? (
                         <MenuItem disabled>No authors available</MenuItem>
                       ) : (
                         authors.map((author) => (
                           <MenuItem key={author.id} value={author.id}>
                             {author.name}
                           </MenuItem>
                         ))
                       )}
                     </Select>
                   </FormControl>
                   <Tooltip title="Refresh authors">
                     <IconButton
                       onClick={refreshAuthors}
                       size="large"
                       sx={{ mb: 0.5 }}
                       disabled={refreshingAuthors}
                     >
                       {refreshingAuthors ? (
                         <CircularProgress size={20} />
                       ) : (
                         <RefreshIcon />
                       )}
                     </IconButton>
                   </Tooltip>
                   <Tooltip title="Create new author">
                     <IconButton
                       onClick={() => setAuthorCreatorOpen(true)}
                       size="large"
                       sx={{ mb: 0.5 }}
                     >
                       <AddIcon />
                     </IconButton>
                   </Tooltip>
                 </Box>
               </Box>
               <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                 <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                   <FormControl fullWidth>
                     <InputLabel>Category</InputLabel>
                     <Select
                       value={formData.categoryId || ''}
                       label="Category"
                       onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
                       disabled={loadingCategories}
                     >
                       {loadingCategories ? (
                         <MenuItem disabled>
                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                             <CircularProgress size={16} />
                             Loading categories...
                           </Box>
                         </MenuItem>
                       ) : categories.length === 0 ? (
                         <MenuItem disabled>No categories available</MenuItem>
                       ) : (
                         categories.map((category) => (
                           <MenuItem key={category.id} value={category.id}>
                             {category.name}
                           </MenuItem>
                         ))
                       )}
                     </Select>
                   </FormControl>
                   <Tooltip title="Refresh categories">
                     <IconButton
                       onClick={refreshCategories}
                       size="large"
                       sx={{ mb: 0.5 }}
                       disabled={refreshingCategories}
                     >
                       {refreshingCategories ? (
                         <CircularProgress size={20} />
                       ) : (
                         <RefreshIcon />
                       )}
                     </IconButton>
                   </Tooltip>
                   <Tooltip title="Create new category">
                     <IconButton
                       onClick={() => setCategoryCreatorOpen(true)}
                       size="large"
                       sx={{ mb: 0.5 }}
                     >
                       <AddIcon />
                     </IconButton>
                   </Tooltip>
                 </Box>
               </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Excerpt"
                fullWidth
                multiline
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                label="Content"
                fullWidth
                multiline
                rows={8}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <TextField
                  label="Tags"
                  fullWidth
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  placeholder="Click to manage tags"
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText={`${Array.isArray(formData.tags) ? formData.tags.length : 0} tag(s) selected. At least one tag is required.`}
                />
                <Button
                  onClick={() => setTagCreatorOpen(true)}
                  variant="outlined"
                  sx={{ mb: 0.5 }}
                >
                  Manage Tags
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  />
                }
                label="Published"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                }
                label="Featured"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            disabled={submitting || !formData.title || !formData.content || !Array.isArray(formData.tags) || formData.tags.length === 0}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            {submitting ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Creator Dialog */}
      <InlineCategoryCreator
        open={categoryCreatorOpen}
        onClose={() => setCategoryCreatorOpen(false)}
        onCategoryCreated={handleCategoryCreated}
      />

      {/* Author Creator Dialog */}
      <InlineAuthorCreator
        open={authorCreatorOpen}
        onClose={() => setAuthorCreatorOpen(false)}
        onAuthorCreated={handleAuthorCreated}
      />

      {/* Tag Creator Dialog */}
      <InlineTagCreator
        open={tagCreatorOpen}
        onClose={() => setTagCreatorOpen(false)}
        onTagsSelected={handleTagsSelected}
        existingTags={Array.from(new Set(
          posts.flatMap(post => post.tags || [])
        )).sort()}
        currentTags={Array.isArray(formData.tags) ? formData.tags : []}
      />
    </Box>
  );
};

export default BlogManagementPage;
