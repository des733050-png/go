import { Request, Response } from 'express';
import { db } from '../config/database';
import { newsletterSubscribers } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc } from 'drizzle-orm';

export class NewsletterController {
  // Subscribe to newsletter
  static subscribe = asyncHandler(async (req: Request, res: Response) => {
    const { email, firstName, lastName } = req.body;

    // Check if already subscribed
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Email is already subscribed to the newsletter'
      });
    }

    const subscriber = await db
      .insert(newsletterSubscribers)
      .values({
        email,
        firstName,
        lastName,
        isActive: true
      });

    res.status(201).json({
      success: true,
      data: { subscriber },
      message: 'Successfully subscribed to newsletter'
    });
  });

  // Unsubscribe from newsletter
  static unsubscribe = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    const updatedSubscriber = await db
      .update(newsletterSubscribers)
      .set({ 
        isActive: false,
        unsubscribedAt: new Date()
      })
      .where(eq(newsletterSubscribers.email, email));

    // Check if any rows were affected
    const checkExisting = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (checkExisting.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in newsletter subscribers'
      });
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  });

  // Get all subscribers (Admin)
  static getSubscribers = asyncHandler(async (req: Request, res: Response) => {
    const { page = 1, limit = 10, active } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = undefined;
    if (active !== undefined) {
      whereClause = eq(newsletterSubscribers.isActive, active === 'true');
    }

    const subscribers = await db
      .select()
      .from(newsletterSubscribers)
      .where(whereClause)
      .orderBy(desc(newsletterSubscribers.createdAt))
      .limit(Number(limit))
      .offset(offset);

    res.json({
      success: true,
      data: { subscribers }
    });
  });

  // Update subscriber (Admin)
  static updateSubscriber = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, firstName, lastName, isActive } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Subscriber ID is required'
      });
    }

    // Check if subscriber exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    // Update subscriber
    await db
      .update(newsletterSubscribers)
      .set({
        email,
        firstName,
        lastName,
        isActive
      })
      .where(eq(newsletterSubscribers.id, parseInt(id)));

    // Get updated subscriber
    const updated = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, parseInt(id)))
      .limit(1);

    res.json({
      success: true,
      data: updated[0],
      message: 'Subscriber updated successfully'
    });
  });

  // Delete subscriber (Admin)
  static deleteSubscriber = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Subscriber ID is required'
      });
    }

    // Check if subscriber exists
    const existing = await db
      .select()
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    // Delete subscriber
    await db
      .delete(newsletterSubscribers)
      .where(eq(newsletterSubscribers.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  });
}
