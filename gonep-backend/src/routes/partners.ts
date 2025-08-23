import { Router } from 'express';
import { PartnersController } from '../controllers/partners';

const router = Router();

/**
 * @route   GET /api/partners
 * @desc    Get all partners
 * @access  Public
 */
router.get('/', PartnersController.getAllPartners);

export default router;
