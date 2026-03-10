'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  AlertCircle,
  Upload,
  FileText,
  Building2,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Shield,
  Building,
  Camera,
  Image as ImageIcon
} from 'lucide-react';

export default function AdminSignup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Account
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
    
    // Step 2: Pharmacy License
    drugLicenseNumber: '',
    licenseValidityDate: '',
    drugLicenseCert: null as File | null,
    
    // Step 3: Pharmacist Information
    pharmacistName: '',
    pharmacistRegistrationNumber: '',
    pharmacistRegistrationCert: null as File | null,
    
    // Step 4: Business Details
    gstinNumber: '',
    gstCertificate: null as File | null,
    
    // Step 5: Owner Identity
    ownerPanNumber: '',
    ownerAadhaarNumber: '',
    panCard: null as File | null,
    aadhaarCard: null as File | null,
    
    // Step 6: Store Details
    pharmacyName: '',
    storeAddress: '',
    city: '',
    state: '',
    pincode: '',
    addressProof: null as File | null,
    
    // Step 7: Store Authenticity
    storefrontPhoto: null as File | null,
    pharmacyLogo: null as File | null,
    
    // Step 8: Bank Details
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    cancelledCheque: null as File | null
  });

  const [fileNames, setFileNames] = useState({
    drugLicenseCert: '',
    pharmacistRegistrationCert: '',
    gstCertificate: '',
    panCard: '',
    aadhaarCard: '',
    addressProof: '',
    storefrontPhoto: '',
    pharmacyLogo: '',
    cancelledCheque: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      setFileNames(prev => ({
        ...prev,
        [name]: files[0].name
      }));
    }
  };

  const sendOTP = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/auth/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobileNumber: formData.mobileNumber })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOtpSent(true);
        alert(`OTP sent to ${formData.mobileNumber}`);
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = () => {
    // In production, verify OTP with backend
    // For now, simple check
    if (formData.otp.length === 6) {
      setOtpVerified(true);
      setError('');
    } else {
      setError('Invalid OTP');
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!otpVerified) {
          setError('Please verify your mobile number with OTP');
          return false;
        }
        if (!formData.fullName || !formData.mobileNumber || !formData.password) {
          setError('Please fill all required fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters');
          return false;
        }
        break;
      
      case 2:
        if (!formData.drugLicenseNumber || !formData.licenseValidityDate || !formData.drugLicenseCert) {
          setError('Please provide drug license details and upload certificate');
          return false;
        }
        break;
      
      case 3:
        if (!formData.pharmacistName || !formData.pharmacistRegistrationNumber || !formData.pharmacistRegistrationCert) {
          setError('Please provide pharmacist details and upload certificate');
          return false;
        }
        break;
      
      case 4:
        if (!formData.gstinNumber || !formData.gstCertificate) {
          setError('Please provide GSTIN and upload GST certificate');
          return false;
        }
        if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstinNumber)) {
          setError('Invalid GSTIN format');
          return false;
        }
        break;
      
      case 5:
        if (!formData.ownerPanNumber || !formData.ownerAadhaarNumber || !formData.panCard || !formData.aadhaarCard) {
          setError('Please provide PAN, Aadhaar details and upload documents');
          return false;
        }
        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.ownerPanNumber)) {
          setError('Invalid PAN format');
          return false;
        }
        if (!/^\d{12}$/.test(formData.ownerAadhaarNumber)) {
          setError('Invalid Aadhaar number (must be 12 digits)');
          return false;
        }
        break;
      
      case 6:
        if (!formData.pharmacyName || !formData.storeAddress || !formData.city || !formData.state || !formData.pincode || !formData.addressProof) {
          setError('Please fill all store details and upload address proof');
          return false;
        }
        if (!/^\d{6}$/.test(formData.pincode)) {
          setError('Invalid pincode');
          return false;
        }
        break;
      
      case 7:
        if (!formData.storefrontPhoto || !formData.pharmacyLogo) {
          setError('Please upload storefront photo and pharmacy logo');
          return false;
        }
        break;
      
      case 8:
        if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber || !formData.ifscCode || !formData.cancelledCheque) {
          setError('Please fill all bank details and upload cancelled cheque');
          return false;
        }
        if (formData.accountNumber !== formData.confirmAccountNumber) {
          setError('Account numbers do not match');
          return false;
        }
        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
          setError('Invalid IFSC code format');
          return false;
        }
        break;
    }
    
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateStep()) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const formDataToSend = new FormData();
      
      // Append all text fields
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('mobileNumber', formData.mobileNumber);
      if (formData.email) formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('drugLicenseNumber', formData.drugLicenseNumber);
      formDataToSend.append('licenseValidityDate', formData.licenseValidityDate);
      formDataToSend.append('pharmacistName', formData.pharmacistName);
      formDataToSend.append('pharmacistRegistrationNumber', formData.pharmacistRegistrationNumber);
      formDataToSend.append('gstinNumber', formData.gstinNumber);
      formDataToSend.append('ownerPanNumber', formData.ownerPanNumber);
      formDataToSend.append('ownerAadhaarNumber', formData.ownerAadhaarNumber);
      formDataToSend.append('pharmacyName', formData.pharmacyName);
      formDataToSend.append('storeAddress', formData.storeAddress);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('pincode', formData.pincode);
      formDataToSend.append('accountHolderName', formData.accountHolderName);
      formDataToSend.append('bankName', formData.bankName);
      formDataToSend.append('accountNumber', formData.accountNumber);
      formDataToSend.append('ifscCode', formData.ifscCode);
      
      // Append all files
      if (formData.drugLicenseCert) formDataToSend.append('drugLicenseCert', formData.drugLicenseCert);
      if (formData.pharmacistRegistrationCert) formDataToSend.append('pharmacistRegistrationCert', formData.pharmacistRegistrationCert);
      if (formData.gstCertificate) formDataToSend.append('gstCertificate', formData.gstCertificate);
      if (formData.panCard) formDataToSend.append('panCard', formData.panCard);
      if (formData.aadhaarCard) formDataToSend.append('aadhaarCard', formData.aadhaarCard);
      if (formData.addressProof) formDataToSend.append('addressProof', formData.addressProof);
      if (formData.storefrontPhoto) formDataToSend.append('storefrontPhoto', formData.storefrontPhoto);
      if (formData.pharmacyLogo) formDataToSend.append('pharmacyLogo', formData.pharmacyLogo);
      if (formData.cancelledCheque) formDataToSend.append('cancelledCheque', formData.cancelledCheque);
      
      const response = await fetch('http://localhost:5000/api/auth/admin/signup', {
        method: 'POST',
        body: formDataToSend
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStep(9); // Success step
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                stepNumber < step
                  ? 'bg-green-500 text-white'
                  : stepNumber === step
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {stepNumber < step ? <CheckCircle size={20} /> : stepNumber}
            </div>
            <span className="text-xs mt-2 text-gray-600 hidden md:block">
              {['Account', 'License', 'Pharmacist', 'Business', 'Identity', 'Store', 'Photos', 'Bank'][stepNumber - 1]}
            </span>
          </div>
          {stepNumber < 8 && (
            <div
              className={`w-8 md:w-16 h-1 mx-2 mb-6 transition-all ${
                stepNumber < step ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <Shield className="text-blue-500" size={24} />
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MedFlow
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Registration
          </h1>
          <p className="text-gray-600">
            Complete pharmacy verification in 8 simple steps
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {step < 9 && renderStepIndicator()}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Account */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Basic Account Information</h2>
                  <p className="text-gray-600">Create your admin account with mobile verification</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        required
                        disabled={otpSent}
                      />
                    </div>
                    {!otpSent && (
                      <button
                        type="button"
                        onClick={sendOTP}
                        disabled={loading || formData.mobileNumber.length !== 10}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 whitespace-nowrap"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && !otpVerified && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="6-digit OTP"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={verifyOTP}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {otpVerified && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <p className="text-green-700 text-sm">Mobile number verified successfully!</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Minimum 8 characters"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Pharmacy License */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pharmacy License</h2>
                  <p className="text-gray-600">Provide your drug license details</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drug License Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="drugLicenseNumber"
                      value={formData.drugLicenseNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter drug license number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Validity Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="licenseValidityDate"
                    value={formData.licenseValidityDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Drug License Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Choose file
                      </span>
                      <input
                        type="file"
                        name="drugLicenseCert"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    {fileNames.drugLicenseCert && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.drugLicenseCert}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pharmacist Information */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Pharmacist Information</h2>
                  <p className="text-gray-600">Details of the registered pharmacist</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacist Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="pharmacistName"
                      value={formData.pharmacistName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pharmacist name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacist Registration Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="pharmacistRegistrationNumber"
                      value={formData.pharmacistRegistrationNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter registration number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Pharmacist Registration Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Choose file
                      </span>
                      <input
                        type="file"
                        name="pharmacistRegistrationCert"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    {fileNames.pharmacistRegistrationCert && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.pharmacistRegistrationCert}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Business Details */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Business Details</h2>
                  <p className="text-gray-600">GST and business registration information</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GSTIN Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="gstinNumber"
                      value={formData.gstinNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                      placeholder="15-character GSTIN"
                      maxLength={15}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Format: 22AAAAA0000A1Z5</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload GST Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Choose file
                      </span>
                      <input
                        type="file"
                        name="gstCertificate"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    {fileNames.gstCertificate && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.gstCertificate}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Owner Identity */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Owner Identity Verification</h2>
                  <p className="text-gray-600">PAN and Aadhaar details of the owner</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PAN Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerPanNumber"
                      value={formData.ownerPanNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aadhaar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ownerAadhaarNumber"
                      value={formData.ownerAadhaarNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12-digit Aadhaar"
                      maxLength={12}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload PAN Card <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <Upload className="mx-auto text-gray-400 mb-2" size={30} />
                      <label className="cursor-pointer">
                        <span className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                          Choose file
                        </span>
                        <input
                          type="file"
                          name="panCard"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                      </label>
                      {fileNames.panCard && (
                        <p className="mt-2 text-xs text-green-600">{fileNames.panCard}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Aadhaar Card <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <Upload className="mx-auto text-gray-400 mb-2" size={30} />
                      <label className="cursor-pointer">
                        <span className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                          Choose file
                        </span>
                        <input
                          type="file"
                          name="aadhaarCard"
                          onChange={handleFileChange}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                      </label>
                      {fileNames.aadhaarCard && (
                        <p className="mt-2 text-xs text-green-600">{fileNames.aadhaarCard}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Store Details */}
            {step === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Details</h2>
                  <p className="text-gray-600">Provide your pharmacy store information</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="pharmacyName"
                      value={formData.pharmacyName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter pharmacy name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="storeAddress"
                      value={formData.storeAddress}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter complete address"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="6-digit"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Address Proof <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Choose file
                      </span>
                      <input
                        type="file"
                        name="addressProof"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Utility bill, rent agreement, etc.</p>
                    {fileNames.addressProof && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.addressProof}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Store Authenticity */}
            {step === 7 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Store Authenticity</h2>
                  <p className="text-gray-600">Upload photos to verify your pharmacy</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Storefront Photo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Camera className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Upload storefront photo
                      </span>
                      <input
                        type="file"
                        name="storefrontPhoto"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Clear photo of your pharmacy from outside</p>
                    {fileNames.storefrontPhoto && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.storefrontPhoto}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pharmacy Logo <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Upload pharmacy logo
                      </span>
                      <input
                        type="file"
                        name="pharmacyLogo"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">High-quality logo image (PNG/JPG)</p>
                    {fileNames.pharmacyLogo && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.pharmacyLogo}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Bank Details */}
            {step === 8 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Bank Account Details</h2>
                  <p className="text-gray-600">For payment processing and verification</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Holder Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="As per bank records"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter bank name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter account number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Account Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="confirmAccountNumber"
                      value={formData.confirmAccountNumber}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Re-enter account number"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                    placeholder="ABCD0000000"
                    maxLength={11}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Cancelled Cheque <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={40} />
                    <label className="cursor-pointer">
                      <span className="text-blue-500 hover:text-blue-600 font-medium">
                        Choose file
                      </span>
                      <input
                        type="file"
                        name="cancelledCheque"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Clear image of cancelled cheque</p>
                    {fileNames.cancelledCheque && (
                      <p className="mt-2 text-sm text-green-600">{fileNames.cancelledCheque}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Success */}
            {step === 9 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-green-500" size={48} />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Application Submitted Successfully!
                </h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Your registration is now under review. You will receive a notification once your account is approved.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                  <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
                  <ul className="text-sm text-blue-800 space-y-2 text-left">
                    <li>✓ Our team will review your documents (1-2 business days)</li>
                    <li>✓ You'll receive an email/SMS once approved</li>
                    <li>✓ Then you can login and start using MedFlow</li>
                  </ul>
                </div>
                <Link
                  href="/auth/admin/login"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                >
                  Go to Login
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            {step > 0 && step < 9 && (
              <div className="flex items-center justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 transition-all"
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                )}

                {step < 8 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                  >
                    Next
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        {step < 9 && (
          <p className="text-center mt-6 text-gray-600">
            Already registered?{' '}
            <Link href="/auth/admin/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
