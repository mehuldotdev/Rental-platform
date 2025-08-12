import React from 'react'
import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { dummyCarData } from '../assets/assets'
import CarCard from '../components/CarCard.jsx'

const Cars = () => {
  const [input, setinput] = useState('')
  window.scrollTo(0, 0)
  return (
    
    <div className='flex flex-col py-20 max-md:px-4 text-center items-center'>
      <h1 className='font-semibold text-5xl'>Available Cars</h1>
      <p className='font-semibold text-sm text-white/60 mt-4'>Browse our selection of premium vehicles available for your next adventure</p>
      <Input onChange={(e)=>setinput(e.target.value)} value = {input} className='w-1/4 mt-10 rounded-full' placeholder="Search by make, model or features..." />
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='font-semibold py-10 text-4xl'>Showing <span className='text-red-400'>{dummyCarData.length}</span> Cars</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {dummyCarData.map((car, index)=>(
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