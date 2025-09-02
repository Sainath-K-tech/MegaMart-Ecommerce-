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

### User Experience
- Browse products on the homepage
- Use category dropdowns to filter products
- Add items to cart with quantity controls
- View cart with price breakdown
- Register/login for personalized experience

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/setup-admin` - Create admin account
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

## Project Structure

```
ecommerce/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context (Cart)
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   └── server.js          # Server entry point
└── README.md
```

## Features in Detail

### Shopping Cart
- **Quantity Controls**: +/- buttons for adjusting item quantities
- **Price Calculation**: Real-time total with discounts
- **Remove Items**: Delete button for each cart item
- **Persistent State**: Cart data persists across sessions

### Admin Dashboard
- **Product Form**: Comprehensive form for product details
- **Image Management**: URL-based image handling
- **Category Selection**: Dropdown with predefined categories
- **Stock Management**: Track product inventory
- **Real-time Updates**: Immediate reflection of changes

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Protected Routes**: Admin-only access to sensitive endpoints
- **Input Validation**: Server-side validation for all inputs

## Customization

### Adding New Categories
Update the categories array in `AdminDashboard.jsx`:
```javascript
const categories = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books', 'Toys', 'Automotive', 'YourCategory'];
```

### Styling Changes
- Main styles: `client/src/App.css`
- Navbar styles: `client/src/components/Navbar.css`
- Cart styles: `client/src/pages/Cart.css`
- Admin styles: `client/src/components/AdminDashboard.css`

### Slideshow Content
Modify the slides array in `client/src/components/Slideshow.jsx`:
```javascript
const slides = [
  { text: "🔥 MEGA SALE - UP TO 70% OFF", color: "#ff4757" },
  // Add your own slides here
];
```

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Ensure MongoDB is running and the connection string is correct
2. **Port Already in Use**: Change the PORT in .env file
3. **CORS Issues**: Check that the server is running on the correct port
4. **JWT Errors**: Verify the JWT_SECRET is set in your .env file

### Development Tips
- Use `npm run dev` for both client and server during development
- Check browser console and server logs for error messages
- Ensure all environment variables are properly set
- Test admin functionality after creating the first admin account

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository or contact the development team.
