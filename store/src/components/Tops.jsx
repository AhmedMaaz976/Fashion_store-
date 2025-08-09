import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Tops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const topProducts = products.filter(product => product.subcategory === 'tops');
  
  const filteredProducts = selectedCategory === 'all' 
    ? topProducts 
    : topProducts.filter(product => product.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'women', name: 'Women' },
    { id: 'men', name: 'Men' },
    { id: 'kids', name: 'Kids' }
  ];

  return (
    <div className="category-page">
      <div className="container">
        <h1>Tops Collection</h1>
        
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
            <p>No tops found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tops;