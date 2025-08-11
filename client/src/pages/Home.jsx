import React from 'react'
import Hero from '../components/Hero.jsx'
import CarCard from '../components/CarCard.jsx'
import { dummyCarData } from '../assets/assets.js'
import FeaturedSection from '../components/FeaturedSection.jsx'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedSection />
        
    </>
  )
}

export default Home