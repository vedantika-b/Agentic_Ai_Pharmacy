'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  Pill,
  MessageSquare,
  BarChart3,
  Settings,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  role?: 'admin' | 'user';
}

export default function Sidebar({ role = 'admin' }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();

  const adminMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
    { name: 'Inventory', icon: <Package size={20} />, path: '/admin/inventory' },
    { name: 'Prescriptions', icon: <FileText size={20} />, path: '/admin/prescriptions' },
    { name: 'Products', icon: <Pill size={20} />, path: '/admin/products' },
    { name: 'AI Chat', icon: <MessageSquare size={20} />, path: '/admin/ai-chat' },
    { name: 'Analytics', icon: <BarChart3 size={20} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ];

  const userMenuItems: MenuItem[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/user' },
    { name: 'Upload Prescription', icon: <FileText size={20} />, path: '/user/prescription' },
    { name: 'My Orders', icon: <ShoppingCart size={20} />, path: '/user/orders' },
    { name: 'Medicines', icon: <Pill size={20} />, path: '/user/medicines' },
    { name: 'AI Pharmacist', icon: <MessageSquare size={20} />, path: '/user/ai-chat' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/user/settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : userMenuItems;

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-64 transition-theme ${
        theme === 'dark'
          ? 'bg-sidebar-dark'
          : 'sidebar-light'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-opacity-20 border-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-primary-green flex items-center justify-center">
            <Pill className="text-white" size={24} />
          </div>
          <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            MedFlow
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                isActive
                  ? theme === 'dark'
                    ? 'bg-primary-green text-white'
                    : 'bg-primary-green text-white'
                  : theme === 'dark'
                  ? 'text-text-light hover:bg-primary-green hover:bg-opacity-20'
                  : 'text-gray-700 hover:bg-primary-green hover:bg-opacity-10'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
