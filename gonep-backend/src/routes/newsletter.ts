import { Router, Request, Response } from 'express';
import { NewsletterController } from '../controllers/newsletter';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/newsletter/subscribe
 * @desc    Subscribe to newsletter
 * @access  Public
 */
router.post('/subscribe', NewsletterController.subscribe);

/**
 * @route   POST /api/newsletter/unsubscribe
 * @desc    Unsubscribe from newsletter
 * @access  Public
 */
router.post('/unsubscribe', NewsletterController.unsubscribe);

/**
 * @route   GET /api/newsletter/subscribers
 * @desc    Get all subscribers (admin only)
 * @access  Private (Admin)
 */
router.get('/subscribers', authenticateToken, requireAdmin, NewsletterController.getSubscribers);

/**
 * @route   PUT /api/newsletter/subscribers/:id
 * @desc    Update subscriber (admin only)
 * @access  Private (Admin)
 */
router.put('/subscribers/:id', authenticateToken, requireAdmin, NewsletterController.updateSubscriber);

/**
 * @route   DELETE /api/newsletter/subscribers/:id
 * @desc    Delete subscriber (admin only)
 * @access  Private (Admin)
 */
router.delete('/subscribers/:id', authenticateToken, requireAdmin, NewsletterController.deleteSubscriber);

export default router;
