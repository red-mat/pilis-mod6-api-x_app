import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { avatar, updated } from "../controllers";
import { captureImg } from "@/shared/storage";

const PATH = "/users";
const route = Router();

route.put(PATH, authenticate, captureImg("avatar"), updated);
route.get("/users/avatar/:id", avatar);

export default route;
