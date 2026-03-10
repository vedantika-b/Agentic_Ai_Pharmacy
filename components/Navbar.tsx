'use client';

import React from 'react';
import { Moon, Sun, Bell, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  userName?: string;
  userRole?: string;
  avatarUrl?: string;
}

export default function Navbar({ 
  userName = 'John Doe', 
  userRole = 'Administrator',
  avatarUrl 
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 right-0 left-64 h-20 transition-theme border-b z-10 ${
        theme === 'dark'
          ? 'bg-card-dark border-gray-700'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className={`relative ${theme === 'dark' ? 'text-text-light' : 'text-gray-600'}`}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
            <input
              type="text"
              placeholder="Search medicines, orders, prescriptions..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-theme ${
                theme === 'dark'
                  ? 'bg-background-dark border-gray-700 text-text-light placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              } focus:outline-none focus:ring-2 focus:ring-primary-green`}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <button
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-text-light'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            <Bell size={20} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-primary-green text-white hover:bg-accent-green'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-300 dark:border-gray-700">
            <div className="text-right">
              <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {userName}
              </p>
              <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                {userRole}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-green flex items-center justify-center text-white font-semibold">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
