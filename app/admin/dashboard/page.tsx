'use client';

import React from 'react';
import Link from 'next/link';
import {
  Building2,
  Users,
  ShoppingCart,
  Clock,
  DollarSign,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Dashboard() {
  // Placeholder data for weekly orders chart
  const weeklyOrdersData = [
    { day: 'Mon', orders: 45, revenue: 12500 },
    { day: 'Tue', orders: 52, revenue: 15800 },
    { day: 'Wed', orders: 48, revenue: 13200 },
    { day: 'Thu', orders: 61, revenue: 18900 },
    { day: 'Fri', orders: 55, revenue: 16400 },
    { day: 'Sat', orders: 67, revenue: 21300 },
    { day: 'Sun', orders: 43, revenue: 11900 }
  ];

  const statsCards = [
    {
      title: 'Total Pharmacies',
      value: '248',
      change: '+12%',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/pharmacies'
    },
    {
      title: 'Total Users',
      value: '15,847',
      change: '+8%',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/users'
    },
    {
      title: 'Total Orders',
      value: '3,721',
      change: '+23%',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      link: '/admin/orders'
    },
    {
      title: 'Pending Approvals',
      value: '18',
      change: '-5%',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/pharmacies'
    },
    {
      title: 'Revenue (This Month)',
      value: '₹4,89,500',
      change: '+15%',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      link: '/admin/reports'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Here's an overview of your pharmacy network.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-6 py-3 bg-[#0F6D57] text-white rounded-lg hover:bg-[#0A4F41] transition-all shadow-lg flex items-center gap-2">
            <TrendingUp size={20} />
            View Full Report
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Link
              key={index}
              href={card.link}
              className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#0F6D57] shadow-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-gray-400 group-hover:text-blue-500 transition-colors"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {card.title}
                </h3>
                <div className="flex items-end justify-between">
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <span
                    className={`text-sm font-semibold ${
                      card.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {card.change}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-[#0F6D57]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Weekly Orders Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Weekly Orders Overview
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Orders and revenue trends for the past week
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                stroke="#9ca3af"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="left"
                stroke="#3b82f6"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#10b981"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="orders"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Order Value</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">₹1,315</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Active Pharmacies</span>
                <span className="text-lg font-bold text-green-500">242</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                <span className="text-lg font-bold text-blue-500">97.8%</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">New Users (Today)</span>
                <span className="text-lg font-bold text-purple-500">+34</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0F6D57] rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-200 mb-4">
              Contact support or check our documentation for assistance.
            </p>
            <button className="w-full px-4 py-2 bg-white text-[#0F6D57] rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[
            { action: 'New pharmacy registered', name: 'MedLife Pharmacy', time: '5 minutes ago', type: 'pharmacy' },
            { action: 'Order completed', name: 'Order #3721', time: '12 minutes ago', type: 'order' },
            { action: 'New user signup', name: 'Rahul Sharma', time: '23 minutes ago', type: 'user' },
            { action: 'Payment received', name: '₹15,800', time: '1 hour ago', type: 'payment' },
            { action: 'Pharmacy approved', name: 'HealthFirst Pharmacy', time: '2 hours ago', type: 'approval' }
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'pharmacy' ? 'bg-blue-500' :
                activity.type === 'order' ? 'bg-green-500' :
                activity.type === 'user' ? 'bg-purple-500' :
                activity.type === 'payment' ? 'bg-emerald-500' :
                'bg-orange-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {activity.name}
                </p>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {activity.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
