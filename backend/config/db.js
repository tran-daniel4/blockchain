import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to database: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}