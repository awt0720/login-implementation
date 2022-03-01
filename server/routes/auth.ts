import { Router } from "express";
import { signup, login } from "../controller/userController";
import { refresh } from "../controller/authorize";

const router = Router();

router.get("/", (req, res) => {
  res.send("success");
});

router.post("/login", login);
router.post("/signup", signup);

router.get("/refresh", refresh);

export default router;
