import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const WomenSale = () => {
  const womenSaleProducts = products.filter(
    product => product.category === 'women' && product.discount
  );

  return (
    <div className="sale-page">
      <div className="container">
        <div className="sale-header">
          <h1>Women's Sale</h1>
          <p className="sale-subtitle">Up to 50% off on women's items</p>
        </div>
        
        <div className="product-grid">
          {womenSaleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {womenSaleProducts.length === 0 && (
          <div className="no-products">
            <p>No sale items found in women's category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenSale;