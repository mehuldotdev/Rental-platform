import Booking from "../models/Bookings.js"
import Car from "../models/Car.js"

// Check if the car is available for a particular date using a function

const checkAvailability = async(car, pickupDate, returnDate)=>{
    const bookings = await Booking.find({
        car,
        pickupDate: {lte: returnDate},
        returnDate: {gte: pickupDate},
    })
    return bookings.length === 0
}

// Checking availability of cars for given date + location, takes in the dashboard form input.

export const checkAvailabilityofCar = async(req,res)=>{
    try {
        const {location, pickupDate, returnDate} = req.body;
        const cars = await Car.find({location, isAvailable: true})

        const availableCarsPromise = cars.map(async(car)=>{
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
            return {...car,_doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromise);
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success:true, message: error.message})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

// Api to create the booking

export const createBooking = async(req,res)=>{
    try {
        const {_id} = req.user;
        const {car, pickupDate, returnDate} = req.body;

        const isAvailable = await checkAvailability(car, pickupDate, returnDate)
        if(!isAvailable){
            return res.json({success:false, message:"Car not available"})
        }

        const carData = await Car.findById(car)

        // Calculating car price

        const picked = new Date(pickupDate)
        const returned = new Date(returnDate)

        const noOfDays = Math.ceil((returned - picked)/ (1000 * 60 * 60 * 24))
        const price = carData.pricePerDay * noOfDays;

        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate})

        res.json({success:true, message:"Booking created"})

    } catch (error) {
        console.log(error.message);
        res.json({success:true, message:error.message})
    }

}

// Api to see user bookings

export const getUserBookings = async(req,res) => {
    try {
        const { _id } = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})

        res.json({success:true, message: "Details found and listed"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// Api to get owner bookings

export const getOwnerBookings = async(req,res) => {
    try {
        if(req.user.role !== owner){
            return res.json({ success:false, message: "Unauthorized"})
        }
        const bookings = await Booking.find({owner: req.user._id}).populate('car user').select("-user.password").sort({createdAt: -1})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}

// Api to change booking status

export const changeBookingStatus = async(req, res)=>{
    try {
        const {_id} = req.user;
        const {bookingId, status} = req.body
        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success:false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();

        res.json({success:true, message:"Status has been updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message: error.message})
    }
}