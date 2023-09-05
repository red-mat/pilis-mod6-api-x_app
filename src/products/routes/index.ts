import { Router } from "express"
import { create, destroy, get, update } from "../controller/controller"
import captureImg from "@/shared/storage/captureImg";


const router: Router = Router();
router.post("/product", captureImg("product"), create);
router.get("/product", get);
router.get("/product/:productId", get);
router.put("/product/:productId", captureImg("product"), update);
router.delete("/product/:productId", destroy);

export default router;
