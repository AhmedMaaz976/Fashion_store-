const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // In fake auth mode, trust the token payload as the user (no DB lookup)
    if (process.env.USE_FAKE_AUTH === 'true') {
      req.user = {
        _id: decoded.id || 'fake-user-id',
        firstName: decoded.firstName || 'Demo',
        lastName: decoded.lastName || 'User',
        email: decoded.email || 'demo@example.com',
        isAdmin: !!decoded.isAdmin,
      };
      return next();
    }

    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const admin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { auth, admin }; 