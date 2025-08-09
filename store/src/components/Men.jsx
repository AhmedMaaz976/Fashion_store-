import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Men = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const menProducts = products.filter(product => product.category === 'men');
  
  const filteredProducts = selectedCategory === 'all' 
    ? menProducts 
    : menProducts.filter(product => product.subcategory === selectedCategory);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'outerwear', name: 'Outerwear' }
  ];

  return (
    <div className="category-page">
      <div className="container">
        <h1>Men's Collection</h1>
        
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

export default Men;