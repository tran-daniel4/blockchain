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
          }, secret, { expiresIn: "15m" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
        });
        return res.status(200).json({ message: "Login successful", token});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully logged out" });
}

export const checkToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            return res.status(200).json({ message: "Directing to homepage..."});
        }
    } catch (error) {
        return res.status(401).json({ message: "Directing to authentication..."});
    }
}

export const trackCrypto = async (req, res) => {
    try {
        const userId = req.user.subject;
        console.log(userId);
        const { coinId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found "});
        }
        if (!user.tracked_cryptos.includes(coinId)) {
            user.tracked_cryptos.push(coinId);
            await user.save();
        }
        return res.status(200).json({ message: "Successfully tracking coin", tracked_cryptos: user.tracked_cryptos });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error tracking coin" });
    }
}

export const untrackCrypto = async (req, res) => {
    try {
        const userId = req.user.subject;
        const { coinId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.tracked_cryptos = user.tracked_cryptos.filter(id => id !== coinId);
        await user.save();

        return res.status(200).json({ message: "Coin untracked", tracked_cryptos: user.tracked_cryptos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error untracking crypto" });
    }
};

export const getTrackedCryptos = async (req, res) => {
    try {
        const userId = req.user.subject;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const tracked = user.tracked_cryptos || [];
        return res.status(200).json({ favorites: tracked });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching tracked cryptos" });
    }
};
