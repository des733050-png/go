import { Request, Response } from 'express';
import { db } from '../config/database';
import { analytics } from '../database/schema';
import { ValidationUtils } from '../utils/validation';
import { asyncHandler } from '../middleware/errorHandler';
import { desc } from 'drizzle-orm';

export class AnalyticsController {
  // Track user interaction
  static trackEvent = asyncHandler(async (req: Request, res: Response) => {
    const validatedData = ValidationUtils.validate(ValidationUtils.analyticsEvent, req.body) as any;
    
    const event = await db
      .insert(analytics)
      .values({
        pageUrl: validatedData.pageUrl,
        userAgent: req.get('User-Agent') || '',
        ipAddress: req.ip,
        country: validatedData.country,
        city: validatedData.city,
        referrer: validatedData.referrer,
        sessionId: validatedData.sessionId,
        eventType: validatedData.eventType,
        eventData: validatedData.eventData
      });

    res.status(201).json({
      success: true,
      data: { event }
    });
  });

  // Get analytics dashboard data (Admin)
  static getDashboardData = asyncHandler(async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;
    
    // Get basic analytics data
    const events = await db
      .select()
      .from(analytics)
      .orderBy(desc(analytics.createdAt))
      .limit(100);

    // Calculate basic metrics
    const totalEvents = events.length;
    const uniqueUsers = new Set(events.map(e => e.ipAddress)).size;
    const pageViews = events.filter(e => e.eventType === 'page_view').length;

    res.json({
      success: true,
      data: {
        totalEvents,
        uniqueUsers,
        pageViews,
        recentEvents: events.slice(0, 10)
      }
    });
  });
}
