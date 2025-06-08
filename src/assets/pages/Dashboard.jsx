// This component displays a personalized dashboard with counts of bookings and created events,
// and provides quick navigation options for the logged-in user.

import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { API_URLS } from '../../config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useAuth(); // Get JWT token from auth context
  const [bookings, setBookings] = useState([]); // Store user's bookings
  const [myEvents, setMyEvents] = useState([]); // Store events created by the user
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both bookings and user's events in parallel
        const [bookingsRes, eventsRes] = await Promise.all([
          fetch(`${API_URLS.booking}/api/booking/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URLS.event}/api/events/mine`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        // Set the state only if the responses are successful
        if (bookingsRes.ok) setBookings(await bookingsRes.json());
        if (eventsRes.ok) setMyEvents(await eventsRes.json());
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      }
    };

    // Only fetch if token is available
    if (token) fetchData();
  }, [token]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>Welcome to Your Dashboard</h2>

      {/* Summary of user activity */}
      <p>📅 You have booked <strong>{bookings.length}</strong> event(s).</p>
      <p>🎤 You have created <strong>{myEvents.length}</strong> event(s).</p>

      {/* Navigation buttons */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button className="primary-button" onClick={() => navigate('/bookings')}>
          My Bookings
        </button>
        <button className="primary-button" onClick={() => navigate('/my-events')}>
          My Events
        </button>
        <button className="primary-button" onClick={() => navigate('/events/create')}>
          Create Event
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
