import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state?.orderData;
  const paymentMethod = location.state?.paymentMethod;

  if (!orderData) {
    return (
      <div className="success-error">
        <div className="error-content">
          <h2>⚠️ Order Data Not Found</h2>
          <p>Please return to your cart and try again.</p>
          <button onClick={() => navigate("/cart")} className="back-btn">
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  const generateOrderId = () => {
    // Use the order ID from the database if available, otherwise generate one
    return orderData.orderId || 'ORD' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPaymentMethodText = () => {
    switch (paymentMethod) {
      case 'upi':
        return 'UPI Payment';
      case 'card':
        return 'Credit/Debit Card';
      case 'netbanking':
        return 'Net Banking';
      default:
        return 'Payment';
    }
  };

  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case 'upi':
        return '📱';
      case 'card':
        return '💳';
      case 'netbanking':
        return '🏦';
      default:
        return '💰';
    }
  };

  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Your order has been placed successfully</p>
        </div>

        <div className="order-details-card">
          <h2>Order Details</h2>
          
          <div className="order-info">
            <div className="info-row">
              <span className="label">Order ID:</span>
              <span className="value">{generateOrderId()}</span>
            </div>
            <div className="info-row">
              <span className="label">Order Date:</span>
              <span className="value">{formatDate()}</span>
            </div>
            <div className="info-row">
              <span className="label">Payment Method:</span>
              <span className="value">
                {getPaymentMethodIcon()} {getPaymentMethodText()}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Total Amount:</span>
              <span className="value amount">₹{orderData.total}</span>
            </div>
          </div>

          <div className="shipping-details">
            <h3>Shipping Details</h3>
            <div className="shipping-info">
              <p><strong>Name:</strong> {orderData.shipping.fullName}</p>
              <p><strong>Email:</strong> {orderData.shipping.email}</p>
              <p><strong>Phone:</strong> {orderData.shipping.phone}</p>
              <p><strong>Address:</strong> {orderData.shipping.address}</p>
              <p><strong>City:</strong> {orderData.shipping.city}, <strong>State:</strong> {orderData.shipping.state}</p>
              <p><strong>Pincode:</strong> {orderData.shipping.pincode}</p>
            </div>
          </div>

          <div className="order-items">
            <h3>Order Items</h3>
            <div className="items-list">
              {orderData.items.map((item, index) => (
                <div key={index} className="item">
                  <div className="item-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h4>{item.title}</h4>
                    <p>Quantity: {item.qty}</p>
                    <p className="item-price">₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{orderData.subtotal}</span>
            </div>
            <div className="summary-row discount">
              <span>Discount:</span>
              <span>-₹{orderData.discount}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>₹{orderData.shippingCharge}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{orderData.total}</span>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps">
            <div className="step">
              <div className="step-icon">📧</div>
              <div className="step-content">
                <h4>Order Confirmation</h4>
                <p>You'll receive an email confirmation with your order details</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">📦</div>
              <div className="step-content">
                <h4>Order Processing</h4>
                <p>We'll start processing your order within 24 hours</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">🚚</div>
              <div className="step-content">
                <h4>Shipping</h4>
                <p>You'll receive tracking information once your order ships</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => navigate("/my-orders")} 
            className="view-orders-btn"
          >
            View My Orders
          </button>
          <button 
            onClick={() => navigate("/")} 
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>

        <div className="support-info">
          <p>Need help? Contact our support team at <strong>support@megamart.com</strong></p>
          <p>Or call us at <strong>+91 1800-123-4567</strong></p>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
