'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ActivityItem {
  id: string;
  type: 'order' | 'prescription' | 'inventory' | 'user';
  title: string;
  description: string;
  time: string;
  status?: 'success' | 'pending' | 'warning';
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const { theme } = useTheme();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'warning':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
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
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`} />
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-text-dark'
                }`}
              >
                {activity.title}
              </p>
              <p
                className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {activity.description}
              </p>
              <p
                className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
