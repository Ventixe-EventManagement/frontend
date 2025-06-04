import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import "./CompleteProfilePage.css";

const CompleteProfileForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userId: ''
  });

  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const email = searchParams.get('email');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch(
          `${API_URLS.account}/api/accounts/user-id?email=${encodeURIComponent(email)}`
        );
        const userId = await res.text();
        setForm(prev => ({ ...prev, userId }));
      } catch {
        setError('Kunde inte hämta användar-id.');
      }
    };

    if (email) fetchUserId();
  }, [email]);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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

      navigate('/login');
    } catch {
      setError('Serverfel vid sparande.');
    }
  };

useEffect(() => {
  if (!token) {
    navigate('/login');
  }
}, [token, navigate]);

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Komplettera profil</h2>
        {error && <div className="error-box">{error}</div>}

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
