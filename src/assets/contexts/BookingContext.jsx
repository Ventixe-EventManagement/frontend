import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
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

      const response = await axios.get(
  `${API_URLS.booking}/api/booking/mine`,
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
