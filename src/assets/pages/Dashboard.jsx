import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_URLS } from '../../config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, eventsRes] = await Promise.all([
          fetch(`${API_URLS.booking}/api/booking/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URLS.event}/api/events/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (bookingsRes.ok) setBookings(await bookingsRes.json());
        if (eventsRes.ok) setMyEvents(await eventsRes.json());
      } catch (err) {
        console.error("Kunde inte hämta dashboard-data", err);
      }
    };

    if (token) fetchData();
  }, [token]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Välkommen till din Dashboard</h2>
      <p>📅 Du har bokat <strong>{bookings.length}</strong> event(s).</p>
      <p>🎤 Du har skapat <strong>{myEvents.length}</strong> event(s).</p>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button className="primary-button" onClick={() => navigate('/bookings')}>Mina Bokningar</button>
        <button className="primary-button" onClick={() => navigate('/my-events')}>Mina Events</button>
        <button className="primary-button" onClick={() => navigate('/events/create')}>Skapa Event</button>
      </div>
    </div>
  );
};

export default Dashboard;
