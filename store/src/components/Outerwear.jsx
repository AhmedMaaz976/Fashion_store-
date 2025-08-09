import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Outerwear = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const outerwearProducts = products.filter(product => product.subcategory === 'outerwear');
  
  const filteredProducts = selectedCategory === 'all' 
    ? outerwearProducts 
    : outerwearProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids', name: 'Kids' }
  ];

  return (
    <div className="category-page">
      <div className="container">
        <h1>Outerwear Collection</h1>
        
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
            <p>No outerwear found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Outerwear;