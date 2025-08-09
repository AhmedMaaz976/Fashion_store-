import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import CategorySection from './CategorySection';
import NewArrivals from './NewArrivals';
import SeasonalCollections from './SeasonalCollections';
import SeasonalSale from './SeasonalSale';
import Testimonials from './Testimonials';
import ShopTheLook from './ShopTheLook';
import Newsletter from './Newsletter';
import { products as sampleProducts } from '../data/product';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only show sample data on the home page (no live API calls)
    setProducts(sampleProducts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* No error banner since we are not calling live API here */}
      <Hero />
      <CategorySection />
      <NewArrivals products={products} />
      <SeasonalCollections />
      <SeasonalSale products={products} />
      <Testimonials />
      <ShopTheLook />
      <Newsletter />
    </div>
  );
};

export default Home;