#!/usr/bin/env node

/**
 * Admin Panel Connection Test Script
 * Tests the specific endpoints used by the admin panel
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app';

async function testLoginEndpoint() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/login`;
    
    console.log('🔍 Testing Admin Login Endpoint');
    console.log(`   URL: ${url}`);
    
    const startTime = Date.now();
    
    const postData = JSON.stringify({
      email: 'admin@gonep.com',
      password: 'testpassword123'
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
        console.log(`   📊 Headers:`, res.headers);
        
        try {
          const json = JSON.parse(data);
          console.log(`   📄 Response:`, json);
          
          if (status === 200) {
            console.log(`   ✅ Login endpoint working correctly`);
          } else if (status === 401) {
            console.log(`   ⚠️  Login endpoint working (401 expected for invalid credentials)`);
          } else {
            console.log(`   ❌ Unexpected status code`);
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON response: ${data}`);
        }
        
        resolve({ status, responseTime, success: status < 500 });
      });
    });
    
    req.on('error', (error) => {
      const responseTime = Date.now() - startTime;
      console.log(`   ❌ Network Error: ${error.message}`);
      console.log(`   ⏱️  Time to Error: ${responseTime}ms`);
      console.log(`   🔍 Error Code: ${error.code}`);
      console.log(`   🔍 Error Type: ${error.constructor.name}`);
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

async function testCORS() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/login`;
    
    console.log('\n🔍 Testing CORS Headers');
    console.log(`   URL: ${url}`);
    
    const options = {
      method: 'OPTIONS',
      headers: {
        'Origin': 'https://gonepadmin.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    };
    
    const req = https.request(url, options, (res) => {
      console.log(`   ✅ CORS Preflight Status: ${res.statusCode}`);
      console.log(`   📊 CORS Headers:`, {
        'Access-Control-Allow-Origin': res.headers['access-control-allow-origin'],
        'Access-Control-Allow-Methods': res.headers['access-control-allow-methods'],
        'Access-Control-Allow-Headers': res.headers['access-control-allow-headers']
      });
      
      resolve({ status: res.statusCode, success: res.statusCode < 400 });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ CORS Test Error: ${error.message}`);
      resolve({ status: 0, success: false, error: error.message });
    });
    
    req.end();
  });
}

async function runAdminTests() {
  console.log('🚀 GONEP Admin Panel Connection Test');
  console.log('====================================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Test login endpoint
  const loginResult = await testLoginEndpoint();
  
  // Test CORS
  const corsResult = await testCORS();
  
  console.log('\n📊 Admin Test Summary');
  console.log('=====================');
  console.log(`✅ Login Endpoint: ${loginResult.success ? 'Working' : 'Failed'}`);
  console.log(`✅ CORS Headers: ${corsResult.success ? 'Working' : 'Failed'}`);
  
  if (!loginResult.success) {
    console.log('\n💡 Login Endpoint Issues:');
    console.log(`   - Status: ${loginResult.status}`);
    console.log(`   - Error: ${loginResult.error}`);
    console.log(`   - Response Time: ${loginResult.responseTime}ms`);
  }
  
  if (!corsResult.success) {
    console.log('\n💡 CORS Issues:');
    console.log(`   - Status: ${corsResult.status}`);
    console.log(`   - Error: ${corsResult.error}`);
  }
  
  console.log('\n🔧 Recommendations:');
  if (loginResult.success && corsResult.success) {
    console.log('   - All tests passed! Admin panel should work correctly.');
    console.log('   - If you still see ERR_CONNECTION_RESET, try:');
    console.log('     * Clear browser cache and cookies');
    console.log('     * Try incognito/private browsing mode');
    console.log('     * Check browser console for CORS errors');
  } else {
    console.log('   - Backend configuration issues detected.');
    console.log('   - Check CORS settings and network connectivity.');
  }
}

// Run the tests
runAdminTests().catch(console.error);
