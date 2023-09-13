import { Router } from "express"
import { create, destroy, get, update } from "../controller/controller"
import captureImg from "@/shared/storage/captureImg";
import { authenticate } from "@/users/middleware/authenticate";



const router: Router = Router();
router.post("/product", captureImg("product"), authenticate, create);
router.get("/product", get);
router.get("/product/:productId", get);
router.put("/product/:productId", captureImg("product"), authenticate, update);
router.delete("/product/:productId", authenticate, destroy);

export default router;
