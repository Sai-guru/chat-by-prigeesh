import { Request,Response } from "express";
import {User} from "../models/User.js";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

// Middleware to protect routes

export const protectRoute = async(req: Request, res: Response, next: Function) => {

    try{
        const token = req.cookies.jwt;  
        if(!token) return res.status(401).json({message: "Unauthorized ...no token provided"});
      
         const decoded = jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
        
         const user = await User.findById(decoded.userId).select('-password');
        if(!user) {
            console.error("User not found for ID:", decoded.userId);
            return res.status(401).json({message: " user Not found"});
        }

        req.user = user;
         next();
    }catch (err){
        console.error("Authorization error:", err);
        return res.status(401).json({message: "Unauthorized"});
    }
};