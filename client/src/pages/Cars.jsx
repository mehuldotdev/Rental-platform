import React, { useEffect } from 'react'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard.jsx'
import { useAppContext } from "../context/AppContext.jsx"
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Cars = () => {

  // dynamic search on cars

  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const {cars, axios} = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate

  const [filteredCars, setFilteredCars] = useState([])

  const [input, setinput] = useState('')
  window.scrollTo(0, 0)

  const applyFilter = async ()=> {
    if(input===''){
      setFilteredCars(cars)
      return null
    }

    const filtered = cars.slice.filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase()) || car.model.toLowerCase().includes(input.toLowerCase())
      || car.category.toLowerCase().includes(input.toLowerCase()) || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)


  }

  const searchCarAvailability = async () => {
    const {data} = await axios.post('/api/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
      if(data.success) {
        setFilteredCars(data.availableCars)
        if(data.availableCars.length === 0){
          toast('No cars available')
        }
      }
      return null
  }

  useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter()
  },[input, cars])

  useEffect(()=>{
    isSearchData && searchCarAvailability()
  }, [])

  
  return (
    
    <div className='flex flex-col py-20 max-md:px-4 text-center items-center'>
      <h1 className='font-semibold text-5xl'>Available Cars</h1>
      <p className='font-semibold text-sm text-white/60 mt-4'>Browse our selection of premium vehicles available for your next adventure</p>
      <Input onChange={(e)=>setinput(e.target.value)} value = {input} className='w-1/4 mt-10 rounded-full' placeholder="Search by make, model or features..." />
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='font-semibold py-10 text-4xl'>Showing <span className='text-red-400'>{filteredCars.length}</span> Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index)=>(
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Cars