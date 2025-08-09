import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const KidsSale = () => {
  const kidsSaleProducts = products.filter(
    product => product.category === 'kids' && product.discount
  );

  return (
    <div className="sale-page">
      <div className="container">
        <div className="sale-header">
          <h1>Kids' Sale</h1>
          <p className="sale-subtitle">Up to 50% off on kids' items</p>
        </div>
        
        <div className="product-grid">
          {kidsSaleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {kidsSaleProducts.length === 0 && (
          <div className="no-products">
            <p>No sale items found in kids' category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KidsSale;