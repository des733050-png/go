"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityErrorHandler = exports.rateLimitHandler = exports.notFoundHandler = exports.asyncHandler = exports.errorHandler = exports.RateLimitError = exports.ConflictError = exports.NotFoundError = exports.AuthorizationError = exports.AuthenticationError = exports.ValidationError = exports.ApplicationError = void 0;
const joi_1 = require("joi");
class ApplicationError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationError = ApplicationError;
class ValidationError extends ApplicationError {
    constructor(message) {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends ApplicationError {
    constructor(message = 'Authentication failed') {
        super(message, 401);
    }
}
exports.AuthenticationError = AuthenticationError;
class AuthorizationError extends ApplicationError {
    constructor(message = 'Access denied') {
        super(message, 403);
    }
}
exports.AuthorizationError = AuthorizationError;
class NotFoundError extends ApplicationError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ApplicationError {
    constructor(message = 'Resource conflict') {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
class RateLimitError extends ApplicationError {
    constructor(message = 'Too many requests') {
        super(message, 429);
    }
}
exports.RateLimitError = RateLimitError;
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal server error';
    let details = null;
    if (error instanceof joi_1.ValidationError) {
        statusCode = 400;
        message = 'Validation error';
        details = error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message,
            value: detail.context?.value
        }));
    }
    else if (error instanceof ApplicationError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        statusCode = 400;
        message = 'Database validation error';
        details = error.message;
    }
    else if (error.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    else if (error.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    else if (error.name === 'MulterError') {
        statusCode = 400;
        message = 'File upload error';
        details = error.message;
    }
    else if (error.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }
    else if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
        statusCode = 400;
        message = 'Invalid JSON format';
    }
    if (process.env.NODE_ENV === 'development') {
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack,
            url: req.url,
            method: req.method,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    }
    const errorResponse = {
        success: false,
        error: message,
        ...(details && { details })
    };
    res.status(statusCode).json(errorResponse);
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
};
exports.notFoundHandler = notFoundHandler;
const rateLimitHandler = (req, res) => {
    res.status(429).json({
        success: false,
        error: 'Too many requests',
        message: 'Please try again later'
    });
};
exports.rateLimitHandler = rateLimitHandler;
const securityErrorHandler = (error, req, res, next) => {
    if (error.type === 'entity.too.large') {
        res.status(413).json({
            success: false,
            error: 'Payload too large',
            message: 'Request body is too large'
        });
        return;
    }
    if (error.type === 'entity.parse.failed') {
        res.status(400).json({
            success: false,
            error: 'Invalid JSON',
            message: 'Request body contains invalid JSON'
        });
        return;
    }
    next(error);
};
exports.securityErrorHandler = securityErrorHandler;
//# sourceMappingURL=errorHandler.js.map