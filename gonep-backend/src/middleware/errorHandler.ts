import { Request, Response, NextFunction } from 'express';

import { ValidationError as JoiValidationError } from 'joi';
import { ErrorResponse } from '../types';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

/**
 * Custom error class for application errors
 */
export class ApplicationError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create specific error types
 */
export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends ApplicationError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

export class RateLimitError extends ApplicationError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

/**
 * Global error handler middleware
 */
export const errorHandler = (
  error: AppError | JoiValidationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let details: any = null;

  // Handle Joi validation errors
  if (error instanceof JoiValidationError) {
    statusCode = 400;
    message = 'Validation error';
    details = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
      value: detail.context?.value
    }));
  }
  // Handle custom application errors
  else if (error instanceof ApplicationError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Handle database errors
  else if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    statusCode = 400;
    message = 'Database validation error';
    details = error.message;
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  // Handle file upload errors
  else if (error.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error';
    details = error.message;
  }
  // Handle other known errors
  else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }
  else if (error.name === 'SyntaxError' && error.message.includes('JSON')) {
    statusCode = 400;
    message = 'Invalid JSON format';
  }

  // Log error in development
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

  // Send error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
    ...(details && { details })
  };

  res.status(statusCode).json(errorResponse);
};

/**
 * Async error wrapper to catch async errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 404 handler for unmatched routes
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
};

/**
 * Rate limiting error handler
 */
export const rateLimitHandler = (req: Request, res: Response): void => {
  res.status(429).json({
    success: false,
    error: 'Too many requests',
    message: 'Please try again later'
  });
};

/**
 * Security error handler
 */
export const securityErrorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
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
