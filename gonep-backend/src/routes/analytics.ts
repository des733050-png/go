import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/analytics/track
 * @desc    Track user interaction
 * @access  Public
 */
router.post('/track', AnalyticsController.trackEvent);

/**
 * @route   GET /api/analytics/dashboard
 * @desc    Get analytics dashboard data (admin only)
 * @access  Private (Admin)
 */
router.get('/dashboard', authenticateToken, requireAdmin, AnalyticsController.getDashboardData);

export default router;
