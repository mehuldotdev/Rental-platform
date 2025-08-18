import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from "../../context/AppContext.jsx"
import toast from 'react-hot-toast'

const AddCar = () => {

  const {axios, currency} = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    pricePerDay: 0,
    category: '',
    fuel_type: '',
    seating_capacity: 4,
    transmission: '',
    location: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCar(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(isLoading) return null
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const {data} = await axios.post('/api/owner/add-car', formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          pricePerDay: 0,
          category: '',
          fuel_type: '',
          seating_capacity: 4,
          transmission: '',
          location: '',
          description: ''
        })
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className='lg:px-20 px-10 mt-10 flex-1'>
      <h1 className='text-4xl font-medium'>Add New Car</h1>
      <p className='mt-5 text-white/50 sm:text-1xl'>Fill in details to list a new car for booking, including pricing, availability, and car specifications</p>
      
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-white text-sm mt-6 max-w-xl'>
        {/* Car Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded cursor-pointer' />
            <input type="file" id="car-image" accept='image/*' hidden onChange={e=>setImage(e.target.files[0])} />
          </label>
          <p className='text-sm text-white/70'>Upload a picture of your car</p>
        </div>

        {/* Brand and Model */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label htmlFor="brand" className='block mb-2'>Brand</label>
            <input 
              type="text" 
              id="brand" 
              name="brand"
              value={car.brand}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              placeholder="e.g., BMW, Toyota"
              required
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="model" className='block mb-2'>Model</label>
            <input 
              type="text" 
              id="model" 
              name="model"
              value={car.model}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              placeholder="e.g., X5, Corolla"
              required
            />
          </div>
        </div>

        {/* Year and Price */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label htmlFor="year" className='block mb-2'>Year</label>
            <input 
              type="number" 
              id="year" 
              name="year"
              value={car.year}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear() + 1}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              required
            />
          </div>
          <div className='flex-1'>
            <label htmlFor="pricePerDay" className='block mb-2'>Price per Day ($)</label>
            <input 
              type="number" 
              id="pricePerDay" 
              name="pricePerDay"
              value={car.pricePerDay}
              onChange={handleInputChange}
              min="0"
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              placeholder="0"
              required
            />
          </div>
        </div>

        {/* Category and Fuel Type */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label htmlFor="category" className='block mb-2'>Category</label>
            <select 
              id="category" 
              name="category"
              value={car.category}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              required
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Convertible">Convertible</option>
              <option value="Truck">Truck</option>
            </select>
          </div>
          <div className='flex-1'>
            <label htmlFor="fuel_type" className='block mb-2'>Fuel Type</label>
            <select 
              id="fuel_type" 
              name="fuel_type"
              value={car.fuel_type}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
        </div>

        {/* Seating Capacity and Transmission */}
        <div className='flex gap-4'>
          <div className='flex-1'>
            <label htmlFor="seating_capacity" className='block mb-2'>Seating Capacity</label>
            <select 
              id="seating_capacity" 
              name="seating_capacity"
              value={car.seating_capacity}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              required
            >
              <option value="2">2 Seater</option>
              <option value="4">4 Seater</option>
              <option value="5">5 Seater</option>
              <option value="6">6 Seater</option>
              <option value="7">7 Seater</option>
              <option value="8">8+ Seater</option>
            </select>
          </div>
          <div className='flex-1'>
            <label htmlFor="transmission" className='block mb-2'>Transmission</label>
            <select 
              id="transmission" 
              name="transmission"
              value={car.transmission}
              onChange={handleInputChange}
              className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
              required
            >
              <option value="">Select Transmission</option>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className='block mb-2'>Location</label>
          <select 
            id="location" 
            name="location"
            value={car.location}
            onChange={handleInputChange}
            className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none'
            required
          >
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Houston">Houston</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className='block mb-2'>Description</label>
          <textarea 
            id="description" 
            name="description"
            value={car.description}
            onChange={handleInputChange}
            rows="4"
            className='w-full p-3 bg-white/10 rounded border border-white/20 focus:border-blue-400 focus:outline-none resize-none'
            placeholder="Describe your car's features, condition, and any special notes..."
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded transition-colors duration-200'
        >
          {isLoading ? 'Listing your car...' : 'Add Car'}
        </button>
      </form>
    </div>
  )
}

export default AddCar