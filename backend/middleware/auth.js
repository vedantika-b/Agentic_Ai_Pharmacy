const { verifyToken } = require('../utils/auth');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Protect routes - require authentication
const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    // Check if user/admin exists
    if (decoded.role === 'admin' || decoded.role === 'super_admin') {
      req.admin = await Admin.findById(decoded.id).select('-password');
      if (!req.admin) {
        return res.status(404).json({
          success: false,
          message: 'Admin not found'
        });
      }
    } else {
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
};

// Admin only access
const adminOnly = async (req, res, next) => {
  if (!req.admin) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.'
    });
  }
  
  if (!req.admin.isApproved) {
    return res.status(403).json({
      success: false,
      message: 'Your admin account is pending approval'
    });
  }
  
  next();
};

// User only access
const userOnly = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User only.'
    });
  }
  
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Please verify your account first'
    });
  }
  
  next();
};

module.exports = {
  protect,
  adminOnly,
  userOnly
};
