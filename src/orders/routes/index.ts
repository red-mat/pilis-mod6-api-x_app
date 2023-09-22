import { authenticate } from "@/users/middleware/authenticate";
import { Router } from "express";
import {
  clean,
  create,
  deliverOrder,
  get,
  getOrderByCode,
  getTrash,
  refreshCode,
  update,
} from "../controller/orderController";

const router: Router = Router();

router.get("/order", authenticate, get);
router.get("/order/code/:code", authenticate, getOrderByCode);
router.get("/trash/order", authenticate, getTrash);
router.get("/order/:orderId", get);

router.post("/order", create);

router.put("/order/:orderId", update);
router.put("/order/refresh/:orderId", refreshCode);
router.put("/order/deliver/:orderId", authenticate, deliverOrder);

router.delete("/order", authenticate, clean);

export default router;
