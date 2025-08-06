import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInstitution, setSelectedInstitution] = useState('Central Bank A');

  // Mock user data for demonstration
  const mockUser = {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@centralbank.com',
    role: 'Admin',
    institution: 'Central Bank A',
    permissions: ['read', 'write', 'admin', 'audit']
  };

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('vault_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(mockUser);
        } else {
          localStorage.removeItem('vault_token');
        }
      } catch (error) {
        localStorage.removeItem('vault_token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - in real app, this would call your API
    if (email === 'admin@vault.com' && password === 'password') {
      const token = 'mock.jwt.token';
      localStorage.setItem('vault_token', token);
      setUser(mockUser);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('vault_token');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    selectedInstitution,
    setSelectedInstitution
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 