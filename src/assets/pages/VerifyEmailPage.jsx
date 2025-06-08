// This component handles email verification by submitting a user-provided code to the backend.

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';
import './VerifyEmailPage.css';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email'); // Extract email from query string

  const [code, setCode] = useState('');       // User input: verification code
  const [status, setStatus] = useState('');   // Feedback message (success/loading)
  const [error, setError] = useState('');     // Error message
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('Verifying...');

    try {
      // Send verification request to backend
      const response = await fetch(`${API_URLS.account}/api/accounts/confirm-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Verification failed.');
        setStatus('');
        return;
      }

      // On success, show message and redirect to login
      setStatus('Verification successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch {
      setError('An unexpected error occurred.');
      setStatus('');
    }
  };

  // Handle missing email in query string
  if (!email) {
    return (
      <div className="auth-container">
        <div className="login-form">
          <h2>Invalid Access</h2>
          <p>No email address provided.</p>
        </div>
      </div>
    );
  }

  // Render verification form
  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Verify Your Email</h2>
        <p>A code was sent to <strong>{email}</strong>.</p>

        {status && <div className="success-box">{status}</div>}
        {error && <div className="error-box">{error}</div>}

        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />

        <button type="submit" className="primary-button">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmailPage;
