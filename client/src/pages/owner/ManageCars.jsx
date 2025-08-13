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
import { assets, dummyCarData } from '../../assets/assets';
import { Eye, EyeOff } from 'lucide-react';



const ManageCars = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [cars, setCars] = useState([]);

  const fetchOwnercars = async ()=>{
    setCars(dummyCarData)
  }

  useEffect(()=>{
    fetchOwnercars()
  }, [])

  const programmingLanguages = [
  {
    id: "1",
    name: "JavaScript",
    releaseYear: "1995",
    developer: "Brendan Eich",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".js",
    latestVersion: "ES2021",
    popularity: "High",
  },
  {
    id: "2",
    name: "Python",
    releaseYear: "1991",
    developer: "Guido van Rossum",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".py",
    latestVersion: "3.10",
    popularity: "High",
  },
  {
    id: "3",
    name: "Java",
    releaseYear: "1995",
    developer: "James Gosling",
    typing: "Static",
    paradigm: "Object-oriented",
    extension: ".java",
    latestVersion: "17",
    popularity: "High",
  },
  {
    id: "4",
    name: "C++",
    releaseYear: "1985",
    developer: "Bjarne Stroustrup",
    typing: "Static",
    paradigm: "Multi-paradigm",
    extension: ".cpp",
    latestVersion: "C++20",
    popularity: "High",
  },
  {
    id: "5",
    name: "Ruby",
    releaseYear: "1995",
    developer: "Yukihiro Matsumoto",
    typing: "Dynamic",
    paradigm: "Multi-paradigm",
    extension: ".rb",
    latestVersion: "3.0",
    popularity: "Low",
  },
]


  return (
    <div className='flex flex-col w-full lg:px-20 px-10 mt-10'>
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
                <TableCell><span className={`max-md:hidden rounded-full px-3 py-1 ${car.isAvaliable ? "bg-green-300/40" : "bg-red-500"}`}>{car.isAvaliable ? "Available" : "Unavailable"}</span></TableCell>
                <TableCell className="py-2">
                  <div className='flex items-center p-3'>
                    <span className='pr-2.5'>{car.isAvaliable
                      ? <Eye className='cursor-pointer text-green-500' />
                    : <EyeOff className='cursor-pointer text-red-500' />
                    }</span>
                    <Trash className='cursor-pointer' />
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