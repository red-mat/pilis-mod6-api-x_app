import { Router } from "express";
import { authenticate, updated } from "../controllers";

const PATH = "/auth";

const route = Router();
route.get(PATH, authenticate);
route.put(PATH, updated);

export default route;
