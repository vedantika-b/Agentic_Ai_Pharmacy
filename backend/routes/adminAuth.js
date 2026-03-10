const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const { generateToken, generateOTP, getOTPExpiry } = require('../utils/auth');
const { sendOTP } = require('../services/otpService');
const { generate2FASecret, generateQRCode, verify2FAToken } = require('../services/twoFactorService');
const { protect, adminOnly } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/auth/admin/send-otp
// @desc    Send OTP to mobile number during signup
// @access  Public
router.post('/send-otp', async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number'
      });
    }

    // Check if mobile number already exists
    const existingAdmin = await Admin.findOne({ mobileNumber });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number already registered'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry();

    // Send OTP
    await sendOTP(mobileNumber, otp);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      data: {
        otp, // Remove this in production
        expiresAt: otpExpiry
      }
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending OTP',
      error: error.message
    });
  }
});

// @route   POST /api/auth/admin/signup
// @desc    Complete admin registration with all documents (8 steps)
// @access  Public
router.post('/signup', 
  upload.fields([
    { name: 'drugLicenseCert', maxCount: 1 },
    { name: 'pharmacistRegistrationCert', maxCount: 1 },
    { name: 'gstCertificate', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'aadhaarCard', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'storefrontPhoto', maxCount: 1 },
    { name: 'pharmacyLogo', maxCount: 1 },
    { name: 'cancelledCheque', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        // Step 1: Basic Info
        fullName,
        mobileNumber,
        email,
        password,
        
        // Step 2: Pharmacy License
        drugLicenseNumber,
        licenseValidityDate,
        
        // Step 3: Pharmacist Info
        pharmacistName,
        pharmacistRegistrationNumber,
        
        // Step 4: Business Verification
        gstinNumber,
        
        // Step 5: Owner Identity
        ownerPanNumber,
        ownerAadhaarNumber,
        
        // Step 6: Store Details
        pharmacyName,
        storeAddress,
        city,
        state,
        pincode,
        
        // Step 8: Bank Details
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode
      } = req.body;
      
      // Validate required fields
      if (!fullName || !mobileNumber || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full name, mobile number and password are required'
        });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({
        $or: [
          { mobileNumber },
          { drugLicenseNumber },
          { pharmacistRegistrationNumber },
          { gstinNumber },
          { ownerPanNumber },
          { ownerAadhaarNumber }
        ]
      });
      
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: 'Admin with these details already exists'
        });
      }
      
      // Check if all required files are uploaded
      const requiredFiles = [
        'drugLicenseCert',
        'pharmacistRegistrationCert', 
        'gstCertificate',
        'panCard',
        'aadhaarCard',
        'addressProof',
        'storefrontPhoto',
        'pharmacyLogo',
        'cancelledCheque'
      ];

      const missingFiles = requiredFiles.filter(field => !req.files || !req.files[field]);
      
      if (missingFiles.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Missing required documents: ${missingFiles.join(', ')}`
        });
      }
      
      // Create admin with all details
      const admin = await Admin.create({
        // Step 1
        fullName,
        mobileNumber,
        email: email || undefined,
        password,
        isMobileVerified: true,
        
        // Step 2
        drugLicenseNumber,
        licenseValidityDate: new Date(licenseValidityDate),
        drugLicenseCertUrl: req.files.drugLicenseCert[0].path,
        
        // Step 3
        pharmacistName,
        pharmacistRegistrationNumber,
        pharmacistRegistrationCertUrl: req.files.pharmacistRegistrationCert[0].path,
        
        // Step 4
        gstinNumber: gstinNumber.toUpperCase(),
        gstCertificateUrl: req.files.gstCertificate[0].path,
        
        // Step 5
        ownerPanNumber: ownerPanNumber.toUpperCase(),
        ownerAadhaarNumber,
        panCardUrl: req.files.panCard[0].path,
        aadhaarCardUrl: req.files.aadhaarCard[0].path,
        
        // Step 6
        pharmacyName,
        storeAddress,
        city,
        state,
        pincode,
        addressProofUrl: req.files.addressProof[0].path,
        
        // Step 7
        storefrontPhotoUrl: req.files.storefrontPhoto[0].path,
        pharmacyLogoUrl: req.files.pharmacyLogo[0].path,
        
        // Step 8
        bankDetails: {
          accountHolderName,
          bankName,
          accountNumber,
          ifscCode: ifscCode.toUpperCase(),
          cancelledChequeUrl: req.files.cancelledCheque[0].path
        },
        
        approvalStatus: 'pending'
      });
      
      res.status(201).json({
        success: true,
        message: 'Registration submitted successfully. Your account is pending approval.',
        data: {
          adminId: admin._id,
          fullName: admin.fullName,
          mobileNumber: admin.mobileNumber,
          pharmacyName: admin.pharmacyName,
          approvalStatus: admin.approvalStatus
        }
      });
    } catch (error) {
      console.error('Admin signup error:', error);
      res.status(500).json({
        success: false,
        message: 'Error during registration',
        error: error.message
      });
    }
  }
);

// @route   POST /api/auth/admin/login
// @desc    Admin login with mobile/email and password
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { emailOrMobile, password } = req.body;
    
    if (!emailOrMobile || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/Mobile and password are required'
      });
    }
    
    // Find admin by email or mobile
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrMobile },
        { mobileNumber: emailOrMobile }
      ]
    }).select('+password');
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check password
    const isPasswordMatch = await admin.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Check approval status
    if (admin.approvalStatus === 'rejected') {
      return res.status(403).json({
        success: false,
        message: `Your account has been rejected. Reason: ${admin.rejectionReason || 'Not specified'}`
      });
    }
    
    if (admin.approvalStatus === 'pending') {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending approval. Please wait for verification.'
      });
    }
    
    // Check if 2FA is enabled
    if (admin.twoFactorEnabled) {
      return res.status(200).json({
        success: true,
        requiresTwoFactor: true,
        message: 'Please enter your 2FA code'
      });
    }
    
    // Generate token
    const token = generateToken(admin._id, 'admin');
    
    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        mobileNumber: admin.mobileNumber,
        pharmacyName: admin.pharmacyName,
        approvalStatus: admin.approvalStatus,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// @route   POST /api/auth/admin/enable-2fa
// @desc    Enable 2FA for admin account
// @access  Private (Admin)
router.post('/enable-2fa', protect, adminOnly, async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: '2FA token is required'
      });
    }
    
    const admin = await Admin.findById(req.user.id).select('+twoFactorSecret');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    // If no secret exists, generate one
    if (!admin.twoFactorSecret) {
      const { secret, otpauthUrl } = generate2FASecret(admin.email || admin.mobileNumber);
      admin.twoFactorSecret = secret;
      await admin.save();
      
      const qrCode = await generateQRCode(otpauthUrl);
      
      return res.status(200).json({
        success: true,
        message: 'Scan this QR code with your authenticator app',
        data: {
          secret,
          qrCode
        }
      });
    }
    
    // Verify the token
    const isValid = verify2FAToken(admin.twoFactorSecret, token);
    
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid 2FA token'
      });
    }
    
    // Enable 2FA
    admin.twoFactorEnabled = true;
    await admin.save();
    
    res.status(200).json({
      success: true,
      message: 'Two-factor authentication enabled successfully'
    });
  } catch (error) {
    console.error('Enable 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Error enabling 2FA',
      error: error.message
    });
  }
});

// @route   POST /api/auth/admin/verify-2fa
// @desc    Verify 2FA code during login
// @access  Public
router.post('/verify-2fa', async (req, res) => {
  try {
    const { emailOrMobile, token } = req.body;
    
    if (!emailOrMobile || !token) {
      return res.status(400).json({
        success: false,
        message: 'Email/Mobile and 2FA token are required'
      });
    }
    
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrMobile },
        { mobileNumber: emailOrMobile }
      ]
    }).select('+twoFactorSecret');
    
    if (!admin || !admin.twoFactorEnabled) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request'
      });
    }
    
    // Verify token
    const isValid = verify2FAToken(admin.twoFactorSecret, token);
    
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid 2FA code'
      });
    }
    
    // Generate JWT token
    const jwtToken = generateToken(admin._id, 'admin');
    
    // Set HTTP-only cookie
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: jwtToken,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        mobileNumber: admin.mobileNumber,
        pharmacyName: admin.pharmacyName,
        approvalStatus: admin.approvalStatus,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Verify 2FA error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying 2FA',
      error: error.message
    });
  }
});

// @route   GET /api/auth/admin/profile
// @desc    Get admin profile
// @access  Private (Admin)
router.get('/profile', protect, adminOnly, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @route   GET /api/auth/admin/get-2fa-qr
// @desc    Get 2FA QR code for setup
// @access  Private (Admin)
router.get('/get-2fa-qr', protect, adminOnly, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('+twoFactorSecret');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    let secret = admin.twoFactorSecret;
    let qrCode;
    
    if (!secret) {
      // Generate new secret
      const result = generate2FASecret(admin.email || admin.mobileNumber);
      secret = result.secret;
      admin.twoFactorSecret = secret;
      await admin.save();
      qrCode = await generateQRCode(result.otpauthUrl);
    } else {
      // Generate QR from existing secret
      const { otpauthUrl } = generate2FASecret(admin.email || admin.mobileNumber, secret);
      qrCode = await generateQRCode(otpauthUrl);
    }
    
    res.status(200).json({
      success: true,
      data: {
        secret,
        qrCode
      }
    });
  } catch (error) {
    console.error('Get 2FA QR error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating QR code',
      error: error.message
    });
  }
});

module.exports = router;
