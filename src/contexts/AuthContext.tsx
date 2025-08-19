import React, { createContext, useContext, useState, useEffect } from 'react';
import { safeGet, safeSet, safeRemove } from '../utils/safeStorage';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = safeGet<User | null>('user', null);
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const users = safeGet<any[]>('users', []);
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      safeSet('user', userWithoutPassword);
      return true;
    }
    
    // Default admin login
    if (email === 'admin@blossomwrap.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        name: 'Admin',
        email: 'admin@blossomwrap.com',
        isAdmin: true
      };
      setUser(adminUser);
      safeSet('user', adminUser);
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = safeGet<any[]>('users', []);
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isAdmin: false
    };
    
    users.push(newUser);
    safeSet('users', users);
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    safeSet('user', userWithoutPassword);
    
    return true;
  };

  const logout = () => {
    setUser(null);
    safeRemove('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};