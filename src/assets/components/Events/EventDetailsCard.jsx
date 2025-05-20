import React from "react";
import "./EventDetailsCard.css";

const EventDetailsCard = ({ event }) => {
  const dateTime = new Date(event.eventDate);
  const formattedDate = dateTime.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <section className="event-details-card">
      <div className="image-placeholder">
        <span className="tag">{event.category}</span>
      </div>

      <div className="event-info">
        <h1 className="title">{event.eventName}</h1>
        <div className="datetime">
            <img src="/icons/calender.svg" alt="Date" className="icon" />
            {formattedDate} — {formattedTime}
        </div>
        <div className="location">
            <img src="/icons/MapPin.svg" alt="Location" className="icon" />
            {event.location}
        </div>
        <hr className="divider" />
        <div className="description">
          <h4>About Event</h4>
          <p>{event.description}</p>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsCard;