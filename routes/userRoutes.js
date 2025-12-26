import express from 'express';
import { updateUserProfile, updateUserByAdmin } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Update user profile route
router.put('/profile', protect, updateUserProfile);
router.put('/:id', protect, admin, updateUserByAdmin);
export default router;