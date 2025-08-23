import { Request, Response } from 'express';
import { db } from '../config/database';
import { contactInquiries, contactMethods } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc } from 'drizzle-orm';

export class ContactController {
  // Submit contact inquiry
  static submitInquiry = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, category, organization, message } = req.body;
    
    const inquiry = await db
      .insert(contactInquiries)
      .values({
        name,
        email,
        category,
        organization,
        message,
        status: 'new'
      });

    res.status(201).json({
      success: true,
      data: { inquiry },
      message: 'Contact inquiry submitted successfully'
    });
  });

  // Get contact methods
  static getContactMethods = asyncHandler(async (req: Request, res: Response) => {
    const methods = await db
      .select()
      .from(contactMethods)
      .where(eq(contactMethods.isActive, true))
      .orderBy(contactMethods.orderIndex);

    res.json({
      success: true,
      data: { methods }
    });
  });

  // Get all inquiries (Admin)
  static getAllInquiries = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = undefined;
    if (status) {
      whereClause = eq(contactInquiries.status, String(status));
    }

    const inquiries = await db
      .select()
      .from(contactInquiries)
      .where(whereClause)
      .orderBy(desc(contactInquiries.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json({
      success: true,
      data: { inquiries }
    });
  });
}
