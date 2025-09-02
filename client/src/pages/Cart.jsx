import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-content">
          <h2>🛒 Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>My Cart ({cart.length} items)</h1>
      </div>

      <div className="cart-content">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.thumbnail} alt={item.title} />
              </div>

              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description.slice(0, 80)}...</p>
                <p className="item-price">₹{item.price}</p>
                
                <div className="item-actions">
                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="qty-btn decrease"
                      disabled={item.qty <= 1}
                    >
                      -
                    </button>
                    <span className="qty-display">{item.qty}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="qty-btn increase"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>

              <div className="item-total">
                <p className="total-price">₹{item.price * item.qty}</p>
                <p className="item-qty">Qty: {item.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Price Details */}
        <div className="price-details">
          <h2>PRICE DETAILS</h2>
          
          <div className="price-breakdown">
            <div className="price-row">
              <span>Price ({cart.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <div className="price-row">
              <span>Discount</span>
              <span className="discount">-₹{Math.round(totalPrice * 0.1)}</span>
            </div>
            
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="free-delivery">Free</span>
            </div>
            
            <hr className="price-divider" />
            
            <div className="price-row total">
              <span>Total Amount</span>
              <span>₹{Math.round(totalPrice * 0.9)}</span>
            </div>
          </div>

          <button 
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
          
          <div className="cart-benefits">
            <p>✅ Free delivery on orders above ₹499</p>
            <p>✅ Easy returns & exchanges</p>
            <p>✅ Secure payment options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
