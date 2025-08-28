"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newsletter_1 = require("../controllers/newsletter");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/subscribe', newsletter_1.NewsletterController.subscribe);
router.post('/unsubscribe', newsletter_1.NewsletterController.unsubscribe);
router.get('/subscribers', auth_1.authenticateToken, auth_1.requireAdmin, newsletter_1.NewsletterController.getSubscribers);
router.put('/subscribers/:id', auth_1.authenticateToken, auth_1.requireAdmin, newsletter_1.NewsletterController.updateSubscriber);
router.delete('/subscribers/:id', auth_1.authenticateToken, auth_1.requireAdmin, newsletter_1.NewsletterController.deleteSubscriber);
exports.default = router;
//# sourceMappingURL=newsletter.js.map