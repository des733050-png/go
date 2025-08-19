import { Request, Response } from 'express';
import { db } from '../config/database';
import { fileUploads } from '../database/schema';
import { asyncHandler } from '../middleware/errorHandler';
import { eq } from 'drizzle-orm';
import { AuthenticatedRequest } from '../middleware/auth';

export class UploadController {
  // Upload file
  static uploadFile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    try {
      const fileRecord = await db
        .insert(fileUploads)
        .values({
          filename: req.file.filename,
          originalFilename: req.file.originalname,
          filePath: req.file.path,
          fileSize: req.file.size,
          mimeType: req.file.mimetype,
          uploadedBy: req.user?.id || null,
        });

      // Get the inserted record to return the complete data
      const insertedFile = await db
        .select()
        .from(fileUploads)
        .where(eq(fileUploads.filename, req.file.filename))
        .limit(1);

      if (insertedFile.length === 0) {
        throw new Error('Failed to retrieve uploaded file record');
      }

      res.status(201).json({
        success: true,
        data: { 
          file: insertedFile[0]
        },
        message: 'File uploaded successfully'
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save file record to database'
      });
    }
  });

  // Delete file
  static deleteFile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    await db
      .delete(fileUploads)
      .where(eq(fileUploads.id, Number(id)));

    // Check if file was actually deleted by trying to find it
    const existingFile = await db
      .select()
      .from(fileUploads)
      .where(eq(fileUploads.id, Number(id)))
      .limit(1);

    if (existingFile.length > 0) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  });
}
