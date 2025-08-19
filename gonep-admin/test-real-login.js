#!/usr/bin/env node

/**
 * Test Real Admin Login
 * Tests login with actual admin credentials
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app';

async function testRealLogin(email, password) {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/login`;
    
    console.log(`🔍 Testing Login with: ${email}`);
    console.log(`   URL: ${url}`);
    
    const startTime = Date.now();
    
    const postData = JSON.stringify({
      email: email,
      password: password
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Gonep-Admin-Test/1.0'
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const responseTime = Date.now() - startTime;
        const status = res.statusCode;
        
        console.log(`   ✅ Status: ${status}`);
        console.log(`   ⏱️  Response Time: ${responseTime}ms`);
        
        let json = null;
        try {
          json = JSON.parse(data);
          console.log(`   📄 Response:`, json);
          
          if (status === 200 && json.success) {
            console.log(`   🎉 Login successful!`);
            console.log(`   🔑 Token: ${json.data.token.substring(0, 20)}...`);
            console.log(`   👤 User: ${json.data.user.firstName} ${json.data.user.lastName}`);
            console.log(`   🏷️  Role: ${json.data.user.role}`);
          } else if (status === 401) {
            console.log(`   ❌ Login failed: Invalid credentials`);
          } else {
            console.log(`   ❌ Unexpected response`);
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON response: ${data}`);
        }
        
        resolve({ status, responseTime, success: status === 200, data: json || {} });
      });
    });
    
    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      console.log(`   ❌ Network Error: ${error.message}`);
      resolve({ status: 0, responseTime, success: false, error: error.message });
    });
    
    req.setTimeout(15000, () => {
      const responseTime = Date.now() - startTime;
      console.log(`   ⏰ Timeout after ${responseTime}ms`);
      req.destroy();
      resolve({ status: 0, responseTime, success: false, error: 'timeout' });
    });
    
    req.write(postData);
    req.end();
  });
}

async function runLoginTests() {
  console.log('🚀 GONEP Admin Login Test');
  console.log('=========================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Test with common admin credentials
  const testCredentials = [
    { email: 'admin@gonep.com', password: 'password123' }, // Default from docs
    { email: 'admin@gonep.com', password: 'admin123' },
    { email: 'admin@gonep.com', password: 'password' },
    { email: 'admin@gonep.com', password: 'admin' },
    { email: 'admin@gonep.com', password: '123456' },
    { email: 'admin@gonep.com', password: 'gonep123' },
    { email: 'admin@gonep.com', password: 'Gonep123!' },
    { email: 'admin@gonep.com', password: 'Admin123!' },
    { email: 'admin@gonep.com', password: 'admin@gonep' },
    { email: 'admin@gonep.com', password: 'gonep@admin' },
    { email: 'admin@gonep.com', password: 'test123' }
  ];
  
  console.log('\n🔍 Testing common admin credentials...');
  
  for (const cred of testCredentials) {
    const result = await testRealLogin(cred.email, cred.password);
    if (result.success) {
      console.log(`\n🎉 SUCCESS! Valid credentials found:`);
      console.log(`   Email: ${cred.email}`);
      console.log(`   Password: ${cred.password}`);
      console.log(`   Token: ${result.data.data.token.substring(0, 50)}...`);
      return;
    }
    console.log(''); // Add spacing between tests
  }
  
  console.log('\n❌ No valid credentials found from common passwords.');
  console.log('\n💡 Next Steps:');
  console.log('   1. Check your database for admin user');
  console.log('   2. Verify admin credentials in your .env file');
  console.log('   3. Create a new admin user if needed');
  console.log('   4. Check the database seed file for default credentials');
}

// Run the tests
runLoginTests().catch(console.error);
