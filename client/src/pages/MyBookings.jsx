import React, { useState, useEffect } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'

// git commits working

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [bookings, setbookings] = useState([])

  const fetchMyBookings = async ()=> {
    setbookings(dummyMyBookingsData)
  }

  useEffect(()=>{
    fetchMyBookings()
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='flex flex-col px-6 md:px-16 xl:px-32 2xl:px-48 items-center mt-16 max-w-7xl'>
      <h1 className='font-bold text-4xl'>My Bookings</h1>
      <p className='font-semibold mt-4 text-sm text-white/60'>View and manage your all car bookings</p>
      <div className='w-full'>
        {bookings.map((booking, index)=>{
          return (
            <div key={booking._id} className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-lg mt-5 first:mt-12'>
              <div className='md:col-span-1'>
                <div className='rounded-md overflow-hidden mb-3'>
                  <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover' />
                </div>
                <p className='font-semibold'>{booking.car.brand} {booking.car.model}</p>
                <p className='text-sm text-gray-600'>{booking.car.year} | {booking.car.category} | {booking.car.location}</p>
              </div>
              
              <div className='md:col-span-2'>
                <div className='flex items-center gap-2 mb-3'>
                  <p className='px-3 py-1.5 bg-blue-100 rounded text-blue-800 font-medium'>Booking #{index+1}</p>
                  <p className={`px-3 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-400/15 text-green-600' 
                      : 'bg-red-400/15 text-red-600'
                  }`}>
                    {booking.status}
                  </p>
                </div>
                <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1' />
                  <p>Rental Period</p>
                  <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                </div>


                <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1' />
                  <p>Pickup Location</p>
                  <p>{booking.car.location}</p>
                </div>

              </div>
              <div className='md:col-span-1 flex flex-col justify-between gap-6'>
                <div>
                  <p>Total price</p>
                  <h1 className='text-2xl font-semibold'>{currency}{booking.price}</h1>
                  <p>Booked on {booking.createdAt.split('T'[0])}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyBookings