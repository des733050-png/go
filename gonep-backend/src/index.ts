import app from './app';
import { config } from './config';
import { testConnection } from './config/database';

// Start server
const PORT = config.PORT;

const server = app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 GONEP API Server running on port ${PORT}`);
  console.log(`📊 Environment: ${config.NODE_ENV}`);
  console.log(`🔗 Health check: ${config.API_BASE_URL}/health`);
  console.log(`📚 API docs: ${config.API_BASE_URL}/api`);
  
  // Test database connection
  try {
    await testConnection();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    // Don't crash the server, just log the error
    if (config.NODE_ENV === 'development') {
      console.error('Database connection failed, but server continues running...');
    }
  }
});

// Graceful shutdown
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

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
