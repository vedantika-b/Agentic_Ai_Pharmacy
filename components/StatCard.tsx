'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  growth?: number;
  growthLabel?: string;
}

export default function StatCard({ title, value, icon, growth, growthLabel }: StatCardProps) {
  const { theme } = useTheme();
  const isPositive = growth !== undefined && growth >= 0;

  return (
    <div
      className={`rounded-xl p-6 transition-theme ${
        theme === 'dark'
          ? 'bg-card-dark card-glow-dark border border-gray-700'
          : 'bg-white shadow-card-light'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            theme === 'dark' ? 'bg-primary-green bg-opacity-20' : 'bg-green-50'
          }`}
        >
          <div className="text-primary-green">{icon}</div>
        </div>
        {growth !== undefined && (
          <div
            className={`flex items-center space-x-1 text-sm font-semibold ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(growth)}%</span>
          </div>
        )}
      </div>
      <h3
        className={`text-sm font-medium mb-1 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-text-dark'
        }`}
      >
        {value}
      </p>
      {growthLabel && (
        <p
          className={`text-xs mt-1 ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          {growthLabel}
        </p>
      )}
    </div>
  );
}
