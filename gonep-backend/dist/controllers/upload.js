"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const database_1 = require("../config/database");
const schema_1 = require("../database/schema");
const errorHandler_1 = require("../middleware/errorHandler");
const drizzle_orm_1 = require("drizzle-orm");
class UploadController {
}
exports.UploadController = UploadController;
_a = UploadController;
UploadController.uploadFile = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }
    try {
        const fileRecord = await database_1.db
            .insert(schema_1.fileUploads)
            .values({
            filename: req.file.filename,
            originalFilename: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user?.id || null,
        });
        const insertedFile = await database_1.db
            .select()
            .from(schema_1.fileUploads)
            .where((0, drizzle_orm_1.eq)(schema_1.fileUploads.filename, req.file.filename))
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
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save file record to database'
        });
    }
});
UploadController.deleteFile = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    await database_1.db
        .delete(schema_1.fileUploads)
        .where((0, drizzle_orm_1.eq)(schema_1.fileUploads.id, Number(id)));
    const existingFile = await database_1.db
        .select()
        .from(schema_1.fileUploads)
        .where((0, drizzle_orm_1.eq)(schema_1.fileUploads.id, Number(id)))
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
//# sourceMappingURL=upload.js.map