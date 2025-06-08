import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout components
import CenterLayout from './assets/layouts/CenterLayout.jsx';
import PortalLayout from './assets/layouts/PortalLayout.jsx';

// Utility for protecting routes
import PrivateRoute from './assets/utils/PrivateRoute.jsx';

// Public pages
import Login from './assets/pages/Login.jsx';
import RegisterEmailPage from './assets/pages/RegisterEmailPage';
import VerifyEmailPage from './assets/pages/VerifyEmailPage';
import CompleteProfilePage from './assets/pages/CompleteProfilePage.jsx';

// Protected pages (requires authentication)
import Home from './assets/pages/Home.jsx';
import Events from './assets/pages/Events.jsx';
import EventDetails from './assets/pages/EventDetails.jsx';
import Bookings from './assets/pages/Bookings.jsx';
import MyEvents from './assets/pages/MyEvents.jsx';
import CreateEvent from './assets/pages/CreateEvent.jsx';
import EditEvent from './assets/pages/EditEvent.jsx';
import Dashboard from './assets/pages/Dashboard.jsx';

function App() {
  return (
    <Routes>
      {/* Public (unauthenticated) routes wrapped in a centered layout */}
      <Route element={<CenterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterEmailPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
      </Route>

      {/* Protected area (requires authentication) */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <PortalLayout />
          </PrivateRoute>
        }
      >
        {/* Default page (/) */}
        <Route index element={<Home />} />

        {/* Event management */}
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="events/create" element={<CreateEvent />} />
        <Route path="events/edit/:id" element={<EditEvent />} />

        {/* User-related */}
        <Route path="bookings" element={<Bookings />} />
        <Route path="my-events" element={<MyEvents />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

      {/* Catch-all fallback route – redirects unknown paths to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;