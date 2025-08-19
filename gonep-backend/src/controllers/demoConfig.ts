import { Request, Response } from 'express';
import { db } from '../config/database';
import { demoInterests, demoTypes, calendarAvailability } from '../database/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

// Get all available interests
export const getInterests = async (req: Request, res: Response) => {
  try {
    const allInterests = await db.select().from(demoInterests).where(eq(demoInterests.isActive, true));
    
    return res.json({
      success: true,
      data: allInterests,
      message: 'Interests retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting interests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve interests'
    });
  }
};

// Get all demo types
export const getDemoTypes = async (req: Request, res: Response) => {
  try {
    const allDemoTypes = await db.select().from(demoTypes).where(eq(demoTypes.isActive, true));
    
    res.json({
      success: true,
      data: allDemoTypes,
      message: 'Demo types retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting demo types:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve demo types'
    });
  }
};

// Get available calendar dates
export const getAvailableDates = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const availableDates = await db
      .select()
      .from(calendarAvailability)
      .where(
        and(
          eq(calendarAvailability.isAvailable, true),
          gte(calendarAvailability.date, today.toISOString().split('T')[0])
        )
      )
      .orderBy(calendarAvailability.date);
    
    res.json({
      success: true,
      data: availableDates,
      message: 'Available dates retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting available dates:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve available dates'
    });
  }
};

// Check specific date availability
export const checkDateAvailability = async (req: Request, res: Response) => {
  try {
    const { date } = req.body;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const availability = await db
      .select()
      .from(calendarAvailability)
      .where(eq(calendarAvailability.date, date))
      .limit(1);

    if (availability.length === 0) {
      return res.json({
        success: true,
        data: { isAvailable: false, reason: 'Date not configured' },
        message: 'Date availability checked'
      });
    }

    const dateInfo = availability[0];
    
    return res.json({
      success: true,
      data: {
        isAvailable: dateInfo.isAvailable,
        maxBookings: dateInfo.maxBookings,
        currentBookings: dateInfo.currentBookings,
        reason: dateInfo.reason || null
      },
      message: 'Date availability checked successfully'
    });
  } catch (error) {
    console.error('Error checking date availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check date availability'
    });
  }
};

// Admin: Add new interest
export const addInterest = async (req: Request, res: Response) => {
  try {
    const { name, description, category } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Interest name is required'
      });
    }

    const newInterest = await db.insert(demoInterests).values({
      name,
      description: description || null,
      category: category || 'general',
      isActive: true
    });

    return res.status(201).json({
      success: true,
      data: { id: (newInterest as any).insertId },
      message: 'Interest added successfully'
    });
  } catch (error) {
    console.error('Error adding interest:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add interest'
    });
  }
};

// Admin: Update interest
export const updateInterest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, isActive } = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Interest ID is required'
      });
    }

    await db
      .update(demoInterests)
      .set({
        name: name || undefined,
        description: description !== undefined ? description : undefined,
        category: category || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        updatedAt: new Date()
      })
      .where(eq(demoInterests.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Interest updated successfully'
    });
  } catch (error) {
    console.error('Error updating interest:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update interest'
    });
  }
};

// Admin: Delete interest
export const deleteInterest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Interest ID is required'
      });
    }

    await db
      .update(demoInterests)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(demoInterests.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Interest deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting interest:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete interest'
    });
  }
};

// Admin: Add new demo type
export const addDemoType = async (req: Request, res: Response) => {
  try {
    const { name, duration, description, maxAttendees, isActive } = req.body;
    
    if (!name || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Demo type name and duration are required'
      });
    }

    const newDemoType = await db.insert(demoTypes).values({
      name,
      duration,
      description: description || null,
      maxAttendees: maxAttendees || null,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      success: true,
      data: { id: (newDemoType as any).insertId },
      message: 'Demo type added successfully'
    });
  } catch (error) {
    console.error('Error adding demo type:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add demo type'
    });
  }
};

// Admin: Update demo type
export const updateDemoType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, duration, description, maxAttendees, isActive } = req.body;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Demo type ID is required'
      });
    }

    await db
      .update(demoTypes)
      .set({
        name: name || undefined,
        duration: duration || undefined,
        description: description !== undefined ? description : undefined,
        maxAttendees: maxAttendees !== undefined ? maxAttendees : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
        updatedAt: new Date()
      })
      .where(eq(demoTypes.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Demo type updated successfully'
    });
  } catch (error) {
    console.error('Error updating demo type:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update demo type'
    });
  }
};

// Admin: Delete demo type
export const deleteDemoType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Demo type ID is required'
      });
    }

    await db
      .update(demoTypes)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(demoTypes.id, parseInt(id)));

    res.json({
      success: true,
      message: 'Demo type deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting demo type:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete demo type'
    });
  }
};

// Admin: Set calendar availability
export const setCalendarAvailability = async (req: Request, res: Response) => {
  try {
    const { date, isAvailable, maxBookings, reason } = req.body;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    // Check if date already exists
    const existingDate = await db
      .select()
      .from(calendarAvailability)
      .where(eq(calendarAvailability.date, date))
      .limit(1);

    if (existingDate.length > 0) {
      // Update existing date
      await db
        .update(calendarAvailability)
        .set({
          isAvailable: isAvailable !== undefined ? isAvailable : existingDate[0].isAvailable,
          maxBookings: maxBookings !== undefined ? maxBookings : existingDate[0].maxBookings,
          reason: reason !== undefined ? reason : existingDate[0].reason,
          updatedAt: new Date()
        })
        .where(eq(calendarAvailability.date, date));
    } else {
      // Create new date
      await db.insert(calendarAvailability).values({
        date,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
        maxBookings: maxBookings || 5,
        reason: reason || null
      });
    }

    res.json({
      success: true,
      message: 'Calendar availability updated successfully'
    });
  } catch (error) {
    console.error('Error setting calendar availability:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set calendar availability'
    });
  }
};

// Admin: Get calendar availability for date range
export const getCalendarAvailabilityRange = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const availability = await db
      .select()
      .from(calendarAvailability)
      .where(
        and(
          gte(calendarAvailability.date, startDate as string),
          lte(calendarAvailability.date, endDate as string)
        )
      )
      .orderBy(calendarAvailability.date);

    res.json({
      success: true,
      data: availability,
      message: 'Calendar availability retrieved successfully'
    });
  } catch (error) {
    console.error('Error getting calendar availability range:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve calendar availability'
    });
  }
};
