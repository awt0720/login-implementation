import { Router } from "express";
import { singup } from "../controller/userController";
import { Request, Response } from "express";

const router = Router();

router.post("/signup", async (req: Request, res: Response) => singup(req, res));

export default router;
