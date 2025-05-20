import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const dateTime = new Date(event.eventDate);
  const formattedDate = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="event-card">
      <span className="tag">{event.category}</span>

      <div className="image-placeholder"></div>

      <p className="date">
        {formattedDate} — {formattedTime}
      </p>
      <h3 className="title">{event.eventName}</h3>
      <p className="location">📍 {event.location}</p>
    </div>
  );
};

export default EventCard;
