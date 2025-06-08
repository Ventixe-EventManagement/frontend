// This componentdisplays a list of the user's event bookings and allows them to update or cancel each one.

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import BookingCard from '../components/Bookings/BookingCard';
import { API_URLS } from '../../config';

const Bookings = () => {
  const { token } = useAuth(); // Get auth token from context
  const [bookings, setBookings] = useState([]); // Stores user's bookings
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_URLS.booking}/api/booking/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  // Handles deletion of a booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await fetch(`${API_URLS.booking}/api/booking/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove deleted booking from state
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel the booking.");
    }
  };

  // Handles update of a booking (e.g., change in ticket quantity)
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

      // Update the corresponding booking in local state
      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, ticketQuantity: newQuantity } : b)
      );
    } catch (error) {
      console.error("Error updating booking:", error);
      alert("Failed to update booking.");
    }
  };

  // Show loading indicator or empty state if no bookings
  if (loading) return <p>Loading bookings...</p>;
  if (bookings.length === 0) return <p>You have no bookings yet.</p>;

  return (
    <div className="bookings-page">
      <h2>My Bookings</h2>
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
