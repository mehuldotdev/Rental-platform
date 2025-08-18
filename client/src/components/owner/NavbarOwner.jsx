import React from 'react'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { useAppContext } from "../../context/AppContext.jsx"

const NavbarOwner = () => {

    const {user} = useAppContext()

  return (
    <div className='flex flex-row items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b relative transition-all'>
        <Link to="/">
        <img src={assets.logo} className='h-7' alt="" />
        </Link>
        <p className='font-semibold text-white/80 items-end'>Welcome, {user?.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner