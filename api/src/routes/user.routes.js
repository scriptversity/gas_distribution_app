import { Router } from "express";
import { signupHandler } from "../handlers/user/registerHandler.js";
import { updateUserInfoHandler } from "../handlers/user/updateUserInfoHandler.js";
import auth from "../middlewares/auth.js";

const router = Router();

// @route   POST api/v1/user/signup
// @desc    Register new user
// @access  Public
router.route("/user/signup").post(signupHandler);

// @route   POST api/v1/user/auth
// @desc    update user info
// @access  Private
router.route("/user/update").post(auth, updateUserInfoHandler);

export default router;
