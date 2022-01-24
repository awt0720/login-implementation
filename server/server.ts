import express, {urlencoded, Router} from "express";
import router from "./routes";
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(urlencoded({extended: true}));

app.use("/api", router);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
