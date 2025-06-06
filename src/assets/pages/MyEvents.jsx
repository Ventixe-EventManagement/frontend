import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/MyEventCard';
import { API_URLS } from '../../config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(`${API_URLS.event}/api/events/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Fel vid hämtning av events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [token]);

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

return (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Mina Events</h2>

    {loading ? (
      <p>Laddar dina events...</p>
    ) : (
      <>
        <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
          <button
            className="primary-button"
            onClick={() => navigate('/events/create')}
          >
            Skapa nytt event
          </button>
        </div>

        {events.length === 0 ? (
          <p>Du har inte skapat några events ännu.</p>
        ) : (
          <div className="my-event-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={() => handleDeleteEvent(event.id)}
              />
            ))}
          </div>
        )}
      </>
    )}
  </div>
);
};

export default MyEvents;
