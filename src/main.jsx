import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { EventProvider } from './assets/contexts/EventContext.jsx'
import { AuthProvider } from './assets/contexts/AuthContext.jsx'
import { BookingProvider } from './assets/contexts/BookingContext.jsx'

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
)

