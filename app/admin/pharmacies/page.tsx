'use client';

import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  MoreVertical
} from 'lucide-react';

export default function PharmacyManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Placeholder data for pharmacies
  const pharmacies = [
    {
      id: 1,
      name: 'MedLife Pharmacy',
      owner: 'Rajesh Kumar',
      location: 'Mumbai, Maharashtra',
      phone: '+91 9876543210',
      email: 'medlife@example.com',
      status: 'approved',
      licenseNumber: 'DL-12345',
      registeredDate: '2024-01-15',
      revenue: '₹2,45,000'
    },
    {
      id: 2,
      name: 'HealthFirst Pharmacy',
      owner: 'Priya Sharma',
      location: 'Delhi, NCR',
      phone: '+91 9876543211',
      email: 'healthfirst@example.com',
      status: 'pending',
      licenseNumber: 'DL-12346',
      registeredDate: '2024-02-20',
      revenue: '₹0'
    },
    {
      id: 3,
      name: 'CareWell Pharmacy',
      owner: 'Amit Patel',
      location: 'Bangalore, Karnataka',
      phone: '+91 9876543212',
      email: 'carewell@example.com',
      status: 'approved',
      licenseNumber: 'DL-12347',
      registeredDate: '2024-01-10',
      revenue: '₹3,12,000'
    },
    {
      id: 4,
      name: 'MediQuick Pharmacy',
      owner: 'Sneha Reddy',
      location: 'Hyderabad, Telangana',
      phone: '+91 9876543213',
      email: 'mediquick@example.com',
      status: 'rejected',
      licenseNumber: 'DL-12348',
      registeredDate: '2024-02-28',
      revenue: '₹0'
    },
    {
      id: 5,
      name: 'WellCare Pharmacy',
      owner: 'Vikram Singh',
      location: 'Pune, Maharashtra',
      phone: '+91 9876543214',
      email: 'wellcare@example.com',
      status: 'approved',
      licenseNumber: 'DL-12349',
      registeredDate: '2024-01-25',
      revenue: '₹1,89,000'
    },
    {
      id: 6,
      name: 'LifeCare Pharmacy',
      owner: 'Anita Desai',
      location: 'Chennai, Tamil Nadu',
      phone: '+91 9876543215',
      email: 'lifecare@example.com',
      status: 'pending',
      licenseNumber: 'DL-12350',
      registeredDate: '2024-03-05',
      revenue: '₹0'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-700 border-green-200',
      pending: 'bg-orange-100 text-orange-700 border-orange-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };

    const icons = {
      approved: <CheckCircle size={14} />,
      pending: <Clock size={14} />,
      rejected: <XCircle size={14} />
    };

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {icons[status as keyof typeof icons]}
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pharmacy.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: pharmacies.length,
    approved: pharmacies.filter(p => p.status === 'approved').length,
    pending: pharmacies.filter(p => p.status === 'pending').length,
    rejected: pharmacies.filter(p => p.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Pharmacy Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor all registered pharmacies
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building2 size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
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
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <XCircle size={20} className="text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
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
              placeholder="Search by name, owner, or location..."
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
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pharmacies Table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Pharmacy
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  License
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPharmacies.map((pharmacy) => (
                <tr key={pharmacy.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{pharmacy.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{pharmacy.owner}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 mt-1">
                        <MapPin size={12} />
                        {pharmacy.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Phone size={14} />
                        {pharmacy.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Mail size={14} />
                        {pharmacy.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{pharmacy.licenseNumber}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{pharmacy.registeredDate}</p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(pharmacy.status)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{pharmacy.revenue}</p>
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
