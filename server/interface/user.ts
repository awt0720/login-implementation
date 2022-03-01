import { Document } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: number;
  create_at: Date;
}

export interface IUserSchema extends Document, IUser {}
