import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const MenSale = () => {
  const menSaleProducts = products.filter(
    product => product.category === 'men' && product.discount
  );

  return (
    <div className="sale-page">
      <div className="container">
        <div className="sale-header">
          <h1>Men's Sale</h1>
          <p className="sale-subtitle">Up to 50% off on men's items</p>
        </div>
        
        <div className="product-grid">
          {menSaleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {menSaleProducts.length === 0 && (
          <div className="no-products">
            <p>No sale items found in men's category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenSale;