import { Router } from "express";
import { authenticate } from "../controllers";
import { refreshMiddle } from "../middleware/refresh";
import refresh from "../controllers/refresh";

const PATH = "/auth";

const route = Router();
route.post(PATH, authenticate);
route.put(PATH, refreshMiddle, refresh);

export default route;
