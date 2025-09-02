import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const orderData = location.state?.orderData;

  useEffect(() => {
    if (!orderData) {
      navigate("/cart");
      return;
    }
  }, [orderData, navigate]);

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
    setPaymentDetails({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePaymentDetails = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return false;
    }

    if (selectedMethod === "upi") {
      if (!paymentDetails.upiId) {
        alert("Please enter UPI ID");
        return false;
      }
    } else if (selectedMethod === "card") {
      if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv) {
        alert("Please fill in all card details");
        return false;
      }
    } else if (selectedMethod === "netbanking") {
      if (!paymentDetails.bankName || !paymentDetails.accountNumber) {
        alert("Please fill in all net banking details");
        return false;
      }
    }

    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentDetails()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Clear cart after successful payment
      clearCart();
      
      // Show success message and redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  if (!orderData) {
    return null;
  }

  if (showSuccess) {
    return (
      <div className="payment-success-overlay">
        <div className="payment-success-modal">
          <div className="success-icon">✅</div>
          <h2>Payment Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <p>Redirecting to home page...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Payment</h1>
        <p>Complete your purchase</p>
      </div>

      <div className="payment-content">
        <div className="order-summary-section">
          <div className="order-summary-card">
            <h2>Order Summary</h2>
            <div className="order-items">
              {orderData.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p className="item-price">₹{item.price}</p>
                    <p className="item-quantity">Qty: {item.qty}</p>
                  </div>
                  <div className="item-total">
                    ₹{item.price * item.qty}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>₹{orderData.subtotal}</span>
              </div>
              <div className="price-row">
                <span>Discount:</span>
                <span className="discount">-₹{orderData.discount}</span>
              </div>
              <div className="price-row">
                <span>Shipping:</span>
                <span>₹{orderData.shippingCharge}</span>
              </div>
              <hr />
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>₹{orderData.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-methods-section">
          <div className="payment-methods-card">
            <h2>Select Payment Method</h2>
            
            <div className="payment-method-options">
              <label className={`payment-option ${selectedMethod === "upi" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={selectedMethod === "upi"}
                  onChange={() => handlePaymentMethodChange("upi")}
                />
                <div className="option-content">
                  <span className="option-icon">📱</span>
                  <span className="option-text">UPI</span>
                </div>
              </label>

              <label className={`payment-option ${selectedMethod === "card" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={selectedMethod === "card"}
                  onChange={() => handlePaymentMethodChange("card")}
                />
                <div className="option-content">
                  <span className="option-icon">💳</span>
                  <span className="option-text">Credit/Debit Card</span>
                </div>
              </label>

              <label className={`payment-option ${selectedMethod === "netbanking" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={selectedMethod === "netbanking"}
                  onChange={() => handlePaymentMethodChange("netbanking")}
                />
                <div className="option-content">
                  <span className="option-icon">🏦</span>
                  <span className="option-text">Net Banking</span>
                </div>
              </label>
            </div>

            {selectedMethod && (
              <div className="payment-details-form">
                <h3>Payment Details</h3>
                
                {selectedMethod === "upi" && (
                  <div className="form-group">
                    <label htmlFor="upiId">UPI ID</label>
                    <input
                      type="text"
                      id="upiId"
                      name="upiId"
                      placeholder="Enter your UPI ID (e.g., user@upi)"
                      value={paymentDetails.upiId || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                {selectedMethod === "card" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber || ""}
                        onChange={handleInputChange}
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="expiry">Expiry Date</label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={paymentDetails.expiry || ""}
                          onChange={handleInputChange}
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={paymentDetails.cvv || ""}
                          onChange={handleInputChange}
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedMethod === "netbanking" && (
                  <>
                    <div className="form-group">
                      <label htmlFor="bankName">Bank Name</label>
                      <select
                        id="bankName"
                        name="bankName"
                        value={paymentDetails.bankName || ""}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="yes">Yes Bank</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="accountNumber">Account Number</label>
                      <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Enter your account number"
                        value={paymentDetails.accountNumber || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="pay-now-btn"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${orderData.total}`
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
