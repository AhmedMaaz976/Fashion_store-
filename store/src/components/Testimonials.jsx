import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing quality and fast delivery! The summer dress I ordered fits perfectly and the fabric is so comfortable. Will definitely shop here again!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "Great customer service and excellent product quality. The denim jacket exceeded my expectations. Highly recommend this store!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      comment: "Love the variety of styles and sizes available. The silk blouse is absolutely gorgeous and the fit is perfect. Thank you!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop"
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img 
                src={testimonial.image} 
                alt={testimonial.name} 
                className="testimonial-image"
              />
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-comment">"{testimonial.comment}"</p>
              <p className="testimonial-author">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;