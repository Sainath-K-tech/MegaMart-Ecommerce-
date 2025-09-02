import React, { useState } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped! 🚚',
      message: 'Your order #ORD123 has been shipped and is on its way to you.',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Flash Sale Alert! ⚡',
      message: 'Get up to 50% off on electronics! Sale ends in 2 hours.',
      time: '4 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'system',
      title: 'Welcome to MegaMart! 🎉',
      message: 'Thank you for joining our platform. Start exploring amazing products!',
      time: '1 day ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'price',
      title: 'Price Drop Alert! 📉',
      message: 'The price of iPhone 15 Pro has dropped by ₹5,000!',
      time: '1 day ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'stock',
      title: 'Back in Stock! 📦',
      message: 'Samsung Galaxy S24 is now back in stock. Order now!',
      time: '2 days ago',
      read: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'promo': return '🎯';
      case 'system': return '⚙️';
      case 'price': return '💰';
      case 'stock': return '📊';
      default: return '🔔';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <div className="notifications-card">
        <div className="notifications-header">
          <h1>🔔 Notifications</h1>
          <div className="header-actions">
            <span className="unread-count">{unreadCount} unread</span>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="mark-all-read-btn">
                Mark All as Read
              </button>
            )}
          </div>
        </div>

        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <div className="no-notifications-icon">🔕</div>
              <h3>No notifications yet</h3>
              <p>You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.priority}`}
              >
                <div className="notification-icon">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h3>{notification.title}</h3>
                    <div className="notification-meta">
                      <span className="notification-time">{notification.time}</span>
                      <span 
                        className="priority-indicator"
                        style={{ backgroundColor: getPriorityColor(notification.priority) }}
                      >
                        {notification.priority}
                      </span>
                    </div>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="action-btn mark-read-btn"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification.id)}
                      className="action-btn delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="notifications-footer">
          <div className="notification-stats">
            <div className="stat-item">
              <span className="stat-number">{notifications.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{unreadCount}</span>
              <span className="stat-label">Unread</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{notifications.filter(n => n.type === 'promo').length}</span>
              <span className="stat-label">Promotions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

