import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_URLS } from '../../config.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URLS.auth}/api/signin/login`,
      { email, password }
    );

    const { token } = response.data;
    localStorage.setItem('authToken', token);
    setToken(token);

    // 1. Hämta userId med email
    const userIdRes = await axios.get(
      `${API_URLS.account}/api/accounts/user-id?email=${encodeURIComponent(email)}`
    );
    const userId = userIdRes.data;

    // 2. Kolla om profil finns via userId
    const profileResponse = await axios.get(
      `${API_URLS.profile}/api/profile/exists?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
