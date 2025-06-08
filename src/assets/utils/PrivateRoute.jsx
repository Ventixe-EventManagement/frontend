// This component was created with the help of ChatGPT (OpenAI).
// It is a private route wrapper used to restrict access to authenticated users only.
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// A route guard component that restricts access to authenticated users only
const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth(); // Get auth state from context

  // While the authentication state is still loading (e.g. checking token), show a loading message
  if (loading) return <p>Loading authentication...</p>;

  // If no token is present, redirect the user to the login page
  if (!token) return <Navigate to="/login" />;

  // If the user is authenticated, render the requested child component
  return children;
};

export default PrivateRoute;
