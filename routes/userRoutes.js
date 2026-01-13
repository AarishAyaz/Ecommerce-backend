import express from 'express';
import { updateUserProfile, updateUserByAdmin } from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { forgotPassword } from '../controllers/ForgotPassword.js';
import { resetPassword } from '../controllers/ResetPassword.js';
const router = express.Router();

// Update user profile route
router.put('/profile', protect, updateUserProfile);
router.put('/:id', protect, admin, updateUserByAdmin);
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
export default router;