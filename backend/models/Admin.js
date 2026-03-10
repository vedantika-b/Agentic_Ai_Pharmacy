const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  // STEP 1: Basic Account Creation
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit mobile number']
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  
  // Mobile OTP Verification
  verificationOTP: {
    type: String,
    select: false
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  isMobileVerified: {
    type: Boolean,
    default: false
  },
  
  // STEP 2: Pharmacy License Verification
  drugLicenseNumber: {
    type: String,
    required: [true, 'Drug license number is required'],
    unique: true
  },
  licenseValidityDate: {
    type: Date,
    required: [true, 'License validity date is required']
  },
  drugLicenseCertUrl: {
    type: String,
    required: [true, 'Drug license certificate is required']
  },
  
  // STEP 3: Pharmacist Verification
  pharmacistName: {
    type: String,
    required: [true, 'Pharmacist name is required']
  },
  pharmacistRegistrationNumber: {
    type: String,
    required: [true, 'Pharmacist registration number is required'],
    unique: true
  },
  pharmacistRegistrationCertUrl: {
    type: String,
    required: [true, 'Pharmacist registration certificate is required']
  },
  
  // STEP 4: Business Verification
  gstinNumber: {
    type: String,
    required: [true, 'GSTIN number is required'],
    unique: true,
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Please provide a valid GSTIN']
  },
  gstCertificateUrl: {
    type: String,
    required: [true, 'GST certificate is required']
  },
  
  // STEP 5: Owner Identity Verification
  ownerPanNumber: {
    type: String,
    required: [true, 'Owner PAN number is required'],
    unique: true,
    uppercase: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please provide a valid PAN number']
  },
  ownerAadhaarNumber: {
    type: String,
    required: [true, 'Owner Aadhaar number is required'],
    unique: true,
    match: [/^[0-9]{12}$/, 'Please provide a valid 12-digit Aadhaar number']
  },
  panCardUrl: {
    type: String,
    required: [true, 'PAN card upload is required']
  },
  aadhaarCardUrl: {
    type: String,
    required: [true, 'Aadhaar card upload is required']
  },
  
  // STEP 6: Pharmacy Store Details
  pharmacyName: {
    type: String,
    required: [true, 'Pharmacy name is required']
  },
  storeAddress: {
    type: String,
    required: [true, 'Store address is required']
  },
  city: {
    type: String,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
    match: [/^[0-9]{6}$/, 'Please provide a valid 6-digit pincode']
  },
  addressProofUrl: {
    type: String,
    required: [true, 'Address proof is required']
  },
  
  // STEP 7: Store Authenticity
  storefrontPhotoUrl: {
    type: String,
    required: [true, 'Pharmacy storefront photo is required']
  },
  pharmacyLogoUrl: {
    type: String,
    required: [true, 'Pharmacy logo is required']
  },
  
  // STEP 8: Bank Details
  bankDetails: {
    accountHolderName: {
      type: String,
      required: [true, 'Account holder name is required']
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required']
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required']
    },
    ifscCode: {
      type: String,
      required: [true, 'IFSC code is required'],
      uppercase: true,
      match: [/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Please provide a valid IFSC code']
    },
    cancelledChequeUrl: {
      type: String,
      required: [true, 'Cancelled cheque or passbook is required']
    }
  },
  
  // Two-Factor Authentication (Optional)
  twoFactorSecret: {
    type: String,
    select: false
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  
  // Verification & Approval Status
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  rejectionReason: {
    type: String,
    default: ''
  },
  verifiedAt: {
    type: Date
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Role
  role: {
    type: String,
    default: 'admin',
    enum: ['admin', 'super_admin']
  }
}, {
  timestamps: true
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to check if license is valid
adminSchema.methods.isLicenseValid = function() {
  return this.licenseValidityDate && this.licenseValidityDate > new Date();
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
