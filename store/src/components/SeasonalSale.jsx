import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const SeasonalSale = ({ products = [] }) => {
  const saleProducts = products.filter(product => product.discount).slice(0, 4);

  return (
    <section className="seasonal-sale">
      <div className="container">
        <div className="sale-header">
          <h2 className="section-title">Seasonal Sale</h2>
          <p className="sale-subtitle">Up to 50% off on selected items</p>
        </div>
        
        <div className="product-grid">
          {saleProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
        
        <div className="view-all-container">
          <Link to="/sale" className="view-all-button">
            View All Sale Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SeasonalSale;