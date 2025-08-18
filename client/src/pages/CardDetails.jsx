import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets.js'
import { Button } from "@/components/ui/button"
import Loader from '../components/Loader.jsx'
import { Undo2, ArrowLeft } from 'lucide-react'
import { useAppContext } from "../context/AppContext.jsx"
import toast from 'react-hot-toast'





const CardDetails = () => {


  const {axios, cars, navigate, pickupDate, setpickupDate, returnDate, setreturnDate} = useAppContext()

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/api/bookings/create', {
        car: id, pickupDate, returnDate
      })

      if(data.success){
        toast.success(data.message)
        navigate('/my-bookings')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const currency = import.meta.env.VITE_CURRENCY
  const {id} = useParams()
  const [car, setCar] = useState(null)

  useEffect(()=>{
    const foundCar = cars.find(car => car._id === id);
    setCar(foundCar);
  }, [cars, id])

  return car?( 
    <div className='flex flex-col px-6 md:px-16 lg:px24 mt-16'>
      <Button className="w-fit mb-10 bg-gray-800" onClick={()=>{navigate(-1)}} >Go back to see all cars <ArrowLeft /></Button>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        {/* Left: Car img + details */}
        <div className='lg:col-span-2'>
          <img src={car.image} alt="" className='w-full h-auto md:max-h-180 object-cover rounded-xl mb-6 shadow-md' />
          <div className='space-y-6'>
            <h1 className='font-bold text-5xl'>{car.brand} {car.model}</h1>
            <p className='font-semibold text-xl'>{car.category} | {car.year} </p>
            <hr className='border-borderColor my-6' />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
                {icon: assets.fuel_icon, text: car.fuel_type},
                {icon: assets.car_icon, text: car.transmission},
                {icon: assets.location_icon, text: car.location},
              ].map(({icon, text}) => (
                <div key={text} className='border-1 flex flex-col items-center bg-light p-4 rounded-lg'>
                  <img src={icon} alt="" className='h-5 mb-2' />
                  <span className='text-sm text-center'>{text}</span>
                </div>
              ))}
            </div>
            <div>
              <h1 className='font-semibold text-2xl'>Description</h1>
              <p className='mt-5'>{car.description}</p>
            </div>
            <div>
              <h1 className='font-semibold text-2xl'>Features</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                  ["360 Camera", "Bluetooth", "5 Star safety rating", "Smart GPS"].map((item)=>(
                    <li key={item} className='flex items-center'>
                      <img src={assets.check_icon} className='h-4 mr-2' alt="" />
                      {item}
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        {/* Right : Booking form */}

        <form onSubmit={handleSubmit} className='border-2 shadow-lg h-max sticky top-10 rounded-xl p-6 spac-y-6 text-gray-500'>
          <p className='flex items-center justify-between text-2xl text-gray-300'>{currency}{car.pricePerDay} <span className='text-base font-normal'>per day</span> </p>
          <hr className='border-1 border-blue-600 my-6' />
          <div className='flex flex-col'>
          <label htmlFor="pickup-date">Pickup date</label>
          <input value={pickupDate} onChange={(e)=>setpickupDate(e.target.value)} type="date" className='text-white mt-4 border border-borderColor px-3 py-2 rounded-lg' required id='pickup-date' min={new Date().toISOString().split('T')[0]} />
          </div>
          <div className='mt-4 flex flex-col'>
          <label htmlFor="return-date">Return date</label>
          <input value={returnDate} onChange={(e)=>setreturnDate(e.target.value)} type="date" className='text-white mt-4 border border-borderColor px-3 py-2 rounded-lg' required id='return-date' />
          </div>
          <Button type="submit" className="w-full py-6 mt-4 bg-blue-600">Book Now</Button>
        </form>
      </div>
    </div>
  ) : <Loader />
}

export default CardDetails