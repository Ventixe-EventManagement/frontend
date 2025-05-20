import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventDetailsCard from "../components/Events/EventDetailsCard";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/Events/${id}`);
      const data = await response.json();
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-details-page">
      <EventDetailsCard event={event} />
    </div>
  );
};

export default EventDetails;
