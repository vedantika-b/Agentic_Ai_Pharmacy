'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import RecentActivity from '@/components/RecentActivity';
import InventoryStatus from '@/components/InventoryStatus';
import { DollarSign, ShoppingCart, FileText, Star, Activity } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AdminDashboard() {
  const { theme } = useTheme();

  const recentActivities = [
    {
      id: '1',
      type: 'order' as const,
      title: 'New Order Received',
      description: 'Order #12345 - 3 items',
      time: '5 minutes ago',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'prescription' as const,
      title: 'Prescription Uploaded',
      description: 'Patient: John Smith - Awaiting approval',
      time: '15 minutes ago',
      status: 'pending' as const,
    },
    {
      id: '3',
      type: 'inventory' as const,
      title: 'Low Stock Alert',
      description: 'Aspirin 500mg - Only 45 units left',
      time: '1 hour ago',
      status: 'warning' as const,
    },
    {
      id: '4',
      type: 'order' as const,
      title: 'Order Completed',
      description: 'Order #12340 - Delivered successfully',
      time: '2 hours ago',
      status: 'success' as const,
    },
  ];

  const inventoryItems = [
    { id: '1', name: 'Aspirin 500mg', stock: 45, minStock: 100, status: 'low' as const },
    { id: '2', name: 'Paracetamol 650mg', stock: 180, minStock: 200, status: 'medium' as const },
    { id: '3', name: 'Amoxicillin 250mg', stock: 500, minStock: 300, status: 'good' as const },
    { id: '4', name: 'Ibuprofen 400mg', stock: 80, minStock: 150, status: 'low' as const },
  ];

  return (
    <div className={`min-h-screen transition-theme ${theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Sidebar role="admin" />
      <Navbar userName="John Doe" userRole="Administrator" />
      
      <main className="ml-64 mt-20 p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Revenue"
            value="$45,231"
            icon={<DollarSign size={24} />}
            growth={12.5}
            growthLabel="vs last month"
          />
          <StatCard
            title="Orders"
            value="1,234"
            icon={<ShoppingCart size={24} />}
            growth={8.2}
            growthLabel="vs last month"
          />
          <StatCard
            title="Prescriptions"
            value="456"
            icon={<FileText size={24} />}
            growth={-3.5}
            growthLabel="vs last month"
          />
          <StatCard
            title="Customer Satisfaction"
            value="4.8"
            icon={<Star size={24} />}
            growth={2.1}
            growthLabel="vs last month"
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivities} />
          </div>
          <div>
            <InventoryStatus items={inventoryItems} />
          </div>
        </div>

        {/* OCR Processing Card */}
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
              OCR Processing Stats
            </h3>
            <Activity className="text-primary-green" size={20} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-green">234</p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Processed Today
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-accent-green">98.5%</p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Accuracy Rate
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">12s</p>
              <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Avg Processing Time
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
