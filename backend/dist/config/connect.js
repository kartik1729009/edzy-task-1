import mongoose from "mongoose";
import dotenv from "dotenv";
// Load .env variables
dotenv.config();
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI not defined in .env");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process on connection failure
    }
};
export default connectDB;
//# sourceMappingURL=connect.js.map