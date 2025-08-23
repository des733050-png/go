import { Router } from 'express';
import { UploadController } from '../controllers/upload';
import { authenticateToken } from '../middleware/auth';
import multer from 'multer';
import { config } from '../config';

const router = Router();
const uploadController = new UploadController();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.MAX_FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    if (config.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

/**
 * @route   POST /api/upload
 * @desc    Upload a file
 * @access  Private
 */
router.post('/', authenticateToken, upload.single('file'), UploadController.uploadFile);

/**
 * @route   DELETE /api/upload/:id
 * @desc    Delete a file
 * @access  Private
 */
router.delete('/:id', authenticateToken, UploadController.deleteFile);

export default router;
