import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import './BookingModal.css';

const BookingModal = ({ isOpen, onClose, eventId }) => {
  const modalRef = useRef(null);
  const { token } = useAuth();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) modalRef.current.showModal();
      else modalRef.current.close();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!token) {
      setStatus("Du måste vara inloggad.");
      return;
    }

    let userId;
    try {
      const decoded = jwtDecode(token);
      userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch {
      setStatus("Fel vid tolkning av token.");
      return;
    }

    const booking = {
      eventId,
      userId,
      ticketQuantity,
      packageId: null
    };

    try {
      const response = await fetch("https://ventixe-bookingservice.azurewebsites.net/api/booking", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(booking)
      });

      if (!response.ok) {
        const errorText = await response.text();
        setStatus(`Kunde inte boka: ${errorText}`);
        return;
      }

      setStatus("✅ Bokning genomförd!");
    } catch (err) {
      setStatus("❌ Ett tekniskt fel inträffade.");
    }
  };

  return (
    <dialog className="booking-modal" ref={modalRef} onClose={onClose}>
      <h3>Boka plats</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Antal biljetter:
          <select
            value={ticketQuantity}
            onChange={(e) => setTicketQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>

        <div className="modal-buttons">
          <button type="submit">Bekräfta bokning</button>
          <button type="button" onClick={onClose}>Avbryt</button>
        </div>

        {status && <p className="status-message">{status}</p>}
      </form>
    </dialog>
  );
};

export default BookingModal;
