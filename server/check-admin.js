// Script to check existing admin accounts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";
mongoose.connect(mongoUri)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Check for admin users
async function checkAdmins() {
  try {
    const User = mongoose.model('User', {
      name: String,
      email: String,
      password: String,
      isAdmin: Boolean
    });

    const admins = await User.find({ isAdmin: true }).select('-password');
    
    if (admins.length > 0) {
      console.log('🔍 Found admin accounts:');
      admins.forEach(admin => {
        console.log(`📧 Email: ${admin.email}`);
        console.log(`👤 Name: ${admin.name}`);
        console.log(`🔑 Is Admin: ${admin.isAdmin}`);
        console.log('---');
      });
    } else {
      console.log('❌ No admin accounts found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    mongoose.connection.close();
  }
}

checkAdmins();

