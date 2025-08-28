"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = require("../config");
class AuthUtils {
    static async hashPassword(password) {
        const saltRounds = 12;
        return bcryptjs_1.default.hash(password, saltRounds);
    }
    static async comparePassword(password, hash) {
        return bcryptjs_1.default.compare(password, hash);
    }
    static generateAccessToken(user) {
        if (!config_1.config.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }
        const payload = {
            userId: user.id.toString(),
            email: user.email,
            role: user.role || 'user',
        };
        return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, {
            expiresIn: config_1.config.JWT_EXPIRES_IN,
        });
    }
    static generateRefreshToken(user) {
        if (!config_1.config.REFRESH_TOKEN_SECRET) {
            throw new Error('REFRESH_TOKEN_SECRET is not configured');
        }
        const payload = {
            userId: user.id.toString(),
            email: user.email,
            role: user.role || 'user',
        };
        return jsonwebtoken_1.default.sign(payload, config_1.config.REFRESH_TOKEN_SECRET, {
            expiresIn: config_1.config.REFRESH_TOKEN_EXPIRES_IN,
        });
    }
    static verifyAccessToken(token) {
        if (!config_1.config.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured');
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid access token');
        }
    }
    static verifyRefreshToken(token) {
        if (!config_1.config.REFRESH_TOKEN_SECRET) {
            throw new Error('REFRESH_TOKEN_SECRET is not configured');
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.REFRESH_TOKEN_SECRET);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    }
    static generateRandomToken(length = 32) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    static generateApiKey() {
        return `gonep_${this.generateRandomToken(32)}`;
    }
    static hasRole(userRole, requiredRole) {
        const roleHierarchy = {
            user: 1,
            moderator: 2,
            admin: 3,
        };
        const userLevel = roleHierarchy[userRole] || 0;
        const requiredLevel = roleHierarchy[requiredRole] || 0;
        return userLevel >= requiredLevel;
    }
    static hasAnyRole(userRole, requiredRoles) {
        return requiredRoles.some(role => this.hasRole(userRole, role));
    }
}
exports.AuthUtils = AuthUtils;
//# sourceMappingURL=auth.js.map