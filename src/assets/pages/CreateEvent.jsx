// This component provides a form for authenticated users to create a new event and submit it to the backend.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import { useAuth } from '../contexts/AuthContext';

const CreateEvent = () => {
  // Form state
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    eventDate: '',
    location: '',
    description: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth(); // Get auth token from context

  // Update form data on input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!token) {
      setError("You are not logged in.");
      return;
    }

    try {
      // Send POST request to create a new event
      const response = await fetch(
        'https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/events',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'Something went wrong while creating the event.');
      }

      // Redirect to user's events page on success
      navigate('/my-events');
    } catch (err) {
      console.error('Error creating event:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Event</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="eventDate"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="primary-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
