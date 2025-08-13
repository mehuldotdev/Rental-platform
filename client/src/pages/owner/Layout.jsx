import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner.jsx'
import Sidebar from '../../components/owner/Sidebar.jsx'
import Dashboard from './Dashboard.jsx'

const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner />
        <div className='flex'>
        <Sidebar />
        <Dashboard />
        </div>
    </div>
  )
}

export default Layout