//importing user collection
import User from "../Models/user_schema.js";

//importing validator for email and url check
import validator from "validator";


//server connection method
export const serverConnect = async (req, res)=>{
    try {
        //sending success response
        res.status(200).json({message : `User CRUD API server connected successfully!`});
    } catch (error) {
         //sending error response, if any error happened
        console.log(`Error in connecting server : ${error}`);
        res.status(500).json({error : `Failed to connect the server, Internal Server Error`});
    }
}

//fetching all user data and filtering user method
export const fetchUsers = async(req, res)=>{
    try {
        //getting search and sort values from params query
        const {search, sort} = req.query;

        //getting page and limit values from params query and giving default values
        let page = parseInt(req.query.page)-1 || 0;
        let limit = parseInt(req.query.limit) || 5;

        //if search has value getting the particular field to find in data
        let filterSearch = search ? {
            $or : [
                {firstName : new RegExp(search, 'i')},
                {lastName : new RegExp(search, 'i')}
            ]
        } : {};

        //if sort has value, through that sorting the data
        let sortOrder = {};
        if(sort){
            let sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            let sortDirection = sort.startsWith('-') ? -1 : 1 ;
            sortOrder[sortField] = sortDirection;
        }

        //gathering and filtering users
        const users = await User.find(filterSearch).sort(sortOrder).skip(page * limit).limit(limit);

        //sending success response
        res.status(200).json({message : 'Users fetched Successfully!', userData : users});
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error while fetching users : ${error.message}`);
        res.status(500).json({error : `Internal server error while fetching user details`});
    }
}

//fetching particular user by ID method
export const fetchUserById = async (req, res) => {
    try {
        //getting the userID from params
        const userId = parseInt(req.params.id);

        //if userID is NaN send error response
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID format'});
        }
        
        //finding the particular user
        const user = await User.findOne({ userId });
        
        //if user not found send error response
        if (!user) {
            return res.status(404).json({ error: 'User not found!'});
        }
        //sending success response
        res.status(200).json({ message: 'User fetched successfully!', userData: user });
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error while fetching the user: ${error.message}`);
        res.status(500).json({ error: 'Internal server error while fetching user data' });
    }
  };

//creating new user method
export const createUser = async(req, res)=>{
    try {
        //getting the user details from request body
        const { firstName, lastName, age, email, companyName, city, state, zipcode, website } = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !age || !email || !companyName || !city || !state || !zipcode || !website) {
        return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Please provide a valid Email ID' });
        }

        // Validate website URL
        if (!validator.isURL(website)) {
        return res.status(400).json({ error: 'Please provide a valid Website URL' });
        }

        //creating an unique userID for every new user
        const lastUser = await User.findOne().sort('-userId');
        const nextId = lastUser ? lastUser.userId+1 : 1;

        //creating new user
        const newUser = new User({
            userId : nextId,
            firstName,
            lastName,
            age,
            email,
            companyName,
            city,
            state,
            zipcode,
            website
          });
        
        //save the user
        await newUser.save();
        
        //sending success response
        res.status(201).json({message : 'New User Created Successfully!', createdUser : newUser});
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error while creating user : ${error.message}`);
        res.status(500).json({error : `Internal server error while creating new user`});
    }
}

//updating user method
export const updateUserById = async(req, res)=>{
    try {
        //getting the userID from params
        const userId = parseInt(req.params.id);

        //if userID is NaN send error response
        if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
        }

        //finding the particular user
        const user = await User.findOne({ userId });

        //if user not found send error response
        if (!user) {
        return res.status(404).json({ error: 'User not found!' });
        }

        //getting the user details from request body
        const {firstName, lastName, age, email, companyName, city, state, zipcode, website} = req.body;

        // Check if all required fields are provided
        if (!firstName || !lastName || !age || !email || !companyName || !city || !state || !zipcode || !website) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        //validating email Id
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Please provide a valid Email ID' });
        }

        //validating Website URL
        if (!validator.isURL(website)) {
            return res.status(400).json({ message: 'Please provide a valid Website URL' });
        }

        //updating the new details
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.companyName = companyName;
        user.city = city;
        user.state = state;
        user.zipcode = zipcode;
        user.website = website;

        //saving the user
        await user.save();

        //sending success response
        res.status(200).json({message : 'User Data Updated Successfully!', updatedUser : user});
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error while updating user : ${error.message}`);
        res.status(500).json({error : `Internal server error while updating user data`});
    }
}

//deleting user method
export const deleteUserById = async(req, res)=>{
    try {
        //getting the userID from params
        const userId = parseInt(req.params.id);

        //if userID is NaN send error response
        if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
        }

        //finding the particular user
        const user = await User.findOne({ userId });

        //if user not found send error response
        if (!user) {
        return res.status(404).json({ error: 'User not found!' });
        }

        //removing the user
        const result = await User.deleteOne({ userId });

        //if user not removed send error response
        if (result.deletedCount === 0) {
        return res.status(500).json({ error: 'Failed to delete user' });
        }

        //sending success response
        res.status(200).json({message : 'User Data Deleted Successfully!'});
    } catch (error) {
        //sending error response, if any error happened
        console.log(`Error while deleting user : ${error.message}`);
        res.status(500).json({error : `Internal server error while deleting user`});
    }
}