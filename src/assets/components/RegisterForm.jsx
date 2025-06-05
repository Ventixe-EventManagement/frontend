import { useState } from 'react';
import { API_URLS } from '../../config.js';
import { Link, useNavigate } from 'react-router-dom';

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
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch(`${API_URLS.account}/api/accounts/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Something went wrong during registration.');
        return;
      }

      navigate(`/verify?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setError('Could not contact the server.');
    }
  };

return (
  <div className="auth-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      {error && <div className="error-box">{error}</div>}

      <label>Email</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />

      <label>Password</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} required />

      <label>Confirm Password</label>
      <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />

      <button type="submit" className="primary-button">Submit</button>

      <p className="register-link">
        Already have an account? <br></br><Link to="/login">Sign in here</Link>
      </p>
    </form>
  </div>
);
};

export default RegisterForm;
