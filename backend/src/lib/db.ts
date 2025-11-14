
import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
    try {
        const mongoURI : any = ENV.MONGO_URI;
        await mongoose.connect(mongoURI);
       
        console.log('Database connected successfully');
    }catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};