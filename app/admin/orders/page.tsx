'use client';

import React, { useState } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Package,
  TruckIcon,
  Eye,
  MoreVertical,
  Calendar
} from 'lucide-react';

export default function OrderManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Placeholder data for orders
  const orders = [
    {
      id: '#3721',
      customer: 'Rahul Sharma',
      pharmacy: 'MedLife Pharmacy',
      items: 3,
      total: '₹1,250',
      status: 'delivered',
      date: '2024-03-08',
      time: '10:30 AM',
      paymentMethod: 'Card'
    },
    {
      id: '#3720',
      customer: 'Priya Patel',
      pharmacy: 'HealthFirst Pharmacy',
      items: 5,
      total: '₹2,800',
      status: 'pending',
      date: '2024-03-08',
      time: '09:15 AM',
      paymentMethod: 'UPI'
    },
    {
      id: '#3719',
      customer: 'Amit Kumar',
      pharmacy: 'CareWell Pharmacy',
      items: 2,
      total: '₹850',
      status: 'processing',
      date: '2024-03-08',
      time: '11:45 AM',
      paymentMethod: 'Cash'
    },
    {
      id: '#3718',
      customer: 'Sneha Reddy',
      pharmacy: 'MediQuick Pharmacy',
      items: 4,
      total: '₹1,950',
      status: 'shipped',
      date: '2024-03-07',
      time: '03:20 PM',
      paymentMethod: 'Card'
    },
    {
      id: '#3717',
      customer: 'Vikram Singh',
      pharmacy: 'WellCare Pharmacy',
      items: 1,
      total: '₹450',
      status: 'cancelled',
      date: '2024-03-07',
      time: '02:10 PM',
      paymentMethod: 'UPI'
    },
    {
      id: '#3716',
      customer: 'Anita Desai',
      pharmacy: 'LifeCare Pharmacy',
      items: 6,
      total: '₹3,200',
      status: 'delivered',
      date: '2024-03-07',
      time: '01:30 PM',
      paymentMethod: 'Card'
    },
    {
      id: '#3715',
      customer: 'Rohit Verma',
      pharmacy: 'MedLife Pharmacy',
      items: 3,
      total: '₹1,100',
      status: 'pending',
      date: '2024-03-09',
      time: '08:00 AM',
      paymentMethod: 'Cash'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      delivered: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', icon: <CheckCircle size={14} /> },
      pending: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200', icon: <Clock size={14} /> },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', icon: <Package size={14} /> },
      shipped: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', icon: <TruckIcon size={14} /> },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', icon: <XCircle size={14} /> }
    };

    const style = styles[status as keyof typeof styles];

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${style.bg} ${style.text} ${style.border}`}>
        {style.icon}
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.pharmacy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Order Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track and manage all pharmacy orders
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ShoppingCart size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock size={20} className="text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Package size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Processing</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.processing}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.delivered}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by order ID, customer, or pharmacy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F6D57] focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0F6D57] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Pharmacy
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#0F6D57] dark:text-[#0F6D57]">{order.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.customer}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.pharmacy}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                        <Calendar size={12} />
                        {order.date}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">{order.time}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.items}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{order.total}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{order.paymentMethod}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#0F6D57] hover:bg-[#0F6D57]/10 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
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
