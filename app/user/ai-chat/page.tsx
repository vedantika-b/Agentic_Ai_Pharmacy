'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import AIChat from '@/components/AIChat';
import { useTheme } from '@/context/ThemeContext';

export default function UserAIChatPage() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-theme ${theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Sidebar role="user" />
      <Navbar userName="Sarah Johnson" userRole="Patient" />
      
      <main className="ml-64 mt-20 p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-text-dark'}`}>
            AI Pharmacist Assistant
          </h1>
          <AIChat />
        </div>
      </main>
    </div>
  );
}
