import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { avatar, updated } from "../controllers";

const PATH = "/users";
const route = Router();

route.put(PATH, authenticate, updated);
route.get("/users/avatar/:id", avatar);

export default route;
