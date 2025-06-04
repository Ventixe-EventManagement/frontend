import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../config.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { jwtDecode } from 'jwt-decode';

const CompleteProfileForm = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userId: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
        setForm(prev => ({ ...prev, userId }));
      } catch {
        setError('Kunde inte läsa användar-ID från token.');
      }
    }
  }, [token]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_URLS.profile}/api/profile/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Kunde inte spara profil.');
        return;
      }

      setSuccess('Profil sparad! Du skickas vidare...');
      setTimeout(() => navigate('/'), 2000);
    } catch {
      setError('Serverfel vid sparande.');
    }
  };

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Komplettera profil</h2>
        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        <label>Förnamn</label>
        <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />

        <label>Efternamn</label>
        <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />

        <label>Telefonnummer</label>
        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />

        <button type="submit" className="primary-button">Spara & Gå vidare</button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
