import User from "../Models/user_schema.js";
import validator from "validator";

export const fetchUsers = async(req, res)=>{
    try {

        const {search, sort} = req.query;

        let page = parseInt(req.query.page)-1 || 0;
        let limit = parseInt(req.query.limit) || 5;

        let filterSearch = search ? {
            $or : [
                {firstName : new RegExp(search, 'i')},
                {lastName : new RegExp(search, 'i')}
            ]
        } : {};

        let sortOrder = {};
        if(sort){
            let sortField = sort.startsWith('-') ? sort.substring(1) : sort;
            let sortDirection = sort.startsWith('-') ? -1 : 1 ;
            sortOrder[sortField] = sortDirection;
        }

        const users = await User.find(filterSearch).sort(sortOrder).skip(page * limit).limit(limit);
        res.status(200).json({message : 'Users fetched Successfully!', userData : users});
    } catch (error) {
        console.log(`Error while fetching users : ${error.message}`);
        res.status(500).json({error : `Internal server error while fetching user details`});
    }
}

export const fetchUserById = async (req, res) => {
    try {

        const userId = parseInt(req.params.id);
    
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID format'});
        }
    
        const user = await User.findOne({ userId });
    
        if (!user) {
            return res.status(404).json({ error: 'User not found!'});
        }
    
        res.status(200).json({ message: 'User fetched successfully!', userData: user });
    } catch (error) {
        console.log(`Error while fetching the user: ${error.message}`);
        res.status(500).json({ error: 'Internal server error while fetching user data' });
    }
  };

export const createUser = async(req, res)=>{
    try {
        
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

        const lastUser = await User.findOne().sort('-userId');
        const nextId = lastUser ? lastUser.userId+1 : 1;

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

        await newUser.save();

        res.status(201).json({message : 'New User Created Successfully!', createdUser : newUser});
    } catch (error) {
        console.log(`Error while creating user : ${error.message}`);
        res.status(500).json({error : `Internal server error while creating new user`});
    }
}

export const updateUserById = async(req, res)=>{
    try {

        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const user = await User.findOne({ userId });

        if (!user) {
        return res.status(404).json({ error: 'User not found!' });
        }

        const {firstName, lastName, age, email, companyName, city, state, zipcode, website} = req.body;

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

        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        user.email = email;
        user.companyName = companyName;
        user.city = city;
        user.state = state;
        user.zipcode = zipcode;
        user.website = website;

        await user.save();

        res.status(200).json({message : 'User Data Updated Successfully!', updatedUser : user});
    } catch (error) {
        console.log(`Error while updating user : ${error.message}`);
        res.status(500).json({error : `Internal server error while updating user data`});
    }
}

export const deleteUserById = async(req, res)=>{
    try {
        const userId = parseInt(req.params.id);

        if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const user = await User.findOne({ userId });

        if (!user) {
        return res.status(404).json({ error: 'User not found!' });
        }

        const result = await User.deleteOne({ userId });

        if (result.deletedCount === 0) {
        return res.status(500).json({ error: 'Failed to delete user' });
        }

        res.status(200).json({message : 'User Data Deleted Successfully!'});
    } catch (error) {
        console.log(`Error while deleting user : ${error.message}`);
        res.status(500).json({error : `Internal server error while deleting user`});
    }
}