import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/product';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setHasSearched(true);
    }
  };

  return (
    <div className="search-page">
      <div className="container">
        <h1>Search Products</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
        </form>

        {hasSearched && (
          <div className="search-results">
            <h2>
              {searchResults.length > 0 
                ? `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''}`
                : 'No products found'
              }
            </h2>
            
            {searchResults.length > 0 && (
              <div className="product-grid">
                {searchResults.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;