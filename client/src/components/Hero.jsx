import React, { useState } from 'react';
import { cityList } from '../assets/assets';
import { Button } from "@/components/ui/button"
import { SearchIcon } from 'lucide-react';
import Bluecar from '../assets/Bluecar.png'
import { useAppContext } from "../context/AppContext.jsx"

const Hero = () => {

    const [pickupLocation, setpickupLocation] = useState("")

    const {pickupDate, setpickupDate, navigate, returnDate, setreturnDate} = useAppContext();

    const handleSearch = (e)=> {
        e.preventDefault()
        navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate' + pickupDate + '&returnDate' + returnDate)
    }

  return (
    <div className='mt-20 h-screen flex flex-col justify-center items-center gap-14 bg-light text-white text-center'>
        <h1 className='text-4xl md:text-5xl font-semibold'>Wheels rolling, stories unfolding.</h1>

        <form onSubmit={handleSearch} className='text-black font-semibold flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-10 min-md:ml-8'>
            <div className='flex flex-col items-start gap-2'>
                <select required value={pickupLocation} onChange={e=>setpickupLocation(e.target.value)}>
                    <option className='' value="">Pickup location</option>
                    {cityList.map((city)=> <option key={city} value={city}>{city}</option> )}
                </select>
                <p className='pt-2 text-sm text-gray-500'>{pickupLocation? pickupLocation : "Please enter the location"}</p>
            </div>
            <div className='flex flex-col items-start gap-2'>
                <label htmlFor="pickup-date">Pickup date</label>
                <input value={pickupDate} onChange={e=>setpickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" required />
                </div>
                <div className='flex flex-col items-start gap-2'>
                <label htmlFor="return-date">Return date</label>
                <input value={returnDate} onChange={e=>setreturnDate(e.target.value)} type="date" id="return-date" min={new Date().toISOString().split('T')[0]} className="text-sm text-gray-500" required />
                </div>
        </div>
                <Button className="w-45 sd:mt">Search
                    <SearchIcon></SearchIcon>
                </Button>
                </form>

                <img className='h-70 w-150 object-cover' src={Bluecar} alt="Blue car" />
    </div>
    
  )
}

export default Hero