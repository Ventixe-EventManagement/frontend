import React from 'react';
import { useBookings } from '../contexts/BookingContext';
import BookingCard from '../components/Bookings/BookingCard';

const Bookings = () => {
  const { bookings, loading } = useBookings();

  if (loading) return <p>Laddar bokningar...</p>;
  if (bookings.length === 0) return <p>Du har inga bokningar ännu.</p>;

  return (
    <div className="bookings-page">
      <h2>Mina bokningar</h2>
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default Bookings;
