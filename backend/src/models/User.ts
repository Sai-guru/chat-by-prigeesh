import mongoose,{Document} from 'mongoose';


export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  profilePic?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema =  new mongoose.Schema({
    fullName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true , minLength : 6 },
    profilePic: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
},
{timestamps : true});
 
export const User =  mongoose.model<IUser>('User', userSchema);

