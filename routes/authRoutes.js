import express from 'express'
import { register, login } from '../controllers/authController.js'
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../Utility/EmailSender.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({ email });

    await OTP.create({
      email,
      otp: otpCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(
      email,
      "Password Reset OTP",
      `Your OTP is ${otpCode}. It expires in 10 minutes.`
    );

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// RESET PASSWORD
// ===============================
router.post("/reset-password", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const record = await OTP.findOne({ email, otp });

  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate(
    { email },
    { password: hashedPassword }
  );

  await OTP.deleteMany({ email });

  res.json({ message: "Password reset successful" });
});
export default router;