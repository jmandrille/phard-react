import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isLoggedIn');
    if (storedAuthStatus === 'true') {
      setIsLoggedIn(true);
    }
    setLoadingAuth(false);
  }, []);

  const login = (username, password) => {
    if (username === 'talento' && password === '2025') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      console.log('Login exitoso');
      return true;
    }
    console.log('Login fallido: credenciales incorrectas');
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    console.log('Logout exitoso');
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    loadingAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};