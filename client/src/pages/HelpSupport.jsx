import React, { useState } from 'react';
import './HelpSupport.css';

const HelpSupport = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I create an account?",
      answer: "Click on the Profile button in the top navigation, then select 'Register' to create a new account. You can choose between a regular user account or an admin account."
    },
    {
      id: 2,
      question: "How do I add products to my cart?",
      answer: "Browse products on the homepage, click on any product, and use the 'Add to Cart' button. You can also adjust quantities in your cart."
    },
    {
      id: 3,
      question: "How do I access the admin dashboard?",
      answer: "Login with an admin account, and you'll be automatically redirected to the admin dashboard where you can manage products."
    },
    {
      id: 4,
      question: "Can I edit or delete products?",
      answer: "Yes, if you're logged in as an admin, you can edit and delete products from the admin dashboard."
    },
    {
      id: 5,
      question: "How do I search for products?",
      answer: "Use the search bar in the navigation to find specific products, or browse by categories using the Categories dropdown."
    }
  ];

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="help-container">
      <div className="help-card">
        <h1>Help & Support</h1>
        
        <div className="contact-section">
          <h2>📧 Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <h3>Email</h3>
              <p>ksainath23102003@gmail.com.com</p>
              <a href="mailto:ksainath23102003@gmail.com.com" className="contact-link">Send Email</a>
            </div>
            <div className="contact-item">
              <h3>Portfolio</h3>
              <p>View my work and projects</p>
              <a 
                href="https://your-portfolio-url.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-link portfolio"
              >
                Visit Portfolio
              </a>
            </div>
            <div className="contact-item">
              <h3>Response Time</h3>
              <p>Within 24 hours</p>
              <span className="status-badge">Active</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
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

        <div className="support-section">
          <h2>🛠️ Technical Support</h2>
          <div className="support-content">
            <div className="support-item">
              <h3>Browser Compatibility</h3>
              <p>This application works best on modern browsers like Chrome, Firefox, Safari, and Edge.</p>
            </div>
            <div className="support-item">
              <h3>Mobile Support</h3>
              <p>Fully responsive design that works on all mobile devices and screen sizes.</p>
            </div>
            <div className="support-item">
              <h3>Performance</h3>
              <p>Optimized for fast loading and smooth user experience across all devices.</p>
            </div>
          </div>
        </div>

        <div className="quick-links">
          <h2>🔗 Quick Links</h2>
          <div className="links-grid">
            <a href="/" className="quick-link">🏠 Home</a>
            <a href="/about" className="quick-link">ℹ️ About Us</a>
            <a href="/cart" className="quick-link">🛒 Shopping Cart</a>
            <a href="/login" className="quick-link">🔐 Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
