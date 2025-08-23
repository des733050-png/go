import { db } from '../config/database';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';
import { AuthUtils } from '../utils/auth';
import { EmailService } from '../services/email';
import { 
  UserRegistration, 
  UserLogin, 
  AuthResponse, 
  User, 
  NewUser,
  ApiResponse 
} from '../types';
import { ConflictError, AuthenticationError, NotFoundError } from '../middleware/errorHandler';
import slugify from 'slugify';

export class AuthController {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  /**
   * Register a new user
   */
  async register(userData: UserRegistration & { name?: string }): Promise<ApiResponse<AuthResponse>> {
    try {
      console.log('🔍 Auth registration started with data:', { email: userData.email, name: userData.name });
      
      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, userData.email)).limit(1);
      
      if (existingUser.length > 0) {
        throw new ConflictError('User with this email already exists');
      }

      // Handle name field from frontend
      let firstName = userData.firstName;
      let lastName = userData.lastName;
      
      if (userData.name && !firstName && !lastName) {
        const nameParts = userData.name.trim().split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }

      if (!firstName || !lastName) {
        throw new Error('First name and last name are required');
      }

      console.log('🔍 Name parsed:', { firstName, lastName });

      // Hash password
      const passwordHash = await AuthUtils.hashPassword(userData.password);
      console.log('🔍 Password hashed successfully');

      // Create new user (simplified approach like the test)
      const newUser = {
        email: userData.email,
        passwordHash,
        firstName,
        lastName,
        phone: userData.phone || null,
        organization: userData.organization || null,
        title: userData.title || null,
        organizationType: userData.organizationType || null,
        country: userData.country || null,
        role: 'user',
        isActive: true,
        emailVerified: false,
      };

      console.log('🔍 Attempting database insert with user data:', { 
        email: newUser.email, 
        firstName: newUser.firstName, 
        lastName: newUser.lastName,
        role: newUser.role 
      });

      await db.insert(users).values(newUser);
      
      // Get the created user by email since we don't have insertId
      const [createdUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, newUser.email))
        .limit(1);
      console.log('🔍 Database insert successful:', createdUser);
      
      const { passwordHash: _, ...userWithoutPassword } = createdUser;

      // Generate tokens
      const accessToken = AuthUtils.generateAccessToken(userWithoutPassword);
      const refreshToken = AuthUtils.generateRefreshToken(userWithoutPassword);
      console.log('🔍 Tokens generated successfully');

      // Send verification email (temporarily disabled for debugging)
      /*
      try {
        await this.sendVerificationEmail(userWithoutPassword);
      } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't fail registration if email fails
      }
      */

      console.log('🔍 Auth registration completed successfully');

      return {
        success: true,
        data: {
          user: userWithoutPassword,
          accessToken: accessToken,
          refreshToken: refreshToken
        },
        message: 'User registered successfully'
      };
    } catch (error) {
      console.error('❌ Auth registration failed:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(loginData: UserLogin): Promise<ApiResponse<AuthResponse>> {
    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, loginData.email)).limit(1);
    
    if (!user.length) {
      throw new AuthenticationError('Invalid email or password');
    }

    const foundUser = user[0];

    // Check if user is active
    if (!foundUser.isActive) {
      throw new AuthenticationError('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await AuthUtils.comparePassword(loginData.password, foundUser.passwordHash);
    
    if (!isPasswordValid) {
      throw new AuthenticationError('Invalid email or password');
    }

    const { passwordHash, ...userWithoutPassword } = foundUser;

    // Generate tokens
    const accessToken = AuthUtils.generateAccessToken(userWithoutPassword);
    const refreshToken = AuthUtils.generateRefreshToken(userWithoutPassword);

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      message: 'Login successful',
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const payload = AuthUtils.verifyRefreshToken(refreshToken);
    
    const user = await db.select().from(users).where(eq(users.id, parseInt(payload.userId))).limit(1);
    
    if (!user.length || !user[0].isActive) {
      throw new AuthenticationError('Invalid refresh token');
    }

    const { passwordHash, ...userWithoutPassword } = user[0];

    // Generate new tokens
    const newAccessToken = AuthUtils.generateAccessToken(userWithoutPassword);
    const newRefreshToken = AuthUtils.generateRefreshToken(userWithoutPassword);

    return {
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
      message: 'Token refreshed successfully',
    };
  }

  /**
   * Logout user
   */
  async logout(refreshToken: string): Promise<void> {
    // In a production environment, you might want to blacklist the refresh token
    // For now, we'll just validate it to ensure it's a valid token
    try {
      AuthUtils.verifyRefreshToken(refreshToken);
    } catch (error) {
      // Token is already invalid, which is fine for logout
    }
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string): Promise<ApiResponse<Omit<User, 'passwordHash'>>> {
    const user = await db.select().from(users).where(eq(users.id, parseInt(userId))).limit(1);
    
    if (!user.length) {
      throw new NotFoundError('User not found');
    }

    const { passwordHash, ...userWithoutPassword } = user[0];

    return {
      success: true,
      data: userWithoutPassword,
      message: 'Profile retrieved successfully',
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, updateData: Partial<User>): Promise<ApiResponse<Omit<User, 'passwordHash'>>> {
    const user = await db.select().from(users).where(eq(users.id, parseInt(userId))).limit(1);
    
    if (!user.length) {
      throw new NotFoundError('User not found');
    }

    // Remove sensitive fields that shouldn't be updated through this endpoint
    const { passwordHash, email, role, isActive, emailVerified, ...allowedUpdates } = updateData;

    await db
      .update(users)
      .set({ ...allowedUpdates, updatedAt: new Date() })
      .where(eq(users.id, parseInt(userId)));

    // Get the updated user
    const [updatedUser] = await db.select().from(users).where(eq(users.id, parseInt(userId))).limit(1);
    
    if (!updatedUser) {
      throw new NotFoundError('Failed to retrieve updated user');
    }

    const { passwordHash: _, ...userWithoutPassword } = updatedUser;

    return {
      success: true,
      data: userWithoutPassword,
      message: 'Profile updated successfully',
    };
  }

  /**
   * Send forgot password email
   */
  async forgotPassword(email: string): Promise<void> {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user.length || !user[0].isActive) {
      // Don't reveal if user exists or not for security
      return;
    }

    const resetToken = AuthUtils.generateRandomToken(32);
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // In a real application, you'd store the reset token in the database
    // For now, we'll just send the email
    await this.emailService.sendPasswordResetEmail(email, resetToken);
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    // In a real application, you'd validate the token from the database
    // For now, we'll just hash the new password and update it
    const passwordHash = await AuthUtils.hashPassword(newPassword);

    // You'd typically find the user by the reset token
    // For now, this is a placeholder
    throw new Error('Password reset functionality needs to be implemented with proper token storage');
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    // In a real application, you'd validate the token from the database
    // For now, this is a placeholder
    throw new Error('Email verification functionality needs to be implemented with proper token storage');
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<void> {
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user.length || !user[0].isActive || user[0].emailVerified) {
      // Don't reveal if user exists or not for security
      return;
    }

    await this.sendVerificationEmail(user[0]);
  }

  /**
   * Send verification email
   */
  private async sendVerificationEmail(user: Omit<User, 'passwordHash'>): Promise<void> {
    const verificationToken = AuthUtils.generateRandomToken(32);
    
    // In a real application, you'd store the verification token in the database
    await this.emailService.sendVerificationEmail(user.email, verificationToken);
  }
}
