import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      color: selectedColor
    });
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      setLoading(true);
      await authAPI.addToWishlist(product._id);
      alert('Added to wishlist!');
    } catch (error) {
      alert('Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      setLoading(true);
      await authAPI.removeFromWishlist(product._id);
      // You might want to refresh the wishlist or update local state
      alert('Removed from wishlist!');
    } catch (error) {
      alert('Failed to remove from wishlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="product-image"
        />
        
        {product.isNew && (
          <span className="product-badge new-badge">NEW</span>
        )}
        
        {product.discount && (
          <span className="product-badge discount-badge">{product.discount}</span>
        )}

        <div className="product-actions">
          <button 
            onClick={handleAddToCart}
            className="add-to-cart-button"
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <button 
            onClick={handleAddToWishlist}
            className="wishlist-button"
            disabled={loading}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>

      <div className="product-info">
        <Link to={`/product/${product._id || product.id}`} className="product-name">
          {product.name}
        </Link>
        
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>

        {product.colors.length > 1 && (
          <div className="product-colors">
            {product.colors.map((color) => (
              <button
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        )}

        {product.rating > 0 && (
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas fa-star ${i < product.rating ? 'filled' : ''}`}
              />
            ))}
            <span className="rating-count">({product.numReviews})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;