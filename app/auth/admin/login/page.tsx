'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminLogin() {
  const { theme } = useTheme();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Login, 2: 2FA Verification
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [requires2FA, setRequires2FA] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    twoFactorCode: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        if (data.requiresTwoFactor) {
          // Admin has 2FA enabled, move to 2FA step
          setAdminEmail(formData.email);
          setRequires2FA(true);
          setStep(2);
        } else {
          // Admin doesn't have 2FA, login directly
          localStorage.setItem('token', data.token);
          localStorage.setItem('admin', JSON.stringify(data.admin));
          localStorage.setItem('userRole', 'admin');
          router.push('/admin');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.twoFactorCode || formData.twoFactorCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/verify-2fa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: adminEmail,
          token: formData.twoFactorCode
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        localStorage.setItem('userRole', 'admin');
        router.push('/admin');
      } else {
        setError(data.message || '2FA verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-theme ${theme === 'dark' ? 'bg-background-dark' : 'bg-gradient-to-br from-blue-50 to-green-50'}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <Shield className="text-white" size={32} />
              </div>
            </div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              Admin Login
            </h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {step === 1 ? 'Access your pharmacy admin dashboard' : 'Enter your 2FA code'}
            </p>
          </div>

          {/* Login Card */}
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

            {/* Step 1: Login Form */}
            {step === 1 && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
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
                      placeholder="admin@pharmacy.com"
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="mr-2 text-blue-500 rounded"
                    />
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Remember me
                    </span>
                  </label>

                  <Link
                    href="/auth/admin/forgot-password"
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/30 border-yellow-700' : 'bg-yellow-50 border-yellow-200'} border`}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'}`} size={16} />
                    <p className={`text-xs ${theme === 'dark' ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      <strong>Note:</strong> Your account must be approved by our team before you can login. Check your email for approval status.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 font-medium"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>Don't have an account? </span>
                  <Link href="/auth/admin/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                    Register here
                  </Link>
                </div>

                <div className="relative my-6">
                  <div className={`absolute inset-0 flex items-center`}>
                    <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 ${theme === 'dark' ? 'bg-card-dark text-gray-400' : 'bg-white text-gray-500'}`}>
                      Or continue as
                    </span>
                  </div>
                </div>

                <Link
                  href="/"
                  className={`block w-full py-3 rounded-lg border text-center transition-all ${
                    theme === 'dark'
                      ? 'border-gray-700 hover:bg-gray-800 text-gray-300'
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Login as User
                </Link>
              </form>
            )}

            {/* Step 2: 2FA Verification */}
            {step === 2 && (
              <form onSubmit={handleVerify2FA} className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-blue-500" size={40} />
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Two-Factor Authentication
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Open your authenticator app and enter the 6-digit code
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'} border`}>
                  <p className={`text-sm ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>
                    <strong>Using:</strong> Google Authenticator, Authy, or any TOTP app
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    name="twoFactorCode"
                    value={formData.twoFactorCode}
                    onChange={handleChange}
                    maxLength={6}
                    className={`w-full text-center text-2xl tracking-widest px-4 py-4 rounded-lg border transition-theme ${
                      theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="000000"
                    autoComplete="one-time-code"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all disabled:opacity-50 font-medium"
                >
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </button>

                <div className="text-center">
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Lost access to your authenticator?
                  </p>
                  <Link
                    href="/auth/admin/recover-2fa"
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    Use recovery code
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError('');
                    setFormData(prev => ({ ...prev, twoFactorCode: '' }));
                  }}
                  className={`w-full py-2 text-sm transition-all ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-600 hover:text-gray-700'
                  }`}
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>

          {/* Security Info */}
          <div className={`mt-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex items-start gap-3">
              <CheckCircle className={`flex-shrink-0 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} size={20} />
              <div>
                <h4 className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  Secure Admin Access
                </h4>
                <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Your login is protected with enterprise-grade encryption and two-factor authentication for maximum security.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`mt-6 text-center text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            <p>
              By logging in, you agree to MedFlow's{' '}
              <Link href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
