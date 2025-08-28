"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class ContactController {
}
exports.ContactController = ContactController;
_a = ContactController;
ContactController.submitInquiry = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { name, email, category, organization, message } = req.body;
    const inquiry = await database_1.db
        .insert(schema_1.contactInquiries)
        .values({
        name,
        email,
        category,
        organization,
        message,
        status: 'new'
    });
    res.status(201).json({
        success: true,
        data: { inquiry },
        message: 'Contact inquiry submitted successfully'
    });
});
ContactController.getContactMethods = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const methods = await database_1.db
        .select()
        .from(schema_1.contactMethods)
        .where((0, drizzle_orm_1.eq)(schema_1.contactMethods.isActive, true))
        .orderBy(schema_1.contactMethods.orderIndex);
    res.json({
        success: true,
        data: { methods }
    });
});
ContactController.getAllInquiries = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    let whereClause = undefined;
    if (status) {
        whereClause = (0, drizzle_orm_1.eq)(schema_1.contactInquiries.status, String(status));
    }
    const inquiries = await database_1.db
        .select()
        .from(schema_1.contactInquiries)
        .where(whereClause)
        .orderBy((0, drizzle_orm_1.desc)(schema_1.contactInquiries.createdAt))
        .limit(Number(limit))
        .offset(offset);
    res.json({
        success: true,
        data: { inquiries }
    });
});
//# sourceMappingURL=contact.js.map