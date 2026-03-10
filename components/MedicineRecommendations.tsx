'use client';

import React from 'react';
import { Pill, ShoppingCart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  price: number;
  inStock: boolean;
  image?: string;
}

interface MedicineRecommendationsProps {
  medicines: Medicine[];
}

export default function MedicineRecommendations({ medicines }: MedicineRecommendationsProps) {
  const { theme } = useTheme();

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
        Recommended Medicines
      </h3>
      <div className="space-y-4">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              theme === 'dark'
                ? 'bg-background-dark hover:bg-gray-800'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 flex-1">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-primary-green bg-opacity-20' : 'bg-green-50'
                }`}
              >
                <Pill className="text-primary-green" size={20} />
              </div>
              <div>
                <p
                  className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-text-dark'
                  }`}
                >
                  {medicine.name}
                </p>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {medicine.dosage}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span
                className={`font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-text-dark'
                }`}
              >
                ${medicine.price.toFixed(2)}
              </span>
              <button
                disabled={!medicine.inStock}
                className={`p-2 rounded-lg transition-colors ${
                  medicine.inStock
                    ? 'bg-primary-green text-white hover:bg-accent-green'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
