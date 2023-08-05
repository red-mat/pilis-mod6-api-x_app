import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { updated } from "../controllers";

const PATH = "/users";
const route = Router();

route.use(PATH, authenticate);
route.put(PATH, updated);

export default route;
