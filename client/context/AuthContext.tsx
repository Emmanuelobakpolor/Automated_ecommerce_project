import React, { createContext, useContext, useState, useCallback } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, businessName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          name: 'John Doe',
          businessName: 'Tech Sales Store',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
        };
        setUser(mockUser);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string, businessName: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (email && password && name && businessName) {
        const mockUser: User = {
          id: '1',
          email,
          name,
          businessName,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
        };
        setUser(mockUser);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
