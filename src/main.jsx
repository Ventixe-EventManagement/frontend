// Import React core functionality
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import the main App component
import App from './App.jsx';

// Import routing support from React Router
import { BrowserRouter } from 'react-router-dom';

// Import global context providers for app-wide state
import { EventProvider } from './assets/contexts/EventContext.jsx';
import { AuthProvider } from './assets/contexts/AuthContext.jsx';
import { BookingProvider } from './assets/contexts/BookingContext.jsx';

// Mount the React app to the DOM and wrap it in essential providers
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <EventProvider>
            <App />
          </EventProvider>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);