import express, { urlencoded } from "express";
import router from "./routes";
import dbConnect from "./database";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
dbConnect();
app.use("/api", router);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
