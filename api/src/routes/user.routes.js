import { Router } from "express";
import { signupHandler } from "../handlers/user/registerHandler.js";

const router = Router();

// @route   POST api/v1/user/signup
// @desc    Register new user
// @access  Public
router.route("/user/signup").post(signupHandler);

export default router;
