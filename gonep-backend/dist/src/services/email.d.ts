export declare class EmailService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendPasswordResetEmail(email: string, token: string): Promise<void>;
    sendDemoRequestConfirmation(email: string, demoData: any): Promise<void>;
    sendContactInquiryConfirmation(email: string, inquiryData: any): Promise<void>;
    sendNewsletterConfirmation(email: string, firstName?: string): Promise<void>;
    private sendEmail;
    verifyConnection(): Promise<boolean>;
}
//# sourceMappingURL=email.d.ts.map