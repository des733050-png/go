import { Router } from 'express';
import { ContactController } from '../controllers/contact';
import { requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/contact/submit
 * @desc    Submit contact inquiry
 * @access  Public
 */
router.post('/submit', ContactController.submitInquiry);

/**
 * @route   GET /api/contact/methods
 * @desc    Get contact methods
 * @access  Public
 */
router.get('/methods', ContactController.getContactMethods);

/**
 * @route   GET /api/contact/inquiries
 * @desc    Get all contact inquiries (admin only)
 * @access  Private (Admin)
 */
router.get('/inquiries', requireAdmin, ContactController.getAllInquiries);

export default router;
