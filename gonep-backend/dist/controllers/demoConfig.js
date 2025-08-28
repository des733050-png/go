"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendarAvailabilityRange = exports.setCalendarAvailability = exports.deleteDemoType = exports.updateDemoType = exports.addDemoType = exports.deleteInterest = exports.updateInterest = exports.addInterest = exports.checkDateAvailability = exports.getAvailableDates = exports.getDemoTypes = exports.getInterests = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const getInterests = async (req, res) => {
    try {
        const allInterests = await database_1.db.select().from(schema_1.demoInterests).where((0, drizzle_orm_1.eq)(schema_1.demoInterests.isActive, true));
        return res.json({
            success: true,
            data: allInterests,
            message: 'Interests retrieved successfully'
        });
    }
    catch (error) {
        console.error('Error getting interests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve interests'
        });
    }
};
exports.getInterests = getInterests;
const getDemoTypes = async (req, res) => {
    try {
        const allDemoTypes = await database_1.db.select().from(schema_1.demoTypes).where((0, drizzle_orm_1.eq)(schema_1.demoTypes.isActive, true));
        res.json({
            success: true,
            data: allDemoTypes,
            message: 'Demo types retrieved successfully'
        });
    }
    catch (error) {
        console.error('Error getting demo types:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve demo types'
        });
    }
};
exports.getDemoTypes = getDemoTypes;
const getAvailableDates = async (req, res) => {
    try {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const existingDates = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.gte)(schema_1.calendarAvailability.date, todayStr))
            .orderBy(schema_1.calendarAvailability.date);
        const datesToGenerate = [];
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 6);
        for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            const existingDate = existingDates.find(date => date.date === dateStr);
            if (!existingDate) {
                const dayOfWeek = d.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    datesToGenerate.push({
                        date: dateStr,
                        isAvailable: true,
                        maxBookings: 5,
                        currentBookings: 0,
                        reason: null
                    });
                }
            }
        }
        if (datesToGenerate.length > 0) {
            await database_1.db.insert(schema_1.calendarAvailability).values(datesToGenerate);
        }
        const allDates = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.gte)(schema_1.calendarAvailability.date, todayStr))
            .orderBy(schema_1.calendarAvailability.date);
        res.json({
            success: true,
            data: allDates,
            message: 'Available dates retrieved successfully'
        });
    }
    catch (error) {
        console.error('Error getting available dates:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve available dates'
        });
    }
};
exports.getAvailableDates = getAvailableDates;
const checkDateAvailability = async (req, res) => {
    try {
        const { date } = req.body;
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required'
            });
        }
        const today = new Date();
        const selectedDate = new Date(date);
        if (selectedDate < today && selectedDate.toDateString() !== today.toDateString()) {
            return res.json({
                success: true,
                data: {
                    isAvailable: false,
                    reason: 'Cannot book dates in the past',
                    maxBookings: 0,
                    currentBookings: 0
                },
                message: 'Date availability checked'
            });
        }
        const availability = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.eq)(schema_1.calendarAvailability.date, date))
            .limit(1);
        if (availability.length === 0) {
            const dayOfWeek = selectedDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                const newDate = await database_1.db.insert(schema_1.calendarAvailability).values({
                    date,
                    isAvailable: true,
                    maxBookings: 5,
                    currentBookings: 0,
                    reason: null
                });
                return res.json({
                    success: true,
                    data: {
                        isAvailable: true,
                        maxBookings: 5,
                        currentBookings: 0,
                        reason: null
                    },
                    message: 'Date availability checked successfully'
                });
            }
            else {
                return res.json({
                    success: true,
                    data: {
                        isAvailable: false,
                        reason: 'Weekends are not available for demos',
                        maxBookings: 0,
                        currentBookings: 0
                    },
                    message: 'Date availability checked'
                });
            }
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
    }
    catch (error) {
        console.error('Error checking date availability:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check date availability'
        });
    }
};
exports.checkDateAvailability = checkDateAvailability;
const addInterest = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Interest name is required'
            });
        }
        const newInterest = await database_1.db.insert(schema_1.demoInterests).values({
            name,
            description: description || null,
            category: category || 'general',
            isActive: true
        });
        return res.status(201).json({
            success: true,
            data: { id: newInterest.insertId },
            message: 'Interest added successfully'
        });
    }
    catch (error) {
        console.error('Error adding interest:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add interest'
        });
    }
};
exports.addInterest = addInterest;
const updateInterest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, isActive } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Interest ID is required'
            });
        }
        await database_1.db
            .update(schema_1.demoInterests)
            .set({
            name: name || undefined,
            description: description !== undefined ? description : undefined,
            category: category || undefined,
            isActive: isActive !== undefined ? isActive : undefined,
            updatedAt: new Date()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.demoInterests.id, parseInt(id)));
        res.json({
            success: true,
            message: 'Interest updated successfully'
        });
    }
    catch (error) {
        console.error('Error updating interest:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update interest'
        });
    }
};
exports.updateInterest = updateInterest;
const deleteInterest = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Interest ID is required'
            });
        }
        await database_1.db
            .update(schema_1.demoInterests)
            .set({ isActive: false, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.demoInterests.id, parseInt(id)));
        res.json({
            success: true,
            message: 'Interest deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting interest:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete interest'
        });
    }
};
exports.deleteInterest = deleteInterest;
const addDemoType = async (req, res) => {
    try {
        const { name, duration, description, maxAttendees, isActive } = req.body;
        if (!name || !duration) {
            return res.status(400).json({
                success: false,
                message: 'Demo type name and duration are required'
            });
        }
        const newDemoType = await database_1.db.insert(schema_1.demoTypes).values({
            name,
            duration,
            description: description || null,
            maxAttendees: maxAttendees || null,
            isActive: isActive !== undefined ? isActive : true
        });
        res.status(201).json({
            success: true,
            data: { id: newDemoType.insertId },
            message: 'Demo type added successfully'
        });
    }
    catch (error) {
        console.error('Error adding demo type:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add demo type'
        });
    }
};
exports.addDemoType = addDemoType;
const updateDemoType = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration, description, maxAttendees, isActive } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Demo type ID is required'
            });
        }
        await database_1.db
            .update(schema_1.demoTypes)
            .set({
            name: name || undefined,
            duration: duration || undefined,
            description: description !== undefined ? description : undefined,
            maxAttendees: maxAttendees !== undefined ? maxAttendees : undefined,
            isActive: isActive !== undefined ? isActive : undefined,
            updatedAt: new Date()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.demoTypes.id, parseInt(id)));
        res.json({
            success: true,
            message: 'Demo type updated successfully'
        });
    }
    catch (error) {
        console.error('Error updating demo type:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update demo type'
        });
    }
};
exports.updateDemoType = updateDemoType;
const deleteDemoType = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Demo type ID is required'
            });
        }
        await database_1.db
            .update(schema_1.demoTypes)
            .set({ isActive: false, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.demoTypes.id, parseInt(id)));
        res.json({
            success: true,
            message: 'Demo type deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting demo type:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete demo type'
        });
    }
};
exports.deleteDemoType = deleteDemoType;
const setCalendarAvailability = async (req, res) => {
    try {
        const { date, isAvailable, maxBookings, reason } = req.body;
        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required'
            });
        }
        const existingDate = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.eq)(schema_1.calendarAvailability.date, date))
            .limit(1);
        if (existingDate.length > 0) {
            await database_1.db
                .update(schema_1.calendarAvailability)
                .set({
                isAvailable: isAvailable !== undefined ? isAvailable : existingDate[0].isAvailable,
                maxBookings: maxBookings !== undefined ? maxBookings : existingDate[0].maxBookings,
                reason: reason !== undefined ? reason : existingDate[0].reason,
                updatedAt: new Date()
            })
                .where((0, drizzle_orm_1.eq)(schema_1.calendarAvailability.date, date));
        }
        else {
            await database_1.db.insert(schema_1.calendarAvailability).values({
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
    }
    catch (error) {
        console.error('Error setting calendar availability:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to set calendar availability'
        });
    }
};
exports.setCalendarAvailability = setCalendarAvailability;
const getCalendarAvailabilityRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        if (!startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: 'Start date and end date are required'
            });
        }
        const availability = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.gte)(schema_1.calendarAvailability.date, startDate), (0, drizzle_orm_1.lte)(schema_1.calendarAvailability.date, endDate)))
            .orderBy(schema_1.calendarAvailability.date);
        res.json({
            success: true,
            data: availability,
            message: 'Calendar availability retrieved successfully'
        });
    }
    catch (error) {
        console.error('Error getting calendar availability range:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve calendar availability'
        });
    }
};
exports.getCalendarAvailabilityRange = getCalendarAvailabilityRange;
//# sourceMappingURL=demoConfig.js.map