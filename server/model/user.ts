import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUserSchema } from "../interface/user";

const saltRounds = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  create_at: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default mongoose.model<IUserSchema>("User", userSchema);
