#!/usr/bin/env node

/**
 * Debug Login Flow
 * Tests the exact login process and token storage
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app/api';

async function debugLoginFlow() {
  console.log('🔍 Debugging Login Flow');
  console.log('=======================');
  
  // Step 1: Test login
  console.log('\n1️⃣ Testing Login...');
  const loginResult = await testLogin();
  
  if (!loginResult.success) {
    console.log('❌ Login failed - cannot proceed');
    return;
  }
  
  // Step 2: Test token storage simulation
  console.log('\n2️⃣ Simulating Token Storage...');
  const token = loginResult.data.accessToken;
  console.log(`   Token received: ${token ? 'YES' : 'NO'}`);
  console.log(`   Token length: ${token ? token.length : 0}`);
  console.log(`   Token preview: ${token ? token.substring(0, 50) + '...' : 'N/A'}`);
  
  // Step 3: Test authenticated request
  console.log('\n3️⃣ Testing Authenticated Request...');
  await testAuthenticatedRequest(token);
  
  // Step 4: Test dashboard endpoints
  console.log('\n4️⃣ Testing Dashboard Endpoints...');
  await testDashboardEndpoints(token);
}

async function testLogin() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/auth/login`;
    
    const postData = JSON.stringify({
      email: 'admin@gonep.com',
      password: 'password123'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        
        try {
          const json = JSON.parse(data);
          
          if (status === 200 && json.success) {
            console.log('   ✅ Login successful');
            console.log(`   👤 User: ${json.data.user.firstName} ${json.data.user.lastName}`);
            console.log(`   🏷️ Role: ${json.data.user.role}`);
            resolve({ success: true, data: json.data });
          } else {
            console.log('   ❌ Login failed:', json.error || json.message);
            resolve({ success: false, error: json.error || json.message });
          }
        } catch (e) {
          console.log('   ❌ Invalid response:', data);
          resolve({ success: false, error: 'Invalid response' });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log('   ❌ Network error:', error.message);
      resolve({ success: false, error: error.message });
    });
    
    req.write(postData);
    req.end();
  });
}

async function testAuthenticatedRequest(token) {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/auth/me`;
    
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const status = res.statusCode;
        
        try {
          const json = JSON.parse(data);
          
          if (status === 200) {
            console.log('   ✅ Auth check successful');
            console.log(`   👤 User: ${json.data.firstName} ${json.data.lastName}`);
          } else {
            console.log('   ❌ Auth check failed:', json.error || json.message);
          }
        } catch (e) {
          console.log('   ❌ Invalid response:', data);
        }
        
        resolve({ success: status === 200 });
      });
    });
    
    req.on('error', (error) => {
      console.log('   ❌ Network error:', error.message);
      resolve({ success: false, error: error.message });
    });
    
    req.end();
  });
}

async function testDashboardEndpoints(token) {
  const endpoints = [
    '/contact/inquiries',
    '/newsletter/subscribers',
    '/demo/requests'
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n   Testing: ${endpoint}`);
    
    const result = await new Promise((resolve) => {
      const url = `${BACKEND_URL}${endpoint}`;
      
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const req = https.request(url, options, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          const status = res.statusCode;
          
          if (status === 200) {
            console.log(`      ✅ ${endpoint} - Success`);
          } else {
            console.log(`      ❌ ${endpoint} - ${status}`);
            try {
              const json = JSON.parse(data);
              console.log(`         Error: ${json.error || json.message}`);
            } catch (e) {
              console.log(`         Response: ${data.substring(0, 100)}...`);
            }
          }
          
          resolve({ success: status === 200, status });
        });
      });
      
      req.on('error', (error) => {
        console.log(`      ❌ ${endpoint} - Network error: ${error.message}`);
        resolve({ success: false, error: error.message });
      });
      
      req.end();
    });
  }
}

// Run the debug
debugLoginFlow().catch(console.error);
