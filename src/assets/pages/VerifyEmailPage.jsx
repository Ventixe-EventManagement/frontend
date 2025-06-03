import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get('email');
      const token = searchParams.get('token');

      if (!email || !token) {
        setStatus('error');
        return;
      }

      try {
        // Steg 1: Hämta userId från e-post
        const userIdRes = await axios.get(`https://ventixe-accountserviceprovider.azurewebsites.net/api/accounts/user-id?email=${encodeURIComponent(email)}`);
        const userId = userIdRes.data.userId;

        // Steg 2: Bekräfta e-post med token
        const confirmRes = await axios.post('https://ventixe-accountserviceprovider.azurewebsites.net/api/accounts/confirm-email', {
          userId,
          token: decodeURIComponent(token)
        });

        if (confirmRes.status === 200) {
          // Steg 3: Hämta JWT-token efter verifiering (inloggning)
          const loginRes = await axios.post('https://ventixe-authserviceprovider.azurewebsites.net/api/auth/login', {
            email,
            password: token // För detta steg behöver du kanske en annan lösning, detta är bara en platsförklaring!
          });

          const jwt = loginRes.data.token;
          localStorage.setItem('token', jwt); // Eller använd cookies

          setStatus('success');

          // Navigera vidare till profilformuläret
          setTimeout(() => {
            navigate('/complete-profile');
          }, 1500);
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="verify-email center-screen">
      {status === 'loading' && <p>🔄 Verifierar din e-postadress...</p>}
      {status === 'success' && (
        <>
          <p>✅ Din e-postadress har verifierats!</p>
        </>
      )}
      {status === 'error' && (
        <>
          <p>❌ Det gick inte att verifiera din e-post. Kontrollera länken eller försök igen.</p>
          <button onClick={() => navigate('/')}>Till startsidan</button>
        </>
      )}
    </div>
  );
};

export default VerifyEmailPage;
