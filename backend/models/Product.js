const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0,
    default: null
  },
  discount: {
    type: String,
    default: null
  },
  isNew: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['women', 'men', 'kids']
  },
  subcategory: {
    type: String,
    required: true,
    enum: ['dresses', 'tops', 'bottoms', 'outerwear']
  },
  colors: [{
    type: String,
    required: true
  }],
  inStock: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  suppressReservedKeysWarning: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema); 