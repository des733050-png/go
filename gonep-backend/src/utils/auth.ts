import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config';
import { JWTPayload, User } from '../types';

export class AuthUtils {
  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a password with its hash
   */
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate JWT access token
   */
  static generateAccessToken(user: Omit<User, 'passwordHash'>): string {
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const payload: JWTPayload = {
      userId: user.id.toString(),
      email: user.email,
      role: user.role || 'user',
    };

    return jwt.sign(payload, config.JWT_SECRET as any, {
      expiresIn: config.JWT_EXPIRES_IN as any,
    });
  }

  /**
   * Generate JWT refresh token
   */
  static generateRefreshToken(user: Omit<User, 'passwordHash'>): string {
    if (!config.REFRESH_TOKEN_SECRET) {
      throw new Error('REFRESH_TOKEN_SECRET is not configured');
    }
    
    const payload: JWTPayload = {
      userId: user.id.toString(),
      email: user.email,
      role: user.role || 'user',
    };

    return jwt.sign(payload, config.REFRESH_TOKEN_SECRET as any, {
      expiresIn: config.REFRESH_TOKEN_EXPIRES_IN as any,
    });
  }

  /**
   * Verify JWT access token
   */
  static verifyAccessToken(token: string): JWTPayload {
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET as any);
      return decoded as JWTPayload;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  /**
   * Verify JWT refresh token
   */
  static verifyRefreshToken(token: string): JWTPayload {
    if (!config.REFRESH_TOKEN_SECRET) {
      throw new Error('REFRESH_TOKEN_SECRET is not configured');
    }
    
    try {
      const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET as any);
      return decoded as JWTPayload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  /**
   * Generate a random token for password reset or email verification
   */
  static generateRandomToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate a secure random string for API keys
   */
  static generateApiKey(): string {
    return `gonep_${this.generateRandomToken(32)}`;
  }

  /**
   * Check if user has required role
   */
  static hasRole(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      user: 1,
      moderator: 2,
      admin: 3,
    };

    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

    return userLevel >= requiredLevel;
  }

  /**
   * Check if user has any of the required roles
   */
  static hasAnyRole(userRole: string, requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.hasRole(userRole, role));
  }
}
