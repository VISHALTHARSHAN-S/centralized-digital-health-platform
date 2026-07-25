import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('chms_access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data.user);
        setProfile(response.data.profile);
      }
    } catch (err) {
      console.error('Failed to load profile context:', err.message);
      localStorage.removeItem('chms_access_token');
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.success && res.data) {
        localStorage.setItem('chms_access_token', res.data.accessToken);
        setUser(res.data.user);
        setProfile(res.data.profile);
        return res.data;
      }
      throw new Error(res.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await authService.register(formData);
      if (res.success && res.data) {
        localStorage.setItem('chms_access_token', res.data.accessToken);
        setUser(res.data.user);
        setProfile(res.data.profile);
        return res.data;
      }
      throw new Error(res.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // Ignore logout API error
    } finally {
      localStorage.removeItem('chms_access_token');
      setUser(null);
      setProfile(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        login,
        register,
        logout,
        refetchProfile: fetchProfile,
        isAuthenticated: !!user,
        role: user?.role
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
