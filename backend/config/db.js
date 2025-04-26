import mongoose from "mongoose";
import { ENV_VARS } from "./env_vars.js";


export const connectDB= async ()=>{
    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB is connected " + conn.connection.host)
    } catch (error) {
        console.error("Error connection in mongooseDB "+ error.message);
        process.exit(1);
    }
}