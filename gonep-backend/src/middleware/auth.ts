import { Request, Response, NextFunction } from 'express';
import { AuthUtils } from '../utils/auth';
import { ValidationUtils } from '../utils/validation';
import { User } from '../types';
import { db } from '../config/database';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { config } from '../config';

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, 'passwordHash'>;
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('🔐 authenticateToken middleware called for:', req.method, req.path);
    console.log('🔐 JWT_SECRET available:', !!config.JWT_SECRET);
    console.log('🔐 JWT_SECRET length:', config.JWT_SECRET?.length || 0);
    
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      console.log('❌ No token provided');
      res.status(401).json({
        success: false,
        error: 'Access token required',
        message: 'Please provide a valid access token'
      });
      return;
    }

    console.log('🔐 Token received, length:', token.length);
    console.log('🔐 Token preview:', token.substring(0, 20) + '...');
    
    const payload = AuthUtils.verifyAccessToken(token);
    console.log('✅ Token verified successfully, payload:', payload);
    
    // Get user from database
    const user = await db.select().from(users).where(eq(users.id, parseInt(payload.userId))).limit(1);
    
    if (!user.length || !user[0]?.isActive) {
      console.log('❌ User not found or inactive');
      res.status(401).json({
        success: false,
        error: 'Invalid token',
        message: 'User not found or inactive'
      });
      return;
    }

    console.log('✅ User authenticated:', user[0].email);
    const { passwordHash, ...userWithoutPassword } = user[0];
    req.user = userWithoutPassword;
    next();
  } catch (error: any) {
    console.log('❌ Token verification failed:', error.message);
    res.status(401).json({
      success: false,
      error: 'Invalid token',
      message: 'Token is invalid or expired'
    });
  }
};

/**
 * Middleware to require specific role
 */
export const requireRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    console.log('🔐 requireRole middleware called for role:', requiredRole);
    console.log('🔐 User:', req.user ? `${req.user.firstName} ${req.user.lastName} (${req.user.role})` : 'No user');
    
    if (!req.user) {
      console.log('❌ No user found in request');
      res.status(401).json({
        success: false,
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
      return;
    }

    if (!AuthUtils.hasRole(req.user.role, requiredRole)) {
      console.log('❌ User role insufficient:', req.user.role, 'required:', requiredRole);
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        message: `Access denied. Required role: ${requiredRole}`
      });
      return;
    }

    console.log('✅ Role check passed');
    next();
  };
};

/**
 * Middleware to require any of the specified roles
 */
export const requireAnyRole = (requiredRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
      return;
    }

    if (!AuthUtils.hasAnyRole(req.user.role, requiredRoles)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        message: `Access denied. Required roles: ${requiredRoles.join(', ')}`
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = requireRole('admin');

/**
 * Middleware to require moderator or admin role
 */
export const requireModerator = requireAnyRole(['moderator', 'admin']);

/**
 * Optional authentication middleware - doesn't fail if no token provided
 */
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    const payload = AuthUtils.verifyAccessToken(token);
    
    const user = await db.select().from(users).where(eq(users.id, parseInt(payload.userId))).limit(1);
    
    if (user.length && user[0]?.isActive) {
      const { passwordHash, ...userWithoutPassword } = user[0];
      req.user = userWithoutPassword;
    }

    next();
  } catch (error) {
    // Continue without authentication if token is invalid
    next();
  }
};

/**
 * Middleware to validate refresh token
 */
export const validateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        error: 'Refresh token required',
        message: 'Please provide a refresh token'
      });
      return;
    }

    const payload = AuthUtils.verifyRefreshToken(refreshToken);
    
    const user = await db.select().from(users).where(eq(users.id, parseInt(payload.userId))).limit(1);
    
    if (!user.length || !user[0]?.isActive) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
        message: 'User not found or inactive'
      });
      return;
    }

    req.body.userId = payload.userId;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token',
      message: 'Refresh token is invalid or expired'
    });
  }
};

/**
 * Middleware to check if user owns the resource or is admin
 */
export const requireOwnershipOrAdmin = (resourceUserIdField: string = 'userId') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
        message: 'Please log in to access this resource'
      });
      return;
    }

    const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
    
    if (!resourceUserId) {
      res.status(400).json({
        success: false,
        error: 'Resource ID required',
        message: 'Resource ID is required for ownership verification'
      });
      return;
    }

    // Allow if user is admin or owns the resource
    if (req.user.role === 'admin' || req.user.id === parseInt(resourceUserId as string)) {
      next();
      return;
    }

    res.status(403).json({
      success: false,
      error: 'Access denied',
      message: 'You can only access your own resources'
    });
  };
};
