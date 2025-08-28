"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_1 = require("../controllers/video");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', video_1.VideoController.getAllVideos);
router.get('/admin', auth_1.authenticateToken, auth_1.requireAdmin, video_1.VideoController.getAllVideosAdmin);
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, video_1.VideoController.createVideo);
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, video_1.VideoController.updateVideo);
router.get('/placement/:placement', video_1.VideoController.getVideosByPlacement);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, video_1.VideoController.deleteVideo);
exports.default = router;
//# sourceMappingURL=video.js.map