#!/usr/bin/env node

/**
 * Test Login Response Structure
 * Checks the exact response format from the login endpoint
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app';

async function testLoginResponse() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/login`;
    
    console.log('🔍 Testing Login Response Structure');
    console.log(`   URL: ${url}`);
    
    const postData = JSON.stringify({
      email: 'admin@gonep.com',
      password: 'password123'
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
        const status = res.statusCode;
        
        console.log(`   ✅ Status: ${status}`);
        console.log(`   📊 Headers:`, res.headers);
        
        try {
          const json = JSON.parse(data);
          console.log(`   📄 Full Response:`, JSON.stringify(json, null, 2));
          
          if (status === 200 && json.success) {
            console.log(`\n🎉 Login successful!`);
            console.log(`   User: ${json.data.user.firstName} ${json.data.user.lastName}`);
            console.log(`   Role: ${json.data.user.role}`);
            console.log(`   Token field: ${json.data.token ? 'token' : 'accessToken'}`);
            console.log(`   Token value: ${json.data.token || json.data.accessToken}`);
          } else {
            console.log(`\n❌ Login failed:`, json.error || json.message);
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON response: ${data}`);
        }
        
        resolve({ status, success: status === 200, data: json });
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Network Error: ${error.message}`);
      resolve({ status: 0, success: false, error: error.message });
    });
    
    req.setTimeout(15000, () => {
      console.log(`   ⏰ Timeout`);
      req.destroy();
      resolve({ status: 0, success: false, error: 'timeout' });
    });
    
    req.write(postData);
    req.end();
  });
}

async function runTest() {
  console.log('🚀 GONEP Login Response Test');
  console.log('============================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const result = await testLoginResponse();
  
  console.log('\n📊 Test Summary');
  console.log('===============');
  console.log(`✅ Success: ${result.success}`);
  console.log(`📊 Status: ${result.status}`);
  
  if (result.success) {
    console.log('\n🎉 Login response structure verified!');
  } else {
    console.log('\n❌ Login test failed');
  }
}

runTest().catch(console.error);
