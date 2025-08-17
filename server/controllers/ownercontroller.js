import imagekit from "../configs/imageKit.js";
import User from "../models/user.models.js"
import Car from "../models/Car.js"
import fs from "fs";

// Changing role of user

export const changeRoleToOwner = async(req,res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success:true, message:"Now you can list any car"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message}) 
        
    }
}

// Api to list the car

export const addCar = async(req,res) =>{
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({success: false, message: "No image file provided"});
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        
        // Upload to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        // Clean up the temporary file
        fs.unlinkSync(imageFile.path);

        // Optimizing the image
        var optimizedimageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {height: "1280"},
                {quality: "auto"},
                {format: "webp"},
            ]
        });

        const image = optimizedimageURL;
        await Car.create({...car, owner: _id, image});

        res.json({success: true, message: "Car has been added"});

    } catch (error) {
        console.log(error.message);
        
        // Clean up file if it exists and there was an error
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (cleanupError) {
                console.log('Error cleaning up file:', cleanupError.message);
            }
        }
        
        res.json({success: false, message: error.message});
    }
}

// Getting the list of cars

export const getOwnerCars = async(req,res) =>{
    try {
        const {_id} = req.user; // req.user is the logged-in user here
        const cars = await Car.find({owner: _id})
        res.json({success:true, cars})
    } catch (error) {
        console.log(error.message);
        return res.json({success:false, message:"failed to get list of cars"});
    }
}

// Check for car availability

export const toggleCarAvailability = async(req,res) =>{
    try {
        const {_id} = req.user;
        const { carId } = req.body;
        const car = await Car.findById({carId})
        if(car.owner.toString() !== _id.toString()){
            res.json({success:false, message: "Unauthorized"});
        }

        car.isAvailable = !car.isAvailable;
        await car.save()
        res.json({success:true, message:"Availability toggled"})

        res.json({success:true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"failed to get list of cars"});
    }
}

// Api to delete the car

export const deleteCar = async(req,res) =>{
    try {
        const {_id} = req.user;
        const { carId } = req.body;
        const car = await Car.findById({carId})
        if(car.owner.toString() !== _id.toString()){
            res.json({success:false, message: "Unauthorized"});
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save()
        res.json({success:true, message:"Car has been removed."})

        res.json({success:true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:"failed to get list of cars"});
    }
}


// Get dashboard data for the owner

const getDashboardData = async(req,res) => {
    try {
        const {_id, role} = req.body;

        if(role!==owner){
            res.json({success:false, message:"Unauthorized access"})
        }

        const cars = await Car.find({owner: _id})

    } catch (error) {
     console.log(error.message);
     res.json({success:false, message: "Failed to get dashboard data."})   
    }
}