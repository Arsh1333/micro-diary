import mongoose from "mongoose";
import { User } from "../model/Users.models.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        userName: savedUser.userName,
        email: savedUser.email,
      },
    });
  } catch (error) {
    console.log("Error while registering", error);
  }
};

export { register };
