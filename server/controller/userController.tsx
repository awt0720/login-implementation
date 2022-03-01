import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../model/user";
import { IUser } from "../interface/user";
dotenv.config();

const secretKey = process.env.SECRET_KEY as string;

const signup = async (req: Request, res: Response) => {
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
    const newUser = new User(data);
    const user = await newUser.save();
    jwt.sign(
      { name, email },
      secretKey,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) throw err;
        res
          .status(200)
          .cookie("accessToken", token, { maxAge: 3600, httpOnly: true })
          .send({ success: true, user: { name, email }, isLoging: true });
      }
    );
  } catch (e) {
    console.log(e);
    res.status(400).send({ success: false, err: e });
  }
};

const login = async (req: Request, res: Response) => {
  console.log("start");
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      jwt.sign(
        { name: user.name, email },
        secretKey,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res
            .status(200)
            .cookie("accessToken", token, { maxAge: 3600, httpOnly: true })
            .send({ success: true, user: { name: user.name, email: user.email }, isLoging: true });
        }
      );
    } else {
      res.send("비밀번호 불일치");
    }
  } else {
    res.send("유저 없음");
  }
};

export { signup, login };
