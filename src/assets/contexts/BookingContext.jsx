import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_URLS } from '../../config';
import { useAuth } from './AuthContext';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const decoded = jwtDecode(token);
      const userId =
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      const response = await axios.get(
        `${API_URLS.booking}/api/booking/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data || []);
    } catch (error) {
      console.error('Kunde inte hämta bokningar:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    } else {
      setBookings([]);
      setLoading(false);
    }
  }, [token]);

  return (
    <BookingContext.Provider value={{ bookings, loading, refetch: fetchBookings }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => useContext(BookingContext);
