"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const careers_1 = require("../controllers/careers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/jobs', careers_1.CareersController.getAllJobs);
router.get('/jobs/admin', auth_1.authenticateToken, auth_1.requireAdmin, careers_1.CareersController.getAllJobsAdmin);
router.get('/jobs/:slug', careers_1.CareersController.getJobBySlug);
router.post('/jobs', auth_1.authenticateToken, auth_1.requireAdmin, careers_1.CareersController.createJob);
router.put('/jobs/:id', auth_1.authenticateToken, auth_1.requireAdmin, careers_1.CareersController.updateJob);
router.delete('/jobs/:id', auth_1.authenticateToken, auth_1.requireAdmin, careers_1.CareersController.deleteJob);
router.post('/applications', careers_1.CareersController.submitApplication);
router.get('/departments/stats', careers_1.CareersController.getDepartmentStats);
exports.default = router;
//# sourceMappingURL=careers.js.map