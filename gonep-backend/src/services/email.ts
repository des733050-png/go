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
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
              .gonep-email-button { background-color: #010097 !important; color: #E8F1F2 !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  Your partner in smarter, more accessible healthcare.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 22px; font-weight: 700;">
                  Verify your email address
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 15px;">
                  Thank you for registering with <strong style="color: #010097;">GONEP</strong>. 
                  Confirm your email to activate your account and access your personalized healthcare tools.
                </p>

                <div style="text-align: center; margin: 24px 0;">
                  <a
                    href="${verificationUrl}"
                    class="gonep-email-button"
                    style="
                      background-color: #010097;
                      color: #E8F1F2;
                      padding: 12px 28px;
                      text-decoration: none;
                      border-radius: 999px;
                      display: inline-block;
                      font-weight: 600;
                      font-size: 15px;
                      letter-spacing: 0.02em;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 8px 0; font-size: 13px;">
                  If the button doesn’t work, paste this secure link into your browser:
                </p>
                <p style="color: #007EFF; word-break: break-all; margin: 0 0 16px 0; font-size: 13px;" class="gonep-email-link">
                  ${verificationUrl}
                </p>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 13px;">
                  This verification link will expire in 24 hours. If you didn’t create an account with GONEP,
                  you can safely ignore this email.
                </p>
              </div>

              <div style="padding: 0 24px 20px 24px;">
                <div style="margin-top: 12px; padding: 12px 16px; background-color: #F5F6FA; border-radius: 10px; border: 1px solid #D1D5DB;">
                  <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #1D1D1D; font-weight: 600;">
                    Clinic at Hand – by GONEP
                  </h3>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <img 
                      src="${config.CORS_ORIGIN}/clinic-at-hand-device.jpg"
                      alt="GONEP Clinic at Hand portable diagnostic device"
                      style="width: 96px; height: 72px; object-fit: cover; border-radius: 8px; border: 1px solid #D1D5DB;"
                    />
                    <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #6B7280;">
                      Discover our 3-in-1 portable diagnostic device for blood analysis, urinalysis, 
                      and vital signs—built for clinics, outreach programs, and mobile care.
                    </p>
                  </div>
                </div>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 6px 0;">
                  <strong style="color: #1D1D1D;">Contact GONEP</strong><br/>
                  Email: <a href="mailto:info@gonepharm.com" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">info@gonepharm.com</a><br/>
                  Phone: <a href="tel:+254707231654" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">+254 707 231 654</a><br/>
                  2nd Floor, Chandaria Innovation Centre Building, Kenya
                </p>
                <p style="color: #9CA3AF; font-size: 11px; margin: 6px 0 0 0;">
                  © ${new Date().getFullYear()} GONEP. All rights reserved. This email was sent to ${email}.
                </p>
              </div>
            </div>
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
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
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
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
              .gonep-email-button { background-color: #010097 !important; color: #E8F1F2 !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  Secure access to your healthcare tools.
                </p>
              </div>

              <div style="padding: 24px 24px 16px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 22px; font-weight: 700;">
                  Reset your password
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 15px;">
                  We received a request to reset the password for your <strong style="color: #010097;">GONEP</strong> account.
                  Click the button below to create a new password safely.
                </p>

                <div style="text-align: center; margin: 24px 0;">
                  <a
                    href="${resetUrl}"
                    class="gonep-email-button"
                    style="
                      background-color: #010097;
                      color: #E8F1F2;
                      padding: 12px 28px;
                      text-decoration: none;
                      border-radius: 999px;
                      display: inline-block;
                      font-weight: 600;
                      font-size: 15px;
                      letter-spacing: 0.02em;
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 8px 0; font-size: 13px;">
                  If the button doesn’t work, paste this secure link into your browser:
                </p>
                <p style="color: #007EFF; word-break: break-all; margin: 0 0 16px 0; font-size: 13px;" class="gonep-email-link">
                  ${resetUrl}
                </p>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 8px 0; font-size: 13px;">
                  This password reset link will expire in 1 hour. If you didn’t request this, you can safely ignore this email.
                </p>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 6px 0;">
                  <strong style="color: #1D1D1D;">Contact GONEP</strong><br/>
                  Email: <a href="mailto:info@gonepharm.com" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">info@gonepharm.com</a><br/>
                  Phone: <a href="tel:+254707231654" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">+254 707 231 654</a><br/>
                  2nd Floor, Chandaria Innovation Centre Building, Kenya
                </p>
                <p style="color: #9CA3AF; font-size: 11px; margin: 6px 0 0 0;">
                  © ${new Date().getFullYear()} GONEP. All rights reserved. This email was sent to ${email}.
                </p>
              </div>
            </div>
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
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
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
   * Send admin notification for demo request
   */
  async sendDemoRequestAdminNotification(demoData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    title: string;
    organizationType: string;
    country: string;
    interests?: string[];
    message?: string;
    demoType: string;
    preferredDate?: Date | string | null;
    attendeeCount?: string | null;
  }): Promise<void> {
    if (!config.ADMIN_NOTIFICATION_EMAILS || config.ADMIN_NOTIFICATION_EMAILS.length === 0) {
      console.warn('ADMIN_NOTIFICATION_EMAILS not configured, skipping admin notification');
      return;
    }

    const adminUrl = config.ADMIN_URL ? (config.ADMIN_URL.startsWith('http') ? config.ADMIN_URL : `https://${config.ADMIN_URL}`) : '#';
    const fullName = `${demoData.firstName} ${demoData.lastName}`;
    const preferredDateStr = demoData.preferredDate 
      ? new Date(demoData.preferredDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : 'Not specified';
    const interestsStr = demoData.interests && demoData.interests.length > 0 
      ? demoData.interests.join(', ') 
      : 'None specified';

    const template: EmailTemplate = {
      subject: `New Demo Request - ${fullName} from ${demoData.organization}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
              .gonep-email-button { background-color: #010097 !important; color: #E8F1F2 !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  New demo request for Clinic at Hand.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">
                  New demo request received
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 14px;">
                  A new demo request has been submitted. Review the details below and manage the request in the admin panel.
                </p>

                <div style="background: #FFFFFF; padding: 18px 18px 16px 18px; border-radius: 10px; margin: 12px 0 16px 0; border-left: 4px solid #010097;">
                  <h3 style="color: #1D1D1D; margin: 0 0 8px 0; font-size: 15px; font-weight: 600;">Contact information</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Name:</strong> ${fullName}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;">
                    <strong>Email:</strong> 
                    <a href="mailto:${demoData.email}" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">${demoData.email}</a>
                  </p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Phone:</strong> ${demoData.phone}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Title:</strong> ${demoData.title}</p>

                  <h3 style="color: #1D1D1D; margin: 14px 0 8px 0; font-size: 15px; font-weight: 600;">Organization details</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Organization:</strong> ${demoData.organization}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Type:</strong> ${demoData.organizationType}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Country:</strong> ${demoData.country}</p>

                  <h3 style="color: #1D1D1D; margin: 14px 0 8px 0; font-size: 15px; font-weight: 600;">Demo details</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Demo type:</strong> ${demoData.demoType}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Preferred date:</strong> ${preferredDateStr}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Attendee count:</strong> ${demoData.attendeeCount || 'Not specified'}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Interests:</strong> ${interestsStr}</p>
                  ${demoData.message ? `<p style="margin: 8px 0 0 0; font-size: 13px; color: #6B7280;"><strong>Message:</strong><br/><span style="font-style: italic;">${demoData.message}</span></p>` : ''}

                  <p style="margin: 12px 0 0 0; font-size: 12px; color: #6B7280;">
                    <strong>Submitted at:</strong> ${new Date().toLocaleString()}
                  </p>
                </div>

                <div style="display: flex; align-items: center; gap: 12px; margin: 12px 0 20px 0;">
                  <img 
                    src="${config.CORS_ORIGIN}/clinic-at-hand-device.jpg"
                    alt="Clinic at Hand demo device"
                    style="width: 96px; height: 72px; object-fit: cover; border-radius: 8px; border: 1px solid #D1D5DB;"
                  />
                  <p style="margin: 0; font-size: 13px; color: #6B7280; line-height: 1.5;">
                    Clinic at Hand brings lab-grade diagnostics to the point of care—ideal for clinics, outreach, and 
                    mobile health programs. This demo request is a strong opportunity for impact.
                  </p>
                </div>

                <div style="text-align: center; margin: 12px 0 16px 0;">
                  <a
                    href="${adminUrl}"
                    class="gonep-email-button"
                    style="
                      background-color: #010097;
                      color: #E8F1F2;
                      padding: 12px 28px;
                      text-decoration: none;
                      border-radius: 999px;
                      display: inline-block;
                      font-weight: 600;
                      font-size: 15px;
                      letter-spacing: 0.02em;
                    "
                  >
                    View in admin panel
                  </a>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 8px 0; font-size: 13px;">
                  Use the admin panel to assign an owner, schedule the session, and track follow-up.
                </p>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #9CA3AF; font-size: 11px; margin: 0;">
                  © ${new Date().getFullYear()} GONEP. Internal notification — do not forward outside your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
        New Demo Request Received - GONEP
        
        A new demo request has been submitted. Review the details below and manage the request in the admin panel.
        
        Contact Information:
        - Name: ${fullName}
        - Email: ${demoData.email}
        - Phone: ${demoData.phone}
        - Title: ${demoData.title}
        
        Organization Details:
        - Organization: ${demoData.organization}
        - Type: ${demoData.organizationType}
        - Country: ${demoData.country}
        
        Demo Details:
        - Demo Type: ${demoData.demoType}
        - Preferred Date: ${preferredDateStr}
        - Attendee Count: ${demoData.attendeeCount || 'Not specified'}
        - Interests: ${interestsStr}
        ${demoData.message ? `- Message: ${demoData.message}` : ''}
        
        Submitted At: ${new Date().toLocaleString()}
        
        View in Admin Panel: ${adminUrl}
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
      `
    };

    // Send to all notification email addresses
    const recipients = config.ADMIN_NOTIFICATION_EMAILS.join(', ');
    await this.sendEmail({
      to: recipients,
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
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
              .gonep-email-button { background-color: #010097 !important; color: #E8F1F2 !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  Thank you for your interest in Clinic at Hand.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 22px; font-weight: 700;">
                  We’ve received your demo request
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 15px;">
                  Thank you for your interest in <strong style="color: #010097;">GONEP’s Clinic at Hand</strong> device.
                  Our team will contact you within 24 hours to schedule your demonstration and answer any questions.
                </p>

                <div style="display: flex; gap: 14px; align-items: center; margin: 8px 0 18px 0;">
                  <img 
                    src="${config.CORS_ORIGIN}/clinic-at-hand-device.jpg"
                    alt="Clinic at Hand portable diagnostic device"
                    style="width: 112px; height: 84px; object-fit: cover; border-radius: 10px; border: 1px solid #D1D5DB;"
                  />
                  <p style="margin: 0; font-size: 13px; color: #6B7280; line-height: 1.5;">
                    Clinic at Hand is a 3-in-1 portable diagnostic device for blood analysis, urinalysis, and vital signs,
                    designed for clinics, outreach teams, and mobile health programs.
                  </p>
                </div>

                <div style="background: #F5F6FA; padding: 18px; border-radius: 10px; margin: 0 0 16px 0; border: 1px solid #D1D5DB;">
                  <h3 style="color: #1D1D1D; margin: 0 0 8px 0; font-size: 15px; font-weight: 600;">Your request details</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Name:</strong> ${demoData.firstName} ${demoData.lastName}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Organization:</strong> ${demoData.organization}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Demo type:</strong> ${demoData.demoType}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Interests:</strong> ${demoData.interests.join(', ')}</p>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 13px;">
                  In the meantime, you can explore more about Clinic at Hand and other GONEP solutions on our website.
                </p>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 6px 0;">
                  <strong style="color: #1D1D1D;">Contact GONEP</strong><br/>
                  Email: <a href="mailto:info@gonepharm.com" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">info@gonepharm.com</a><br/>
                  Phone: <a href="tel:+254707231654" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">+254 707 231 654</a><br/>
                  2nd Floor, Chandaria Innovation Centre Building, Kenya
                </p>
                <p style="color: #9CA3AF; font-size: 11px; margin: 6px 0 0 0;">
                  © ${new Date().getFullYear()} GONEP. All rights reserved. This email was sent to ${email}.
                </p>
              </div>
            </div>
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
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
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
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  We’ve received your message.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 22px; font-weight: 700;">
                  Thank you for reaching out to GONEP
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 15px;">
                  We’ve received your inquiry and our team will get back to you within 48 hours with a clear, 
                  helpful response.
                </p>

                <div style="background: #F5F6FA; padding: 18px; border-radius: 10px; margin: 0 0 16px 0; border: 1px solid #D1D5DB;">
                  <h3 style="color: #1D1D1D; margin: 0 0 8px 0; font-size: 15px; font-weight: 600;">Your inquiry</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Name:</strong> ${inquiryData.name}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Category:</strong> ${inquiryData.category}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #6B7280;"><strong>Message:</strong> ${inquiryData.message}</p>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 13px;">
                  If your question is urgent, you can also reach us directly using the contact details below.
                </p>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 6px 0;">
                  <strong style="color: #1D1D1D;">Contact GONEP</strong><br/>
                  Email: <a href="mailto:info@gonepharm.com" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">info@gonepharm.com</a><br/>
                  Phone: <a href="tel:+254707231654" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">+254 707 231 654</a><br/>
                  2nd Floor, Chandaria Innovation Centre Building, Kenya
                </p>
                <p style="color: #9CA3AF; font-size: 11px; margin: 6px 0 0 0;">
                  © ${new Date().getFullYear()} GONEP. All rights reserved. This email was sent to ${email}.
                </p>
              </div>
            </div>
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
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
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
   * Send admin notification for newsletter subscription
   */
  async sendNewsletterAdminNotification(subscriberData: { email: string; firstName?: string; lastName?: string }): Promise<void> {
    if (!config.ADMIN_NOTIFICATION_EMAILS || config.ADMIN_NOTIFICATION_EMAILS.length === 0) {
      console.warn('ADMIN_NOTIFICATION_EMAILS not configured, skipping admin notification');
      return;
    }

    const adminUrl = config.ADMIN_URL ? (config.ADMIN_URL.startsWith('http') ? config.ADMIN_URL : `https://${config.ADMIN_URL}`) : '#';
    const subscriberName = subscriberData.firstName || subscriberData.lastName 
      ? `${subscriberData.firstName || ''} ${subscriberData.lastName || ''}`.trim() 
      : 'N/A';

    const template: EmailTemplate = {
      subject: 'New Newsletter Subscription - GONEP',
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
              .gonep-email-button { background-color: #010097 !important; color: #E8F1F2 !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  New newsletter subscription.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">
                  A new subscriber joined GONEP updates
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 14px;">
                  Someone has subscribed to receive news and insights from GONEP. Review the details below and manage
                  this subscription in the admin panel.
                </p>

                <div style="background: #F5F6FA; padding: 18px; border-radius: 10px; margin: 0 0 16px 0; border: 1px solid #D1D5DB;">
                  <h3 style="color: #1D1D1D; margin: 0 0 8px 0; font-size: 15px; font-weight: 600;">Subscriber details</h3>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Name:</strong> ${subscriberName}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #1D1D1D;"><strong>Email:</strong> ${subscriberData.email}</p>
                  <p style="margin: 6px 0; font-size: 13px; color: #6B7280;"><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
                </div>

                <div style="text-align: center; margin: 12px 0 16px 0;">
                  <a
                    href="${adminUrl}"
                    class="gonep-email-button"
                    style="
                      background-color: #010097;
                      color: #E8F1F2;
                      padding: 12px 28px;
                      text-decoration: none;
                      border-radius: 999px;
                      display: inline-block;
                      font-weight: 600;
                      font-size: 15px;
                      letter-spacing: 0.02em;
                    "
                  >
                    View in admin panel
                  </a>
                </div>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #9CA3AF; font-size: 11px; margin: 0;">
                  © ${new Date().getFullYear()} GONEP. Internal notification — do not forward outside your organization.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
        New Newsletter Subscription - GONEP
        
        A new user has subscribed to the GONEP newsletter.
        
        Subscriber Details:
        - Name: ${subscriberName}
        - Email: ${subscriberData.email}
        - Subscribed At: ${new Date().toLocaleString()}
        
        View in Admin Panel: ${adminUrl}
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
      `
    };

    // Send to all notification email addresses
    const recipients = config.ADMIN_NOTIFICATION_EMAILS.join(', ');
    await this.sendEmail({
      to: recipients,
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
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #E8F1F2; padding: 24px;">
          <style>
            @media (prefers-color-scheme: dark) {
              .gonep-email-wrapper { background-color: #1D1D1D !important; }
              .gonep-email-card { background-color: #1D1D1D !important; color: #E8F1F2 !important; }
              .gonep-email-header { background-color: #010097 !important; }
              .gonep-email-footer { background-color: #1D1D1D !important; color: #9CA3AF !important; }
              .gonep-email-link { color: #007EFF !important; }
            }
          </style>
          <div class="gonep-email-wrapper" style="background-color: #E8F1F2; padding: 8px;">
            <div class="gonep-email-card" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D1D5DB;">
              <div class="gonep-email-header" style="background-color: #010097; padding: 20px 24px; text-align: center;">
                <img 
                  src="${config.CORS_ORIGIN}/GONEP Logo.png" 
                  alt="GONEP logo" 
                  style="height: 40px; margin-bottom: 8px;"
                />
                <h1 style="color: #E8F1F2; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;">
                  GONEP
                </h1>
                <p style="color: #E8F1F2; margin: 4px 0 0 0; font-size: 13px;">
                  You’re now subscribed to GONEP insights.
                </p>
              </div>

              <div style="padding: 24px 24px 8px 24px;">
                <h2 style="color: #1D1D1D; margin: 0 0 12px 0; font-size: 22px; font-weight: 700;">
                  Welcome to the GONEP newsletter!
                </h2>
                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 15px;">
                  ${firstName ? `Hi ${firstName},` : 'Hi there,'} thank you for subscribing. 
                  You’ll now receive curated updates on our healthcare innovations, Clinic at Hand, and 
                  practical stories from the field.
                </p>

                <div style="display: flex; gap: 14px; align-items: center; margin: 8px 0 18px 0;">
                  <img 
                    src="${config.CORS_ORIGIN}/clinic-at-hand-device.jpg"
                    alt="Clinic at Hand portable diagnostic device"
                    style="width: 112px; height: 84px; object-fit: cover; border-radius: 10px; border: 1px solid #D1D5DB;"
                  />
                  <p style="margin: 0; font-size: 13px; color: #6B7280; line-height: 1.5;">
                    Expect real-world use cases, product tips, and new features that make Clinic at Hand and other GONEP
                    solutions even more valuable in everyday care.
                  </p>
                </div>

                <p style="color: #6B7280; line-height: 1.6; margin: 0 0 16px 0; font-size: 13px;">
                  You can unsubscribe at any time using the link at the bottom of our emails—no hard feelings.
                </p>
              </div>

              <div class="gonep-email-footer" style="padding: 16px 24px 20px 24px; background-color: #E8F1F2; border-top: 1px solid #D1D5DB; text-align: left;">
                <p style="color: #6B7280; font-size: 12px; margin: 0 0 6px 0;">
                  <strong style="color: #1D1D1D;">Contact GONEP</strong><br/>
                  Email: <a href="mailto:info@gonepharm.com" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">info@gonepharm.com</a><br/>
                  Phone: <a href="tel:+254707231654" class="gonep-email-link" style="color: #007EFF; text-decoration: none;">+254 707 231 654</a><br/>
                  2nd Floor, Chandaria Innovation Centre Building, Kenya
                </p>
                <p style="color: #9CA3AF; font-size: 11px; margin: 6px 0 0 0;">
                  © ${new Date().getFullYear()} GONEP. All rights reserved. This email was sent to ${email}.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      text: `
        Welcome to GONEP Newsletter!
        
        ${firstName ? `Hi ${firstName},` : 'Hi there,'} thank you for subscribing to our newsletter! 
        You'll now receive the latest updates about our healthcare technology innovations, 
        industry insights, and company news.
        
        You can unsubscribe at any time by clicking the unsubscribe link at the bottom of our emails.
        
        © ${new Date().getFullYear()} GONEP. All rights reserved.
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
