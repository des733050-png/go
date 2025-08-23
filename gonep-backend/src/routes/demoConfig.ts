import { Router } from 'express';
import { 
  getInterests, 
  getDemoTypes, 
  getAvailableDates, 
  checkDateAvailability,
  addInterest,
  updateInterest,
  deleteInterest,
  addDemoType,
  updateDemoType,
  deleteDemoType,
  setCalendarAvailability,
  getCalendarAvailabilityRange
} from '../controllers/demoConfig';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// Public routes (no authentication required)
router.get('/interests', getInterests);
router.get('/types', getDemoTypes);
router.get('/calendar', getAvailableDates);
router.post('/calendar/check', checkDateAvailability);

// Admin routes (require authentication and admin role)
router.post('/interests', authenticateToken, requireAdmin, addInterest);
router.put('/interests/:id', authenticateToken, requireAdmin, updateInterest);
router.delete('/interests/:id', authenticateToken, requireAdmin, deleteInterest);

router.post('/types', authenticateToken, requireAdmin, addDemoType);
router.put('/types/:id', authenticateToken, requireAdmin, updateDemoType);
router.delete('/types/:id', authenticateToken, requireAdmin, deleteDemoType);

router.post('/calendar', authenticateToken, requireAdmin, setCalendarAvailability);
router.get('/calendar/range', authenticateToken, requireAdmin, getCalendarAvailabilityRange);

export default router;
