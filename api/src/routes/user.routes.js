import { Router } from "express";

const router = Router();

router.route("/user").get((req, res) => {
  res.send("Hello World!");
});

export default router;
