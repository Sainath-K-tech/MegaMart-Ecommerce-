// Script to reset admin password
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(mongoUri)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Reset admin password
async function resetAdminPassword() {
  try {
    const User = mongoose.model('User', {
      name: String,
      email: String,
      password: String,
      isAdmin: Boolean
    });

    // Find admin user
    const admin = await User.findOne({ email: 'admin@example.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found');
      return;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('✅ Admin password reset successfully!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 New Password: admin123');
    console.log('\n🌐 Now you can:');
    console.log('1. Go to http://localhost:3000/login');
    console.log('2. Select "Admin" and login with admin@example.com / admin123');
    console.log('3. You will be redirected to /admin dashboard');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

resetAdminPassword();

