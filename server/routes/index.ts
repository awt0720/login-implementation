import { Router } from "express";
import { signup, login } from "../controller/userController";
import { authorization } from "../controller/authorize";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", (req, res) => {
  // res.clearCookie()
});

router.get("/authorization", authorization, (req, res) => {
  res.send({ data: req.body });
});

export default router;
