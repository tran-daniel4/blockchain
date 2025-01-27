import express from "express";
import { registerUser, login } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", registerUser);

router.post("/logout", (req, res) => {

});

export default router;