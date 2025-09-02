// Simple script to create admin account
// Run this with: node create-admin.js

const axios = require('axios');

async function createAdmin() {
  try {
    console.log('🚀 Creating admin account...');
    
    const response = await axios.post('http://localhost:5000/api/auth/setup-admin', {
      name: 'Admin User',
      email: 'admin@megamart.com',
      password: 'admin123'
    });
    
    console.log('✅ Admin account created successfully!');
    console.log('📧 Email:', response.data.user.email);
    console.log('🔑 Password: admin123');
    console.log('🎯 Token:', response.data.token.substring(0, 20) + '...');
    console.log('\n🌐 Now you can:');
    console.log('1. Go to http://localhost:3000/login');
    console.log('2. Select "Admin" and login with admin@megamart.com / admin123');
    console.log('3. You will be redirected to /admin dashboard');
    console.log('4. Start adding products!');
    
  } catch (error) {
    if (error.response?.status === 400) {
      console.log('❌ Admin already exists!');
      console.log('🔑 Try logging in with existing admin credentials');
    } else {
      console.log('❌ Error:', error.response?.data?.message || error.message);
      console.log('💡 Make sure your server is running on port 5000');
    }
  }
}

createAdmin();

