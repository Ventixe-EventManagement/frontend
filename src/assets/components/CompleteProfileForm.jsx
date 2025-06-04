import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';

const CompleteProfileForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userId: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await fetch(`${API_URLS.account}/api/accounts/user-id?email=${encodeURIComponent(email)}`);
        const userId = await res.text();
        setForm(prev => ({ ...prev, userId }));
      } catch {
        setError('Kunde inte hämta användar-id.');
      } finally {
        setLoading(false);
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
    setSuccess('');

    try {
      const response = await fetch(`${API_URLS.profile}/api/profile/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Kunde inte spara profil.');
        return;
      }

      setSuccess('Profil sparad! Du skickas vidare till inloggning...');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Serverfel vid sparande.');
    }
  };

  if (loading) {
    return <div className="auth-container"><p>Hämtar användarinfo...</p></div>;
  }

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
        <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} pattern="[0-9+\s\-]+" />

        <button type="submit" className="primary-button">Spara & Gå vidare</button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;