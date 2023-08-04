import express from "express";
import morgan from "morgan";
import { API_ROOT } from "./shared/environment";
import { authenticate } from "./users/controllers";
import { users } from "./users/routes";

const ROOT_V1 = API_ROOT + "/v1";
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(ROOT_V1, authenticate);
app.use(ROOT_V1, users);

export default app;
