import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../config.js';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      // 🔐 Logga in
      const response = await axios.post(
        `${API_URLS.auth}/api/signin/login`,
        { email, password }
      );

      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setToken(token);

      // 🧠 Dekoda token för att få ut userId
      const decoded = jwtDecode(token);
      const userId = decoded[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];

      // 💬 Kontrollera om profil finns – OBS: skickar INTE med userId
      const profileResponse = await axios.get(
        `${API_URLS.profile}/api/profile/exists`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔄 Navigera beroende på om profilen finns
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
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
