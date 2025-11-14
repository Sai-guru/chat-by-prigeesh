import express from 'express';
import { Request, Response } from 'express';

 const router = express.Router();

 router.get('/send', (req : Request, res: Response) => {
   res.send('send endpoint');
 });
 
 router.get('/login', (req : Request, res: Response) => {
   res.send('login endpoint');
 });
 
 router.get('/logout', (req : Request, res: Response) => {
   res.send('logout endpoint');
 });
 
 export default router;