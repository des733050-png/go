"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const demo_1 = require("../controllers/demo");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/request', demo_1.DemoController.submitRequest);
router.get('/requests', auth_1.authenticateToken, auth_1.requireAdmin, demo_1.DemoController.getAllRequests);
router.get('/requests/:id', auth_1.authenticateToken, auth_1.requireAdmin, demo_1.DemoController.getRequestById);
router.put('/requests/:id', auth_1.authenticateToken, auth_1.requireAdmin, demo_1.DemoController.updateRequestStatus);
router.delete('/requests/:id', auth_1.authenticateToken, auth_1.requireAdmin, demo_1.DemoController.deleteRequest);
router.get('/stats', auth_1.authenticateToken, auth_1.requireAdmin, demo_1.DemoController.getStats);
exports.default = router;
//# sourceMappingURL=demo.js.map