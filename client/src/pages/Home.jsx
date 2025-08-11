import React from 'react'
import Hero from '../components/Hero.jsx'
import CarCard from '../components/CarCard.jsx'
import { dummyCarData } from '../assets/assets.js'
import FeaturedSection from '../components/FeaturedSection.jsx'
import Banner from '../components/banner.jsx'
import Testimonial from '../components/Newsletter.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedSection />
        <Banner />
        <Testimonial />
    </>
  )
}

export default Home