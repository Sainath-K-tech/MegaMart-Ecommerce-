# MegaMart E-Commerce Platform

A full-stack e-commerce application built with React, Node.js, and MongoDB featuring user authentication, admin dashboard, and shopping cart functionality.

## Features

### 🛍️ User Features
- **Product Browsing**: View products with images, descriptions, prices, and ratings
- **Category Navigation**: Browse products by categories (Electronics, Fashion, Home, etc.)
- **Shopping Cart**: Add/remove items with quantity controls (+/- buttons)
- **User Authentication**: Register, login, and profile management
- **Responsive Design**: Mobile-friendly interface

### 🔧 Admin Features
- **Product Management**: Add, edit, and delete products
- **Admin Dashboard**: Full CRUD operations for products
- **Secure Access**: Admin-only routes with JWT authentication

### 🎨 UI/UX Features
- **Moving Slideshow**: Promotional banners (Mega Sale, 50% Off, etc.)
- **Modern Design**: Clean, professional interface
- **Interactive Elements**: Hover effects, smooth transitions
- **Responsive Layout**: Works on all device sizes

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **React Router** - Client-side routing
- **CSS3** - Custom styling with animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce
```

### 2. Server Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development
```

Start the server:
```bash
npm run dev
```

### 3. Client Setup
```bash
cd client
npm install
```

Start the client:
```bash
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running locally or update the MONGO_URI in your .env file.

## Usage

### First Time Setup
1. **Start the server** - The server will automatically create the database
2. **Create Admin Account** - Use the `/api/auth/setup-admin` endpoint to create your first admin user
3. **Add Products** - Login to the admin dashboard and start adding products

### Admin Dashboard
- Navigate to `/admin` (requires admin login)
- Add new products with:
  - Product name
  - Description
  - Price
  - Rating (0-5)
  - Image URL
  - Category
  - Stock quantity
- Edit existing products
- Delete products

##📸Screenshots
## The main Website
![image alt](https://github.com/Sainath-K-tech/MegaMart-Ecommerce-/blob/60877336e969350e40bcaa1b80a5ad6cd98e4ffe/Screenshot%202025-09-02%20161537.png)

##Cart and Checkopt page
![image alt](https://github.com/Sainath-K-tech/MegaMart-Ecommerce-/blob/60877336e969350e40bcaa1b80a5ad6cd98e4ffe/Screenshot%202025-09-02%20161711.png)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request



This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.
