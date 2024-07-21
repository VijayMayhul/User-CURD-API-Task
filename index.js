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

//server connect response
app.get('/', (req, res)=>{
    try {
        //sending success response
        res.status(200).json({message : `User CRUD API server connected successfully!`});
    } catch (error) {
         //sending error response, if any error happened
        console.log(`Error in connecting server : ${error}`);
        res.status(500).json({error : `Failed to connect the server, Internal Server Error`});
    }
});

//Initialize routing
app.use('/user-api', userRoute);

//Listening to the server Port
app.listen(port, ()=>{
    console.log(`User API Server running in the port : ${port}`);
});