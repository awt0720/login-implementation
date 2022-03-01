import express, { urlencoded } from "express";
import cors, { CorsOptions } from "cors";
import router from "./routes";
import dbConnect from "./database";

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
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));
dbConnect();
app.use("/api", router);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
