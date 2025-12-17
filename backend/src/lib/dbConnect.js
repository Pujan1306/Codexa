import mongoose from "mongoose";
import { ENV } from "./env.js";
import { setupModels } from "../model/index.js";

const connection = {}

export async function dbConnect() {
    if (!ENV.MONGO_URL) {
        throw new Error("Please provide MONGO_URL in the environment variables")
    }
    if (connection.isConnected) {
        console.log("Already connected to MongoDB") 
        return  
    }
    try {
        const db = await mongoose.connect(ENV.MONGO_URL)
        connection.isConnected = db.connections[0]?.readyState
        console.log("Connected to MongoDB")
        
     
        setupModels();
    } catch (error) {
        console.log("Failed to connect to MongoDB", error)
        process.exit(1)
    }
}