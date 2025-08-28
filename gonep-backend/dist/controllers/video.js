"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
class VideoController {
    static async getAllVideos(req, res) {
        try {
            console.log('🎬 getAllVideos called');
            console.log('📊 Testing database connection...');
            const { testConnection } = await Promise.resolve().then(() => __importStar(require('../config/database')));
            const isConnected = await testConnection();
            console.log('📊 Database connected:', isConnected);
            if (!isConnected) {
                throw new Error('Database connection failed');
            }
            console.log('📊 Attempting to query demo_videos table...');
            const queryPromise = database_1.db
                .select()
                .from(schema_1.demoVideos)
                .where((0, drizzle_orm_1.eq)(schema_1.demoVideos.isActive, true))
                .orderBy((0, drizzle_orm_1.desc)(schema_1.demoVideos.sortOrder), (0, drizzle_orm_1.desc)(schema_1.demoVideos.createdAt));
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Database query timeout')), 8000);
            });
            const videos = await Promise.race([queryPromise, timeoutPromise]);
            console.log('✅ Videos query successful, count:', videos.length);
            res.json({
                success: true,
                data: { videos },
                message: 'Videos retrieved successfully'
            });
        }
        catch (error) {
            console.error('❌ Error fetching videos:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch videos',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    static async getAllVideosAdmin(req, res) {
        try {
            const videos = await database_1.db
                .select()
                .from(schema_1.demoVideos)
                .orderBy((0, drizzle_orm_1.desc)(schema_1.demoVideos.sortOrder), (0, drizzle_orm_1.desc)(schema_1.demoVideos.createdAt));
            res.json({
                success: true,
                data: { videos },
                message: 'Videos retrieved successfully'
            });
        }
        catch (error) {
            console.error('Error fetching videos:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch videos'
            });
        }
    }
    static async getVideoById(req, res) {
        try {
            const { id } = req.params;
            const videoId = parseInt(id);
            if (isNaN(videoId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid video ID'
                });
            }
            const video = await database_1.db
                .select()
                .from(schema_1.demoVideos)
                .where((0, drizzle_orm_1.eq)(schema_1.demoVideos.id, videoId))
                .limit(1);
            if (video.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Video not found'
                });
            }
            res.json({
                success: true,
                data: video[0],
                message: 'Video retrieved successfully'
            });
        }
        catch (error) {
            console.error('Error fetching video:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch video'
            });
        }
    }
    static async getVideosByPlacement(req, res) {
        try {
            const { placement } = req.params;
            if (!placement) {
                return res.status(400).json({
                    success: false,
                    message: 'Placement parameter is required'
                });
            }
            const videos = await database_1.db
                .select()
                .from(schema_1.demoVideos)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.demoVideos.placement, placement), (0, drizzle_orm_1.eq)(schema_1.demoVideos.isActive, true)))
                .orderBy((0, drizzle_orm_1.desc)(schema_1.demoVideos.sortOrder), (0, drizzle_orm_1.desc)(schema_1.demoVideos.createdAt));
            res.json({
                success: true,
                data: { videos },
                message: 'Videos retrieved successfully'
            });
        }
        catch (error) {
            console.error('Error fetching videos by placement:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch videos'
            });
        }
    }
    static async getFeaturedVideo(req, res) {
        try {
            const video = await database_1.db
                .select()
                .from(schema_1.demoVideos)
                .where((0, drizzle_orm_1.eq)(schema_1.demoVideos.isActive, true))
                .orderBy((0, drizzle_orm_1.desc)(schema_1.demoVideos.sortOrder), (0, drizzle_orm_1.desc)(schema_1.demoVideos.createdAt))
                .limit(1);
            if (video.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No featured video found'
                });
            }
            res.json({
                success: true,
                data: video[0],
                message: 'Featured video retrieved successfully'
            });
        }
        catch (error) {
            console.error('Error fetching featured video:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to fetch featured video'
            });
        }
    }
    static async createVideo(req, res) {
        try {
            console.log('🎬 createVideo called with body:', req.body);
            const { title, description, videoUrl, thumbnailUrl, duration, category, placement, isActive, sortOrder } = req.body;
            if (!title || !videoUrl) {
                console.log('❌ Validation failed: missing title or videoUrl');
                return res.status(400).json({
                    success: false,
                    message: 'Title and video URL are required'
                });
            }
            if (!VideoController.isValidVideoUrl(videoUrl)) {
                console.log('❌ Validation failed: invalid video URL:', videoUrl);
                return res.status(400).json({
                    success: false,
                    message: 'Invalid video URL. Supported formats: YouTube, Vimeo, or direct video files (.mp4, .webm, .ogg)'
                });
            }
            console.log('✅ Validation passed, preparing to insert video');
            const videoData = {
                title,
                description,
                videoUrl,
                thumbnailUrl,
                duration,
                category: category || 'demo',
                placement: placement || 'general',
                isActive: isActive !== undefined ? isActive : true,
                sortOrder: sortOrder || 0,
            };
            console.log('📝 Video data to insert:', videoData);
            await database_1.db
                .insert(schema_1.demoVideos)
                .values(videoData);
            console.log('✅ Video inserted successfully');
            res.status(201).json({
                success: true,
                message: 'Video created successfully'
            });
        }
        catch (error) {
            console.error('❌ Error creating video:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create video'
            });
        }
    }
    static async updateVideo(req, res) {
        try {
            const { id } = req.params;
            const videoId = parseInt(id);
            if (isNaN(videoId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid video ID'
                });
            }
            const { title, description, videoUrl, thumbnailUrl, duration, category, placement, isActive, sortOrder } = req.body;
            if (!title || !videoUrl) {
                return res.status(400).json({
                    success: false,
                    message: 'Title and video URL are required'
                });
            }
            if (!VideoController.isValidVideoUrl(videoUrl)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid video URL. Supported formats: YouTube, Vimeo, or direct video files (.mp4, .webm, .ogg)'
                });
            }
            await database_1.db
                .update(schema_1.demoVideos)
                .set({
                title,
                description,
                videoUrl,
                thumbnailUrl,
                duration,
                category: category || 'demo',
                placement: placement || 'general',
                isActive: isActive !== undefined ? isActive : true,
                sortOrder: sortOrder || 0,
                updatedAt: new Date(),
            })
                .where((0, drizzle_orm_1.eq)(schema_1.demoVideos.id, videoId));
            res.json({
                success: true,
                message: 'Video updated successfully'
            });
        }
        catch (error) {
            console.error('Error updating video:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update video'
            });
        }
    }
    static async deleteVideo(req, res) {
        try {
            const { id } = req.params;
            const videoId = parseInt(id);
            if (isNaN(videoId)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid video ID'
                });
            }
            await database_1.db
                .delete(schema_1.demoVideos)
                .where((0, drizzle_orm_1.eq)(schema_1.demoVideos.id, videoId));
            res.json({
                success: true,
                message: 'Video deleted successfully'
            });
        }
        catch (error) {
            console.error('Error deleting video:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete video'
            });
        }
    }
    static isValidVideoUrl(url) {
        if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
            return true;
        }
        if (url.includes('vimeo.com/')) {
            return true;
        }
        if (url.match(/\.(mp4|webm|ogg)$/i)) {
            return true;
        }
        return false;
    }
}
exports.VideoController = VideoController;
//# sourceMappingURL=video.js.map