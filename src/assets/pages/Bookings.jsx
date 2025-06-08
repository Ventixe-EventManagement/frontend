import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BookingCard from '../components/Bookings/BookingCard';
import { API_URLS } from '../../config';

const Bookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URLS.booking}/api/booking/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Fel vid hämtning av bokningar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Är du säker på att du vill avboka detta event?")) return;

    try {
      await fetch(`${API_URLS.booking}/api/booking/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Fel vid avbokning:", error);
      alert("Misslyckades att avboka.");
    }
  };

  const handleUpdateBooking = async (id, newQuantity) => {
    try {
      await fetch(`${API_URLS.booking}/api/booking/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticketQuantity: newQuantity, packageId: null }),
      });

      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, ticketQuantity: newQuantity } : b)
      );
    } catch (error) {
      console.error("Fel vid uppdatering:", error);
      alert("Misslyckades att uppdatera bokning.");
    }
  };

  if (loading) return <p>Laddar bokningar...</p>;
  if (bookings.length === 0) return <p>Du har inga bokningar ännu.</p>;

  return (
    <div className="bookings-page">
      <h2>Mina bokningar</h2>
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onDelete={handleDeleteBooking}
          onUpdate={handleUpdateBooking}
        />
      ))}
    </div>
  );
};

export default Bookings;
