import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="side-navbar">
      <div className="navbar-top">
        <div className="logo">
          <img src="/VentixeLogo.svg" alt="Ventixe logo" />
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
              <img src="/icons/SquaresFour.svg" alt="" className="nav-icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
              <img src="/icons/CheckSquare.svg" alt="" className="nav-icon" />
              <span>Bookings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => isActive ? 'active' : ''}>
              <img src="/icons/Ticket.svg" alt="" className="nav-icon" />
              <span>Events</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-bottom">
        <button className="sign-out-btn">
          <img src="/icons/SignOut.svg" alt="" className="nav-icon" />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>

  );
};

export default Navbar;
