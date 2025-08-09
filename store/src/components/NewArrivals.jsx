import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const NewArrivals = ({ products = [] }) => {
  const newProducts = products.filter(product => product.isNew).slice(0, 4);

  return (
    <section className="new-arrivals">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <Link to="/new-in" className="view-all-link">View All New Arrivals</Link>
        </div>
        
        <div className="product-grid">
          {newProducts.map(product => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;