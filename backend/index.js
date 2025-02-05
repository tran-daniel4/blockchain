import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", userRoutes);
app.use("/api", cryptoRoutes);

app.get('/', (req, res) => {
    res.send("Server is ready");
    res.end();
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
 
