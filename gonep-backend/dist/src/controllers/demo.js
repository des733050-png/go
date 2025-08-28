"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class DemoController {
}
exports.DemoController = DemoController;
_a = DemoController;
DemoController.submitRequest = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { firstName, lastName, email, phone, organization, title, organizationType, country, interests, message, demoType, preferredDate, attendeeCount } = req.body;
    if (!firstName || !lastName || !email || !phone || !organization || !title || !organizationType || !country || !demoType) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }
    if (preferredDate) {
        const dateStr = new Date(preferredDate).toISOString().split('T')[0];
        const availability = await database_1.db
            .select()
            .from(schema_1.calendarAvailability)
            .where((0, drizzle_orm_1.eq)(schema_1.calendarAvailability.date, dateStr))
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
        await database_1.db
            .update(schema_1.calendarAvailability)
            .set({
            currentBookings: availability[0].currentBookings + 1,
            updatedAt: new Date()
        })
            .where((0, drizzle_orm_1.eq)(schema_1.calendarAvailability.date, dateStr));
    }
    const demoRequest = await database_1.db
        .insert(schema_1.demoRequests)
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
DemoController.getAllRequests = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = undefined;
    if (status) {
        whereClause = (0, drizzle_orm_1.eq)(schema_1.demoRequests.status, String(status));
    }
    const requests = await database_1.db
        .select()
        .from(schema_1.demoRequests)
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.demoRequests.createdAt))
        .limit(Number(limit))
        .offset(offset);
    const totalCount = await database_1.db
        .select({ count: schema_1.demoRequests.id })
        .from(schema_1.demoRequests)
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
DemoController.getRequestById = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const request = await database_1.db
        .select()
        .from(schema_1.demoRequests)
        .where((0, drizzle_orm_1.eq)(schema_1.demoRequests.id, parseInt(id)))
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
DemoController.updateRequestStatus = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { status, notes, scheduledAt } = req.body;
    const request = await database_1.db
        .select()
        .from(schema_1.demoRequests)
        .where((0, drizzle_orm_1.eq)(schema_1.demoRequests.id, parseInt(id)))
        .limit(1);
    if (request.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Demo request not found'
        });
    }
    await database_1.db
        .update(schema_1.demoRequests)
        .set({
        status: status || request[0].status,
        notes: notes !== undefined ? notes : request[0].notes,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : request[0].scheduledAt,
        updatedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.demoRequests.id, parseInt(id)));
    res.json({
        success: true,
        message: 'Demo request updated successfully'
    });
});
DemoController.deleteRequest = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const request = await database_1.db
        .select()
        .from(schema_1.demoRequests)
        .where((0, drizzle_orm_1.eq)(schema_1.demoRequests.id, parseInt(id)))
        .limit(1);
    if (request.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Demo request not found'
        });
    }
    await database_1.db
        .delete(schema_1.demoRequests)
        .where((0, drizzle_orm_1.eq)(schema_1.demoRequests.id, parseInt(id)));
    res.json({
        success: true,
        message: 'Demo request deleted successfully'
    });
});
DemoController.getStats = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const allRequests = await database_1.db
        .select()
        .from(schema_1.demoRequests);
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
//# sourceMappingURL=demo.js.map