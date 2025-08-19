import { Request, Response } from 'express';
import { db } from '../config/database';
import { demoVideos } from '../database/schema';
import { eq, and, desc, isNull } from 'drizzle-orm';

export class VideoController {
  // Get all videos (public)
  static async getAllVideos(req: Request, res: Response) {
    try {
      console.log('🎬 getAllVideos called');
      
      console.log('📊 Attempting to query demo_videos table...');
      const videos = await db
        .select()
        .from(demoVideos)
        .where(eq(demoVideos.isActive, true))
        .orderBy(desc(demoVideos.sortOrder), desc(demoVideos.createdAt));

      console.log('✅ Videos query successful, count:', videos.length);

      res.json({
        success: true,
        data: { videos },
        message: 'Videos retrieved successfully'
      });
    } catch (error) {
      console.error('❌ Error fetching videos:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch videos'
      });
    }
  }

  // Get all videos (admin)
  static async getAllVideosAdmin(req: Request, res: Response) {
    try {
      const videos = await db
        .select()
        .from(demoVideos)
        .orderBy(desc(demoVideos.sortOrder), desc(demoVideos.createdAt));

      res.json({
        success: true,
        data: { videos },
        message: 'Videos retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching videos:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch videos'
      });
    }
  }

  // Get video by ID
  static async getVideoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const videoId = parseInt(id);
      
      // Validate that the ID is a valid number
      if (isNaN(videoId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video ID'
        });
      }

      const video = await db
        .select()
        .from(demoVideos)
        .where(eq(demoVideos.id, videoId))
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
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch video'
      });
    }
  }

  // Get videos by placement
  static async getVideosByPlacement(req: Request, res: Response) {
    try {
      const { placement } = req.params;
      if (!placement) {
        return res.status(400).json({
          success: false,
          message: 'Placement parameter is required'
        });
      }

      const videos = await db
        .select()
        .from(demoVideos)
        .where(
          and(
            eq(demoVideos.placement, placement),
            eq(demoVideos.isActive, true)
          )
        )
        .orderBy(desc(demoVideos.sortOrder), desc(demoVideos.createdAt));

      res.json({
        success: true,
        data: { videos },
        message: 'Videos retrieved successfully'
      });
    } catch (error) {
      console.error('Error fetching videos by placement:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch videos'
      });
    }
  }

  // Get featured video (first active video)
  static async getFeaturedVideo(req: Request, res: Response) {
    try {
      const video = await db
        .select()
        .from(demoVideos)
        .where(eq(demoVideos.isActive, true))
        .orderBy(desc(demoVideos.sortOrder), desc(demoVideos.createdAt))
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
    } catch (error) {
      console.error('Error fetching featured video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch featured video'
      });
    }
  }

  // Create new video
  static async createVideo(req: Request, res: Response) {
    try {
      console.log('🎬 createVideo called with body:', req.body);
      
      const { title, description, videoUrl, thumbnailUrl, duration, category, placement, isActive, sortOrder } = req.body;

      // Validate required fields
      if (!title || !videoUrl) {
        console.log('❌ Validation failed: missing title or videoUrl');
        return res.status(400).json({
          success: false,
          message: 'Title and video URL are required'
        });
      }

      // Validate video URL
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

      await db
        .insert(demoVideos)
        .values(videoData);

      console.log('✅ Video inserted successfully');

      res.status(201).json({
        success: true,
        message: 'Video created successfully'
      });
    } catch (error) {
      console.error('❌ Error creating video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create video'
      });
    }
  }

  // Update video
  static async updateVideo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const videoId = parseInt(id);
      
      // Validate that the ID is a valid number
      if (isNaN(videoId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video ID'
        });
      }

      const { title, description, videoUrl, thumbnailUrl, duration, category, placement, isActive, sortOrder } = req.body;

      // Validate required fields
      if (!title || !videoUrl) {
        return res.status(400).json({
          success: false,
          message: 'Title and video URL are required'
        });
      }

      // Validate video URL
      if (!VideoController.isValidVideoUrl(videoUrl)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video URL. Supported formats: YouTube, Vimeo, or direct video files (.mp4, .webm, .ogg)'
        });
      }

      await db
        .update(demoVideos)
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
        .where(eq(demoVideos.id, videoId));

      res.json({
        success: true,
        message: 'Video updated successfully'
      });
    } catch (error) {
      console.error('Error updating video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update video'
      });
    }
  }

  // Delete video
  static async deleteVideo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const videoId = parseInt(id);
      
      // Validate that the ID is a valid number
      if (isNaN(videoId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid video ID'
        });
      }

      await db
        .delete(demoVideos)
        .where(eq(demoVideos.id, videoId));

      res.json({
        success: true,
        message: 'Video deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting video:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete video'
      });
    }
  }

  // Helper method to validate video URLs
  private static isValidVideoUrl(url: string): boolean {
    // YouTube URLs
    if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
      return true;
    }
    
    // Vimeo URLs
    if (url.includes('vimeo.com/')) {
      return true;
    }
    
    // Direct video files
    if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return true;
    }
    
    return false;
  }
}
