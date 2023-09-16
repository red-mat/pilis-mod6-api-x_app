import { Router } from "express";
import { get, create, update } from "../controller/orderController";
import { authenticate } from "@/users/middleware/authenticate";

const router: Router = Router();

router.get("/order", authenticate, get);
router.get("/order/:orderId", get);
router.post("/order", create);
router.put("/order/:orderId", update);

export default router;
