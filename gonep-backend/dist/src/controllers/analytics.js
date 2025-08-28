"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const validation_1 = require("../utils/validation");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class AnalyticsController {
}
exports.AnalyticsController = AnalyticsController;
_a = AnalyticsController;
AnalyticsController.trackEvent = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const validatedData = validation_1.ValidationUtils.validate(validation_1.ValidationUtils.analyticsEvent, req.body);
    const event = await database_1.db
        .insert(schema_1.analytics)
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
AnalyticsController.getDashboardData = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { startDate, endDate } = req.query;
    const events = await database_1.db
        .select()
        .from(schema_1.analytics)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.analytics.createdAt))
        .limit(100);
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
//# sourceMappingURL=analytics.js.map