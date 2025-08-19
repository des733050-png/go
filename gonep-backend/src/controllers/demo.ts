import { Request, Response } from 'express';
import { db } from '../config/database';
import { demoRequests } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc } from 'drizzle-orm';

export class DemoController {
  // Submit demo request
  static submitRequest = asyncHandler(async (req: Request, res: Response) => {
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      organization, 
      title, 
      organizationType, 
      country, 
      demoType, 
      message 
    } = req.body;

    const demoRequest = await db
      .insert(demoRequests)
      .values({
        firstName,
        lastName,
        email,
        phone,
        organization,
        title,
        organizationType,
        country,
        demoType,
        message,
        status: 'pending'
      });

    res.status(201).json({
      success: true,
      data: { demoRequest },
      message: 'Demo request submitted successfully'
    });
  });

  // Get all demo requests (Admin)
  static getAllRequests = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = undefined;
    if (status) {
      whereClause = eq(demoRequests.status, String(status));
    }

    const requests = await db
      .select()
      .from(demoRequests)
      .where(whereClause)
      .orderBy(desc(demoRequests.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json({
      success: true,
      data: { requests }
    });
  });
}
