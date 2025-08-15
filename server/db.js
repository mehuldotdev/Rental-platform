import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log("MongoDB connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    } catch (error) {
        console.log("Error in connecting to database", error);
    }
}

export default connectDB;