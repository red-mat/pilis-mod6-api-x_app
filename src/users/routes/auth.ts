import { Router } from "express";
import { authenticate } from "../controllers";

const PATH = "/auth";

const route = Router();
route.get(PATH, authenticate);

export default route;
