import { Router } from 'express';
import { TeamController } from '../controllers/team';
import { authenticateToken } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/team
 * @desc    Get all active team members (public)
 * @access  Public
 */
router.get('/', TeamController.getAllMembers);

/**
 * @route   GET /api/team/admin
 * @desc    Get all team members for admin (including inactive)
 * @access  Private (Admin)
 */
router.get('/admin', authenticateToken, TeamController.getAllMembersAdmin);

/**
 * @route   GET /api/team/leadership
 * @desc    Get leadership team members
 * @access  Public
 */
router.get('/leadership', TeamController.getLeadership);

/**
 * @route   GET /api/team/values
 * @desc    Get team values
 * @access  Public
 */
router.get('/values', TeamController.getTeamValues);

/**
 * @route   GET /api/team/:id
 * @desc    Get team member by ID
 * @access  Public
 */
router.get('/:id', TeamController.getMemberById);

/**
 * @route   POST /api/team
 * @desc    Create a new team member
 * @access  Private (Admin)
 */
router.post('/', authenticateToken, TeamController.createMember);

/**
 * @route   PUT /api/team/:id
 * @desc    Update a team member
 * @access  Private (Admin)
 */
router.put('/:id', authenticateToken, TeamController.updateMember);

/**
 * @route   DELETE /api/team/:id
 * @desc    Delete a team member
 * @access  Private (Admin)
 */
router.delete('/:id', authenticateToken, TeamController.deleteMember);

/**
 * @route   POST /api/team/values
 * @desc    Create a new team value
 * @access  Private (Admin)
 */
router.post('/values', authenticateToken, TeamController.createTeamValue);

/**
 * @route   PUT /api/team/values/:id
 * @desc    Update a team value
 * @access  Private (Admin)
 */
router.put('/values/:id', authenticateToken, TeamController.updateTeamValue);

/**
 * @route   DELETE /api/team/values/:id
 * @desc    Delete a team value
 * @access  Private (Admin)
 */
router.delete('/values/:id', authenticateToken, TeamController.deleteTeamValue);

export default router;
