import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { ValidationUtils } from '../utils/validation';
import { authenticateToken, validateRefreshToken } from '../middleware/auth';
import Joi from 'joi';

const router = Router();
const authController = new AuthController();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  const userData = ValidationUtils.validate(ValidationUtils.userRegistration, req.body) as any;
  const result = await authController.register(userData);
  res.status(201).json(result);
});

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const loginData = ValidationUtils.validate(ValidationUtils.userLogin, req.body) as any;
  const result = await authController.login(loginData);
  res.json(result);
});

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post('/refresh', validateRefreshToken, async (req, res) => {
  const result = await authController.refreshToken(req.body.token);
  res.json(result);
});

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post('/logout', authenticateToken, async (req, res) => {
  const result = await authController.logout(req.body.token);
  res.json(result);
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticateToken, async (req: any, res) => {
  const result = await authController.getProfile(req.user.id);
  res.json(result);
});

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authenticateToken, async (req: any, res) => {
  const result = await authController.updateProfile(req.user, req.body);
  res.json(result);
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', async (req, res) => {
  const { email } = ValidationUtils.validate(ValidationUtils.email, req.body) as any;
  const result = await authController.forgotPassword(email);
  res.json(result);
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password with token
 * @access  Public
 */
router.post('/reset-password', async (req, res) => {
  const { token, password } = ValidationUtils.validate(
    Joi.object({
      token: Joi.string().required(),
      password: Joi.string().min(6).required()
    }),
    req.body
  ) as any;
  const result = await authController.resetPassword(token, password);
  res.json(result);
});

/**
 * @route   POST /api/auth/verify-email
 * @desc    Verify email with token
 * @access  Public
 */
router.post('/verify-email', async (req, res) => {
  const { token } = ValidationUtils.validate(
    Joi.object({
      token: Joi.string().required()
    }),
    req.body
  ) as any;
  const result = await authController.verifyEmail(token);
  res.json(result);
});

/**
 * @route   POST /api/auth/resend-verification
 * @desc    Resend email verification
 * @access  Public
 */
router.post('/resend-verification', async (req, res) => {
  const { email } = ValidationUtils.validate(ValidationUtils.email, req.body) as any;
  const result = await authController.resendVerification(email);
  res.json(result);
});

export default router;
