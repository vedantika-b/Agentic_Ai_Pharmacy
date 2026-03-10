'use client';

import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import PrescriptionUpload from '@/components/PrescriptionUpload';
import MedicineRecommendations from '@/components/MedicineRecommendations';
import RecentOrders from '@/components/RecentOrders';
import { Package, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function UserDashboard() {
  const { theme } = useTheme();

  const recommendedMedicines = [
    { id: '1', name: 'Aspirin 500mg', dosage: '2 tablets daily', price: 15.99, inStock: true },
    { id: '2', name: 'Amoxicillin 250mg', dosage: '3 times daily', price: 24.50, inStock: true },
    { id: '3', name: 'Ibuprofen 400mg', dosage: 'As needed', price: 12.75, inStock: true },
    { id: '4', name: 'Vitamin D3', dosage: '1 capsule daily', price: 18.99, inStock: false },
  ];

  const recentOrders = [
    { id: '1', orderNumber: '#ORD-1234', items: 3, total: 45.50, status: 'delivered' as const, date: 'Mar 5, 2026' },
    { id: '2', orderNumber: '#ORD-1235', items: 2, total: 32.99, status: 'shipped' as const, date: 'Mar 8, 2026' },
    { id: '3', orderNumber: '#ORD-1236', items: 5, total: 67.25, status: 'processing' as const, date: 'Mar 9, 2026' },
  ];

  return (
    <div className={`min-h-screen transition-theme ${theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'}`}>
      <Sidebar role="user" />
      <Navbar userName="Sarah Johnson" userRole="Patient" />
      
      <main className="ml-64 mt-20 p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Orders"
            value="24"
            icon={<Package size={24} />}
            growth={15.5}
            growthLabel="this month"
          />
          <StatCard
            title="Pending Orders"
            value="2"
            icon={<Clock size={24} />}
            growthLabel="in processing"
          />
          <StatCard
            title="Completed"
            value="22"
            icon={<CheckCircle size={24} />}
            growth={10.2}
            growthLabel="delivered"
          />
          <StatCard
            title="Total Spent"
            value="$842"
            icon={<TrendingUp size={24} />}
            growthLabel="this year"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PrescriptionUpload />
          </div>
          <div>
            <RecentOrders orders={recentOrders} />
          </div>
        </div>

        {/* Medicine Recommendations */}
        <div className="mb-6">
          <MedicineRecommendations medicines={recommendedMedicines} />
        </div>

        {/* AI Assistant Info Card */}
        <div
          className={`rounded-xl p-6 transition-theme ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-primary-green to-accent-green text-white'
              : 'bg-gradient-to-r from-primary-green to-accent-green text-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Need Help? Ask Our AI Pharmacist</h3>
              <p className="text-sm opacity-90">
                Get instant answers about medications, dosages, side effects, and more.
              </p>
            </div>
            <button className="px-6 py-3 bg-white text-primary-green rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Chat
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
