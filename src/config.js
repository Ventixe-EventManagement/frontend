// This file defines the base URLs for all backend microservices
// These are public endpoints used by the frontend to send API requests

export const API_URLS = {
  // Account service: used for validating user credentials, etc.
  account: 'https://ventixe-accountserviceprovider-cdhuf2azb3end8eb.swedencentral-01.azurewebsites.net',

  // Auth service: used to log in and retrieve JWT tokens
  auth: 'https://ventixe-authserviceprovider-fjgta2ecdue9cfa6.swedencentral-01.azurewebsites.net',

  // Profile service: used to manage and retrieve user profiles
  profile: 'https://ventixe-accountprofileserviceprovider-egcfgganfca8epa8.swedencentral-01.azurewebsites.net',

  // Booking service: handles user bookings and reservations
  booking: 'https://ventixe-bookingservice-dzb9cxd0fjdzeqen.swedencentral-01.azurewebsites.net',

  // Event management service: used to fetch, create, and manage events
  event: 'https://ventixe-eventmanagement-ctbse9a6f5f0h4h9.swedencentral-01.azurewebsites.net'
};
