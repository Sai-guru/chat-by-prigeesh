import express from 'express';
import { Request, Response } from 'express';
import { signup } from '../controllers/auth.controller.js';

 const router = express.Router();

router.post('/signup',signup);

router.post('/login', (req : Request, res: Response) => {
  res.send('login endpoint');
});

router.post('/logout', (req : Request, res: Response) => {
  res.send('logout endpoint');
});

export default router;

