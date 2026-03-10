'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  AlertCircle,
  Pill,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function UserSignup() {
  const { theme } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    // Address
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    // Password
    password: '',
    confirmPassword: '',
    // Health Info
    allergies: '',
    majorDiseases: [] as string[],
    currentMedications: '',
    // OTP
    otp: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleDiseaseChange = (disease: string) => {
    setFormData(prev => ({
      ...prev,
      majorDiseases: prev.majorDiseases.includes(disease)
        ? prev.majorDiseases.filter(d => d !== disease)
        : [...prev.majorDiseases, disease]
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.mobileNumber || 
            !formData.dateOfBirth || !formData.gender) {
          setError('Please fill all personal information fields');
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          setError('Please enter a valid email');
          return false;
        }
        if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
          setError('Please enter a valid 10-digit mobile number');
          return false;
        }
        break;
      case 2:
        if (!formData.addressLine || !formData.city || !formData.state || !formData.pincode) {
          setError('Please fill all address fields');
          return false;
        }
        if (!/^[0-9]{6}$/.test(formData.pincode)) {
          setError('Please enter a valid 6-digit pincode');
          return false;
        }
        break;
      case 3:
        if (!formData.password || !formData.confirmPassword) {
          setError('Please enter password and confirmation');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters long');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return false;
        }
        break;
      case 4:
        if (!formData.allergies) {
          setError('Please specify allergies or select "No Known Allergies"');
          return false;
        }
        if (formData.majorDiseases.length === 0) {
          setError('Please select at least one disease option (or "None")');
          return false;
        }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      setError('');
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          addressLine: formData.addressLine,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          password: formData.password,
          allergies: formData.allergies,
          majorDiseases: formData.majorDiseases,
          currentMedications: formData.currentMedications
        })
      });

      const data = await response.json();

      if (data.success) {
        setUserId(data.data.userId);
        setStep(5); // Move to OTP verification step
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          otp: formData.otp
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/user');
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const diseases = [
    'None',
    'Diabetes',
    'Asthma',
    'Heart Disease',
    'High Blood Pressure',
    'Kidney Disease',
    'Liver Disease',
    'Thyroid',
    'Cancer'
  ];

  return (
    <div className={`min-h-screen transition-theme ${theme === 'dark' ? 'bg-background-dark' : 'bg-gradient-to-br from-blue-50 to-green-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <Pill className="text-white" size={32} />
              </div>
            </div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Sign Up - MedFlow
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Create your account to access AI-powered pharmacy services
            </p>
          </div>

          {/* Progress Bar */}
          {step < 5 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 mx-1 rounded-full transition-all ${
                      s <= step
                        ? 'bg-gradient-to-r from-blue-500 to-green-500'
                        : theme === 'dark'
                        ? 'bg-gray-700'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs">
                <span className={step >= 1 ? 'text-blue-500 font-medium' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Personal</span>
                <span className={step >= 2 ? 'text-blue-500 font-medium' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Address</span>
                <span className={step >= 3 ? 'text-blue-500 font-medium' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Security</span>
                <span className={step >= 4 ? 'text-blue-500 font-medium' : theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}>Health</span>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className={`rounded-2xl p-8 transition-theme ${
            theme === 'dark'
              ? 'bg-card-dark border border-gray-700'
              : 'bg-white shadow-xl'
          }`}>
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={step === 5 ? handleVerifyOTP : handleSubmit}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Personal Information
                  </h3>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        maxLength={10}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Date of Birth *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white'
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        Gender *
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Address */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Address Details
                  </h3>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Address Line *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        name="addressLine"
                        value={formData.addressLine}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="House no, Building name, Street"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="6-digit pincode"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Account Security
                  </h3>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Create a strong password"
                      />
                    </div>
                    <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Minimum 8 characters
                    </p>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-theme ${
                          theme === 'dark'
                            ? 'bg-gray-800 border-gray-700 text-white'
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        placeholder="Re-enter your password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Health Information */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Health Information
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    This information helps us recommend safe medicines for you
                  </p>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Allergies *
                    </label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="List any allergies or type 'No Known Allergies'"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Major Diseases / Chronic Conditions *
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {diseases.map((disease) => (
                        <label
                          key={disease}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                            formData.majorDiseases.includes(disease)
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                              : theme === 'dark'
                              ? 'border-gray-700 hover:border-gray-600'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.majorDiseases.includes(disease)}
                            onChange={() => handleDiseaseChange(disease)}
                            className="mr-2 text-blue-500"
                          />
                          <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            {disease}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Current Medications (Optional)
                    </label>
                    <textarea
                      name="currentMedications"
                      value={formData.currentMedications}
                      onChange={handleChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border transition-theme ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="List any medications you're currently taking"
                    />
                  </div>
                </div>
              )}

              {/* Step 5: OTP Verification */}
              {step === 5 && (
                <div className="space-y-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={40} />
                  </div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Verify Your Mobile Number
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    We've sent a 6-digit OTP to {formData.mobileNumber}
                  </p>

                  <div className="max-w-xs mx-auto">
                    <input
                      type="text"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={6}
                      className={`w-full text-center text-2xl tracking-widest px-4 py-4 rounded-lg border transition-theme ${
                        theme === 'dark'
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="000000"
                    />
                  </div>

                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8">
                {step > 1 && step < 5 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'border-gray-700 hover:bg-gray-800 text-gray-300'
                        : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <ArrowLeft size={20} />
                    Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all"
                  >
                    Next
                    <ArrowRight size={20} />
                  </button>
                ) : step === 4 ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50"
                  >
                    {loading ? 'Verifying...' : 'Verify & Complete'}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Footer */}
          <p className={`text-center mt-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{' '}
            <Link href="/auth/user/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
