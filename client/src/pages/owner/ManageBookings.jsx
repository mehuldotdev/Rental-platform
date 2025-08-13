import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { dummyMyBookingsData } from '../../assets/assets';

const ManageBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  }

  useEffect(()=>{
    fetchOwnerBookings();
  },[])

  return (
    <div className='lg:px-20 px-10 mt-10'>
      <h1 className='text-4xl font-medium'>Manage Bookings</h1>
      <p className='mt-5 text-white/50 sm:text-1xl'>View all listed cars, update their details, or remove them from the booking platform.</p>
      <div className="bg-black overflow-hidden mt-10 rounded-lg border-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 py-2">Car</TableHead>
              <TableHead className="h-9 py-2">Date Range</TableHead>
              <TableHead className="h-9 py-2">Total</TableHead>
              <TableHead className="h-9 py-2">Payment</TableHead>
              <TableHead className="h-9 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((bookings, index) => (
              <TableRow key={index}>
                <TableCell className="py-2 flex flex-row items-center">
                    <img className='h-12 w-12 object-cover rounded-lg' src={bookings.car.image} alt="" />
                    <p className='font-semibold text-1xl pl-5'>{bookings.car.brand} • {bookings.car.model}</p>
                </TableCell>
                <TableCell>
                  {bookings.pickupDate.split('T')[0]} to {bookings.returnDate.split('T')[0]}
                </TableCell>
                <TableCell>
                  {currency}{bookings.car.pricePerDay}
                </TableCell>
                <TableCell>
                  <span className='bg-white/30 rounded-full px-3 py-1'>offline</span>
                </TableCell>
                <TableCell>
                  {bookings.status === 'pending' ? (
                    <select value={bookings.status}>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ): (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bookings.status === 'confirmed' ? 'bg-green-600 text-white' : 'bg-red-100 text-red-500' }`}>Confirmed</span>
                  ) }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageBookings