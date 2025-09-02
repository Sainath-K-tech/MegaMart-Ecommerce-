import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          MegaMart
        </Link>
      </div>

      {/* Center - Search Bar */}
      <div className="nav-center">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="search-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>

      {/* Right Side - Categories + Profile + Cart + Wishlist */}
      <div className="nav-right">
        {/* Categories Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">Categories ⮟</button>
          <div className="dropdown-content">
            <Link to="/products">All Products</Link>
            <Link to="/products?category=Electronics">Electronics</Link>
            <Link to="/products?category=Clothing">Clothing</Link>
            <Link to="/products?category=Books">Books</Link>
            <Link to="/products?category=Home & Garden">Home & Garden</Link>
            <Link to="/products?category=Sports">Sports</Link>
            <Link to="/products?category=Toys">Toys</Link>
            <Link to="/products?category=Fashion">Fashion</Link>
            
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button className="dropbtn">
            {isLoggedIn ? user?.name : 'Profile'} ⮟
          </button>
          <div className="dropdown-content">
            <Link to="/profile">👤 My Profile</Link>
            <Link to="/my-orders">📦 My Orders</Link>
            <Link to="/wishlist">❤️ Wishlist</Link>
            <Link to="/notifications">🔔 Notifications</Link>
            <Link to="/help">❓ Help & Support</Link>
            <Link to="/about">ℹ️ About Us</Link>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Cart */}
      <Link to="/cart" className={`nav-cart ${isActive('/cart') ? 'active' : ''}`}>
        🛒 Cart <span className="cart-count">{cart.length}</span>
      </Link>

      {/* Wishlist */}
      <Link to="/wishlist" className={`nav-wishlist ${isActive('/wishlist') ? 'active' : ''}`}>
        ❤️ Wishlist <span className="wishlist-count">{wishlist.length}</span>
      </Link>
    </nav>
  );
}

