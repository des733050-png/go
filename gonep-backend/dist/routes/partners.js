"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const partners_1 = require("../controllers/partners");
const router = (0, express_1.Router)();
router.get('/', partners_1.PartnersController.getAllPartners);
exports.default = router;
//# sourceMappingURL=partners.js.map