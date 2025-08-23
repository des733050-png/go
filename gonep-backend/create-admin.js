#!/usr/bin/env node

/**
 * Create Admin User Script
 * Adds an admin user to the database
 */

const https = require('https');

const BACKEND_URL = 'https://gonepbackend.vercel.app';

async function createAdminUser() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/register`;
    
    console.log('🔧 Creating Admin User');
    console.log(`   URL: ${url}`);
    
    const startTime = Date.now();
    
    const postData = JSON.stringify({
      email: 'admin@gonep.com',
      password: 'password123',
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      organization: 'GONEP Healthcare',
      title: 'System Administrator',
      organizationType: 'Healthcare',
      country: 'United States'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': 'Gonep-Admin-Creator/1.0'
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
          
          if (status === 201 && json.success) {
            console.log(`   🎉 Admin user created successfully!`);
            console.log(`   🔑 Token: ${json.data.token.substring(0, 20)}...`);
            console.log(`   👤 User: ${json.data.user.firstName} ${json.data.user.lastName}`);
            console.log(`   🏷️  Role: ${json.data.user.role}`);
            console.log(`   📧 Email: ${json.data.user.email}`);
          } else if (status === 409) {
            console.log(`   ⚠️  User already exists`);
          } else {
            console.log(`   ❌ Failed to create admin user`);
          }
        } catch (e) {
          console.log(`   ❌ Invalid JSON response: ${data}`);
        }
        
        resolve({ status, responseTime, success: status === 201, data: json || {} });
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

async function testAdminLogin() {
  return new Promise((resolve) => {
    const url = `${BACKEND_URL}/api/auth/login`;
    
    console.log('\n🔍 Testing Admin Login');
    console.log(`   URL: ${url}`);
    
    const startTime = Date.now();
    
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
          } else {
            console.log(`   ❌ Login failed`);
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

async function runAdminCreation() {
  console.log('🚀 GONEP Admin User Creation');
  console.log('============================');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Create admin user
  const createResult = await createAdminUser();
  
  if (createResult.success) {
    console.log('\n✅ Admin user created successfully!');
  } else if (createResult.status === 409) {
    console.log('\n⚠️  Admin user already exists');
  } else {
    console.log('\n❌ Failed to create admin user');
    return;
  }
  
  // Test login
  const loginResult = await testAdminLogin();
  
  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`✅ Admin Creation: ${createResult.success ? 'Success' : 'Failed'}`);
  console.log(`✅ Admin Login: ${loginResult.success ? 'Success' : 'Failed'}`);
  
  if (loginResult.success) {
    console.log('\n🎉 SUCCESS! You can now login to the admin panel with:');
    console.log(`   Email: admin@gonep.com`);
    console.log(`   Password: password123`);
    console.log(`   Token: ${loginResult.data.data.token.substring(0, 50)}...`);
  } else {
    console.log('\n❌ Login test failed. Please check the backend logs.');
  }
}

// Run the admin creation
runAdminCreation().catch(console.error);
