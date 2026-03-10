'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Building2,
  Download,
  Calendar
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Reports() {
  // Placeholder data for charts
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 145000, orders: 320 },
    { month: 'Feb', revenue: 178000, orders: 410 },
    { month: 'Mar', revenue: 198000, orders: 475 },
    { month: 'Apr', revenue: 220000, orders: 520 },
    { month: 'May', revenue: 255000, orders: 590 },
    { month: 'Jun', revenue: 289000, orders: 650 }
  ];

  const categoryData = [
    { name: 'Medicines', value: 45, color: '#3b82f6' },
    { name: 'Supplements', value: 25, color: '#10b981' },
    { name: 'Personal Care', value: 15, color: '#8b5cf6' },
    { name: 'Medical Devices', value: 15, color: '#f59e0b' }
  ];

  const topPharmaciesData = [
    { name: 'MedLife Pharmacy', revenue: 125000, orders: 280 },
    { name: 'CareWell Pharmacy', revenue: 98000, orders: 220 },
    { name: 'HealthFirst', revenue: 87000, orders: 195 },
    { name: 'WellCare', revenue: 76000, orders: 170 },
    { name: 'LifeCare', revenue: 65000, orders: 145 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <button className="px-6 py-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm flex items-center gap-2">
            <Calendar size={20} />
            Last 6 Months
          </button>
          <button className="px-6 py-3 bg-[#0F6D57] text-white rounded-lg hover:bg-[#0A4F41] transition-all shadow-lg flex items-center gap-2">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#0F6D57] rounded-lg shadow-lg">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-500">+24%</span>
          </div>
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">₹12,85,000</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Last 6 months</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#10b981] rounded-lg shadow-lg">
              <ShoppingCart size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-500">+18%</span>
          </div>
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2,765</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Last 6 months</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#8b5cf6] rounded-lg shadow-lg">
              <Users size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-500">+32%</span>
          </div>
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">New Users</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1,847</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Last 6 months</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-[#f59e0b] rounded-lg shadow-lg">
              <Building2 size={24} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-green-500">+12%</span>
          </div>
          <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Pharmacies</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">242</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Currently active</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Revenue & Orders Trend
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Monthly performance over the last 6 months
              </p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#3b82f6" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue (₹)" radius={[8, 8, 0, 0]} />
              <Bar yAxisId="right" dataKey="orders" fill="#10b981" name="Orders" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Sales by Category
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Product category distribution
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{category.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Pharmacies */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Top Performing Pharmacies
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Pharmacies with highest revenue and orders
        </p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Pharmacy Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topPharmaciesData.map((pharmacy, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-500' :
                      index === 2 ? 'bg-orange-500' :
                      'bg-[#0F6D57]'
                    }`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{pharmacy.name}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">₹{pharmacy.revenue.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-gray-600 dark:text-gray-400">{pharmacy.orders}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#0F6D57] h-2 rounded-full"
                        style={{ width: `${(pharmacy.revenue / 125000) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
