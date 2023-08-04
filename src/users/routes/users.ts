import { Router } from "express";
import { authenticate } from "../middleware/authenticate";

const PATH = "/users";
const route = Router();

route.use(PATH, authenticate);

export default route;
