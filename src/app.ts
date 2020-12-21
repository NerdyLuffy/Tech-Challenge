import express, { Application } from "express";
import bodyparser from "body-parser";
import helmet from "helmet";
import "dotenv/config";
import emailRouter from "./routes/routes";

const app: Application = express();
app.use(helmet());

// parse application/x-www-form-urlencoded and application/json
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use("/", emailRouter);

export default app;
