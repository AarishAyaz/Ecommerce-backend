import User from "../models/User.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

//register controller
export const register = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already Exists",
      });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashed,
      isAdmin: isAdmin || false,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not found",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password, Please try again!",
      });
    }
    const token = JWT.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );
    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};
