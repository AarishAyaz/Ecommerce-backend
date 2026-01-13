import { forgotPassword } from "./ForgotPassword.js";
import User from "../models/User.js";

export const resetPassword = async (req,res) =>{
    try {
        const {email, otp, newPassword} = req.body;
        const user = await User.findOne({
            email,
            forgotPasswordExpires: {$gt: Date.now()},
        });
        if(!user){
            return res.status(400).json({message:"OTP expired or invalid"});
        }
        const isOTPValid = await bcrypt.compare(otp, user.forgotPasswordOTP);
        if(!isOTPValid){
            return res.status(400).json({message:"OTP invalid"});
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.forgotPasswordOTP = undefined;
        user.forgotPasswordExpires = undefined;

        await user.save();

        res.json({message:"Password reset successful"});
    } catch (error) {
        res.status(500).json({message:"Server error"});
    }
}