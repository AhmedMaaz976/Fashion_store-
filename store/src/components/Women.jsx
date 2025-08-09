import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Women = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const womenProducts = products.filter(product => product.category === 'women');
  
  const filteredProducts = selectedCategory === 'all' 
    ? womenProducts 
    : womenProducts.filter(product => product.subcategory === selectedCategory);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'outerwear', name: 'Outerwear' }
  ];

  return (
    <div className="category-page">
      <div className="container">
        <h1>Women's Collection</h1>
        
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
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Women;