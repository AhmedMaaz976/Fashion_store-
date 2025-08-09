import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // In a real app, you would send this to your backend
      console.log('Newsletter subscription:', email);
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips!</p>
          {!subscribed ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          ) : (
            <div className="subscription-success">
              <p>Thank you for subscribing! 🎉</p>
              <p>You'll receive our latest updates soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;