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
    <div className={`bg-black flex items-center justify-between px-6 md:px-6 lg:px-24xl:px-3 py-4 border-b relative transition-all ${location.pathname === "/" && "bg-amber-300"}`}>
        <Link to='/'>
        <img src={assets.logo} alt="Logo" />
        </Link>
        
        <div className={`max-sm:absolute max-sm:top-full max-sm:left-0 max-sm:w-full
        flex flex-col sm:flex-row
        items-start sm:items-center gap-4 sm:gap-8
        max-sm:p-4 max-sm:gap-3 transition-all duration-200 z-50 
        ${location.pathname === "/" ? "max-sm:bg-white max-sm:shadow-lg" : "max-sm:bg-gray-900 max-sm:shadow-lg"}
        ${open ? "max-sm:opacity-100 max-sm:visible" : "max-sm:opacity-0 max-sm:invisible max-sm:pointer-events-none"}`}>
            {menuLinks.map((link, index) => (
                <Link key={index} to={link.path} className="max-sm:text-black max-sm:font-medium max-sm:py-1">
                    {link.name}
                </Link>
            ))}

            <div className='lg:flex items-start text-sm gap-2 px-3 max-sm:px-0'>
                <Input className="rounded-full max-w-45 max-sm:w-full" type="text" placeholder="Search for cars..."/>
            </div>
        

        <div className='flex gap-5 max-sm:flex-col max-sm:gap-2'>
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