const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, generateOTP, getOTPExpiry } = require('../utils/auth');
const { sendOTP, verifyOTP } = require('../services/otpService');
const { protect, userOnly } = require('../middleware/auth');

// @route   POST /api/auth/user/signup
// @desc    Register new user (Step 1 - without OTP)
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      addressLine,
      city,
      state,
      pincode,
      password,
      allergies,
      majorDiseases,
      currentMedications
    } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }]
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or mobile number already exists'
      });
    }
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();
    
    // Create user
    const user = await User.create({
      fullName,
      email,
      mobileNumber,
      dateOfBirth,
      gender,
      address: {
        addressLine,
        city,
        state,
        pincode
      },
      password,
      healthInfo: {
        allergies,
        majorDiseases: Array.isArray(majorDiseases) ? majorDiseases : [majorDiseases],
        currentMedications: currentMedications || []
      },
      verificationOTP: otp,
      otpExpiry
    });
    
    // Send OTP
    await sendOTP(mobileNumber, otp);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully. OTP sent to mobile number.',
      data: {
        userId: user._id,
        email: user.email,
        mobileNumber: user.mobileNumber,
        otpExpiry
      }
    });
  } catch (error) {
    console.error('User signup error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'User registration failed'
    });
  }
});

// @route   POST /api/auth/user/verify-otp
// @desc    Verify OTP and activate user account
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'User ID and OTP are required'
      });
    }
    
    // Find user with OTP details
    const user = await User.findById(userId).select('+verificationOTP +otpExpiry');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Verify OTP
    const otpVerification = verifyOTP(user.verificationOTP, otp, user.otpExpiry);
    
    if (!otpVerification.valid) {
      return res.status(400).json({
        success: false,
        message: otpVerification.message
      });
    }
    
    // Activate user account
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user._id, 'user');
    
    res.json({
      success: true,
      message: 'Account verified successfully',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'OTP verification failed'
    });
  }
});

// @route   POST /api/auth/user/resend-otp
// @desc    Resend OTP to user
// @access  Public
router.post('/resend-otp', async (req, res) => {
  try {
    const { userId } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User is already verified'
      });
    }
    
    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();
    
    user.verificationOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send OTP
    await sendOTP(user.mobileNumber, otp);
    
    res.json({
      success: true,
      message: 'OTP resent successfully',
      otpExpiry
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to resend OTP'
    });
  }
});

// @route   POST /api/auth/user/login
// @desc    User login (Step 1 - credentials check)
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    
    if (!emailOrMobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/mobile and password'
      });
    }
    
    // Find user by email or mobile
    const user = await User.findOne({
      $or: [
        { email: emailOrMobile },
        { mobileNumber: emailOrMobile }
      ]
    }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your account first',
        requiresVerification: true,
        userId: user._id
      });
    }
    
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate OTP for login
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();
    
    user.verificationOTP = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    
    // Send OTP
    await sendOTP(user.mobileNumber, otp);
    
    res.json({
      success: true,
      message: 'OTP sent to registered mobile number',
      data: {
        userId: user._id,
        mobileNumber: user.mobileNumber,
        requiresOTP: true,
        otpExpiry
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// @route   POST /api/auth/user/verify-login-otp
// @desc    Verify OTP and complete login
// @access  Public
router.post('/verify-login-otp', async (req, res) => {
  try {
    const { userId, otp } = req.body;
    
    if (!userId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'User ID and OTP are required'
      });
    }
    
    // Find user with OTP details
    const user = await User.findById(userId).select('+verificationOTP +otpExpiry');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Verify OTP
    const otpVerification = verifyOTP(user.verificationOTP, otp, user.otpExpiry);
    
    if (!otpVerification.valid) {
      return res.status(400).json({
        success: false,
        message: otpVerification.message
      });
    }
    
    // Clear OTP
    user.verificationOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user._id, 'user');
    
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: 'user'
      }
    });
  } catch (error) {
    console.error('Login OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Login verification failed'
    });
  }
});

// @route   GET /api/auth/user/profile
// @desc    Get user profile
// @access  Private (User only)
router.get('/profile', protect, userOnly, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

module.exports = router;
