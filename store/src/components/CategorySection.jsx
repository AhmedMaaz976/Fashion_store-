import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = () => {
  const categories = [
    {
      name: 'Women',
      link: '/women',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop',
    },
    {
      name: 'Men',
      link: '/men',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop',
    },
    {
      name: 'Kids',
      link: '/kids',
      image: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500&auto=format&fit=crop',
    },
  ];

  return (
    <section className="category-section">
      <h2 className="section-title">Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <div className="category-overlay">
              <Link to={category.link} className="category-link">
                {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;