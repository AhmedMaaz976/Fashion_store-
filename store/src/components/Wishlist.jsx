import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <h1>My Wishlist</h1>
            <div className="empty-wishlist-content">
              <h2>Login Required</h2>
              <p>You must be logged in to view your wishlist.</p>
              <Link to="/login" className="continue-shopping">
                Login to Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const removeFromWishlist = (productId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="container">
          <div className="empty-wishlist">
            <h1>My Wishlist</h1>
            <div className="empty-wishlist-content">
              <h2>Your wishlist is empty</h2>
              <p>Start adding items you love to your wishlist!</p>
              <p>You can save products by clicking the heart icon on any product page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1>My Wishlist</h1>
        <div className="wishlist-grid">
          {wishlistItems.map(product => (
            <div key={product.id} className="wishlist-item">
              <ProductCard product={product} />
              <button
                className="remove-from-wishlist"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;