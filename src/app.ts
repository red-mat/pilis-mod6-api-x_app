import express from "express";
import { API_ROOT } from "./shared/environment";
import { authenticate } from "./users/controllers";
import morgan from "morgan";

const ROOT_V1 = API_ROOT + "/v1";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(ROOT_V1, authenticate);

export default app;
