// This component displays a list of all available events using the shared EventContext.

import React from "react";
import { useEvents } from "../contexts/EventContext";
import EventCard from "../components/Events/EventCard";
import "./Events.css";

const Events = () => {
  const { events, loading } = useEvents(); // Access event data and loading state from context

  // Show loading state while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Handle empty list scenario
  if (events.length === 0) {
    return <p>No events available at the moment.</p>;
  }

  // Render list of events
  return (
    <div className="events-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
