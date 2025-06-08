// This component displays detailed information about a specific event and allows the user to book it.

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventDetailsCard from "../components/Events/EventDetailsCard";
import BookingModal from "../components/Bookings/BookingModal";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from the URL
  const [event, setEvent] = useState(null); // Store fetched event details
  const [showModal, setShowModal] = useState(false); // Track whether booking modal is open

  useEffect(() => {
    const fetchEvent = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve JWT token from local storage

      const response = await fetch(
        `https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/Events/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch event:", errorText);
        return;
      }

      const data = await response.json();
      setEvent(data); // Set the event state once data is loaded
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-page">
      {/* Display event information */}
      <EventDetailsCard event={event} />

      {/* Button to open booking modal */}
      <button className="book-button" onClick={() => setShowModal(true)}>
        Book This Event
      </button>

      {/* Booking modal that allows user to submit a booking */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        eventId={id}
      />
    </div>
  );
};

export default EventDetails;
