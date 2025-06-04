import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';

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

      setStatus('Verifiering lyckades! Omdirigerar...');
      setTimeout(() => {
        navigate(`/complete-profile?email=${encodeURIComponent(email)}`);
      }, 1000);
    } catch (err) {
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

      if (response.ok) {
        setResendMessage('En ny kod har skickats till din e-postadress.');
      } else {
        const data = await response.json();
        setResendMessage(data.error || 'Kunde inte skicka ny kod.');
      }
    } catch (err) {
      setResendMessage('Något gick fel vid försök att skicka ny kod.');
    }
  };

  if (!email) {
    return (
      <div className="verify-email">
        <h2>Ogiltig åtkomst</h2>
        <p>Ingen e-postadress angiven.</p>
      </div>
    );
  }

  return (
    <div className="verify-email">
      <h2>Verifiera din e-post</h2>
      <p>Vi har skickat en kod till <strong>{email}</strong>. Ange den nedan.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="code"
          placeholder="Ange verifieringskod"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verifiera</button>
      </form>

      <button onClick={handleResend} style={{ marginTop: '1rem' }}>
        Skicka om kod
      </button>

      {resendMessage && <p style={{ marginTop: '0.5rem' }}>{resendMessage}</p>}
      {status && <p style={{ color: 'green' }}>{status}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyEmailPage;