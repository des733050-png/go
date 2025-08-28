"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_1 = require("../controllers/contact");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/submit', contact_1.ContactController.submitInquiry);
router.get('/methods', contact_1.ContactController.getContactMethods);
router.get('/inquiries', auth_1.authenticateToken, auth_1.requireAdmin, contact_1.ContactController.getAllInquiries);
exports.default = router;
//# sourceMappingURL=contact.js.map