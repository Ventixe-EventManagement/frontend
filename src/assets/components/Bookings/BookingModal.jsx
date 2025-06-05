import React, { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../contexts/AuthContext';

const BookingModal = ({ isOpen, onClose, eventId }) => {
  const { token } = useAuth();
  const modalRef = useRef(null);

  const [seats, setSeats] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState('');
  const apiUrl = import.meta.env.VITE_BOOKING_API_URL;

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen && !modalRef.current.open) modalRef.current.showModal();
      else if (!isOpen && modalRef.current.open) modalRef.current.close();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!token) {
        setError("Du måste vara inloggad för att boka.");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      const booking = {
        eventId,
        userId,
        ticketQuantity: seats,
        packageId: null // valfri
      };

      const response = await fetch(`${apiUrl}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(booking)
      });

      if (!response.ok) {
        const data = await response.text();
        throw new Error(data || 'Kunde inte boka eventet.');
      }

      setBookingSuccess(true);
    } catch (err) {
      setError(err.message || 'Något gick fel.');
    }
  };

  if (!isOpen) return null;

  return (
    <dialog ref={modalRef} className="modal">
      {bookingSuccess ? (
        <div>
          <h2>Bokning bekräftad!</h2>
          <button onClick={onClose}>Stäng</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Boka event</h2>

          <label htmlFor="seats">Antal biljetter:</label>
          <select id="seats" value={seats} onChange={(e) => setSeats(Number(e.target.value))}>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>

          {error && <p className="error">{error}</p>}

          <button type="submit">Bekräfta bokning</button>
          <button type="button" onClick={onClose}>Avbryt</button>
        </form>
      )}
    </dialog>
  );
};

export default BookingModal;
