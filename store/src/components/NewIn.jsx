import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const NewIn = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const newProducts = products.filter(product => product.isNew);
  
  const filteredProducts = selectedCategory === 'all' 
    ? newProducts 
    : newProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids', name: 'Kids' }
  ];

  return (
    <div className="new-in-page">
      <div className="container">
        <div className="new-in-header">
          <h1>New Arrivals</h1>
          <p className="new-in-subtitle">Discover our latest collection</p>
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
            <p>No new products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewIn;