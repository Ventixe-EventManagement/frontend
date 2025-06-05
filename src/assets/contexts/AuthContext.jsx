import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../config.js';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URLS.auth}/api/signin/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setToken(token);

      const decoded = jwtDecode(token);
      const userId =
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      const profileResponse = await axios.get(
        `${API_URLS.profile}/api/profile/exists`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (profileResponse.data?.exists === true) {
        window.location.href = '/';
      } else {
        window.location.href = `/complete-profile?email=${encodeURIComponent(email)}`;
      }

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
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
