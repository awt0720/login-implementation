import { Router } from "express";
import { signup, login, logOut } from "../controller/userController";
import { refreshAuth } from "../controller/session";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logOut);

router.get("/refreshAuth", refreshAuth);

export default router;
