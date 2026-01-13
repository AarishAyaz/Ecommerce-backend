import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateOTP } from "../Utility/OTPGenerator.js";
import {sendEmail} from "../Utility/EmailSender.js";

export const forgotPassword = async(req,res)=>{
    try {
        const {email} =req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        const otp = generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);

        user.forgotPasswordOTP = hashedOTP;
        user.forgotPasswordExpires = Date.now() + 10 * 60 * 1000;

        await user.save();

        await sendEmail(
            email,
            "Password Reset OTP",
            `<h2>Password Reset OTP</h2>
            <p>Your OTP is:</p>
            <h1>${otp}</h1>
            <p>This OTP is valid for 10 minutes.</p>`
        );
        res.json({message: "OTP sent to email"});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }
}