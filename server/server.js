import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db.js";
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/BookingRoutes.js";

// Initialising the webapp

const app = express();

// Connecting the Database

await connectDB();


// Middleware

app.use(cors());
app.use(express.json()); // Allows incoming json data to become parsed into req.body everytime.

// Route

app.get('/', (req, res)=> res.send("Running server"));
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/booking', bookingRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server running on port : ${process.env.PORT}`)
);