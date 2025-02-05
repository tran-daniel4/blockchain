import express from "express";
import { registerUser, login, logout, checkToken } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", registerUser);

router.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});

router.post("/logout", logout);

router.get("/checkToken", checkToken);

export default router;