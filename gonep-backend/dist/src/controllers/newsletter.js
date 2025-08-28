"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class NewsletterController {
}
exports.NewsletterController = NewsletterController;
_a = NewsletterController;
NewsletterController.subscribe = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email, firstName, lastName } = req.body;
    const existing = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.email, email))
        .limit(1);
    if (existing.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Email is already subscribed to the newsletter'
        });
    }
    const subscriber = await database_1.db
        .insert(schema_1.newsletterSubscribers)
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
NewsletterController.unsubscribe = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { email } = req.body;
    const updatedSubscriber = await database_1.db
        .update(schema_1.newsletterSubscribers)
        .set({
        isActive: false,
        unsubscribedAt: new Date()
    })
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.email, email));
    const checkExisting = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.email, email))
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
NewsletterController.getSubscribers = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, active } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = undefined;
    if (active !== undefined) {
        whereClause = (0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.isActive, active === 'true');
    }
    const subscribers = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.newsletterSubscribers.createdAt))
        .limit(Number(limit))
        .offset(offset);
    res.json({
        success: true,
        data: { subscribers }
    });
});
NewsletterController.updateSubscriber = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { email, firstName, lastName, isActive } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Subscriber ID is required'
        });
    }
    const existing = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.id, parseInt(id)))
        .limit(1);
    if (existing.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Subscriber not found'
        });
    }
    await database_1.db
        .update(schema_1.newsletterSubscribers)
        .set({
        email,
        firstName,
        lastName,
        isActive
    })
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.id, parseInt(id)));
    const updated = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.id, parseInt(id)))
        .limit(1);
    res.json({
        success: true,
        data: updated[0],
        message: 'Subscriber updated successfully'
    });
});
NewsletterController.deleteSubscriber = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Subscriber ID is required'
        });
    }
    const existing = await database_1.db
        .select()
        .from(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.id, parseInt(id)))
        .limit(1);
    if (existing.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'Subscriber not found'
        });
    }
    await database_1.db
        .delete(schema_1.newsletterSubscribers)
        .where((0, drizzle_orm_1.eq)(schema_1.newsletterSubscribers.id, parseInt(id)));
    res.json({
        success: true,
        message: 'Subscriber deleted successfully'
    });
});
//# sourceMappingURL=newsletter.js.map