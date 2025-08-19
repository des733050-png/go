import { Router } from 'express';
import { CareersController } from '../controllers/careers';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   GET /api/careers/jobs
 * @desc    Get all job listings
 * @access  Public
 */
router.get('/jobs', CareersController.getAllJobs);

/**
 * @route   GET /api/careers/jobs/admin
 * @desc    Get all job listings for admin (including inactive)
 * @access  Private (Admin)
 */
router.get('/jobs/admin', authenticateToken, requireAdmin, CareersController.getAllJobsAdmin);

/**
 * @route   GET /api/careers/jobs/:slug
 * @desc    Get a specific job listing by slug
 * @access  Public
 */
router.get('/jobs/:slug', CareersController.getJobBySlug);

/**
 * @route   POST /api/careers/jobs
 * @desc    Create a new job listing
 * @access  Private (Admin)
 */
router.post('/jobs', authenticateToken, requireAdmin, CareersController.createJob);

/**
 * @route   PUT /api/careers/jobs/:id
 * @desc    Update a job listing
 * @access  Private (Admin)
 */
router.put('/jobs/:id', authenticateToken, requireAdmin, CareersController.updateJob);

/**
 * @route   DELETE /api/careers/jobs/:id
 * @desc    Delete a job listing
 * @access  Private (Admin)
 */
router.delete('/jobs/:id', authenticateToken, requireAdmin, CareersController.deleteJob);

/**
 * @route   POST /api/careers/applications
 * @desc    Submit a job application
 * @access  Public
 */
router.post('/applications', CareersController.submitApplication);

/**
 * @route   GET /api/careers/departments/stats
 * @desc    Get department statistics
 * @access  Public
 */
router.get('/departments/stats', CareersController.getDepartmentStats);

export default router;
