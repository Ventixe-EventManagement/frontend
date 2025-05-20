import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  const dateTime = new Date(event.eventDate);
  const formattedDate = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const formattedTime = dateTime.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

  return (
    <div className="event-card">

      <div className="image-placeholder">
        <span className="tag">{event.category}</span>
      </div>

      <p className="date">
        {formattedDate} — {formattedTime}
      </p>
      <h3 className="title">{event.eventName}</h3>
      <p className="location">
        <img src="/public/icons/MapPin.svg" alt="Location" className="location-icon" />
        {event.location}
      </p>
    </div>
  );
};

export default EventCard;
