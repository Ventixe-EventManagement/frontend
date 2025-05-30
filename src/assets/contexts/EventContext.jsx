import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

const EventContext = createContext()

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        'https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net/api/events',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setEvents(response.data)
    } catch (error) {
      console.error('Failed to fetch events', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchEvents()
    } else {
      setEvents([])
      setLoading(false)
    }
  }, [token])

  return (
    <EventContext.Provider value={{ events, loading }}>
      {children}
    </EventContext.Provider>
  )
}

export const useEvents = () => useContext(EventContext)