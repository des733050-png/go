"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validation_1 = require("../utils/validation");
const auth_2 = require("../middleware/auth");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
const authController = new auth_1.AuthController();
router.post('/register', async (req, res) => {
    const userData = validation_1.ValidationUtils.validate(validation_1.ValidationUtils.userRegistration, req.body);
    const result = await authController.register(userData);
    res.status(201).json(result);
});
router.post('/login', async (req, res) => {
    const loginData = validation_1.ValidationUtils.validate(validation_1.ValidationUtils.userLogin, req.body);
    const result = await authController.login(loginData);
    res.json(result);
});
router.post('/refresh', auth_2.validateRefreshToken, async (req, res) => {
    const result = await authController.refreshToken(req.body.token);
    res.json(result);
});
router.post('/logout', auth_2.authenticateToken, async (req, res) => {
    const result = await authController.logout(req.body.token);
    res.json(result);
});
router.get('/me', auth_2.authenticateToken, async (req, res) => {
    const result = await authController.getProfile(req.user.id);
    res.json(result);
});
router.put('/profile', auth_2.authenticateToken, async (req, res) => {
    const result = await authController.updateProfile(req.user, req.body);
    res.json(result);
});
router.post('/forgot-password', async (req, res) => {
    const { email } = validation_1.ValidationUtils.validate(validation_1.ValidationUtils.email, req.body);
    const result = await authController.forgotPassword(email);
    res.json(result);
});
router.post('/reset-password', async (req, res) => {
    const { token, password } = validation_1.ValidationUtils.validate(joi_1.default.object({
        token: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required()
    }), req.body);
    const result = await authController.resetPassword(token, password);
    res.json(result);
});
router.post('/verify-email', async (req, res) => {
    const { token } = validation_1.ValidationUtils.validate(joi_1.default.object({
        token: joi_1.default.string().required()
    }), req.body);
    const result = await authController.verifyEmail(token);
    res.json(result);
});
router.post('/resend-verification', async (req, res) => {
    const { email } = validation_1.ValidationUtils.validate(validation_1.ValidationUtils.email, req.body);
    const result = await authController.resendVerification(email);
    res.json(result);
});
exports.default = router;
//# sourceMappingURL=auth.js.map