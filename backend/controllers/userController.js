import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        const existingEmail = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists"});
        } else if (existingEmail) {
            return res.status(400).json({ message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username: username,
            password: hashedPassword,
            email: email,
        })

        await newUser.save();
        res.status(201).json({ message: "User successfully created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to create user" })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const searchUser = await User.findOne({ username });
        if (!searchUser) {
            return res.status(400).json({ message: "Could not find user" });
        }
        const comparePassword = await bcrypt.compare(password, searchUser.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const secret = process.env.JWT_SECRET;
        const token = jwt.sign({
            subject: searchUser._id,
            username: searchUser.username
          }, secret, { expiresIn: "1h" });
        return res.status(200).json({ message: "Login successful", token});


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const logout = async (req, res) => {
    
}