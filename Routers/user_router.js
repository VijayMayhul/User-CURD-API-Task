import express from "express";
import {
  createUser,
  deleteUserById,
  fetchUserById,
  fetchUsers,
  updateUserById
} from "../Controllers/user_controller.js";

const router = express.Router();

router.get('/get-users', fetchUsers);
router.post('/create-new-user', createUser);
router.get('/get-users/:id', fetchUserById);
router.put('/update-user/:id', updateUserById);
router.delete('/delete-user/:id', deleteUserById);

export default router;
