import React, { useState } from 'react'
import { assets, menuLinks } from "../assets/assets.js"
import { Link, Links, useLocation } from "react-router-dom"

const Navbar = () => {
    const location = useLocation()
    console.log(location);
    const [open, setOpen] = useState(false)

  return (
    <div className={`flex items-center justify-between px-6 md:px-6 lg:px-24xl:px-32 py-4 border-b border-borderColour relative transition-all ${location.pathname === "/" && "bg-light"}`}>
        <Link to='/'>
        <img src={assets.logo} alt="Logo" />
        </Link>
        
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full
        max-sm:top-16 max-sm:border-t border-borderColor
        right-0 flex flex-col sm:flex-row
        items-start sm:items-center gap-4 sm:gap-8
        max-sm:p-4 transition-all duration-300 z-50 ${location.pathname=== "/" ? "bg-light" : "bg-red"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-full"}`}>
            
            {menuLinks.map((link, index) => (
                <Link key={index} to={link.path}>
                    {link.name}
                </Link>
            ))}
           
        </div>
        


    </div>
  )
}

export default Navbar