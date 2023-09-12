import express from "express";
import morgan from "morgan";
import { API_ROOT } from "./shared/environment";
import productRoute from "./products/routes";
import { auth, users } from "./users/routes";
import orderRoute from "./orders/routes";
import ticketRoute from "./tickets/routes";
import path from "path";
import cors from "cors";

const ROOT_V1 = API_ROOT + "/v1";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "../storage"))); //capture image

app.use(ROOT_V1, auth);
app.use(ROOT_V1, users);
app.use(ROOT_V1, productRoute);
app.use(ROOT_V1, orderRoute);
app.use(ROOT_V1, ticketRoute);
export default app;
