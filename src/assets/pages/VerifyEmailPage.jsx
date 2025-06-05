import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';
import './VerifyEmailPage.css';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('Verifierar...');

    try {
      const response = await fetch(`${API_URLS.account}/api/accounts/confirm-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Verifiering misslyckades.');
        setStatus('');
        return;
      }

      setStatus('Verifiering lyckades! Du skickas till inloggning...');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setError('Ett oväntat fel uppstod.');
      setStatus('');
    }
  };

  if (!email) {
    return (
      <div className="auth-container">
        <div className="login-form">
          <h2>Ogiltig åtkomst</h2>
          <p>Ingen e-postadress angiven.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Verifiera din e-post</h2>
        <p>Kod skickades till <strong>{email}</strong>.</p>

        {status && <div className="success-box">{status}</div>}
        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          placeholder="Ange verifieringskod"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" className="primary-button">Verifiera</button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
