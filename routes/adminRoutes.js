import express from 'express';
import User from '../models/User.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();
// Controller function to get all users
router.get("/users", protect,admin, async(req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})

export default router;