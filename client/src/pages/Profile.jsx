import React, { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      try {
        const userObj = JSON.parse(userData);
        setUser(userObj);
        setEditedAddress(userObj.address || '');
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }

   
    
    setLoading(false);
  }, []);

  const handleAddressSave = () => {
    if (user) {
      const updatedUser = { ...user, address: editedAddress };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditingAddress(false);
    }
  };

  const handleAddressCancel = () => {
    setEditedAddress(user?.address || '');
    setIsEditingAddress(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const handleDeactivateAccount = () => {
    if (window.confirm('Are you sure you want to deactivate your account? You can reactivate it later by logging in.')) {
      // In real app, this would call an API
      alert('Account deactivated successfully');
    }
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I change my password?",
      answer: "Go to your profile settings and click on 'Change Password'. You'll need to enter your current password and then set a new one."
    },
    {
      id: 2,
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 2 hours of placement. Contact our customer support for assistance with order cancellations."
    },
    {
      id: 3,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition with all packaging intact."
    },
    {
      id: 4,
      question: "How do I track my order?",
      answer: "You can track your order in real-time through your profile page. We'll also send you email updates on your order status."
    }
  ];

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="loading-profile">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="no-user">
            <div className="no-user-icon">🔒</div>
            <h2>Please Login to View Profile</h2>
            <p>You need to be logged in to access your profile information.</p>
            <div className="auth-buttons">
              <a href="/login" className="login-btn">Login</a>
              <a href="/register" className="register-btn">Register</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src="https://i.postimg.cc/CZC6pHZK/profile.avif" 
              alt="Profile Avatar" 
            />
          </div>
          <div className="profile-info">
            <h1>{user.name}</h1>
            <p className="user-email">{user.email}</p>
            <p className="user-role">{user.isAdmin ? '🔧 Admin User' : '👤 Regular User'}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="profile-section">
          <h2>📋 Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <label>Phone Number</label>
              <p>{user.phone || 'Not provided'}</p>
            </div>
            <div className="info-item">
              <label>Address</label>
              {isEditingAddress ? (
                <div className="address-edit">
                  <textarea
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    placeholder="Enter your address"
                    rows="3"
                  />
                  <div className="address-actions">
                    <button onClick={handleAddressSave} className="save-btn">
                      Save
                    </button>
                    <button onClick={handleAddressCancel} className="cancel-btn">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="address-display">
                  <p>{user.address || 'No address provided'}</p>
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="edit-btn"
                  >
                    ✏️ Edit Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="profile-section">
          <h2>📊 Account Statistics</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{orders.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{wishlist.length}</span>
              <span className="stat-label">Wishlist Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{cart.length}</span>
              <span className="stat-label">Cart Items</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.isAdmin ? 'Admin' : 'User'}</span>
              <span className="stat-label">Account Type</span>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div className="quick-nav">
            <h3>Quick Access</h3>
            <div className="nav-buttons">
              <a href="/my-orders" className="nav-btn orders-btn">
                📦 View All Orders
              </a>
              <a href="/wishlist" className="nav-btn wishlist-btn">
                ❤️ My Wishlist
              </a>
              <a href="/cart" className="nav-btn cart-btn">
                🛒 Shopping Cart
              </a>
            </div>
          </div>
        </div>

        {/* Account Management */}
        <div className="profile-section">
          <h2>⚙️ Account Management</h2>
          <div className="account-actions">
            <button className="action-btn change-password-btn">
              🔐 Change Password
            </button>
            <button 
              onClick={handleDeactivateAccount}
              className="action-btn deactivate-btn"
            >
              🚫 Deactivate Account
            </button>
            <button 
              onClick={handleDeleteAccount}
              className="action-btn delete-btn"
            >
              🗑️ Delete Account
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="profile-section">
          <h2>❓ Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button 
                  className={`faq-question ${activeFaq === faq.id ? 'active' : ''}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.question}
                  <span className="faq-icon">{activeFaq === faq.id ? '−' : '+'}</span>
                </button>
                <div className={`faq-answer ${activeFaq === faq.id ? 'active' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order History */}
        <div className="profile-section">
          <h2>📦 Order History</h2>
          {orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders yet. Start shopping to see your order history!</p>
              <a href="/" className="shop-now-btn">Shop Now</a>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p className="order-date">Placed on {order.date}</p>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-total">
                      ₹{order.total}
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item-detail">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>₹{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
