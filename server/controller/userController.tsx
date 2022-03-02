import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/user";
import { IUser } from "../interface/user";
import { generateAccessToken, generateRefreshToken, decodeToken } from "./session";

const successUserAuth = (userInfo: { name: string; email: string }) => {
  const accessToken = generateAccessToken(userInfo);
  const { exp } = decodeToken(accessToken);
  return {
    success: true,
    userInfo,
    isLoging: true,
    token: accessToken,
    exp,
  };
};

export const signup = async (req: Request, res: Response) => {
  const data: IUser = req.body;

  const { name, email, phone, password } = req.body;

  if (!email || !name || !phone || !password) {
    return res.status(400).send({
      error: {
        message: "Validation Error",
      },
    });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).send({ success: false, error: { message: "이미 가입된 유저 입니다." } });
  }

  try {
    new User(data).save();
    const userInfo = { name, email };
    const sendData = successUserAuth(userInfo);

    res
      .status(200)
      .cookie("refresh_token", generateRefreshToken(email), { maxAge: 3600, httpOnly: true })
      .send(sendData);
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, err: e });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const userInfo = { name: user.name, email: user.email };
      const sendData = successUserAuth(userInfo);
      res
        .status(200)
        .cookie("refresh_token", generateRefreshToken(user.email), { maxAge: 3600, httpOnly: true })
        .send(sendData);
    } else {
      res.send("비밀번호 불일치");
    }
  } else {
    res.send("유저 없음");
  }
};

export const logOut = (req: Request, res: Response) => {
  return res
    .cookie("refresh_token", null, {
      maxAge: 0,
      httpOnly: true,
    })
    .sendStatus(200);
};
