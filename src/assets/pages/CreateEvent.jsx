import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import { useAuth } from '../contexts/AuthContext';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    category: '',
    eventDate: '',
    location: '',
    description: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError("Du är inte inloggad.");
      return;
    }

    try {
      const response = await fetch('https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'Något gick fel vid skapandet av event');
      }

      navigate('/my-events');
    } catch (err) {
      console.error('Error creating event:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Skapa nytt event</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="eventName" placeholder="Eventnamn" onChange={handleChange} required />
        <input type="text" name="category" placeholder="Kategori" onChange={handleChange} required />
        <input type="datetime-local" name="eventDate" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Plats" onChange={handleChange} required />
        <textarea name="description" placeholder="Beskrivning" onChange={handleChange}></textarea>

        <button type="submit" className="primary-button">Skapa event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
