import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <p>Laddar autentisering...</p>;

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
