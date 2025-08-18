import React, { useState } from 'react'
import Login from './components/login.jsx';
import Navbar from './components/Navbar.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CardDetails from './pages/CardDetails.jsx';
import Cars from './pages/Cars.jsx';
import Footer from './components/Footer.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Layout from './pages/owner/Layout.jsx';
import Dashboard from './pages/owner/Dashboard.jsx';
import ManageCars from './pages/owner/ManageCars.jsx';
import ManageBookings from './pages/owner/ManageBookings.jsx';
import AddCar from './pages/owner/AddCar.jsx';
import { Toaster } from "react-hot-toast"
import { AppContext, useAppContext } from './context/AppContext.jsx';


const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
    <Toaster />
    {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
      <Routes>
        <Route path = "/" element = {<Home/>} />
        <Route path ="/car-details/:id" element={<CardDetails/>} />
        <Route path ="/cars" element={<Cars/>} />
        <Route path ="/my-bookings" element={<MyBookings/>} />

        <Route path="/owner" element={<Layout />} >
        <Route index element={<Dashboard />} />
        <Route path="add-car" element={<AddCar/>} />
        <Route path="manage-cars" element={<ManageCars/>}/>
        <Route path="manage-bookings" element={<ManageBookings/>} />
        </Route>
        
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App