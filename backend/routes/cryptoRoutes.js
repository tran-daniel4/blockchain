import express from "express"; 
import getCrypto from "../controllers/cryptoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/crypto", authMiddleware, getCrypto);

export default router;