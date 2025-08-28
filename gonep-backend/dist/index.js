"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const PORT = config_1.config.PORT;
const server = app_1.default.listen(PORT, '0.0.0.0', async () => {
    console.log(`🚀 GONEP API Server running on port ${PORT}`);
    console.log(`📊 Environment: ${config_1.config.NODE_ENV}`);
    console.log(`🔗 Health check: bknd.gonepharm.com/health`);
    console.log(`📚 API docs: bknd.gonepharm.com/api`);
    try {
        await (0, database_1.testConnection)();
    }
    catch (error) {
        console.error('Failed to connect to database:', error);
        if (config_1.config.NODE_ENV === 'development') {
            console.error('Database connection failed, but server continues running...');
        }
    }
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    server.close(() => {
        process.exit(1);
    });
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    server.close(() => {
        process.exit(1);
    });
});
exports.default = app_1.default;
//# sourceMappingURL=index.js.map