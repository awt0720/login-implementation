import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname, ".env")});
const {MongoClient} = require("mongodb");

const {MONGO_URL} = process.env;

const client = new MongoClient(MONGO_URL);
export default async function dbConnect() {
  try {
    await client.connect();
    console.log("Connected db");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
