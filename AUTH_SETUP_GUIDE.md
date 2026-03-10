# MedFlow Authentication System - Setup Guide

## Overview
Complete authentication and registration system for MedFlow AI Pharmacy with user and admin flows, OTP verification, 2FA, health data collection, and document uploads.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

New packages installed:
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `multer` - File uploads
- `speakeasy` - 2FA/TOTP
- `qrcode` - QR code generation
- `nodemailer` - Email service
- `express-validator` - Input validation
- `cookie-parser` - Cookie handling
- `express-fileupload` - Additional file upload support

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod --dbpath=<path-to-data-directory>
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env` file with your connection string

### 3. Configure Environment Variables

Edit the `.env` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# MongoDB - Update this with your connection string
MONGODB_URI=mongodb://localhost:27017/medflow

# JWT - Change this to a secure random string in production
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d

# Twilio (for SMS OTP) - Optional for testing
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Configuration - Optional for testing
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_app_password
```

**Note:** SMS OTP currently uses mock implementation. To enable real SMS:
1. Sign up for Twilio account
2. Get credentials from Twilio dashboard
3. Uncomment Twilio code in `backend/services/otpService.js`

### 4. Start the Application

Open two terminals:

**Terminal 1 - Frontend (Next.js):**
```bash
npm run dev
```
Frontend runs on: http://localhost:3000

**Terminal 2 - Backend (Express):**
```bash
npm run server
```
Backend runs on: http://localhost:5000

## 📁 File Structure

### Frontend (Authentication Pages)
```
app/
├── auth/
│   ├── user/
│   │   ├── signup/
│   │   │   └── page.tsx          # User registration (4 steps)
│   │   └── login/
│   │       └── page.tsx           # User login with OTP
│   └── admin/
│       ├── signup/
│       │   └── page.tsx           # Admin registration (6 steps)
│       └── login/
│           └── page.tsx           # Admin login with 2FA
```

### Backend (Authentication)
```
backend/
├── models/
│   ├── User.js                    # User schema with health info
│   └── Admin.js                   # Admin schema with professional details
├── routes/
│   ├── userAuth.js                # User auth endpoints (6 routes)
│   └── adminAuth.js               # Admin auth endpoints (6 routes)
├── middleware/
│   ├── auth.js                    # JWT protection & role checking
│   └── upload.js                  # File upload handling
├── services/
│   ├── otpService.js              # SMS OTP sending/verification
│   └── twoFactorService.js        # Google Authenticator 2FA
├── utils/
│   └── auth.js                    # JWT & OTP utilities
└── config/
    └── database.js                # MongoDB connection
```

### Context & State Management
```
context/
├── ThemeContext.tsx               # Light/Dark theme
└── AuthContext.tsx                # Authentication state management
```

## 🔐 Authentication Flows

### User Flow

**Registration:**
1. **Step 1:** Personal Information (name, email, mobile, DOB, gender)
2. **Step 2:** Address Details (address, city, state, pincode)
3. **Step 3:** Password Creation
4. **Step 4:** Health Information (allergies, diseases, medications)
5. **Step 5:** OTP Verification (SMS to mobile)

**Login:**
1. Enter email/mobile and password
2. Verify OTP sent to mobile
3. Redirect to user dashboard

### Admin Flow

**Registration:**
1. **Step 1:** Basic Information (name, email, phone, password)
2. **Step 2:** Identity Verification (Aadhaar number + document upload)
3. **Step 3:** Professional Details (license number + certificate uploads)
4. **Step 4:** Business Details (store name, address)
5. **Step 5:** Bank Account Details (for payments)
6. **Step 6:** 2FA Setup (scan QR code with Google Authenticator)
7. **Success:** Approval pending

**Login:**
1. Enter email and password
2. Enter 6-digit Google Authenticator code
3. Redirect to admin dashboard (if approved)

## 🛠️ API Endpoints

### User Authentication
- `POST /api/auth/user/signup` - Create user account
- `POST /api/auth/user/verify-otp` - Verify OTP after signup
- `POST /api/auth/user/resend-otp` - Resend OTP
- `POST /api/auth/user/login` - User login (sends OTP)
- `POST /api/auth/user/verify-login-otp` - Verify login OTP
- `GET /api/auth/user/profile` - Get user profile (protected)

### Admin Authentication
- `POST /api/auth/admin/signup` - Create admin account (with file uploads)
- `POST /api/auth/admin/enable-2fa` - Enable 2FA
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/admin/verify-2fa` - Verify 2FA code
- `GET /api/auth/admin/profile` - Get admin profile (protected)
- `GET /api/auth/admin/get-2fa-qr` - Get 2FA QR code

## 🔒 Security Features

### User Security
- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT tokens (7-day expiration)
- ✅ SMS OTP verification (6 digits, 10-minute expiry)
- ✅ Mobile number verification required

### Admin Security
- ✅ All user security features
- ✅ Google Authenticator 2FA (TOTP)
- ✅ Document verification (Aadhaar, licenses)
- ✅ Manual approval process
- ✅ Role-based access control

### API Security
- ✅ JWT middleware protection
- ✅ Role-specific route guards (adminOnly, userOnly)
- ✅ File upload validation (type, size)
- ✅ Input validation with express-validator

## 📱 Testing the Application

### Test User Registration

1. Go to http://localhost:3000
2. Click "User Login"
3. Click "Sign up" link
4. Fill all 4 steps:
   - Personal info
   - Address
   - Password
   - Health information (required fields)
5. Enter OTP (check backend console for mock OTP)
6. Login successful → redirected to user dashboard

### Test Admin Registration

1. Go to http://localhost:3000
2. Click "Admin Login"
3. Click "Register here" link
4. Fill all 6 steps:
   - Basic info
   - Upload Aadhaar card (PDF/Image)
   - Upload pharmacy license certificate
   - Business details
   - Bank details
   - Scan QR code with Google Authenticator app
5. Enter 6-digit code from authenticator
6. Success message shown
7. Account status: "Pending approval"

**To approve admin:**
```bash
# Using MongoDB shell or Compass
db.admins.updateOne(
  { email: "admin@pharmacy.com" },
  { $set: { approvalStatus: "approved" } }
)
```

### Test Admin Login with 2FA

1. Go to http://localhost:3000
2. Click "Admin Login"
3. Enter email and password
4. Enter 6-digit code from Google Authenticator
5. Login successful → redirected to admin dashboard

## 📦 Database Models

### User Model
```javascript
{
  fullName: String (required),
  email: String (unique, required),
  mobileNumber: String (10 digits, unique, required),
  dateOfBirth: Date (required),
  gender: String (required),
  address: {
    line: String,
    city: String,
    state: String,
    pincode: String (6 digits)
  },
  password: String (hashed, required),
  healthInfo: {
    allergies: String (required),
    majorDiseases: [String] (required),
    currentMedications: String
  },
  isVerified: Boolean (default: false),
  verificationOTP: String,
  otpExpiry: Date,
  role: 'user'
}
```

### Admin Model
```javascript
{
  fullName: String (required),
  email: String (unique, required),
  phone: String (10 digits, unique, required),
  password: String (hashed, required),
  aadhaarNumber: String (12 digits, unique, required),
  aadhaarCardUrl: String (file path),
  pharmacyLicenseNumber: String (unique, required),
  registrationCertUrl: String (file path),
  certificationsUrl: [String] (file paths),
  business: {
    storeName: String (required),
    address: String,
    city: String,
    state: String,
    pincode: String (6 digits)
  },
  bankDetails: {
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String (pattern: XXXX0XXXXXX)
  },
  twoFactorSecret: String,
  twoFactorEnabled: Boolean (default: false),
  approvalStatus: 'pending' | 'approved' | 'rejected',
  role: 'admin'
}
```

## 🎨 UI Features

- ✅ Light/Dark theme support
- ✅ Responsive design (mobile-friendly)
- ✅ Multi-step forms with progress indicators
- ✅ File upload with drag-and-drop
- ✅ Form validation with error messages
- ✅ Loading states and disabled buttons
- ✅ Beautiful gradient designs
- ✅ Healthcare-themed color palette

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### OTP Not Received (Mock Mode)
**Solution:** Check backend console for OTP code:
```
OTP sent to 9876543210: 123456
```

### 2FA QR Code Not Showing
**Solution:** Ensure QR code package is installed:
```bash
npm install qrcode speakeasy
```

### File Upload Errors
**Solution:** Check upload directory exists:
```bash
mkdir uploads
mkdir uploads/aadhaar
mkdir uploads/certificates
mkdir uploads/certifications
```

### JWT Token Errors
**Solution:** Ensure JWT_SECRET is set in `.env` file

## 🔄 Next Steps

### For Production:

1. **Enable Real SMS OTP:**
   - Sign up for Twilio
   - Update `.env` with credentials
   - Uncomment Twilio code in `otpService.js`

2. **Email Notifications:**
   - Configure SMTP settings in `.env`
   - Uncomment email code in routes

3. **Secure JWT Secret:**
   - Generate strong random secret
   - Update in `.env`

4. **File Storage:**
   - Consider AWS S3 or Cloudinary for production
   - Update upload middleware accordingly

5. **Admin Approval Workflow:**
   - Create admin panel for approval management
   - Send email notifications on status change

6. **Rate Limiting:**
   - Add rate limiting middleware
   - Prevent brute force attacks

7. **Backup Codes:**
   - Generate backup codes for 2FA
   - Allow 2FA recovery

## 📞 Support

For any issues or questions:
- Check backend console for detailed error messages
- Verify MongoDB connection
- Ensure all environment variables are set
- Check file permissions for uploads directory

## 🎉 Features Summary

✅ Complete user registration with health data collection
✅ SMS OTP verification for users
✅ Complete admin registration with document uploads
✅ Google Authenticator 2FA for admins
✅ JWT-based authentication
✅ Protected routes with role-based access
✅ File upload handling with validation
✅ MongoDB integration with Mongoose
✅ Beautiful, responsive UI with light/dark themes
✅ Multi-step forms with progress tracking
✅ Context-based state management
✅ Mock OTP service for testing
✅ Admin approval workflow

---

**System Status:** ✅ Fully Functional
**Backend Ready:** ✅ Yes
**Frontend Ready:** ✅ Yes
**Database Setup:** ⚠️ Required (MongoDB)
**Ready for Testing:** ✅ Yes (after MongoDB setup)
