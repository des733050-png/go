"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../controllers/upload");
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const config_1 = require("../config");
const router = (0, express_1.Router)();
const uploadController = new upload_1.UploadController();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config_1.config.UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: config_1.config.MAX_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (config_1.config.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type'));
        }
    }
});
router.post('/', auth_1.authenticateToken, upload.single('file'), upload_1.UploadController.uploadFile);
router.delete('/:id', auth_1.authenticateToken, upload_1.UploadController.deleteFile);
exports.default = router;
//# sourceMappingURL=upload.js.map