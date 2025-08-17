import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const protect = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "No token provided" 
            });
        }

        // Remove 'Bearer ' prefix if present
        const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;
        
        // Verify the token
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET || 'your-secret-key');
        
        // Since tokens are generated with just userId, decoded is the userId directly
        if (!decoded) {
            return res.status(401).json({ 
                success: false, 
                message: "Invalid token" 
            });
        }

        // Find user by id (decoded is the userId)
        const user = await User.findById(decoded).select("-password");
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized" 
        });
    }
}