'use client';

import React from 'react';
import { Clock, MapPin, Package } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface Order {
  id: string;
  orderNumber: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface RecentOrdersProps {
  orders: Order[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Package size={16} />;
      case 'shipped':
      case 'delivered':
        return <MapPin size={16} />;
      default:
        return <Clock size={16} />;
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
      <h3
        className={`text-lg font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-text-dark'
        }`}
      >
        Recent Orders
      </h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-4 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'border-gray-700 hover:border-primary-green'
                : 'border-gray-200 hover:border-primary-green'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-text-dark'
                }`}
              >
                {order.orderNumber}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span
                className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
              >
                {order.items} items • {order.date}
              </span>
              <span
                className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-text-dark'
                }`}
              >
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
