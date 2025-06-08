// This component displays events created by the currently authenticated user
// and allows navigation to the event creation page.

import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/MyEventCard';
import { API_URLS } from '../../config';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const MyEvents = () => {
  const [events, setEvents] = useState([]);     // Stores the user's events
  const [loading, setLoading] = useState(true); // Tracks loading state
  const { token } = useAuth();                  // Get the JWT token from auth context
  const navigate = useNavigate();               // React Router navigation hook

  // Fetch user's events from the backend when component mounts
  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await axios.get(`${API_URLS.event}/api/events/mine`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure the response is an array
        setEvents(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('❌ Error fetching events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, [token]);

  // Handle deletion of an event by removing it from local state
  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>My Events</h2>

      {loading ? (
        <p>Loading your events...</p>
      ) : (
        <>
          {/* Button to create a new event */}
          <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
            <button
              className="primary-button"
              onClick={() => navigate('/events/create')}
            >
              Create New Event
            </button>
          </div>

          {/* Show message if no events are found */}
          {events.length === 0 ? (
            <p>You haven't created any events yet.</p>
          ) : (
            // Render event cards
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
