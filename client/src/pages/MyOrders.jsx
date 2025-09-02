import React, { useState, useEffect } from 'react';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        setOrders(result.orders);
      } else {
        setError(result.message || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'shipped':
        return '#17a2b8';
      case 'processing':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '✅';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const result = await response.json();

        if (result.success) {
          // Refresh orders after successful deletion
          fetchOrders();
        } else {
          alert(result.message || 'Failed to cancel order');
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="orders-card">
          <div className="loading-orders">
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="orders-card">
          <div className="error-orders">
            <p>❌ {error}</p>
            <button onClick={fetchOrders} className="retry-btn">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-card">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <div className="orders-summary">
            <span className="total-orders">{orders.length} orders</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">📭</div>
            <h2>No Orders Yet</h2>
            <p>Start shopping to see your order history here!</p>
            <a href="/" className="shop-now-btn">Start Shopping</a>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {order.date}</p>
                    <div className="order-status-container">
                      <span 
                        className="order-status"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="order-total">
                    <span className="total-label">Total</span>
                    <span className="total-amount">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">₹{item.price.toLocaleString()}</p>
                      </div>
                      <div className="item-quantity">
                        Qty: {item.quantity}
                      </div>
                      <div className="item-total">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-tracking">
                    <span className="tracking-label">Tracking Number:</span>
                    <span className="tracking-number">{order.tracking}</span>
                  </div>
                  <div className="order-delivery">
                    {order.status === 'Delivered' ? (
                      <span className="delivery-info">
                        🎉 Delivered on {order.deliveryDate}
                      </span>
                    ) : order.estimatedDelivery ? (
                      <span className="delivery-info">
                        📅 Estimated delivery: {order.estimatedDelivery}
                      </span>
                    ) : (
                      <span className="delivery-info">
                        📋 Order is being processed
                      </span>
                    )}
                  </div>
                  <div className="order-actions">
                    <button className="action-btn track-btn">
                      📍 Track Order
                    </button>
                    <button className="action-btn details-btn">
                      📋 Order Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="action-btn review-btn">
                        ⭐ Write Review
                      </button>
                    )}
                    <button className="action-btn delete-btn" onClick={() => handleDeleteOrder(order.id)}>
                      🗑️ Delete Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
