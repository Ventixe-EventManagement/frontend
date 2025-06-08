// This allows authenticated users to edit an existing event by fetching and updating data.

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_URLS } from '../../config';
import './CreateEvent.css';

const EditEvent = () => {
  const { id } = useParams();             // Get event ID from URL
  const { token } = useAuth();            // Get JWT token from auth context
  const navigate = useNavigate();         // Used to redirect after save

  // Local state for form data and status
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    eventDate: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the existing event when component mounts
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URLS.event}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to load event.');

        const data = await res.json();

        // Set form data with loaded values
        setFormData({
          eventName: data.eventName,
          category: data.category,
          eventDate: data.eventDate.slice(0, 16), // Trim for datetime-local input
          location: data.location,
          description: data.description
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, token]);

  // Update form data on user input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit updated event data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${API_URLS.event}/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Something went wrong while updating.');
      }

      // Redirect user after successful update
      navigate('/my-events');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading event...</p>;

  return (
    <div className="form-container">
      <h2>Edit Event</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="datetime-local"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit" className="primary-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
