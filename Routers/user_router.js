//Importing express to access Router
import express from "express";

//Importing all necessary controller methods
import {
  createUser,
  deleteUserById,
  fetchUserById,
  fetchUsers,
  updateUserById
} from "../Controllers/user_controller.js";

//creating router
const router = express.Router();

//CRUD operation endpoint for Users
router.get('/get-users', fetchUsers);
router.post('/create-new-user', createUser);
router.get('/get-users/:id', fetchUserById);
router.put('/update-user/:id', updateUserById);
router.delete('/delete-user/:id', deleteUserById);

//exporting the router
export default router;
