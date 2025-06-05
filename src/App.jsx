import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import CenterLayout from './assets/layouts/CenterLayout.jsx';
import PortalLayout from './assets/layouts/PortalLayout.jsx';
import PrivateRoute from './assets/utils/PrivateRoute.jsx';
import Login from './assets/pages/Login.jsx';
import RegisterEmailPage from './assets/pages/RegisterEmailPage';
import VerifyEmailPage from './assets/pages/VerifyEmailPage';
import CompleteProfilePage from './assets/pages/CompleteProfilePage.jsx';
import Home from './assets/pages/Home.jsx';
import Events from './assets/pages/Events.jsx';
import EventDetails from './assets/pages/EventDetails.jsx';
import Bookings from './assets/pages/Bookings.jsx';


function App() {
  return (
    <Routes>
      {/* Ej skyddat */}
      <Route element={<CenterLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterEmailPage />} />
        <Route path="/verify" element={<VerifyEmailPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
      </Route>

      {/* Skyddat område */}
      <Route path="/" element={
        <PrivateRoute>
          <PortalLayout />
        </PrivateRoute>
      }>
        <Route index element={<Home />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="bookings" element={<Bookings />} />
      </Route>

      {/* Fallback: alla okända vägar → login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
