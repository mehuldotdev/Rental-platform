import React from 'react'
import carrr from "../assets/carrr.png"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BlurFade } from "@/components/magicui/blur-fade";

const Banner = () => {
  return (
    <BlurFade delay={0.8} inView>
    <div className='overflow-hidden sm:mx-20'>
        <Card className="sm:p-5 md:mx-20 lg:mx-20 bg-gradient-to-r from-sky-600 to-slate-50 border-0">
        <div className="flex flex-row items-center justify-evenly flex-1">
            <div className='flex-1'>
  <CardHeader>
    <CardTitle className="text-white text-3xl font-bold">Do You Own a Luxury Car?</CardTitle>
    <CardDescription className="text-white font-extralight">Monetize your vehicle effortlessly by listing it on CarRental. <br />

We take care of insurance, driver verification and secure payments — so <br /> you can earn passive income, stress-free.</CardDescription>
    <Button className="mt-5 w-fit text-sm"> List you car</Button>
  </CardHeader>
    </div>
  <div className='flex flex-1 justify-end items-end'>
    <img className='w-1/2' src="carrr.png" alt="Car-image" />
  </div>
            
    </div>
</Card>
    </div>
    </BlurFade>
            
  )
}

export default Banner