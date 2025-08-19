import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { pathname } = new URL(req.url || '/', `https://${req.headers.host}`);

  // Route handling
  switch (pathname) {
    case '/':
      res.status(200).json({
        success: true,
        message: 'GONEP API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0',
        deployment: 'Vercel Serverless'
      });
      break;

    case '/health':
      res.status(200).json({
        success: true,
        message: 'GONEP API is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0',
        deployment: 'Vercel Serverless'
      });
      break;

    case '/api/health':
      res.status(200).json({
        success: true,
        message: 'GONEP API is healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'production',
        version: '1.0.0',
        deployment: 'Vercel Serverless'
      });
      break;

    case '/test':
      res.status(200).json({
        success: true,
        message: 'Server is working!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production',
        env: {
          NODE_ENV: process.env.NODE_ENV,
          PORT: process.env.PORT,
          DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
          JWT_SECRET: process.env.JWT_SECRET ? 'SET' : 'NOT_SET'
        }
      });
      break;

    case '/api':
      res.status(200).json({
        success: true,
        message: 'GONEP API Documentation',
        version: '1.0.0',
        deployment: 'Vercel Serverless',
        baseUrl: 'https://gonep-backend.vercel.app',
        endpoints: {
          health: '/health',
          apiHealth: '/api/health',
          test: '/test',
          demo: '/api/demo',
          team: '/api/team',
          video: '/api/video'
        }
      });
      break;

    // Demo endpoints
    case '/api/demo/request':
      if (req.method === 'POST') {
        res.status(200).json({
          success: true,
          message: 'Demo request received successfully',
          data: { requestId: 'demo-' + Date.now() }
        });
      } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
      }
      break;

    case '/api/demo/config/interests':
      res.status(200).json({
        success: true,
        data: [
          'Healthcare Management',
          'Patient Care',
          'Administrative Efficiency',
          'Technology Integration',
          'Cost Optimization'
        ]
      });
      break;

    case '/api/demo/config/types':
      res.status(200).json({
        success: true,
        data: [
          'Product Demo',
          'Technical Overview',
          'Custom Solution',
          'Consultation'
        ]
      });
      break;

    case '/api/demo/config/calendar':
      res.status(200).json({
        success: true,
        data: {
          availableDates: [
            '2025-08-20',
            '2025-08-21',
            '2025-08-22',
            '2025-08-23'
          ]
        }
      });
      break;

    // Team endpoints
    case '/api/team':
      res.status(200).json({
        success: true,
        data: [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            title: 'Chief Medical Officer',
            department: 'Medical',
            image: '/team/sarah.jpg'
          },
          {
            id: 2,
            name: 'Michael Chen',
            title: 'Chief Technology Officer',
            department: 'Technology',
            image: '/team/michael.jpg'
          }
        ]
      });
      break;

    case '/api/team/leadership':
      res.status(200).json({
        success: true,
        data: [
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            title: 'Chief Medical Officer',
            bio: 'Leading medical innovation and patient care excellence.'
          }
        ]
      });
      break;

    case '/api/team/values':
      res.status(200).json({
        success: true,
        data: [
          'Patient-Centered Care',
          'Innovation',
          'Excellence',
          'Collaboration',
          'Integrity'
        ]
      });
      break;

    // Video endpoints
    case '/api/video':
      res.status(200).json({
        success: true,
        data: [
          {
            id: 1,
            title: 'GONEP Platform Overview',
            description: 'Learn about our comprehensive healthcare management platform',
            url: 'https://example.com/video1.mp4',
            placement: 'homepage'
          }
        ]
      });
      break;

    case '/api/video/featured':
      res.status(200).json({
        success: true,
        data: {
          id: 1,
          title: 'Featured: GONEP Platform Overview',
          description: 'Learn about our comprehensive healthcare management platform',
          url: 'https://example.com/video1.mp4',
          placement: 'featured'
        }
      });
      break;

    case '/favicon.ico':
      res.status(204).end();
      break;

    default:
      res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${pathname}`
      });
      break;
  }
}
