const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

// Load environment variables from config.env
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-store')
.then(() => {
  console.log('MongoDB Connected to Atlas successfully!');
  console.log('Database:', process.env.MONGODB_URI ? 'Atlas' : 'Local');
})
.catch(err => {
  console.log('MongoDB connection error:', err);
  console.log('Please check your connection string and network connection');
});

const products = [
  {
    name: "Summer Floral Dress",
    price: 49.99,
    originalPrice: 69.99,
    discount: "30% OFF",
    isNew: true,
    category: "women",
    subcategory: "dresses",
    colors: ["Red", "Blue", "White"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop",
    ],
    description: "A lightweight summer dress perfect for warm weather. Made from breathable cotton with a comfortable fit.",
    features: ["Premium cotton material", "Comfortable fit", "Easy care", "30-day return policy"]
  },
  {
    name: "Classic Denim Jacket",
    price: 79.99,
    originalPrice: 99.99,
    discount: "20% OFF",
    isNew: false,
    category: "men",
    subcategory: "outerwear",
    colors: ["Blue", "Black"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604644401898-6d0da4a0d8e1?w=500&auto=format&fit=crop",
    ],
    description: "Classic denim jacket with a modern fit. Features multiple pockets and a comfortable lining.",
    features: ["Premium denim", "Multiple pockets", "Comfortable lining", "Durable construction"]
  },
  {
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: null,
    discount: null,
    isNew: true,
    category: "men",
    subcategory: "tops",
    colors: ["Black", "White", "Gray"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&auto=format&fit=crop",
    ],
    description: "Soft cotton t-shirt with a unique graphic print. Comfortable for everyday wear.",
    features: ["100% cotton", "Soft fabric", "Graphic print", "Comfortable fit"]
  },
  {
    name: "Kids Comfortable Sneakers",
    price: 39.99,
    originalPrice: 49.99,
    discount: "10% OFF",
    isNew: false,
    category: "kids",
    subcategory: "bottoms",
    colors: ["Blue", "Pink", "White"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
    ],
    description: "Comfortable sneakers for kids with durable soles and breathable material.",
    features: ["Durable soles", "Breathable material", "Comfortable fit", "Easy to clean"]
  },
  {
    name: "Elegant Silk Blouse",
    price: 59.99,
    originalPrice: null,
    discount: null,
    isNew: true,
    category: "women",
    subcategory: "tops",
    colors: ["White", "Black", "Navy"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop",
    ],
    description: "Elegant silk blouse with a delicate pattern. Perfect for both casual and formal occasions.",
    features: ["Premium silk", "Delicate pattern", "Versatile design", "Professional look"]
  },
  {
    name: "Slim Fit Chino Pants",
    price: 44.99,
    originalPrice: 54.99,
    discount: "10% OFF",
    isNew: false,
    category: "men",
    subcategory: "bottoms",
    colors: ["Khaki", "Navy", "Black"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop",
    ],
    description: "Classic chino pants with a modern slim fit. Made from durable cotton blend.",
    features: ["Cotton blend", "Slim fit", "Durable material", "Professional style"]
  },
  {
    name: "Spring Floral Dress",
    price: 65.99,
    originalPrice: null,
    discount: null,
    isNew: true,
    category: "women",
    subcategory: "dresses",
    colors: ["Pink", "Blue"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=500&auto=format&fit=crop",
    ],
    description: "Beautiful floral dress with a flattering silhouette. Perfect for spring and summer.",
    features: ["Floral pattern", "Flattering silhouette", "Spring design", "Comfortable fit"]
  },
  {
    name: "Kids Winter Jacket",
    price: 34.99,
    originalPrice: 44.99,
    discount: "10% OFF",
    isNew: false,
    category: "kids",
    subcategory: "outerwear",
    colors: ["Red", "Blue"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604644401898-6d0da4a0d8e1?w=500&auto=format&fit=crop",
    ],
    description: "Warm and comfortable jacket for kids. Water-resistant material with adjustable hood.",
    features: ["Water-resistant", "Adjustable hood", "Warm material", "Comfortable fit"]
  },
  {
    name: "Casual Blazer",
    price: 89.99,
    originalPrice: 119.99,
    discount: "25% OFF",
    isNew: false,
    category: "women",
    subcategory: "outerwear",
    colors: ["Black", "Navy", "Gray"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604644401898-6d0da4a0d8e1?w=500&auto=format&fit=crop",
    ],
    description: "Versatile casual blazer perfect for office and evening wear. Made from premium wool blend.",
    features: ["Wool blend", "Versatile design", "Professional look", "Comfortable fit"]
  },
  {
    name: "Premium Hoodie",
    price: 54.99,
    originalPrice: null,
    discount: null,
    isNew: true,
    category: "men",
    subcategory: "tops",
    colors: ["Gray", "Black", "Navy"],
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&auto=format&fit=crop",
    ],
    description: "Comfortable hoodie made from premium cotton. Perfect for casual wear and layering.",
    features: ["Premium cotton", "Comfortable fit", "Perfect for layering", "Casual style"]
  }
];

const importData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '+1 (555) 123-4567',
      isAdmin: true,
      address: {
        street: '123 Admin St',
        city: 'Admin City',
        state: 'AS',
        zipCode: '12345',
        country: 'United States'
      }
    });

    await adminUser.save();
    console.log('Admin user created');

    // Import products
    await Product.insertMany(products);
    console.log('Products imported successfully');

    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 