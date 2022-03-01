import mongoose from "mongoose";
import { IUserSchema } from "../interface/user";

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

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
