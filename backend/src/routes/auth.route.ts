import express from 'express';
 import { Request, Response } from 'express';
import { signup , login,logout,updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
 const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update-profile',protectRoute ,updateProfile);
router.get('/check',protectRoute , (req : Request, res: Response) => {
    res.status(200).json(req.user);
});

export default router;

