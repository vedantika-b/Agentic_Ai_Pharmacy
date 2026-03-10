'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
  X,
  Sun,
  Moon,
  Shield
} from 'lucide-react';

interface AdminSidebarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function AdminSidebar({ theme, toggleTheme }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Building2, label: 'Pharmacies', path: '/admin/pharmacies' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-lg`}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-40 transition-transform duration-300 shadow-xl border-r ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 ${
          theme === 'dark' 
            ? 'bg-[#0A4F41] border-[#0A4F41]' 
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        {/* Logo */}
        <div className={`p-6 border-b ${
          theme === 'dark' ? 'border-[#0F6D57]' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              theme === 'dark' ? 'bg-white/10' : 'bg-[#0F6D57]'
            }`}>
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                MedFlow
              </h1>
              <p className={`text-xs ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      active
                        ? theme === 'dark'
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'bg-[#0F6D57] text-white shadow-lg'
                        : theme === 'dark'
                        ? 'hover:bg-white/5 text-white/80'
                        : 'hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className={`p-4 border-t ${
          theme === 'dark' ? 'border-[#0F6D57]' : 'border-gray-200'
        }`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-[#0F6D57] hover:bg-[#0A4F41] text-white'
            }`}
          >
            <span className="font-medium">Theme</span>
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <>
                  <Moon size={18} />
                  <span className="text-sm">Dark</span>
                </>
              ) : (
                <>
                  <Sun size={18} />
                  <span className="text-sm">Light</span>
                </>
              )}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
