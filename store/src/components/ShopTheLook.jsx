import React from 'react';
import { Link } from 'react-router-dom';

const ShopTheLook = () => {
  const looks = [
    {
      id: 1,
      name: "Casual Weekend",
      description: "Perfect for brunch and shopping",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop",
      link: "/women"
    },
    {
      id: 2,
      name: "Office Chic",
      description: "Professional and stylish workwear",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&auto=format&fit=crop",
      link: "/women"
    },
    {
      id: 3,
      name: "Evening Elegance",
      description: "Sophisticated looks for special occasions",
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400&auto=format&fit=crop",
      link: "/women"
    },
    {
      id: 4,
      name: "Street Style",
      description: "Trendy urban fashion statements",
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&auto=format&fit=crop",
      link: "/men"
    }
  ];

  return (
    <section className="shop-the-look">
      <div className="container">
        <h2 className="section-title">Shop The Look</h2>
        <div className="look-grid">
          {looks.map((look) => (
            <div key={look.id} className="look-item">
              <Link to={look.link}>
                <img src={look.image} alt={look.name} />
                <h3>{look.name}</h3>
                <p>{look.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopTheLook;