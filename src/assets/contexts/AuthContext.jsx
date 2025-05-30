import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  try {
    const response = await axios.post(
      'https://ventixe-authserviceprovider-fjgta2ecdue9cfa6.swedencentral-01.azurewebsites.net/api/signin/login',
      { email, password }
    );

    const { token } = response.data;
    localStorage.setItem('authToken', token);
    setToken(token);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.error || 'Login failed',
    };
  }
};

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
