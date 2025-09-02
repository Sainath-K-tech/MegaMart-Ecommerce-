import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-card">
          <div className="empty-wishlist">
            <div className="empty-icon">💔</div>
            <h2>Your Wishlist is Empty</h2>
            <p>Start adding products to your wishlist to see them here!</p>
            <a href="/" className="browse-products-btn">Browse Products</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-card">
        <div className="wishlist-header">
          <h1>❤️ My Wishlist</h1>
          <div className="wishlist-actions">
            <span className="wishlist-count">{wishlist.length} items</span>
            <button onClick={clearWishlist} className="clear-wishlist-btn">
              Clear All
            </button>
          </div>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((product) => (
            <div key={product._id || product.id} className="wishlist-item">
              <div className="product-image">
                <img src={product.thumbnail || product.image} alt={product.title || product.name} />
                <button
                  onClick={() => handleRemoveFromWishlist(product._id || product.id)}
                  className="remove-wishlist-btn"
                  title="Remove from wishlist"
                >
                  ❌
                </button>
              </div>

              <div className="product-details">
                <h3 className="product-title">{product.title || product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-info">
                  <span className="product-price">₹{product.price}</span>
                  <span className="product-rating">⭐ {product.rating}</span>
                </div>

                <div className="product-actions">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="add-to-cart-btn"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id || product.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="wishlist-footer">
          <div className="wishlist-summary">
            <p>Total Items: <strong>{wishlist.length}</strong></p>
            <p>Total Value: <strong>₹{wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</strong></p>
          </div>
          <div className="wishlist-footer-actions">
            <button onClick={clearWishlist} className="clear-all-btn">
              Clear Wishlist
            </button>
            <a href="/" className="continue-shopping-btn">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
