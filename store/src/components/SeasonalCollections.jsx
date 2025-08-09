import React from 'react';
import { Link } from 'react-router-dom';

const SeasonalCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Summer Collection",
      description: "Light and breezy styles for warm days",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop",
      link: "/women",
      color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
      id: 2,
      name: "Autumn Essentials",
      description: "Cozy layers and warm tones",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop",
      link: "/women",
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      id: 3,
      name: "Winter Warmth",
      description: "Stay cozy with our winter collection",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop",
      link: "/women",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }
  ];

  return (
    <section className="seasonal-collections">
      <div className="container">
        <h2 className="section-title">Seasonal Collections</h2>
        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card">
              <div className="collection-image">
                <img src={collection.image} alt={collection.name} />
                <div className="collection-overlay">
                  <div className="collection-content">
                    <h3 className="collection-name">{collection.name}</h3>
                    <p className="collection-description">{collection.description}</p>
                    <Link to={collection.link} className="collection-button">
                      Shop Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeasonalCollections;