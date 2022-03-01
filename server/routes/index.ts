import { Router } from "express";
import { signup } from "../controller/userController";

const router = Router();

router.post("/signup", signup);

export default router;
