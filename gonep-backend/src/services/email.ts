import nodemailer from 'nodemailer';
import { config } from '../config';
import { EmailData, EmailTemplate } from '../types';

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: config.SMTP_PORT === 465,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS,
      },
    });
  }

  /**
   * Send email verification
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${config.CORS_ORIGIN}/verify-email?token=${token}`;
    
    const template: EmailTemplate = {
      subject: 'Verify Your Email - GONEP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GONEP</h1>
            <p style="color: white; margin: 10px 0 0 0;">Healthcare Technology</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email Address</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Thank you for registering with GONEP! To complete your registration and access your account, 
              please verify your email address by clicking the button below.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #667eea; word-break: break-all; margin-bottom: 25px;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              This verification link will expire in 24 hours. If you didn't create an account with GONEP, 
              you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 GONEP. All rights reserved.<br>
              This email was sent to ${email}
            </p>
          </div>
        </div>
      `,
      text: `
        Verify Your Email - GONEP
        
        Thank you for registering with GONEP! To complete your registration and access your account, 
        please verify your email address by visiting the following link:
        
        ${verificationUrl}
        
        This verification link will expire in 24 hours. If you didn't create an account with GONEP, 
        you can safely ignore this email.
        
        © 2024 GONEP. All rights reserved.
      `
    };

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const resetUrl = `${config.CORS_ORIGIN}/reset-password?token=${token}`;
    
    const template: EmailTemplate = {
      subject: 'Reset Your Password - GONEP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GONEP</h1>
            <p style="color: white; margin: 10px 0 0 0;">Healthcare Technology</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Reset Your Password</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              We received a request to reset your password for your GONEP account. 
              Click the button below to create a new password.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </p>
            
            <p style="color: #667eea; word-break: break-all; margin-bottom: 25px;">
              ${resetUrl}
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              This password reset link will expire in 1 hour. If you didn't request a password reset, 
              you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 GONEP. All rights reserved.<br>
              This email was sent to ${email}
            </p>
          </div>
        </div>
      `,
      text: `
        Reset Your Password - GONEP
        
        We received a request to reset your password for your GONEP account. 
        Click the link below to create a new password:
        
        ${resetUrl}
        
        This password reset link will expire in 1 hour. If you didn't request a password reset, 
        you can safely ignore this email.
        
        © 2024 GONEP. All rights reserved.
      `
    };

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send demo request confirmation
   */
  async sendDemoRequestConfirmation(email: string, demoData: any): Promise<void> {
    const template: EmailTemplate = {
      subject: 'Demo Request Received - GONEP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GONEP</h1>
            <p style="color: white; margin: 10px 0 0 0;">Healthcare Technology</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Demo Request Received</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Thank you for your interest in GONEP's Clinic at Hand device! We have received your demo request 
              and our team will contact you within 24 hours to schedule your demonstration.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Request Details:</h3>
              <p><strong>Name:</strong> ${demoData.firstName} ${demoData.lastName}</p>
              <p><strong>Organization:</strong> ${demoData.organization}</p>
              <p><strong>Demo Type:</strong> ${demoData.demoType}</p>
              <p><strong>Interests:</strong> ${demoData.interests.join(', ')}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              In the meantime, you can learn more about our technology by visiting our website or 
              downloading our product brochure.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 GONEP. All rights reserved.<br>
              This email was sent to ${email}
            </p>
          </div>
        </div>
      `,
      text: `
        Demo Request Received - GONEP
        
        Thank you for your interest in GONEP's Clinic at Hand device! We have received your demo request 
        and our team will contact you within 24 hours to schedule your demonstration.
        
        Request Details:
        - Name: ${demoData.firstName} ${demoData.lastName}
        - Organization: ${demoData.organization}
        - Demo Type: ${demoData.demoType}
        - Interests: ${demoData.interests.join(', ')}
        
        In the meantime, you can learn more about our technology by visiting our website.
        
        © 2024 GONEP. All rights reserved.
      `
    };

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send contact inquiry confirmation
   */
  async sendContactInquiryConfirmation(email: string, inquiryData: any): Promise<void> {
    const template: EmailTemplate = {
      subject: 'Inquiry Received - GONEP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GONEP</h1>
            <p style="color: white; margin: 10px 0 0 0;">Healthcare Technology</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Inquiry Received</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              Thank you for contacting GONEP! We have received your inquiry and our team will get back to you 
              within 48 hours.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Inquiry Details:</h3>
              <p><strong>Name:</strong> ${inquiryData.name}</p>
              <p><strong>Category:</strong> ${inquiryData.category}</p>
              <p><strong>Message:</strong> ${inquiryData.message}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              If you have any urgent questions, please don't hesitate to call us directly.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 GONEP. All rights reserved.<br>
              This email was sent to ${email}
            </p>
          </div>
        </div>
      `,
      text: `
        Inquiry Received - GONEP
        
        Thank you for contacting GONEP! We have received your inquiry and our team will get back to you 
        within 48 hours.
        
        Inquiry Details:
        - Name: ${inquiryData.name}
        - Category: ${inquiryData.category}
        - Message: ${inquiryData.message}
        
        If you have any urgent questions, please don't hesitate to call us directly.
        
        © 2024 GONEP. All rights reserved.
      `
    };

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Send newsletter subscription confirmation
   */
  async sendNewsletterConfirmation(email: string, firstName?: string): Promise<void> {
    const template: EmailTemplate = {
      subject: 'Newsletter Subscription Confirmed - GONEP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">GONEP</h1>
            <p style="color: white; margin: 10px 0 0 0;">Healthcare Technology</p>
          </div>
          
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333; margin-bottom: 20px;">Welcome to GONEP Newsletter!</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
              ${firstName ? `Hi ${firstName},` : 'Hi there,'} thank you for subscribing to our newsletter! 
              You'll now receive the latest updates about our healthcare technology innovations, 
              industry insights, and company news.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
              You can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              © 2024 GONEP. All rights reserved.<br>
              This email was sent to ${email}
            </p>
          </div>
        </div>
      `,
      text: `
        Welcome to GONEP Newsletter!
        
        ${firstName ? `Hi ${firstName},` : 'Hi there,'} thank you for subscribing to our newsletter! 
        You'll now receive the latest updates about our healthcare technology innovations, 
        industry insights, and company news.
        
        You can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.
        
        © 2024 GONEP. All rights reserved.
      `
    };

    await this.sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  }

  /**
   * Generic email sender
   */
  private async sendEmail(emailData: EmailData): Promise<void> {
    try {
      const mailOptions = {
        from: emailData.from || config.EMAIL_FROM,
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        attachments: emailData.attachments,
      };

      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Email sending failed:', error);
      // In production, you might want to log this to a service like Sentry
      // For now, we'll just throw the error
      throw new Error('Failed to send email');
    }
  }

  /**
   * Verify email configuration
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email configuration error:', error);
      return false;
    }
  }
}
