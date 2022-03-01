import { Request, Response } from "express";
import User from "../model/user";
import { IUser } from "../interface/user";

const singup = async (req: Request, res: Response) => {
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
    return res.send({ success: false, error: { message: "이미 가입된 유저 입니다." } });
  }

  try {
    const newUser = new User(data);
    const user = await newUser.save();
    res.send({ success: true, info: user });
  } catch (e) {
    console.log(e);
    res.send({ success: false, err: e });
  }
};

export { singup };
