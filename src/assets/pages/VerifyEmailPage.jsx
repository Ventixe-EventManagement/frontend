import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URLS } from '../../config.js';

const VerifyEmailPage = () => {
  const [status, setStatus] = useState('Verifying...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');

      if (!email || !token) {
        setStatus('Ogiltig verifieringslänk.');
        return;
      }

      try {
        const userIdResponse = await fetch(
          `${API_URLS.account}/api/accounts/user-id?email=${encodeURIComponent(email)}`
        );

        if (!userIdResponse.ok) {
          setStatus('Kunde inte hitta användaren.');
          return;
        }

        const userId = await userIdResponse.text();

        const confirmResponse = await fetch(
          `${API_URLS.account}/api/accounts/confirm-email`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, token })
          }
        );

        if (!confirmResponse.ok) {
          const data = await confirmResponse.json();
          setStatus(data.error || 'Verifiering misslyckades.');
          return;
        }

        setStatus('Verifiering lyckades! Omdirigerar...');
        setTimeout(() => {
          navigate(`/complete-profile?email=${encodeURIComponent(email)}`);
        }, 1000);

      } catch (err) {
        setStatus('Ett fel uppstod.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="verify-email">
      <h2>{status}</h2>
    </div>
  );
};

export default VerifyEmailPage;
