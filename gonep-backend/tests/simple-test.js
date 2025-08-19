const http = require('http');

console.log('🧪 Testing basic API connectivity...');

// Test health endpoint
const req = http.request({
  hostname: 'localhost',
  port: 8000,
  path: '/health',
  method: 'GET'
}, (res) => {
  console.log(`Health check status: ${res.statusCode}`);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Health response:', data);
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
});

req.end();
