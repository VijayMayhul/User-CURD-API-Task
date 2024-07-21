import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect_string = process.env.MONGODB_CONNECTION_STRING;

const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(connect_string);
        console.log(`Atlas MongoDB Database connected Successfully!`);
        return connection;
    } catch (error) {
        console.log(`Atlas MongoDB Connect Error : ${error}`);
    }
    
}

export default connectDB;