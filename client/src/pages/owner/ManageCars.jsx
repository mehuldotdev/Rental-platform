import React, { useEffect, useState } from 'react'
import { Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { assets } from '../../assets/assets';
import { Eye, EyeOff } from 'lucide-react';
import {useAppContext} from "../../context/AppContext.jsx"
import toast from 'react-hot-toast';

const ManageCars = () => {

  const {isOwner, axios, currency} = useAppContext()

  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async ()=>{
    try {
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId)=>{
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

    const deleteCar = async (carId)=>{
    try {

      const confirm = window.confirm('Delete the car permanently?')

      if(!confirm) return null;

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='lg:px-20 px-10 mt-10'>
      <h1 className='text-4xl font-medium'>Manage Cars</h1>
      <p className='mt-5 text-white/50 sm:text-1xl'>View all listed cars, update their details, or remove them from the booking platform.</p>
      <div className="bg-black overflow-hidden mt-10 rounded-lg border-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-9 py-2">Car</TableHead>
              <TableHead className="h-9 py-2 max-md:hidden">Category</TableHead>
              <TableHead className="h-9 py-2">Price</TableHead>
              <TableHead className="h-9 py-2 max-md:hidden">Status</TableHead>
              <TableHead className="h-9 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cars.map((car, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium pr-20">
                  <img className='h-12 w-12 aspect-square object-cover rounded-md' src={car.image} alt="" />
                  <div className='flex flex-col'>
                    <h1 className='font-bold text-1xl pt-2 text-gray-400'>{car.brand} {car.model}</h1>
                    <p className='text-sm font-extralight pt-1'>{car.seating_capacity} • {car.transmission} </p>
                  </div>
                </TableCell>
                <TableCell className="py-2">{car.model}</TableCell>
                <TableCell className="py-2">{currency}{car.pricePerDay}</TableCell>
                <TableCell><span className={`max-md:hidden rounded-full px-3 py-1 ${car.isAvailable ? "bg-green-300/40" : "bg-red-500"}`}>{car.isAvaliable ? "Available" : "Unavailable"}</span></TableCell>
                <TableCell className="py-2">
                  <div className='flex items-center p-3'>
                    <span className='pr-2.5'>{car.isAvailable
                      ? <Eye onClick={()=> toggleAvailability(car._id)} className='cursor-pointer text-green-500' />
                    : <EyeOff onClick={()=> toggleAvailability(car._id)} className='cursor-pointer text-red-500' />
                    }</span>
                    <Trash onClick={()=> deleteCar(car._id)} className='cursor-pointer' />
                    </div>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageCars