'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  isVerified: boolean;
  role: 'user';
}

interface Admin {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  storeName: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  role: 'admin';
}

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: 'user' | 'admin' | null;
  login: (token: string, userData: User | Admin, role: 'user' | 'admin') => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  updateAdmin: (adminData: Admin) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);
  const router = useRouter();

  // Load auth data from localStorage on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('userRole') as 'user' | 'admin' | null;

        if (storedToken && storedRole) {
          setToken(storedToken);
          setRole(storedRole);

          if (storedRole === 'user') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
          } else if (storedRole === 'admin') {
            const storedAdmin = localStorage.getItem('admin');
            if (storedAdmin) {
              setAdmin(JSON.parse(storedAdmin));
            }
          }
        }
      } catch (error) {
        console.error('Error loading auth data:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('admin');
        localStorage.removeItem('userRole');
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (newToken: string, userData: User | Admin, userRole: 'user' | 'admin') => {
    setToken(newToken);
    setRole(userRole);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('userRole', userRole);

    if (userRole === 'user') {
      setUser(userData as User);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (userRole === 'admin') {
      setAdmin(userData as Admin);
      localStorage.setItem('admin', JSON.stringify(userData));
    }
  };

  const logout = () => {
    // Clear state
    setUser(null);
    setAdmin(null);
    setToken(null);
    setRole(null);

    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    localStorage.removeItem('userRole');

    // Redirect to home
    router.push('/');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const updateAdmin = (adminData: Admin) => {
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const value: AuthContextType = {
    user,
    admin,
    token,
    isAuthenticated: !!token && (!!user || !!admin),
    isLoading,
    role,
    login,
    logout,
    updateUser,
    updateAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected Route HOC
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  allowedRole?: 'user' | 'admin'
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading, role } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          // Not authenticated, redirect to home
          router.push('/');
        } else if (allowedRole && role !== allowedRole) {
          // Wrong role, redirect to appropriate dashboard
          if (role === 'user') {
            router.push('/user');
          } else if (role === 'admin') {
            router.push('/admin');
          }
        }
      }
    }, [isAuthenticated, isLoading, role, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!isAuthenticated || (allowedRole && role !== allowedRole)) {
      return null;
    }

    return <Component {...props} />;
  };
}
