"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const auth_1 = require("../utils/auth");
const email_1 = require("../services/email");
const errorHandler_1 = require("../middleware/errorHandler");
class AuthController {
    constructor() {
        this.emailService = new email_1.EmailService();
    }
    async register(userData) {
        try {
            console.log('🔍 Auth registration started with data:', { email: userData.email, name: userData.name });
            const existingUser = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, userData.email)).limit(1);
            if (existingUser.length > 0) {
                throw new errorHandler_1.ConflictError('User with this email already exists');
            }
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
            const passwordHash = await auth_1.AuthUtils.hashPassword(userData.password);
            console.log('🔍 Password hashed successfully');
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
            await database_1.db.insert(schema_1.users).values(newUser);
            const [createdUser] = await database_1.db
                .select()
                .from(schema_1.users)
                .where((0, drizzle_orm_1.eq)(schema_1.users.email, newUser.email))
                .limit(1);
            console.log('🔍 Database insert successful:', createdUser);
            const { passwordHash: _, ...userWithoutPassword } = createdUser;
            const accessToken = auth_1.AuthUtils.generateAccessToken(userWithoutPassword);
            const refreshToken = auth_1.AuthUtils.generateRefreshToken(userWithoutPassword);
            console.log('🔍 Tokens generated successfully');
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
        }
        catch (error) {
            console.error('❌ Auth registration failed:', error);
            throw error;
        }
    }
    async login(loginData) {
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, loginData.email)).limit(1);
        if (!user.length) {
            throw new errorHandler_1.AuthenticationError('Invalid email or password');
        }
        const foundUser = user[0];
        if (!foundUser.isActive) {
            throw new errorHandler_1.AuthenticationError('Account is deactivated');
        }
        const isPasswordValid = await auth_1.AuthUtils.comparePassword(loginData.password, foundUser.passwordHash);
        if (!isPasswordValid) {
            throw new errorHandler_1.AuthenticationError('Invalid email or password');
        }
        const { passwordHash, ...userWithoutPassword } = foundUser;
        const accessToken = auth_1.AuthUtils.generateAccessToken(userWithoutPassword);
        const refreshToken = auth_1.AuthUtils.generateRefreshToken(userWithoutPassword);
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
    async refreshToken(refreshToken) {
        const payload = auth_1.AuthUtils.verifyRefreshToken(refreshToken);
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(payload.userId))).limit(1);
        if (!user.length || !user[0].isActive) {
            throw new errorHandler_1.AuthenticationError('Invalid refresh token');
        }
        const { passwordHash, ...userWithoutPassword } = user[0];
        const newAccessToken = auth_1.AuthUtils.generateAccessToken(userWithoutPassword);
        const newRefreshToken = auth_1.AuthUtils.generateRefreshToken(userWithoutPassword);
        return {
            success: true,
            data: {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            },
            message: 'Token refreshed successfully',
        };
    }
    async logout(refreshToken) {
        try {
            auth_1.AuthUtils.verifyRefreshToken(refreshToken);
        }
        catch (error) {
        }
    }
    async getProfile(userId) {
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(userId))).limit(1);
        if (!user.length) {
            throw new errorHandler_1.NotFoundError('User not found');
        }
        const { passwordHash, ...userWithoutPassword } = user[0];
        return {
            success: true,
            data: userWithoutPassword,
            message: 'Profile retrieved successfully',
        };
    }
    async updateProfile(userId, updateData) {
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(userId))).limit(1);
        if (!user.length) {
            throw new errorHandler_1.NotFoundError('User not found');
        }
        const { passwordHash, email, role, isActive, emailVerified, ...allowedUpdates } = updateData;
        await database_1.db
            .update(schema_1.users)
            .set({ ...allowedUpdates, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(userId)));
        const [updatedUser] = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(userId))).limit(1);
        if (!updatedUser) {
            throw new errorHandler_1.NotFoundError('Failed to retrieve updated user');
        }
        const { passwordHash: _, ...userWithoutPassword } = updatedUser;
        return {
            success: true,
            data: userWithoutPassword,
            message: 'Profile updated successfully',
        };
    }
    async forgotPassword(email) {
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).limit(1);
        if (!user.length || !user[0].isActive) {
            return;
        }
        const resetToken = auth_1.AuthUtils.generateRandomToken(32);
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
        await this.emailService.sendPasswordResetEmail(email, resetToken);
    }
    async resetPassword(token, newPassword) {
        const passwordHash = await auth_1.AuthUtils.hashPassword(newPassword);
        throw new Error('Password reset functionality needs to be implemented with proper token storage');
    }
    async verifyEmail(token) {
        throw new Error('Email verification functionality needs to be implemented with proper token storage');
    }
    async resendVerification(email) {
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).limit(1);
        if (!user.length || !user[0].isActive || user[0].emailVerified) {
            return;
        }
        await this.sendVerificationEmail(user[0]);
    }
    async sendVerificationEmail(user) {
        const verificationToken = auth_1.AuthUtils.generateRandomToken(32);
        await this.emailService.sendVerificationEmail(user.email, verificationToken);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map