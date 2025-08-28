"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_1 = require("../controllers/analytics");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/track', analytics_1.AnalyticsController.trackEvent);
router.get('/dashboard', auth_1.authenticateToken, auth_1.requireAdmin, analytics_1.AnalyticsController.getDashboardData);
exports.default = router;
//# sourceMappingURL=analytics.js.map