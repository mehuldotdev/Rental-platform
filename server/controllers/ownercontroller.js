import User from "../models/user.models.js"

// Changing role of user

export const changeRoleToOwner = async(req,res) => {
    try {
        const {_id} = req.user;
        await User.findById(_id, {role: "owner"})
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
        let car = JSON.parse(req,ReportBody.carData)
        const imageFile = req.file;
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}