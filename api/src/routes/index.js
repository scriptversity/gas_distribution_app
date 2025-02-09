import { Router } from "express";

import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use("/api/v1", userRouter);
router.use("/api/v1", authRouter);

export default router;
