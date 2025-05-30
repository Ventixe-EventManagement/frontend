import React from "react";
import { useEvents } from "../contexts/EventContext";
import EventCard from "../components/Events/EventCard";
import "./Events.css";

const Events = () => {
  const { events, loading } = useEvents();

  if (loading) return <p>Loading...</p>;

  if (events.length === 0) {
    return <p>Inga event tillgängliga just nu.</p>;
  }

  return (
    <div className="events-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
