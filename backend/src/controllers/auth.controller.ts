import { Request, Response } from 'express';
import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import {ENV} from '../lib/env.js';
import cloudinary from '../lib/cloudinary.js';


// @POST method - /api/auth/signup for user registration
export const signup = async(req: Request, res: Response) => {
    const {fullName , email , password} = req.body;
    try {
        if(!fullName || !email || !password)  return  res.status(400).json({message: 'All fields are required'});
        if(password.length < 6) return res.status(400).json({message: 'Password must be at least 6 characters long'});
        
        //email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: 'Invalid email format'});
        }
        
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: 'Email already exists'});
        
        //upto above that are just validations....
        //here after only the main picture buddy..
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({fullName, email, password: hashedPassword});
        
        if(newUser) {
            generateToken(newUser._id,res as Response);
            await newUser.save();
       
        res.status(201).json({message: 'User registered successfully'});
        
        try{
            await sendWelcomeEmail(newUser.email , newUser.fullName ,ENV.CLIENT_URL);
        }catch(err){
            console.error("Failed to send welcome email:", err);    }


            
       }else return res.status(400).json({message: 'Invalid user data'});
    
    }catch (error) {    
        res.status(500).json({message: 'Internal server error'});
    }
}


// @POST method - /api/auth/login for user login
export const login = async(req:Request,res:Response) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid credentials'});

        const passMatch = await bcrypt.compare(password,user.password);
        if(!passMatch) return res.status(400).json({message: 'Invalid credentials'});
        
        generateToken(user._id,res as Response);
        res.status(200).json({message: 'Login successful',
            user_fullName: user.fullName,
            user_id: user._id,
            user_email: user.email,
        });
   
    }catch(err){
        console.error("Login error:", err);
        res.status(500).json({message: 'Internal server error'});
    }
};


// @POST method - /api/auth/logout for user logout
export const logout = (req:Request,res:Response) => {
    res.cookie('jwt','',{maxAge:0});
    
    res.status(200).json({message: 'Logout successful'});
};


// @PUT method - /api/auth/update-profile for updating user profile\
export const updateProfile = async(req:Request,res:Response) => {

    try {
        const {profilePic} = req.body;
    if(!profilePic) return res.status(400).json({message: 'Profile piv is required'});
    
    const userId = req.user._id;
   const uploadResp = await cloudinary.uploader.upload(profilePic);
    const updated = await User.findByIdAndUpdate(userId,
        {profilePic: uploadResp.secure_url},{new:true});

   res.status(200).json("updated pfp success"+updated);
    }catch(err){
        console.error("Update profile error:", err);
        res.status(500).json({message: 'Internal server error'});
    }   
};