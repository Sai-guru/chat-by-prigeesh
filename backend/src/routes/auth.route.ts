import express from 'express';
import { Request, Response } from 'express';
import { signup , login,logout,updateProfile} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
 const router = express.Router();

 //  simple we can give 
 router.use(arcjetProtection);

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update-profile',protectRoute ,updateProfile);
router.get('/check',protectRoute , (req : Request, res: Response) => {
    res.status(200).json(req.user);
});

//for testing in browser
// router.get('/test-arcjet',, (req : Request, res: Response) => {
//     res.status(200).json({ message: "test route only  : Arcjet protection passed!" });
// });

export default router;

