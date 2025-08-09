import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Sale = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const saleProducts = products.filter(product => product.discount);
  
  const filteredProducts = selectedCategory === 'all' 
    ? saleProducts 
    : saleProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids', name: 'Kids' }
  ];

  return (
    <div className="sale-page">
      <div className="container">
        <div className="sale-header">
          <h1>Sale Items</h1>
          <p className="sale-subtitle">Up to 50% off on selected items</p>
        </div>
        
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-button ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No sale items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sale;