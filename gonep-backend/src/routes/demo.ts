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

export default router;
