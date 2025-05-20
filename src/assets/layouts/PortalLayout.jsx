import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PortalLayout = () => {
return (
    <div className="portal-wrapper">
        <Navbar />
        <Header />
        <main>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default PortalLayout