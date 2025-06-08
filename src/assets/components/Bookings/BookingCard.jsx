import React from 'react';
import './BookingCard.css';
const BookingCard = ({ booking, onDelete, onUpdate }) => {
  const [editing, setEditing] = React.useState(false);
  const [ticketQuantity, setTicketQuantity] = React.useState(booking.ticketQuantity);

  const handleUpdateClick = () => {
    onUpdate(booking.id, ticketQuantity);
    setEditing(false);
  };

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
        <p><strong>Event:</strong> {booking.eventName || 'Okänt event'}</p>

        {editing ? (
          <>
            <label><strong>Antal biljetter:</strong></label>
            <input
              type="number"
              value={ticketQuantity}
              onChange={(e) => setTicketQuantity(Number(e.target.value))}
              min={1}
            />
            <button onClick={handleUpdateClick} className="btn btn-outline">Spara</button>
            <button onClick={() => setEditing(false)} className="btn btn-secondary">Avbryt</button>
          </>
        ) : (
          <p><strong>Antal biljetter:</strong> {booking.ticketQuantity}</p>
        )}

        <p><strong>Bokningsdatum:</strong> {bookingDate} kl. {bookingTime}</p>
        {booking.packageId && <p><strong>Paket:</strong> {booking.packageId}</p>}

        <div className="booking-actions">
          <button onClick={() => setEditing(true)} className="btn btn-outline">Uppdatera biljetter</button>
          <button onClick={() => onDelete(booking.id)} className="btn btn-danger">Avboka event</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
