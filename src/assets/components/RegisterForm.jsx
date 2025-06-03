import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Lösenorden matchar inte.');
      return;
    }

    try {
      const response = await fetch('https://ventixe-accountserviceprovider.azurewebsites.net/api/accounts/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Något gick fel vid registreringen.');
        return;
      }

      // Skickar vidare till verify-sida (token kommer via e-postlänk)
      navigate(`/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setError('Kunde inte kontakta servern.');
    }
  };

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Skapa konto</h2>
        {error && <div className="error-box">{error}</div>}

        <label>Email</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Lösenord</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <label>Bekräfta lösenord</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

        <button type="submit" className="primary-button">Skicka</button>
      </form>
    </div>
  );
};

export default RegisterForm;
