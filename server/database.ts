import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });
import mongoose from "mongoose";
const { MONGO_URL } = process.env;

export default async function dbConnect() {
  try {
    const conn = await mongoose.connect(MONGO_URL as string);
    console.log(`Connected db / ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
