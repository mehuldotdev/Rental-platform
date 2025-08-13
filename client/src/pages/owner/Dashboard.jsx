import React, { useEffect } from 'react'
import { useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets.js'

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY;

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    {title: "Total Cars", value: data.totalCars, icon: assets.carIconColored},
    {title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored},
    {title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored},
    {title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored}
  ]

  useEffect(()=>{
    setData(dummyDashboardData)
  }, [])

  return (
    <div className='lg:px-20 px-10 mt-10'>
      <h1 className='text-4xl font-medium'>Admin Dashboard</h1>
      <p className='mt-5 text-white/50 sm:text-1xl'>Monitor overall platform performance including total cars, bookings, revenue, and recent activities.</p>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl'>
        {dashboardCards.map((card, index)=>(
        <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border-1' >
          <div>
            <h1 className='text-sm'>{card.title}</h1>
            <h1>{card.value}</h1>
            </div>
            <div className='flex bg-blue-500/30 justify-center h-10 w-10 rounded-full items-center'>
            <img className='w-6 h-6' src={card.icon} alt="" />
            
          </div>
        </div>
        ))}


        <div className='flex flex-wrap items-start gap-6 mb-8 md:w-200 sm:w-100 w-full'>
          {/* Recent booking */}
          <div className='text-lg border-2 p-4 font-medium text-white rounded-md w-full'>
            <h1>Recent Bookings</h1>
            <p className='text-white/70'>Latest customer bookings :</p>
            {data.recentBookings.map((booking, index)=>(
              <div key={index} className='mt-4 w-full'>
                <div className='grid grid-cols-1 sm:grid-cols-[1fr,auto] items-start sm:items-center gap-3 w-full'>
                  <div className='flex items-center gap-3 min-w-0'>
                    <div className='flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/40 shrink-0'>
                      <img className='w-6 h-6' src={assets.listIconColored} alt="" />
                    </div>
                    <div className='min-w-0'>
                      <p className='truncate'>{booking.car.brand} {booking.car.model}</p>
                      <p className='text-sm text-white/50 whitespace-nowrap'>{booking.createdAt.split('T')[0]}</p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 font-medium justify-self-start sm:justify-self-end'>
                    <p className='text-sm text-white/90 bg-blue-500/30 border-1 rounded-full py-0.5 px-3 whitespace-nowrap'>{currency}{booking.price}</p>
                    <p className='rounded-full border-1 py-0.5 px-3 text-sm capitalize whitespace-nowrap'>{booking.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>




          {/* Monthly Revenue */}
          <div className='border-2 flex flex-col rounded-xl w-full p-4'>
            <h1 className='text-lg font-medium'>Monthly Revenue</h1>
            <p className='text-sm text-white/70'>Revenue for current month</p>
            <p className='pt-5 text-3xl font-bold text-blue-500'>{currency}{data.monthlyRevenue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard