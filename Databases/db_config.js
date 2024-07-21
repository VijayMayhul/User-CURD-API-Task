//importing mongoose to connect with dbs
import mongoose from "mongoose";
//Importing dotenv to access environmental variables
import dotenv from "dotenv";

//configuring .env file variables
dotenv.config();

//storing the connection string
const connect_string = process.env.MONGODB_CONNECTION_STRING;

//connect with dbs using mongoose
const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(connect_string);
        console.log(`Atlas MongoDB Database connected Successfully!`);
        return connection;
    } catch (error) {
        console.log(`Atlas MongoDB Connect Error : ${error}`);
    }
    
}

//exporting the mongodb connect function
export default connectDB;