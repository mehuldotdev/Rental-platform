import React, { useState } from 'react'
import Navbar from './components/Navbar.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CardDetails from './pages/CardDetails.jsx';
import Cars from './pages/Cars.jsx';
import Footer from './components/Footer.jsx';
import MyBookings from './pages/MyBookings.jsx';


const App = () => {
  const [ showLogin ,setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner')



  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path ="/car-details/:id" element={<CardDetails/>} />
        <Route path ="/cars" element={<Cars/>} />
        <Route path ="/my-bookings" element={<MyBookings/>} />
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App