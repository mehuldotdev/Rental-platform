import React, { useState } from 'react'
import { assets, menuLinks } from "../assets/assets.js"
import { Link, Links, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'



const Navbar = ({setShowLogin}) => {
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

  return (
    <div className={`flex items-center justify-between px-6 md:px-6 lg:px-24xl:px-3 py-4 border-b border-borderColour relative transition-all ${location.pathname === "/" && "bg-light"}`}>
        <Link to='/'>
        <img src={assets.logo} alt="Logo" />
        </Link>
        
        <div className={`max-sm:fixed max-sm:h-screen max-sm:w-full
        max-sm:top-16 max-sm:border-t border-borderColor
        right-0 flex flex-col sm:flex-row
        items-start sm:items-center gap-4 sm:gap-8
        max-sm:p-4 transition-all duration-200 z-50 ${location.pathname=== "/" ? "bg-light" : "bg-red"}
        ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
            
            {menuLinks.map((link, index) => (
                <Link key={index} to={link.path}>
                    {link.name}
                </Link>
            ))}

            <div className='lg:flex items-start text-sm gap-2 px-3'>
                <Input className="rounded-full max-w-45" type="text" placeholder="Search for cars..."/>
            </div>
        

        <div className='flex gap-5'>
            <Button onClick={()=>navigate('/owner')} className="cursor-pointer">Dashboard</Button>
            <Button onClick={()=>setShowLogin(true)} className="bg-blue-700 cursor-pointer">Log in</Button>
        </div>
        </div>
        
        <Button className="sm:hidden cursor-pointer" onClick={()=>setOpen(!open)}>
            <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
        </Button>

    </div>

    
  )
}

export default Navbar