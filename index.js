import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Databases/db_config.js";
import userRoute from "./Routers/user_router.js"

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/user-api', userRoute);

app.listen(port, ()=>{
    console.log(`User API Server running in the port : ${port}`);
});