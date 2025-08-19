import React from 'react'
import { useId } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BlurFade } from "@/components/magicui/blur-fade";

const Newsletter = () => {
  const id = useId()
  return (
    <BlurFade delay={0.8} inView>
    <div className='flex flex-col items-center justify-between mt-40'>
      <h1 className='text-5xl font-bold'>Never miss a deal.</h1>
      <h2 className='text-gray-400 mt-5'>Subscribe to get the latest offers, new arrivals, and exclusive discounts
</h2>
    <div className="*:not-first:mt-2">
      <Label htmlFor={id}>Input with helper text</Label>
      <Input className="w-full" id={id} placeholder="Email" type="email" required />
      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      >
        We won&lsquo;t share your email with anyone
      </p>
    </div>
    </div>
    </BlurFade>
  )
}

export default Newsletter