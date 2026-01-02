import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import {admin, protect} from '../middlewares/authMiddleware.js';

const router = express.Router();

//view all users - admin only
router.get("/", protect, admin, async (req, res) => {
      try {
          console.log("✅ ADMIN USERS ROUTE HIT");

    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

//add a user
router.post("/", admin, async(req,res)=>{
    const {name, email, password, isAdmin} = req.body;

    const exists = await User.findOne({email});
    if(exists){
        return res.status(400).json({message: "User already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin
    });
    await user.save();
    res.status(201).json({message: "User created successfully"});
    })

    //delete a user
    router.delete("/:id", admin, async(req,res)=>{
        await User.findByIdAndDelete(req.params.id);
        res.json({message: "User Deleted successfully"});
    })
export default router;