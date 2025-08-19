#!/usr/bin/env node

/**
 * Test Admin Panel Login Simulation
 * Simulates exactly what the admin panel does when logging in
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app/api';

async function simulateAdminLogin() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/auth/login`;
    
    console.log('🔍 Simulating Admin Panel Login');
    console.log(`   URL: ${url}`);
    console.log(`   Base URL: ${BACKEND_URL}`);
    
    const postData = JSON.stringify({
      email: 'admin@gonep.com',
      password: 'password123'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Gonep-Admin-Panel/1.0',
        'Accept': 'application/json',
        'Origin': 'https://gonepadmin.vercel.app'
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
        console.log(`   📊 Content-Type: ${res.headers['content-type']}`);
        
        try {
          const json = JSON.parse(data);
          
          if (status === 200 && json.success) {
            console.log(`\n🎉 Login successful!`);
            console.log(`   User: ${json.data.user.firstName} ${json.data.user.lastName}`);
            console.log(`   Role: ${json.data.user.role}`);
            console.log(`   Access Token: ${json.data.accessToken ? 'Present' : 'Missing'}`);
            console.log(`   Token Length: ${json.data.accessToken ? json.data.accessToken.length : 0}`);
            
            // Simulate what the admin panel would do
            console.log(`\n🔧 Simulating admin panel actions:`);
            console.log(`   1. Store token in localStorage`);
            console.log(`   2. Redirect to dashboard`);
            console.log(`   3. Make authenticated requests`);
            
            // Test authenticated request
            testAuthenticatedRequest(json.data.accessToken);
            
          } else {
            console.log(`\n❌ Login failed:`, json.error || json.message);
            console.log(`   Full response:`, JSON.stringify(json, null, 2));
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

async function testAuthenticatedRequest(token) {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/auth/me`;
    
    console.log(`\n🔍 Testing authenticated request`);
    console.log(`   URL: ${url}`);
    
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Gonep-Admin-Panel/1.0'
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        
        console.log(`   ✅ Auth Status: ${status}`);
        
        try {
          const json = JSON.parse(data);
          
          if (status === 200) {
            console.log(`   🎉 Authenticated request successful!`);
            console.log(`   User: ${json.data.firstName} ${json.data.lastName}`);
          } else {
            console.log(`   ❌ Auth failed:`, json.error || json.message);
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON: ${data}`);
        }
        
        resolve({ status, success: status === 200 });
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Auth Error: ${error.message}`);
      resolve({ status: 0, success: false, error: error.message });
    });
    
    req.setTimeout(15000, () => {
      console.log(`   ⏰ Auth Timeout`);
      req.destroy();
      resolve({ status: 0, success: false, error: 'timeout' });
    });
    
    req.end();
  });
}

async function runTest() {
  console.log('🚀 GONEP Admin Panel Login Simulation');
  console.log('=====================================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  const result = await simulateAdminLogin();
  
  console.log('\n📊 Test Summary');
  console.log('===============');
  console.log(`✅ Login Success: ${result.success}`);
  console.log(`📊 Status: ${result.status}`);
  
  if (result.success) {
    console.log('\n🎉 Admin panel should work correctly!');
    console.log('   Try logging in with: admin@gonep.com / password123');
  } else {
    console.log('\n❌ Issues detected - check the response above');
  }
}

runTest().catch(console.error);
