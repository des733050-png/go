import { Router } from 'express';
import { BlogController } from '../controllers/blog';
import { ValidationUtils } from '../utils/validation';
import { authenticateToken, requireModerator, optionalAuth } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/blog/posts
 * @desc    Get all blog posts with pagination and filtering
 * @access  Public
 */
router.get('/posts', optionalAuth, BlogController.getPosts);

/**
 * @route   GET /api/blog/posts/:slug
 * @desc    Get single blog post by slug
 * @access  Public
 */
router.get('/posts/:slug', optionalAuth, BlogController.getPostBySlug);

/**
 * @route   GET /api/blog/categories
 * @desc    Get all blog categories
 * @access  Public
 */
router.get('/categories', BlogController.getCategories);

/**
 * @route   GET /api/blog/categories/admin
 * @desc    Get all blog categories for admin
 * @access  Private (Admin)
 */
router.get('/categories/admin', authenticateToken, BlogController.getCategoriesForAdmin);

/**
 * @route   POST /api/blog/categories
 * @desc    Create a new blog category
 * @access  Private (Admin)
 */
router.post('/categories', authenticateToken, BlogController.createCategory);

/**
 * @route   PUT /api/blog/categories/:id
 * @desc    Update a blog category
 * @access  Private (Admin)
 */
router.put('/categories/:id', authenticateToken, BlogController.updateCategory);

/**
 * @route   DELETE /api/blog/categories/:id
 * @desc    Delete a blog category
 * @access  Private (Admin)
 */
router.delete('/categories/:id', authenticateToken, BlogController.deleteCategory);

/**
 * @route   GET /api/blog/authors
 * @desc    Get all blog authors
 * @access  Public
 */
router.get('/authors', BlogController.getAuthors);

/**
 * @route   POST /api/blog/authors
 * @desc    Create a new blog author
 * @access  Private (Admin)
 */
router.post('/authors', authenticateToken, BlogController.createAuthor);

/**
 * @route   PUT /api/blog/authors/:id
 * @desc    Update a blog author
 * @access  Private (Admin)
 */
router.put('/authors/:id', authenticateToken, BlogController.updateAuthor);

/**
 * @route   DELETE /api/blog/authors/:id
 * @desc    Delete a blog author
 * @access  Private (Admin)
 */
router.delete('/authors/:id', authenticateToken, BlogController.deleteAuthor);

/**
 * @route   GET /api/blog/featured
 * @desc    Get featured blog posts
 * @access  Public
 */
router.get('/featured', BlogController.getFeaturedPosts);

/**
 * @route   POST /api/blog/posts/:id/view
 * @desc    Increment view count for a post
 * @access  Public
 */
router.post('/posts/:id/view', BlogController.incrementViewCount);

/**
 * @route   GET /api/blog/posts/:id/comments
 * @desc    Get comments for a blog post
 * @access  Public
 */
router.get('/posts/:id/comments', BlogController.getComments);

/**
 * @route   POST /api/blog/posts/:id/comments
 * @desc    Add a comment to a blog post
 * @access  Private
 */
router.post('/posts/:id/comments', optionalAuth, BlogController.addComment);

/**
 * @route   POST /api/blog/posts
 * @desc    Create a new blog post
 * @access  Private (Admin)
 */
router.post('/posts', authenticateToken, BlogController.createPost);

/**
 * @route   PUT /api/blog/posts/:id
 * @desc    Update a blog post
 * @access  Private (Admin)
 */
router.put('/posts/:id', authenticateToken, BlogController.updatePost);

/**
 * @route   DELETE /api/blog/posts/:id
 * @desc    Delete a blog post
 * @access  Private (Admin)
 */
router.delete('/posts/:id', authenticateToken, BlogController.deletePost);

/**
 * @route   PUT /api/blog/comments/:id/approve
 * @desc    Approve a comment
 * @access  Private (Moderator)
 */
router.put('/comments/:id/approve', authenticateToken, requireModerator, BlogController.approveComment);

/**
 * @route   DELETE /api/blog/comments/:id
 * @desc    Delete a comment
 * @access  Private (Moderator)
 */
router.delete('/comments/:id', authenticateToken, requireModerator, BlogController.deleteComment);

export default router;
