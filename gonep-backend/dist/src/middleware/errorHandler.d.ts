import { Request, Response, NextFunction } from 'express';
import { ValidationError as JoiValidationError } from 'joi';
export interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}
export declare class ApplicationError extends Error implements AppError {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode?: number, isOperational?: boolean);
}
export declare class ValidationError extends ApplicationError {
    constructor(message: string);
}
export declare class AuthenticationError extends ApplicationError {
    constructor(message?: string);
}
export declare class AuthorizationError extends ApplicationError {
    constructor(message?: string);
}
export declare class NotFoundError extends ApplicationError {
    constructor(message?: string);
}
export declare class ConflictError extends ApplicationError {
    constructor(message?: string);
}
export declare class RateLimitError extends ApplicationError {
    constructor(message?: string);
}
export declare const errorHandler: (error: AppError | JoiValidationError | Error, req: Request, res: Response, next: NextFunction) => void;
export declare const asyncHandler: (fn: Function) => (req: Request, res: Response, next: NextFunction) => void;
export declare const notFoundHandler: (req: Request, res: Response) => void;
export declare const rateLimitHandler: (req: Request, res: Response) => void;
export declare const securityErrorHandler: (error: any, req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.d.ts.map