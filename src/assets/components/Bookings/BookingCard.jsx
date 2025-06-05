import React from 'react';
import './BookingCard.css';

const BookingCard = ({ booking }) => {
  const bookingDate = new Date(booking.bookingDate).toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const bookingTime = new Date(booking.bookingDate).toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="booking-card">
      <div className="booking-content">
        <h3>📅 Bokning</h3>
        <p><strong>Event ID:</strong> {booking.eventId}</p>
        <p><strong>Antal biljetter:</strong> {booking.ticketQuantity}</p>
        <p><strong>Bokningsdatum:</strong> {bookingDate} kl. {bookingTime}</p>
        {booking.packageId && (
          <p><strong>Paket:</strong> {booking.packageId}</p>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
