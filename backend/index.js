import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import router from "./routes/userRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use("/", router);

app.get('/', (req, res) => {
    res.send("Server is ready");
    res.end();
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

