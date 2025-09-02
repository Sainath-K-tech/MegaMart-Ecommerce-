# Quick Setup Guide

## 🚀 Get Started in 5 Minutes

### 1. Create Environment File
Create `server/.env` with:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

### 2. Start the Backend
```bash
cd server
npm install
npm run dev
```

### 3. Start the Frontend
```bash
cd client
npm install
npm run dev
```

### 4. Create Admin Account
Use Postman or curl to create your first admin:
```bash
curl -X POST http://localhost:5000/api/auth/setup-admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@megamart.com",
    "password": "admin123"
  }'
```

### 5. Login & Add Products
- Go to `/admin` and login with your admin credentials
- Start adding products with images, descriptions, prices, etc.
- Products will automatically appear on the homepage

## 🎯 What's Working Now

✅ **Categories Dropdown** - Electronics, Fashion, Home, Beauty, Sports, Books, Toys, Automotive  
✅ **More Button** - Help, Support, About Us, Sell on MegaMart  
✅ **Profile Button** - Login/Register, User Profile, Admin Dashboard  
✅ **Cart Functionality** - Add/Remove items, Quantity controls (+/-), Delete options  
✅ **Moving Slideshow** - Mega Sale, 50% Off banners  
✅ **Admin Dashboard** - Full product management  
✅ **User Authentication** - Secure login/register system  

## 🔧 Features Implemented

- **Responsive Design** - Works on all devices
- **JWT Authentication** - Secure user sessions
- **MongoDB Integration** - Persistent data storage
- **Real-time Updates** - Immediate product changes
- **Shopping Cart** - Full e-commerce functionality
- **Admin Panel** - Complete product management
- **Modern UI/UX** - Professional design with animations

## 🌟 Ready to Use!

Your e-commerce platform is now fully functional with:
- User registration and login
- Product browsing and cart management
- Admin dashboard for product management
- Responsive design for all devices
- Secure authentication system

Start adding products and enjoy your new MegaMart store! 🛍️
