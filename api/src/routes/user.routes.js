import { Router } from "express";
import { signupHandler } from "../handlers/user/registerHandler.js";
import { updateUserInfoHandler } from "../handlers/user/updateUserInfoHandler.js";
import { deleteUserHandler } from "../handlers/user/deleteUserHandler.js";
import auth from "../middlewares/auth.js";

const router = Router();

// @route   POST api/v1/user/signup
// @desc    Register new user
// @access  Public
router.route("/user/signup").post(signupHandler);

// @route   POST api/v1/user/auth
// @desc    Update user info
// @access  Private
router.route("/user/update").post(auth, updateUserInfoHandler);

// @route   DELETE api/v1/user/delete
// @desc    Delete user account
// @access  Private
router.route("/user/delete").delete(auth, deleteUserHandler);

export default router;
