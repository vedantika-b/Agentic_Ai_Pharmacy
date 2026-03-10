const express = require('express');
const router = express.Router();

// Login
router.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  
  // Mock authentication
  if (email && password) {
    res.json({
      success: true,
      user: {
        id: '1',
        name: role === 'admin' ? 'John Doe' : 'Sarah Johnson',
        email,
        role: role || 'user',
      },
      token: 'mock-jwt-token-' + Date.now(),
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  res.json({
    success: true,
    user: {
      id: Date.now().toString(),
      name,
      email,
      role: 'user',
    },
    token: 'mock-jwt-token-' + Date.now(),
  });
});

module.exports = router;
