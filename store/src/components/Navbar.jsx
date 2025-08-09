import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, getItemCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <span className="logo-text">FashionStore</span>
          </Link>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/women" className="navbar-link">Women</Link>
            <Link to="/men" className="navbar-link">Men</Link>
            <Link to="/kids" className="navbar-link">Kids</Link>
            <Link to="/sale" className="navbar-link">Sale</Link>
            <Link to="/new-in" className="navbar-link">New In</Link>
          </div>

          <div className="navbar-actions">
            <Link to="/search" className="navbar-link">
              <i className="fas fa-search"></i>
            </Link>
            
            {isAuthenticated ? (
              <div className="user-menu">
                <Link to="/account" className="navbar-link">
                  <i className="fas fa-user"></i>
                  <span className="user-name">{user?.firstName}</span>
                </Link>
                <Link to="/wishlist" className="navbar-link">
                  <i className="fas fa-heart"></i>
                </Link>
                <button onClick={handleLogout} className="logout-button" title="Logout" aria-label="Logout">
                  <i className="fas fa-sign-out-alt" aria-hidden="true"></i>
                  <span className="sr-only">Logout</span>
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Register</Link>
              </div>
            )}

            <Link to="/cart" className="navbar-link cart-link">
              <i className="fas fa-shopping-cart"></i>
              {getItemCount() > 0 && (
                <span className="cart-count">{getItemCount()}</span>
              )}
            </Link>

            <button 
              className="navbar-toggle" 
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className="hamburger"></span>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;