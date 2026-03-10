'use client';

import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function PrescriptionUpload() {
  const { theme } = useTheme();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploaded(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
    }, 2000);
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
        Upload Prescription
      </h3>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
          theme === 'dark'
            ? 'border-gray-600 hover:border-primary-green'
            : 'border-gray-300 hover:border-primary-green'
        }`}
      >
        {!file ? (
          <label className="cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Upload
              className={`mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              size={48}
            />
            <p
              className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-text-dark'
              }`}
            >
              Click to upload or drag and drop
            </p>
            <p
              className={`text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              PNG, JPG, PDF up to 10MB
            </p>
          </label>
        ) : uploaded ? (
          <div>
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <p
              className={`text-sm font-medium mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-text-dark'
              }`}
            >
              Prescription Uploaded Successfully!
            </p>
            <p
              className={`text-xs mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              AI is analyzing your prescription...
            </p>
            <button
              onClick={() => {
                setFile(null);
                setUploaded(false);
              }}
              className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-accent-green transition-colors text-sm"
            >
              Upload Another
            </button>
          </div>
        ) : (
          <div>
            <FileText
              className={`mx-auto mb-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
              size={48}
            />
            <p
              className={`text-sm font-medium mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-text-dark'
              }`}
            >
              {file.name}
            </p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-6 py-2 bg-primary-green text-white rounded-lg hover:bg-accent-green transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
