const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Sample products fallback (mirrors frontend sample data shape)
const sampleProducts = [
  {
    _id: '1',
    name: 'Summer Floral Dress',
    price: 49.99,
    originalPrice: 69.99,
    discount: '30% OFF',
    isNew: true,
    category: 'women',
    subcategory: 'dresses',
    colors: ['Red', 'Blue', 'White'],
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop',
    ],
    description: 'A lightweight summer dress perfect for warm weather. Made from breathable cotton with a comfortable fit.',
    features: ['Premium cotton material', 'Comfortable fit', 'Easy care', '30-day return policy'],
    rating: 4,
    numReviews: 10
  },
];
const { auth, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/products
// @desc    Get all products with optional filtering
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Serve from sample data if enabled
    if (process.env.USE_FAKE_PRODUCTS === 'true') {
      // Basic filter and pagination on sample data
      const { category, subcategory, isNew, discount, page = 1, limit = 12 } = req.query;
      let data = [...sampleProducts];
      if (category) data = data.filter(p => p.category === category);
      if (subcategory) data = data.filter(p => p.subcategory === subcategory);
      if (isNew === 'true') data = data.filter(p => p.isNew);
      if (discount === 'true') data = data.filter(p => !!p.discount);
      const start = (parseInt(page) - 1) * parseInt(limit);
      const paged = data.slice(start, start + parseInt(limit));
      return res.json({ products: paged, totalPages: Math.ceil(data.length / parseInt(limit)), currentPage: parseInt(page), total: data.length });
    }
    const {
      category,
      subcategory,
      search,
      minPrice,
      maxPrice,
      isNew,
      discount,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (isNew === 'true') filter.isNew = true;
    if (discount === 'true') filter.discount = { $ne: null };
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    // Search functionality
    if (search) {
      filter.$text = { $search: search };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sortObj = {};
    sortObj[sort] = order === 'desc' ? -1 : 1;

    const products = await Product.find(filter)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('reviews.user', 'firstName lastName');

    const total = await Product.countDocuments(filter);

    res.json({
      products,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (process.env.USE_FAKE_PRODUCTS === 'true') {
      const product = sampleProducts.find(p => p._id === req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      return res.json(product);
    }
    const product = await Product.findById(req.params.id)
      .populate('reviews.user', 'firstName lastName');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a product
// @access  Private/Admin
router.post('/', auth, admin, upload.array('images', 5), async (req, res) => {
  try {
    const {
      name,
      price,
      originalPrice,
      discount,
      isNew,
      category,
      subcategory,
      colors,
      inStock,
      description,
      features,
      sizes
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const product = new Product({
      name,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      discount,
      isNew: isNew === 'true',
      category,
      subcategory,
      colors: colors ? JSON.parse(colors) : [],
      inStock: inStock === 'true',
      images,
      description,
      features: features ? JSON.parse(features) : [],
      sizes: sizes ? JSON.parse(sizes) : []
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', auth, admin, upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updateData = { ...req.body };
    
    // Handle uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      updateData.images = [...product.images, ...newImages];
    }

    // Convert string values to appropriate types
    if (updateData.price) updateData.price = parseFloat(updateData.price);
    if (updateData.originalPrice) updateData.originalPrice = parseFloat(updateData.originalPrice);
    if (updateData.isNew !== undefined) updateData.isNew = updateData.isNew === 'true';
    if (updateData.inStock !== undefined) updateData.inStock = updateData.inStock === 'true';
    if (updateData.colors) updateData.colors = JSON.parse(updateData.colors);
    if (updateData.features) updateData.features = JSON.parse(updateData.features);
    if (updateData.sizes) updateData.sizes = JSON.parse(updateData.sizes);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products/:id/reviews
// @desc    Add product review
// @access  Private
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed' });
    }

    const review = {
      user: req.user._id,
      name: req.user.getFullName(),
      rating: Number(rating),
      comment
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 