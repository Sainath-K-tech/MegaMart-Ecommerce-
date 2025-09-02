import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const returnTo = location.state?.returnTo || '/';
  const orderData = location.state?.orderData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let endpoint = 'http://localhost:5000/api/auth/login';
      
      // If admin login, use setup-admin endpoint for first time
      if (userType === 'admin') {
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', formData);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          if (response.data.user.isAdmin) {
            navigate('/admin');
          } else {
            setError('This account is not an admin account');
          }
        } catch (error) {
          if (error.response?.status === 400) {
            setError('Admin account not found. Please create one first using the setup endpoint.');
          } else {
            setError(error.response?.data?.message || 'Login failed');
          }
        }
      } else {
        // Regular user login
        const response = await axios.post(endpoint, formData);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        if (response.data.user.isAdmin) {
          navigate('/admin');
        } else {
          // Navigate back to the original page or home
          if (returnTo === '/payment' && orderData) {
            navigate('/payment', { state: { orderData: orderData } });
          } else {
            navigate(returnTo);
          }
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to MegaMart</h2>
        
        {/* User Type Selection */}
        <div className="user-type-selection">
          <label className="user-type-label">Login as:</label>
          <div className="user-type-buttons">
            <button
              type="button"
              className={`user-type-btn ${userType === 'user' ? 'active' : ''}`}
              onClick={() => setUserType('user')}
            >
              👤 Regular User
            </button>
            <button
              type="button"
              className={`user-type-btn ${userType === 'admin' ? 'active' : ''}`}
              onClick={() => setUserType('admin')}
            >
              🔧 Admin
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${userType === 'admin' ? 'Admin' : 'User'}`}
          </button>
        </form>

        <div className="auth-links">
          <p>Don't have an account? <a href="/register">Register here</a></p>
          {userType === 'admin' && (
            <div className="admin-setup-info">
              <p><strong>First time admin?</strong></p>
              <p>Create admin account using:</p>
              <code>POST /api/auth/setup-admin</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
