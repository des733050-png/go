import { JWTPayload, User } from '../types';
export declare class AuthUtils {
    static hashPassword(password: string): Promise<string>;
    static comparePassword(password: string, hash: string): Promise<boolean>;
    static generateAccessToken(user: Omit<User, 'passwordHash'>): string;
    static generateRefreshToken(user: Omit<User, 'passwordHash'>): string;
    static verifyAccessToken(token: string): JWTPayload;
    static verifyRefreshToken(token: string): JWTPayload;
    static generateRandomToken(length?: number): string;
    static generateApiKey(): string;
    static hasRole(userRole: string, requiredRole: string): boolean;
    static hasAnyRole(userRole: string, requiredRoles: string[]): boolean;
}
//# sourceMappingURL=auth.d.ts.map