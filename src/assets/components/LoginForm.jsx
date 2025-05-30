import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="auth-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        {error && <div className="error-box">{error}</div>}

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="primary-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;