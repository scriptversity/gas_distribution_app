import { Router } from "express";
import { loginHandler, authHandler } from "../handlers/auth/loginHandler.js";
const router = Router();

import auth from "../middlewares/auth.js";

// @route   POST api/v1/user/login
// @desc    Login user & return JWT token
// @access  Public
router.route("/user/login").post(loginHandler);

// @route   GET api/v1/user/auth
// @desc    Get current user by token
// @access  Private
router.route("/user/auth").get(auth, authHandler);

export default router;
