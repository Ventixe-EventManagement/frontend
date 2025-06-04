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
  const [resendMessage, setResendMessage] = useState('');
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

  const handleResend = async () => {
    setResendMessage('');
    try {
      const response = await fetch(`${API_URLS.account}/api/accounts/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      setResendMessage(response.ok ? 'En ny kod har skickats!' : (data.error || 'Kunde inte skicka ny kod.'));
    } catch {
      setResendMessage('Något gick fel vid försök att skicka kod.');
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
        {resendMessage && <div className="info-box">{resendMessage}</div>}

        <input
          type="text"
          placeholder="Ange verifieringskod"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" className="primary-button">Verifiera</button>

        <button type="button" onClick={handleResend} className="secondary-button" style={{ marginTop: '1rem' }}>
          Skicka om kod
        </button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
