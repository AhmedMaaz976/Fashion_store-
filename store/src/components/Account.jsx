import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || 'John',
    lastName: user?.lastName || 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  });

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="account-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Login Required</h2>
            <p>You must be logged in to access your account.</p>
            <Link to="/login" className="continue-shopping">
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="account-page">
      <div className="container">
        <h1>My Account</h1>
        
        <div className="account-container">
          <div className="account-sidebar">
            <button
              className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`tab-button ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              Orders
            </button>
            <button
              className={`tab-button ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              Wishlist
            </button>
            <button
              className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </div>

          <div className="account-content">
            {activeTab === 'profile' && (
              <div className="profile-section">
                <h2>Profile Information</h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={profileData.city}
                        onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        value={profileData.state}
                        onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        value={profileData.zipCode}
                        onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                      />
                    </div>
                  </div>

                  <button type="submit" className="update-button">
                    Update Profile
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="orders-section">
                <h2>Order History</h2>
                <div className="order-list">
                  <div className="order-item">
                    <div className="order-header">
                      <h3>Order #12345</h3>
                      <span className="order-date">March 15, 2024</span>
                      <span className="order-status">Delivered</span>
                    </div>
                    <div className="order-details">
                      <p>Summer Floral Dress, Classic Denim Jacket</p>
                      <p className="order-total">Total: $129.98</p>
                    </div>
                  </div>
                  
                  <div className="order-item">
                    <div className="order-header">
                      <h3>Order #12344</h3>
                      <span className="order-date">March 10, 2024</span>
                      <span className="order-status">Shipped</span>
                    </div>
                    <div className="order-details">
                      <p>Premium Cotton T-Shirt</p>
                      <p className="order-total">Total: $24.99</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="wishlist-section">
                <h2>My Wishlist</h2>
                <p>Your wishlist is empty. Start adding items!</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <div className="settings-options">
                  <div className="setting-item">
                    <h3>Change Password</h3>
                    <p>Update your account password</p>
                    <button className="setting-button">Change Password</button>
                  </div>
                  
                  <div className="setting-item">
                    <h3>Email Preferences</h3>
                    <p>Manage your email notifications</p>
                    <button className="setting-button">Manage Preferences</button>
                  </div>
                  
                  <div className="setting-item">
                    <h3>Privacy Settings</h3>
                    <p>Control your privacy and data</p>
                    <button className="setting-button">Privacy Settings</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;