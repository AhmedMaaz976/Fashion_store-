import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Shop</h3>
          <ul>
            <li><Link to="/new-in">New In</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/kids">Kids</Link></li>
            <li><Link to="/sale">Sale</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li><Link to="/">Customer Service</Link></li>
            <li><Link to="/">Track Order</Link></li>
            <li><Link to="/">Returns & Exchanges</Link></li>
            <li><Link to="/">Shipping Info</Link></li>
            <li><Link to="/">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Sustainability</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://pinterest.com">Pinterest</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Commerce Store. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;