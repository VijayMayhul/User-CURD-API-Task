//Importing express to create server
import express from "express";

//Importing dotenv to access environmental variables
import dotenv from "dotenv";

//Importing cors for cross platform verification
import cors from "cors";

//Importing mongoDB connect function
import connectDB from "./Databases/db_config.js";

//Importing user Router
import userRoute from "./Routers/user_router.js"


//configuring .env file variables
dotenv.config();

//creating server
const app = express();
//Giving port number to server
const port = process.env.SERVER_PORT || 8080;

//defining which domain to use our server
app.use(cors());
//parsing json body values
app.use(express.json());

//calling connectdb to connect dbs
connectDB();

//Initialize routing
app.use('/user-api', userRoute);

//Listening to the server Port
app.listen(port, ()=>{
    console.log(`User API Server running in the port : ${port}`);
});