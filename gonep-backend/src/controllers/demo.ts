import { Request, Response } from 'express';
import { db } from '../config/database';
import { demoRequests, calendarAvailability } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq, desc, and, gte } from 'drizzle-orm';

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
      interests,
      message,
      demoType, 
      preferredDate,
      attendeeCount
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !organization || !title || !organizationType || !country || !demoType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check if preferred date is available (if provided)
    if (preferredDate) {
      const dateStr = new Date(preferredDate).toISOString().split('T')[0];
      const availability = await db
        .select()
        .from(calendarAvailability)
        .where(eq(calendarAvailability.date, dateStr))
        .limit(1);

      if (availability.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Selected date is not available for demos'
        });
      }

      if (!availability[0].isAvailable) {
        return res.status(400).json({
          success: false,
          message: 'Selected date is not available for demos'
        });
      }

      if (availability[0].currentBookings >= availability[0].maxBookings) {
        return res.status(400).json({
          success: false,
          message: 'Selected date has reached maximum bookings'
        });
      }

      // Increment current bookings
      await db
        .update(calendarAvailability)
        .set({ 
          currentBookings: availability[0].currentBookings + 1,
          updatedAt: new Date()
        })
        .where(eq(calendarAvailability.date, dateStr));
    }

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
        interests: interests || [],
        message: message || '',
        demoType,
        preferredDate: preferredDate ? new Date(preferredDate) : null,
        attendeeCount: attendeeCount || null,
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

    // Get total count for pagination
    const totalCount = await db
      .select({ count: demoRequests.id })
      .from(demoRequests)
      .where(whereClause);

    res.json({
      success: true,
      data: { 
        requests,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: totalCount.length,
          totalPages: Math.ceil(totalCount.length / Number(limit))
        }
      }
    });
  });

  // Get demo request by ID (Admin)
  static getRequestById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const request = await db
      .select()
      .from(demoRequests)
      .where(eq(demoRequests.id, parseInt(id)))
      .limit(1);

    if (request.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    res.json({
      success: true,
      data: request[0]
    });
  });

  // Update demo request status (Admin)
  static updateRequestStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, notes, scheduledAt } = req.body;

    const request = await db
      .select()
      .from(demoRequests)
      .where(eq(demoRequests.id, parseInt(id)))
      .limit(1);

    if (request.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    await db
      .update(demoRequests)
      .set({
        status: status || request[0].status,
        notes: notes !== undefined ? notes : request[0].notes,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : request[0].scheduledAt,
        updatedAt: new Date()
      })
      .where(eq(demoRequests.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Demo request updated successfully'
    });
  });

  // Delete demo request (Admin)
  static deleteRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const request = await db
      .select()
      .from(demoRequests)
      .where(eq(demoRequests.id, parseInt(id)))
      .limit(1);

    if (request.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Demo request not found'
      });
    }

    await db
      .delete(demoRequests)
      .where(eq(demoRequests.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Demo request deleted successfully'
    });
  });

  // Get demo statistics (Admin)
  static getStats = asyncHandler(async (req: Request, res: Response) => {
    const allRequests = await db
      .select()
      .from(demoRequests);

    const stats = {
      total: allRequests.length,
      pending: allRequests.filter(r => r.status === 'pending').length,
      confirmed: allRequests.filter(r => r.status === 'confirmed').length,
      completed: allRequests.filter(r => r.status === 'completed').length,
      cancelled: allRequests.filter(r => r.status === 'cancelled').length,
      virtual: allRequests.filter(r => r.demoType === 'virtual').length,
      onsite: allRequests.filter(r => r.demoType === 'onsite').length
    };

    res.json({
      success: true,
      data: stats
    });
  });
}
