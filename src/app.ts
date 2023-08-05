import express from "express";
import { API_ROOT } from "./shared/environment";
import productRoute from "./products/routes";


const ROOT_V1 = API_ROOT + "/v1";
const app = express();
app.use(express.json());

app.use(ROOT_V1, productRoute)

export default app;
