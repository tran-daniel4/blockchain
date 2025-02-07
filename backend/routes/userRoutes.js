import express from "express";
import { registerUser, login, logout, checkToken, trackCrypto, getTrackedCryptos, untrackCrypto } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", registerUser);

router.post("/logout", logout);

router.get("/checkToken", checkToken);

router.post("/track", authMiddleware, trackCrypto);

router.delete("/untrack/:coinId", authMiddleware, untrackCrypto);

router.get("/tracked", authMiddleware, getTrackedCryptos);

export default router;