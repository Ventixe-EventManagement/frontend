// This context was created with the help of ChatGPT (OpenAI).
// It provides global access to the list of events and loading state
// by fetching data from the backend using the authenticated user's token.

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

// Create a context to share event data across the app
const EventContext = createContext();

// Context provider that wraps part of the app needing event data
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);     // Stores fetched events
  const [loading, setLoading] = useState(true); // Tracks loading state
  const { token } = useAuth();                  // Get auth token from context

  // Function to fetch events from backend
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/events',
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach token for secure access
          }
        }
      );
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when the token changes (i.e., on login/logout)
  useEffect(() => {
    if (token) {
      fetchEvents();
    } else {
      setEvents([]);       // Clear events when user logs out
      setLoading(false);
    }
  }, [token]);

  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  );
};

// Custom hook to access the event context
export const useEvents = () => useContext(EventContext);
