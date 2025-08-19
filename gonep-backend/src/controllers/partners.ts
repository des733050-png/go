import { Request, Response } from 'express';
import { db } from '../config/database';
import { partners } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq } from 'drizzle-orm';

export class PartnersController {
  // Get all partners
  static getAllPartners = asyncHandler(async (req: Request, res: Response) => {
    const allPartners = await db
      .select()
      .from(partners)
      .where(eq(partners.isActive, true))
      .orderBy(partners.orderIndex);

    res.json({
      success: true,
      data: { partners: allPartners }
    });
  });
}
