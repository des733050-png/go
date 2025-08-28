"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireOwnershipOrAdmin = exports.validateRefreshToken = exports.optionalAuth = exports.requireModerator = exports.requireAdmin = exports.requireAnyRole = exports.requireRole = exports.authenticateToken = void 0;
const auth_1 = require("../utils/auth");
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const config_1 = require("../config");
const authenticateToken = async (req, res, next) => {
    try {
        console.log('🔐 authenticateToken middleware called for:', req.method, req.path);
        console.log('🔐 JWT_SECRET available:', !!config_1.config.JWT_SECRET);
        console.log('🔐 JWT_SECRET length:', config_1.config.JWT_SECRET?.length || 0);
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
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
        const payload = auth_1.AuthUtils.verifyAccessToken(token);
        console.log('✅ Token verified successfully, payload:', payload);
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(payload.userId))).limit(1);
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
    }
    catch (error) {
        console.log('❌ Token verification failed:', error.message);
        res.status(401).json({
            success: false,
            error: 'Invalid token',
            message: 'Token is invalid or expired'
        });
    }
};
exports.authenticateToken = authenticateToken;
const requireRole = (requiredRole) => {
    return (req, res, next) => {
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
        if (!auth_1.AuthUtils.hasRole(req.user.role, requiredRole)) {
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
exports.requireRole = requireRole;
const requireAnyRole = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                error: 'Authentication required',
                message: 'Please log in to access this resource'
            });
            return;
        }
        if (!auth_1.AuthUtils.hasAnyRole(req.user.role, requiredRoles)) {
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
exports.requireAnyRole = requireAnyRole;
exports.requireAdmin = (0, exports.requireRole)('admin');
exports.requireModerator = (0, exports.requireAnyRole)(['moderator', 'admin']);
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            next();
            return;
        }
        const payload = auth_1.AuthUtils.verifyAccessToken(token);
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(payload.userId))).limit(1);
        if (user.length && user[0]?.isActive) {
            const { passwordHash, ...userWithoutPassword } = user[0];
            req.user = userWithoutPassword;
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
const validateRefreshToken = async (req, res, next) => {
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
        const payload = auth_1.AuthUtils.verifyRefreshToken(refreshToken);
        const user = await database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, parseInt(payload.userId))).limit(1);
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
    }
    catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid refresh token',
            message: 'Refresh token is invalid or expired'
        });
    }
};
exports.validateRefreshToken = validateRefreshToken;
const requireOwnershipOrAdmin = (resourceUserIdField = 'userId') => {
    return (req, res, next) => {
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
        if (req.user.role === 'admin' || req.user.id === parseInt(resourceUserId)) {
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
exports.requireOwnershipOrAdmin = requireOwnershipOrAdmin;
//# sourceMappingURL=auth.js.map