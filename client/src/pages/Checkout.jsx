import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = Math.round(totalPrice * 0.1);
  const finalAmount = totalPrice - discount + 70; // Adding shipping charge

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || 
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert("Please fill in all fields");
      return;
    }
    
    // Navigate to payment page with order data
    navigate("/payment", { 
      state: { 
        orderData: {
          items: cart,
          shipping: formData,
          total: finalAmount,
          subtotal: totalPrice,
          discount: discount,
          shippingCharge: 70
        }
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="checkout-empty-content">
          <h2>🛒 Your cart is empty</h2>
          <p>Please add items to your cart before proceeding to checkout.</p>
          <button onClick={() => navigate("/products")} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Secure Checkout</h1>
        <p>Complete your purchase with confidence</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <div className="form-card">
            <h2>Shipping Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">10-Digit Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  pattern="[0-9]{10}"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Full Address (House No, Street, Landmark)</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter your pincode"
                  pattern="[0-9]{6}"
                  required
                />
              </div>
            </form>
          </div>
        </div>

        <div className="order-summary-section">
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <img src={item.thumbnail} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>Qty: {item.qty}</p>
                    </div>
                  </div>
                  <span className="item-price">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="order-total">
              <div className="total-row">
                <span>Order Total:</span>
                <span>₹{totalPrice} (+ ₹70 Shipping)</span>
              </div>
              <div className="total-row discount">
                <span>Discount:</span>
                <span>-₹{discount}</span>
              </div>
              <div className="total-row final">
                <span>Final Amount:</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            <button 
              type="submit" 
              className="proceed-pay-btn"
              onClick={handleSubmit}
            >
              PROCEED TO PAY
            </button>

            <div className="checkout-benefits">
              <p>✅ Secure payment gateway</p>
              <p>✅ Free delivery on orders above ₹499</p>
              <p>✅ Easy returns & exchanges</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
