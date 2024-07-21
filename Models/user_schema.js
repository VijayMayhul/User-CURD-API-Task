//importing mongoose to create schema
import mongoose from "mongoose";

//defining user schema
const userSchema = new mongoose.Schema({
    userId : { type: Number, unique: true },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    companyName : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    zipcode : {
        type: Number,
        required: true
    },
    website : {
        type: String,
        required: true
    },
});

//creating model for user
const User = mongoose.model('User', userSchema);

//exporting the user model
export default User;