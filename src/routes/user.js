import express from "express";
import {
    registerUser,
    findUserById,
    findUserProfile,
    deleteUser, getAllUsers, updateUser
} from '../controllers/user.js';

import {requireSignin, hasAuthorization} from '../controllers/auth.js';

const router = express.Router();

// post data to create new user, if not, get all users back
router.route('/api/users')
    .get(requireSignin, getAllUsers)
    .post(registerUser);

// with the param here, the param method below will be called first
router
    .route('/api/users/:userId')
    .get(requireSignin, findUserProfile)
    .put(requireSignin, updateUser)
    .delete(requireSignin, deleteUser);

// get the user from param first, put it into the req for others to find out
router.param('userId', findUserById);

export default router;
