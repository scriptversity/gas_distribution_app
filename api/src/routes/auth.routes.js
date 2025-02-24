import { Router } from "express";
import { loginHandler } from "../handlers/auth/loginHandler.js";
import { authHandler } from "../handlers/auth/authHandler.js";
import { logoutHandler } from "../handlers/auth/logoutHandler.js";
import { tokenRefreshHandler } from "../handlers/auth/tokenRefreshHandler.js";
import auth from "../middlewares/auth.js";

const router = Router();

// @route   POST api/v1/user/login
// @desc    Login user & return JWT token
// @access  Public
router.route("/user/login").post(loginHandler);

// @route   GET api/v1/user/auth
// @desc    Get current user by token
// @access  Private
router.route("/user/auth").get(auth, authHandler);

// @route   POST api/v1/user/logout
// @desc    Logout user & invalidate JWT token
// @access  Private
router.route("/user/logout").post(auth, logoutHandler);

// @route   POST api/v1/user/refresh
// @desc    Refresh user access token
// @access  Private
router.route("/user/refresh").post(auth, tokenRefreshHandler);

export default router;
