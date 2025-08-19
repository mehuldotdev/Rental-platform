import React from 'react'
import Title from './Title'
import { dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from "../context/AppContext.jsx"
import { BlurFade } from "@/components/magicui/blur-fade";

const FeaturedSection = () => {

    const navigate = useNavigate();

    const {cars} = useAppContext();

  return (
    <BlurFade inView delay={0.8}>
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>
        <div>
            <Title title="Featured vehicles" subTitle="Explore our selection of premium vehicles available for your next adventure." />
        </div>
        
        <BlurFade delay={1} inView>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {
                cars.slice(0,6).map((car) => (
                    <div key={car._id}>
                        <CarCard car={car} />
                    </div>
                ))
            }

        </div>
        </BlurFade>
        <BlurFade direction="right" delay={0.5} inView>
        <Button className="mt-5" onClick={()=> {
            navigate("/cars"); scrollTo(0,0);
        }}>
           
            Explore all cars<ArrowRight /></Button>
            </BlurFade>

    </div>
    </BlurFade>
  )
}

export default FeaturedSection