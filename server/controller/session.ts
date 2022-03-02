import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, Request, NextFunction } from "express";
import User from "../model/user";

dotenv.config();
const secretKey = process.env.SECRET_KEY as string;

interface IDecode extends jwt.JwtPayload {
  name: string;
  email: string;
}
interface IDecodeRefreshToekn extends jwt.JwtPayload {
  email: string;
}

export const generateAccessToken = (data: { name: string; email: string }) => {
  return jwt.sign(data, secretKey, {
    expiresIn: "10m",
  });
};
export const generateRefreshToken = (email: string) => {
  return jwt.sign({ email }, secretKey, {
    expiresIn: "30m",
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, secretKey) as jwt.JwtPayload;
};

export const refreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.cookies.refresh_token;
  if (!accessToken) {
    // !accessToken && !refreshToken
    if (!refreshToken) return res.status(400).send({ success: false, error: { message: "다시 로그인 해주세요." } });
    // !accessToken && refreshToken
    try {
      // refreshToken 검증 후 accessToken && refreshToken 재발급
      const { email } = decodeToken(refreshToken) as IDecodeRefreshToekn;
      const user = await User.findOne({ email });

      if (user) {
        const userInfo = { name: user.name, email: user.email };
        const newAccessToken = generateAccessToken(userInfo);
        const { exp } = (await decodeToken(newAccessToken)) as IDecode;
        return res
          .status(200)
          .cookie("refresh_token", refreshToken, { maxAge: 1800, httpOnly: true })
          .send({ success: true, userInfo, token: newAccessToken, exp });
      }
    } catch (error) {
      return res.status(400).send({ success: false, error });
    }
  } else {
    if (!refreshToken) {
      // refreshToken 검증 후 기존 accessToken && refreshToken 재발급
      try {
        const { name, email } = jwt.verify(accessToken, secretKey) as IDecode;
        const newAccessToken = generateAccessToken({ name, email });
        const { exp } = jwt.verify(newAccessToken, secretKey) as IDecode;
        return res
          .status(200)
          .cookie("refresh_token", generateRefreshToken(email), { maxAge: 1800, httpOnly: true })
          .send({ success: true, userInfo: { name, email }, token: newAccessToken, exp });
      } catch (error) {
        return res.status(400).send({ success: false, error });
      }
    }
    // accessToken && !refreshToken 둘다 있을 경우 다시 보냄
    return res.sendStatus(200);
  }
};
