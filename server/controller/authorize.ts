import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
dotenv.config();

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(400).send({ error: { message: "unAuthorized" } });
  } else {
    try {
      const user = jwt.verify(accessToken, process.env.SECRET_KEY as string);
      return res.status(200).send({ user, isLogin: true });
    } catch (e) {
      const err = e as {
        name: string;
        message: string;
        expiredAt: string;
      };
      if (err.name === "TokenExpiredError") {
        return res.status(400).send({
          error: { message: "expired Token" },
        });
      }

      return res.status(400).send({
        error: { message: "invalid Token" },
      });
    }
  }
};
