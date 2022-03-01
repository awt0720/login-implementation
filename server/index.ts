import express, { urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import auth from "./routes/auth";
import dbConnect from "./database";
import cookieParser from "cookie-parser";

const whiteList = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
  origin: (option, callback) => {
    if (whiteList.indexOf(option as string) !== -1) {
      return callback(null, true);
    }
    return callback(new Error("Not Allowed Origin"));
  },
};

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));
dbConnect();
app.use("/api/auth", auth);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
