import { UserRegistration, UserLogin, AuthResponse, User, ApiResponse } from '../types';
export declare class AuthController {
    private emailService;
    constructor();
    register(userData: UserRegistration & {
        name?: string;
    }): Promise<ApiResponse<AuthResponse>>;
    login(loginData: UserLogin): Promise<ApiResponse<AuthResponse>>;
    refreshToken(refreshToken: string): Promise<ApiResponse<{
        accessToken: string;
        refreshToken: string;
    }>>;
    logout(refreshToken: string): Promise<void>;
    getProfile(userId: string): Promise<ApiResponse<Omit<User, 'passwordHash'>>>;
    updateProfile(userId: string, updateData: Partial<User>): Promise<ApiResponse<Omit<User, 'passwordHash'>>>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    verifyEmail(token: string): Promise<void>;
    resendVerification(email: string): Promise<void>;
    private sendVerificationEmail;
}
//# sourceMappingURL=auth.d.ts.map