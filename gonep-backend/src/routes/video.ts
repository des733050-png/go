import { Router } from 'express';
import { VideoController } from '../controllers/video';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/video
 * @desc    Get all videos
 * @access  Public
 */
router.get('/', VideoController.getAllVideos);

/**
 * @route   GET /api/video/admin
 * @desc    Get all videos for admin
 * @access  Private (Admin)
 */
router.get('/admin', authenticateToken, requireAdmin, VideoController.getAllVideosAdmin);

/**
 * @route   POST /api/video
 * @desc    Create a new video
 * @access  Private (Admin)
 */
router.post('/', authenticateToken, requireAdmin, VideoController.createVideo);

/**
 * @route   PUT /api/video/:id
 * @desc    Update a video
 * @access  Private (Admin)
 */
router.put('/:id', authenticateToken, requireAdmin, VideoController.updateVideo);

/**
 * @route   GET /api/video/placement/:placement
 * @desc    Get videos by placement
 * @access  Public
 */
router.get('/placement/:placement', VideoController.getVideosByPlacement);

/**
 * @route   DELETE /api/video/:id
 * @desc    Delete a video
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, requireAdmin, VideoController.deleteVideo);

export default router;
