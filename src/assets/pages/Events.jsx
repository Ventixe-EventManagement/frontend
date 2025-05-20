import React from "react";
import { useEvents } from "../contexts/EventContext";
import EventCard from "../components/Events/EventCard";
import "./Events.css";

const Events = () => {
  const { events, loading } = useEvents();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="events-container">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Events;
