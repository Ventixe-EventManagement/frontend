import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_URLS } from '../../config';

const MyEventCard = ({ event, onDelete }) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm('Är du säker på att du vill radera detta event?')) return;

    try {
      const response = await fetch(`${API_URLS.event}/api/events/${event.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Serverfel:', errText);
        alert('Misslyckades att radera eventet.');
        return;
      }

      if (typeof onDelete === 'function') {
        onDelete();
      } else {
        console.warn('onDelete är inte en funktion.');
      }

    } catch (err) {
      console.error('❌ Error deleting event:', err);
      alert('Tekniskt fel vid radering av event.');
    }
  };

  return (
    <div className="event-card">
      <h3>{event.eventName}</h3>
      <p><strong>Datum:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
      <p><strong>Plats:</strong> {event.location}</p>

    <div className="actions">
      <button
        onClick={() => navigate(`/events/edit/${event.id}`)}
        className="primary-button outlined-button"
      >
        Redigera
      </button>
      <button
        onClick={handleDelete}
        className="primary-button danger-button"
      >
        Radera
      </button>
      </div>
    </div>
  );
};

export default MyEventCard;
