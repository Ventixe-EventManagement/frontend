import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_URLS } from '../../config';
import './CreateEvent.css';

const EditEvent = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    eventDate: '',
    location: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URLS.event}/api/events/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Kunde inte ladda event.');

        const data = await res.json();
        setFormData({
          eventName: data.eventName,
          category: data.category,
          eventDate: data.eventDate.slice(0, 16),
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
        throw new Error(errorText || 'Något gick fel vid uppdatering.');
      }

      navigate('/my-events');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Laddar event...</p>;

  return (
    <div className="form-container">
      <h2>Redigera Event</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} placeholder="Eventnamn" required />
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Kategori" required />
        <input type="datetime-local" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Plats" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Beskrivning" />
        <button type="submit" className="primary-button">Spara ändringar</button>
      </form>
    </div>
  );
};

export default EditEvent;
