import { Router } from 'express';
import { DemoController } from '../controllers/demo';
import { requireAdmin, authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/demo/request
 * @desc    Submit a demo request
 * @access  Public
 */
router.post('/request', DemoController.submitRequest);

/**
 * @route   GET /api/demo/requests
 * @desc    Get all demo requests (admin only)
 * @access  Private (Admin)
 */
router.get('/requests', authenticateToken, requireAdmin, DemoController.getAllRequests);

/**
 * @route   GET /api/demo/requests/:id
 * @desc    Get demo request by ID (admin only)
 * @access  Private (Admin)
 */
router.get('/requests/:id', authenticateToken, requireAdmin, DemoController.getRequestById);

/**
 * @route   PUT /api/demo/requests/:id
 * @desc    Update demo request status (admin only)
 * @access  Private (Admin)
 */
router.put('/requests/:id', authenticateToken, requireAdmin, DemoController.updateRequestStatus);

/**
 * @route   DELETE /api/demo/requests/:id
 * @desc    Delete demo request (admin only)
 * @access  Private (Admin)
 */
router.delete('/requests/:id', authenticateToken, requireAdmin, DemoController.deleteRequest);

/**
 * @route   GET /api/demo/stats
 * @desc    Get demo statistics (admin only)
 * @access  Private (Admin)
 */
router.get('/stats', authenticateToken, requireAdmin, DemoController.getStats);

export default router;
