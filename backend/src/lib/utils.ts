    import jwt from 'jsonwebtoken';
    import { Response } from 'express';

    import { ENV } from './env.js';

    export const generateToken = (userId: any,res : Response) => {
        const token =  jwt.sign({ userId }, ENV.JWT_SECRET as string, { expiresIn: '6d' });
        // res.cookie('jwt', token, {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     // secure: ENV.NODE_ENV === 'development' ? false : true,
        //     secure: ENV.NODE_ENV === 'production' ? true : false,
        //     maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
        // });
        res.cookie('jwt', token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === 'production',   // HTTPS only in prod
    sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax', // cross-origin in prod
    maxAge: 6 * 24 * 60 * 60 * 1000, // 6 days
});

        return token;
    }

    export const verifyToken = (token: string) => {
        try {
            return jwt.verify(token, ENV.JWT_SECRET as string);
        } catch (error) {
            return null;
        }
    }