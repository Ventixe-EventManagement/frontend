import React, { useEffect, useState } from 'react';
import './BookingCard.css';
import { API_URLS } from '../../../config';
import { useAuth } from '../../../contexts/AuthContext';

const BookingCard = ({ booking, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(booking.ticketQuantity);
  const [eventName, setEventName] = useState('Laddar...');
  const { token } = useAuth();

  useEffect(() => {
    const fetchEventName = async () => {
      try {
        const res = await fetch(`${API_URLS.event}/api/events/${booking.eventId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Misslyckades att hämta event');

        const data = await res.json();
        setEventName(data.eventName || 'Okänt event');
      } catch (error) {
        console.error("Fel vid hämtning av eventnamn:", error);
        setEventName('Okänt event');
      }
    };

    fetchEventName();
  }, [booking.eventId, token]);

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
      <div className="booking-header">
        <div className="booking-info">
          <h3>📅 Bokning</h3>
          <p><strong>Event:</strong> {eventName}</p>

          {editing ? (
            <>
              <label><strong>Antal biljetter:</strong></label>
              <input
                type="number"
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Number(e.target.value))}
                min={1}
              />
              <div className="booking-edit-actions">
                <button onClick={handleUpdateClick} className="btn btn-outline">Spara</button>
                <button onClick={() => setEditing(false)} className="btn btn-secondary">Avbryt</button>
              </div>
            </>
          ) : (
            <p><strong>Antal biljetter:</strong> {booking.ticketQuantity}</p>
          )}

          <p><strong>Bokningsdatum:</strong> {bookingDate} kl. {bookingTime}</p>
        </div>

        <div className="booking-actions">
          <button onClick={() => setEditing(true)} className="btn btn-outline">Uppdatera biljetter</button>
          <button onClick={() => onDelete(booking.id)} className="btn btn-danger">Avboka event</button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
