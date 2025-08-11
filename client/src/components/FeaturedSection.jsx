import React from 'react'
import Title from './Title'
import { dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { Button } from "@/components/ui/button"
import { ArrowBigRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const FeaturedSection = () => {

    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
        <div>
            <Title title="Featured vehicles" subTitle="Explore our selection of premium vehicles available for your nect adventure." />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {
                dummyCarData.slice(0,6).map((car) => (
                    <div key={car._id}>
                        <CarCard car={car} />
                    </div>
                ))
            }

        </div>

        <Button onClick={()=> {
            navigate("/cars"); scrollTo(0,0);
        }}>
            Explore all cars<ArrowBigRight /></Button>

    </div>
  )
}

export default FeaturedSection