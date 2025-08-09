import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero" style={{
      background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&auto=format&fit=crop') no-repeat center center/cover"
    }}>
      <div className="hero-content">
        <h1 className="hero-title">New Season Arrivals</h1>
        <p className="hero-subtitle">Discover our collection for this season</p>
        <Link to="/new-in" className="hero-button">Shop Now</Link>
      </div>
    </section>
  );
};

export default Hero;