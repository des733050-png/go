"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnersController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class PartnersController {
}
exports.PartnersController = PartnersController;
_a = PartnersController;
PartnersController.getAllPartners = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const allPartners = await database_1.db
        .select()
        .from(schema_1.partners)
        .where((0, drizzle_orm_1.eq)(schema_1.partners.isActive, true))
        .orderBy(schema_1.partners.orderIndex);
    res.json({
        success: true,
        data: { partners: allPartners }
    });
});
//# sourceMappingURL=partners.js.map