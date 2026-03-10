'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  status: 'low' | 'medium' | 'good';
}

interface InventoryStatusProps {
  items: InventoryItem[];
}

export default function InventoryStatus({ items }: InventoryStatusProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'low':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'good':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div
      className={`rounded-xl p-6 transition-theme ${
        theme === 'dark'
          ? 'bg-card-dark card-glow-dark border border-gray-700'
          : 'bg-white shadow-card-light'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-lg font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-text-dark'
          }`}
        >
          Inventory Status
        </h3>
        <AlertTriangle className="text-yellow-500" size={20} />
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-text-dark'
                }`}
              >
                {item.name}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}
              >
                {item.stock} units
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  item.status === 'low'
                    ? 'bg-red-500'
                    : item.status === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min((item.stock / item.minStock) * 50, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
