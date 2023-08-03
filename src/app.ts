import express from "express";
import { API_ROOT } from "./shared/environment";

const ROOT_V1 = API_ROOT + "/v1";
const app = express();

app.use(ROOT_V1, (req, res) => {
  return res.send("hola mundo");
});

export default app;
