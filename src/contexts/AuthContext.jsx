import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, signOut, adminSignIn, adminSignUp } from '../api/apiAuth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for existing auth data in localStorage
    const storedUser = localStorage.getItem('user');
    const storedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('token');

    if (token) {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin));
      }
    } else {
      // If no token, clear any stored user/admin data
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await signIn(credentials);
      setUser(response.user);
      navigate('/dashboard');
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await signUp(userData);
      setUser(response.user);
      navigate('/dashboard');
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const adminLogin = async (credentials) => {
    try {
      setError(null);
      const response = await adminSignIn(credentials);
  
      localStorage.setItem("token", response.token);
      localStorage.setItem("admin", JSON.stringify(response.admin));
  
      setAdmin(response.admin);
      navigate('/admin/dashboard');
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  

  const adminRegister = async (adminData) => {
    try {
      setError(null);
      const response = await adminSignUp(adminData);
      setAdmin(response.admin);
      navigate('/admin/dashboard');
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setAdmin(null);
      setError(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      navigate('/');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    admin,
    loading,
    error,
    login,
    register,
    adminLogin,
    adminRegister,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;