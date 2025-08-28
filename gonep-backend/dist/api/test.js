"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
function handler(req, res) {
    res.status(200).json({
        success: true,
        message: 'Test function working!',
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url
    });
}
//# sourceMappingURL=test.js.map