import express from "express";
import morgan from "morgan";
import { API_ROOT } from "./shared/environment";
import productRoute from "./products/routes";
import { auth, users } from "./users/routes";
import orderRoute from "./orders/routes"

const ROOT_V1 = API_ROOT + "/v1";
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use(ROOT_V1, auth);
app.use(ROOT_V1, users);
app.use(ROOT_V1, productRoute)
app.use(ROOT_V1, orderRoute)

export default app;
